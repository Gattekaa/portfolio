// Set up optional effects before a section enters the viewport, rather than
// measuring every section during hydration. Content stays readable meanwhile.
export function observeApproach(element: Element, activate: () => void) {
  if (!("IntersectionObserver" in window)) {
    activate();
    return () => {};
  }
  let finished = false;
  const observer = new IntersectionObserver(entries => {
    if (finished || !entries.some(entry => entry.isIntersecting)) return;
    finished = true;
    observer.disconnect();
    activate();
  }, { rootMargin: "700px 0px" });
  observer.observe(element);
  return () => { finished = true; observer.disconnect(); };
}
