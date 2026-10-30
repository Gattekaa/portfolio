// Runs before paint, with no network request and no hydration-dependent content.
export const themeScript = `(function(){try{var s=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=s==='dark'||s==='light'?s:matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}catch(e){document.documentElement.dataset.theme='dark'}})()`;
