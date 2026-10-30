export interface TocEntry {
  id: string;
  title: React.ReactNode;
}

export function TocList({ entries, activeId }: { entries: TocEntry[]; activeId: string | null }) {
  return (
    <ol className="border-s border-slate-200 dark:border-slate-800">
      {entries.map(entry => {
        const isActive = entry.id === activeId;
        return (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              aria-current={isActive ? 'location' : undefined}
              className={`-ms-px block border-s-2 py-1.5 ps-4 text-sm leading-snug transition-colors ${
                isActive
                  ? 'border-accent-600 font-medium text-slate-900 dark:border-accent-400 dark:text-white'
                  : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-white'
              }`}
            >
              {entry.title}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
