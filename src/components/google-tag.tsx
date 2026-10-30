import Script from "next/script";

const measurementId = "G-HB9EXZYGWD";

export function GoogleTag() {
  return (
    <>
      <Script id="google-tag-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}');`}
      </Script>
      <Script
        id="google-tag-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
