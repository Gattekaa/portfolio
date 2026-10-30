import { BackgroundMotion } from "./background-motion";

// Decorative layers stay behind the content and never enter the reading order.
// Only the fixed page layer carries grain, avoiding repeated texture painting
// inside the scroll-driven sections.
export function SiteBackground() {
  return (
    <div aria-hidden="true" data-site-background className="pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden">
      <BackgroundMotion />
      <div data-ambient-light className="absolute -inset-24 translate-x-[var(--ambient-pointer-x,0px)] translate-y-[calc(var(--ambient-pointer-y,0px)+var(--ambient-scroll-y,0px)*.4)] bg-[radial-gradient(ellipse_at_100%_20%,var(--ambient-glow),transparent_65%),radial-gradient(ellipse_at_0%_100%,var(--ambient-glow),transparent_55%)] motion-reduce:transform-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--ambient-line)_1px,transparent_1px)] bg-size-[160px_100%] bg-center mask-[linear-gradient(to_right,black,transparent_30%,transparent_70%,black)] md:bg-size-[240px_100%]" />
      <svg data-ambient-contours className="absolute -right-[45%] -top-[8%] h-[135%] w-[150%] translate-x-[calc(var(--ambient-pointer-x,0px)*1.4)] translate-y-[calc(var(--ambient-pointer-y,0px)*1.3+var(--ambient-scroll-y,0px))] fill-none stroke-(--ambient-contour) motion-reduce:transform-none md:-right-[28%] md:w-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="820" cy="500" rx="540" ry="680" transform="rotate(-28 820 500)" vectorEffect="non-scaling-stroke" />
        <ellipse cx="820" cy="500" rx="460" ry="600" transform="rotate(-28 820 500)" vectorEffect="non-scaling-stroke" />
        <path d="M240 0v1000M0 760h1000" strokeDasharray="2 10" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="absolute inset-0 bg-[url('/images/interface-grain.svg')] bg-size-[180px_180px] opacity-(--ambient-grain) mix-blend-soft-light" />
    </div>
  );
}

export function SurfaceBackdrop() {
  return (
    <div aria-hidden="true" data-surface-backdrop="section" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit] mask-[linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] print:hidden">
      <div className="absolute -inset-24 translate-x-[calc(var(--ambient-pointer-x,0px)*.6)] translate-y-[calc(var(--ambient-pointer-y,0px)*.6+var(--ambient-scroll-y,0px)*.3)] bg-[radial-gradient(ellipse_at_90%_30%,var(--ambient-glow),transparent_65%)] motion-reduce:transform-none" />
      <div className="absolute -inset-12 translate-x-[calc(var(--ambient-pointer-x,0px)*.2)] translate-y-[calc(var(--ambient-scroll-y,0px)*.15)] bg-[linear-gradient(to_right,var(--ambient-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--ambient-line)_1px,transparent_1px)] bg-size-[96px_96px] bg-right mask-[radial-gradient(ellipse_at_100%_50%,black,transparent_70%)] motion-reduce:transform-none md:bg-size-[120px_120px]" />
      <svg className="absolute -right-1/4 top-0 h-full max-h-[1100px] w-full translate-x-[var(--ambient-pointer-x,0px)] translate-y-[calc(var(--ambient-pointer-y,0px)+var(--ambient-scroll-y,0px)*.45)] fill-none stroke-(--ambient-contour) opacity-70 motion-reduce:transform-none" viewBox="0 0 1200 900" preserveAspectRatio="xMaxYMid slice">
        <ellipse cx="1000" cy="450" rx="520" ry="650" transform="rotate(-30 1000 450)" vectorEffect="non-scaling-stroke" />
        <ellipse cx="1000" cy="450" rx="440" ry="570" transform="rotate(-30 1000 450)" vectorEffect="non-scaling-stroke" />
        <path d="M1040 0v900M0 720h1200" strokeDasharray="2 10" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

