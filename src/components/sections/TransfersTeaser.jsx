import { Link } from 'react-router-dom'
import { serviceBySlug, servicePath } from '../../data/content'
import { ArchFrame } from '../ui/Ornaments'
import Photo from '../ui/Photo'
import Icon from '../ui/Icon'

const FALLBACK = 'radial-gradient(90% 70% at 60% 25%, #6b5a3a 0%, #2a2216 50%, #0a0805 100%)'

/** Home: a slim "Luxury AC coaches" card under the services grid, linking to Private Transfers. */
export default function TransfersTeaser() {
  const s = serviceBySlug['private-transfers']
  return (
    <Link
      to={servicePath(s)}
      className="svc-reveal glass group mt-5 flex items-center gap-4 overflow-hidden rounded-[26px] p-3 pr-5 transition-colors hover:!border-gold-300/60 sm:gap-6 lg:mt-6"
    >
      <span className="relative block h-24 w-20 shrink-0 sm:h-28 sm:w-24">
        <ArchFrame className="h-full w-full" innerClassName="bg-ink-900" finial={false}>
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
            <Photo src={s.coaches[0].src} fallback={FALLBACK} sizes="96px">
              <Icon name="bus" strokeWidth={0.8} className="absolute left-1/2 top-[40%] h-9 w-9 -translate-x-1/2 text-gold-200 opacity-40" />
            </Photo>
          </div>
        </ArchFrame>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.65rem] uppercase tracking-[0.22em] text-gold-300">{s.routes.join(' · ')}</span>
        <span className="mt-1 block font-display text-2xl font-semibold leading-tight text-cream-50 sm:text-3xl">Luxury AC coaches</span>
        <span className="mt-1 block text-sm text-mist-300 max-sm:hidden">{s.features.map((f) => f.label).join(' · ')}</span>
      </span>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold-400/50 text-gold-200 transition-transform duration-500 group-hover:rotate-45">
        <Icon name="arrowUpRight" className="h-4 w-4" />
      </span>
    </Link>
  )
}
