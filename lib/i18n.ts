/**
 * A string with a form per plural category of the language (Intl.PluralRules):
 * English needs one/other, Arabic also zero/two/few/many, Turkish and Chinese
 * only other. `other` is always required.
 */
export type Plural = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };

/** Fill `{name}` placeholders: fill('Round {n}', { n: 4 }) → 'Round 4'. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

/** The plural form for `count`, with {count} filled in. */
export function plural(forms: Plural, count: number, locale: string, values: Record<string, string | number> = {}): string {
  const category = new Intl.PluralRules(locale).select(count);
  return fill(forms[category] ?? forms.other, { count, ...values });
}
