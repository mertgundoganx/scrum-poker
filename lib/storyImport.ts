/**
 * Stories from a file or pasted spreadsheet cells, read in the browser: only
 * the story strings ever leave it. CSV the way spreadsheets and trackers
 * write it (RFC 4180: quoted fields with separators, doubled quotes and line
 * breaks), with a comma, semicolon or tab between fields.
 */

import { cutText } from '@/lib/deck';
import { MAX_STORY } from '@/lib/limits';

// Column names in order of preference (Jira exports both "Issue key" and "Issue id").
const KEY_HEADERS = ['issue key', 'key', 'ticket', 'issue id', 'id'];
const TITLE_HEADERS = ['summary', 'title', 'story', 'subject', 'name'];

export interface ParsedStories {
  stories: string[];
  /** The header names the stories were built from; empty when read one per line */
  columns: string[];
}

/** The separator of the first line: a tab, else the more frequent of ; and , (none: plain lines). */
function detectSeparator(text: string): string | null {
  const counts: Record<string, number> = { '\t': 0, ';': 0, ',': 0 };
  let quoted = false;
  for (const c of text) {
    if (c === '"') quoted = !quoted;
    else if (!quoted && (c === '\n' || c === '\r')) break;
    else if (!quoted && c in counts) counts[c]++;
  }
  if (counts['\t'] > 0) return '\t';
  if (counts[';'] > counts[',']) return ';';
  return counts[','] > 0 ? ',' : null;
}

/** Rows of fields. A quote opens a quoted field only at the field's start. */
function parseRows(text: string, sep: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c !== '"') field += c;
      else if (text[i + 1] === '"') { field += '"'; i++; } else quoted = false;
    } else if (c === '"' && field === '') {
      quoted = true;
    } else if (c === sep) {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += c;
    }
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

function findColumn(header: string[], names: string[]): number {
  for (const name of names) {
    const at = header.indexOf(name);
    if (at >= 0) return at;
  }
  return -1;
}

/** Cleaned as the server stores them (one line, cut to the story limit), without blanks and duplicates. */
function cleanStories(items: string[]): string[] {
  const out = new Set<string>();
  for (const item of items) {
    const story = cutText(item, MAX_STORY);
    if (story) out.add(story);
  }
  return [...out];
}

/**
 * The stories in `text`. With a header row naming a key column (Issue key,
 * Key, ID, Ticket) and/or a title column (Summary, Title, Name, Story,
 * Subject) each row becomes "KEY Summary"; without one, every line is a story.
 */
export function parseStories(text: string): ParsedStories {
  const clean = text.replace(/^\uFEFF/, '');
  const sep = detectSeparator(clean);
  if (sep) {
    const rows = parseRows(clean, sep);
    const header = (rows[0] ?? []).map(h => h.trim().toLowerCase());
    const columns = [findColumn(header, KEY_HEADERS), findColumn(header, TITLE_HEADERS)].filter(c => c >= 0);
    if (columns.length > 0) {
      return {
        stories: cleanStories(rows.slice(1).map(r => columns.map(c => (r[c] ?? '').trim()).filter(Boolean).join(' '))),
        columns: columns.map(c => rows[0][c].trim()),
      };
    }
  }
  return { stories: cleanStories(clean.split(/\r?\n|\r/)), columns: [] };
}
