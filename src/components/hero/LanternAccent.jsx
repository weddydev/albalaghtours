import { LanternSVG } from '../ui/Ornaments'

/** Small hanging lantern in the top-right corner — the light's point of origin. */
export default function LanternAccent() {
  return (
    <div className="h-lantern-out pointer-events-none absolute right-[2.4%] top-0 z-[10] w-[26px] lg:w-[36px]">
      <div className="h-lantern">
        <div className="h-lantern-rig flex flex-col items-center" style={{ transformOrigin: '50% 0%' }}>
          <div className="lantern-chain h-[112px] w-[2px] [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_45%,#000_85%)] lg:h-[150px]" />
          <div className="relative w-full">
            <div className="h-lantern-halo absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_200_110/0.35),transparent)] lg:mix-blend-screen" />
            <LanternSVG className="relative w-full drop-shadow-[0_0_12px_rgba(255,190,90,0.6)]" />
          </div>
        </div>
      </div>
    </div>
  )
}
