/**
 * A script that runs once, as the server-rendered HTML is parsed. Rendered on
 * the client (a 404 or error boundary re-rendering the layout) it is inert
 * text/plain, so React doesn't warn about a script it would never run.
 * `html` is one of lib/inlineScripts.ts: the room's Content-Security-Policy runs
 * only those texts (by hash; proxy.ts).
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
