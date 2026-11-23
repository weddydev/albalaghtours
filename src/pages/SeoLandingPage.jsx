import { seoPageMeta } from '../data/seo'
import { seoPageBySlug } from '../data/seoPages'
import { useSeo } from '../hooks/useDocumentMeta'
import ServiceHero from '../components/service/ServiceHero'
import OfferGrid from '../components/service/OfferGrid'
import HowItWorks from '../components/service/HowItWorks'
import Faq from '../components/service/Faq'
import Related from '../components/service/Related'
import CtaBand from '../components/service/CtaBand'
import SeoArticle from '../components/seo/SeoArticle'
import SeoLocal from '../components/seo/SeoLocal'
import SeoLinks from '../components/seo/SeoLinks'
import AfterFirstPaint from '../components/ui/AfterFirstPaint'

/**
 * Hyderabad landing pages (/umrah-packages-from-hyderabad, /travel-agency-in-hyderabad, …).
 * Same look as the service pages, plus a long-form guide, the local office block and links
 * to the other landing pages. Content: src/data/seoPages.js · titles & schema: src/data/seo.js.
 */
export default function SeoLandingPage({ slug }) {
  const page = seoPageBySlug[slug]
  useSeo(seoPageMeta(slug, page.faqs))

  return (
    <div key={slug}>
      <ServiceHero service={page} />
      <AfterFirstPaint>
        <OfferGrid service={page} />
        <SeoArticle article={page.article} />
        <HowItWorks service={page} />
        <SeoLocal whatsapp={page.whatsapp} />
        <Faq service={page} />
        <SeoLinks current={slug} />
        <Related service={page} />
        <CtaBand service={page} accent={page.cta.accent} lead={page.cta.lead} />
      </AfterFirstPaint>
    </div>
  )
}
