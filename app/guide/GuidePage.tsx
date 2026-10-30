import type { Metadata } from 'next';
import { SiteHeader } from '@/app/SiteHeader';
import { SiteFooter } from '@/app/SiteFooter';
import { parseInline } from '@/app/InlineMarkup';
import { IconHash, IconLayers, IconShirt, IconZap } from '@/app/icons';
import { StepCard, iconTile } from '@/app/surfaces';
import {
  ContentShell, ContentSurface, CtaBlock, FaqList, PageHeader,
  cardSurface, cardText, cardTitle, inlineCode, pageTrail,
} from '@/app/ContentPage';
import { GUIDE_ENTRY } from '@/lib/blogPosts';
import { loadContent, type ContentLoaders } from '@/lib/content';
import { getDictionary } from '@/lib/dictionaries';
import { localizedPath } from '@/lib/localePath';
import { getMeta } from '@/lib/meta';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/translations';
import type { GuideContent } from './content/types';

const content: ContentLoaders<GuideContent> = {
  en: () => import('./content/en'),
  tr: () => import('./content/tr'),
  de: () => import('./content/de'),
  fr: () => import('./content/fr'),
  it: () => import('./content/it'),
  ar: () => import('./content/ar'),
  zh: () => import('./content/zh'),
};

export function guideMetadata(locale: Locale): Metadata {
  return pageMetadata({
    locale,
    path: '/guide',
    ...getMeta(locale).pages.guide,
    type: 'article',
    published: GUIDE_ENTRY.published,
    modified: GUIDE_ENTRY.updated,
  });
}

/**
 * The guide (/guide): how to run a session with this tool, rendered on the server in the page's
 * language. Its text may hold [links](/path) (English addresses, sent to the page's language).
 */
export async function GuidePage({ locale }: { locale: Locale }) {
  const c = await loadContent(content, locale);
  const t = getDictionary(locale);
  const home = localizedPath(locale, '/');
  const inline = (text: string) => parseInline(text, locale);
  const trail = pageTrail(t, locale, { name: t.navGuide, href: localizedPath(locale, '/guide') });

  const scales = [
    { Icon: IconLayers, title: c.scrumTitle, cards: c.scrumCards, desc: c.scrumDesc },
    { Icon: IconHash, title: c.fibTitle, cards: c.fibCards, desc: c.fibDesc },
    { Icon: IconShirt, title: c.tshirtTitle, cards: c.tshirtCards, desc: c.tshirtDesc },
    { Icon: IconZap, title: c.powersTitle, cards: c.powersCards, desc: c.powersDesc },
  ];

  return (
    <>
      <SiteHeader />
      <ContentShell trail={trail}>
        <ContentSurface>
          <PageHeader title={c.title} subtitle={c.subtitle} />

          <div className="prose-article">
            <section>
              <p><strong>{c.term}</strong> — {inline(c.introP1)}</p>
              <p>{inline(c.introP2)}</p>
            </section>

            <section>
              <h2>{c.howTitle}</h2>
              <ol className="list-none! pl-0! grid gap-3">
                {c.howSteps.map((s, i) => (
                  <li key={s.title} className={`${cardSurface} m-0! pl-5! flex items-start gap-4`}>
                    <StepCard n={i + 1} />
                    <div className="min-w-0">
                      <h3 className={cardTitle}>{s.title}</h3>
                      <p className={cardText}>{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2>{c.whyTitle}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {c.whyItems.map(item => (
                  <div key={item.title} className={cardSurface}>
                    <h3 className={cardTitle}>{item.title}</h3>
                    <p className={cardText}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2>{c.scalesTitle}</h2>
              <div className="grid gap-3">
                {scales.map(({ Icon, title, cards, desc }) => (
                  <div key={title} className={`${cardSurface} flex items-start gap-4`}>
                    <span aria-hidden="true" className={`${iconTile} w-10 h-10`}>
                      <Icon size={20} />
                    </span>
                    <div className="min-w-0">
                      <h3 className={cardTitle}>{title}</h3>
                      <p className="mb-2! text-base leading-relaxed"><code className={inlineCode}>{cards}</code></p>
                      <p className={cardText}>{inline(desc)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2>{c.specialTitle}</h2>
              <ul>
                {c.specialItems.map(item => {
                  // The card is the part before the dash (German writes an en dash).
                  const cut = item.search(/[—–]/);
                  return <li key={item}><strong>{item.slice(0, cut)}</strong>{item.slice(cut)}</li>;
                })}
              </ul>
              <p>{inline(c.specialNote)}</p>
            </section>

            <section>
              <h2>{c.bestTitle}</h2>
              <ul>
                {c.bestItems.map(item => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section>
              <h2>{c.remoteTitle}</h2>
              <p>{c.remoteIntro}</p>
              <ul>
                {c.remoteFeatures.map(f => <li key={f}>{f}</li>)}
              </ul>
            </section>

            <section>
              <h2>{c.faqTitle}</h2>
              <FaqList items={c.faqItems} />
            </section>
          </div>

          <CtaBlock text={c.ctaText} label={c.ctaBtn} href={home} />
        </ContentSurface>
      </ContentShell>
      <SiteFooter />
    </>
  );
}
