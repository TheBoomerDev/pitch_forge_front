import Script from "next/script";

export default function ScriptsPage() {
    const gAnalytics = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || undefined;
    const GAnal = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || undefined;
    const HOTJAR_ID = process.env.HOTJAR_ID || '3543012';
    const HOTJAR_SV = process.env.HOTJAR_SV || '6';

    return (
        <>
            {/* Google Analytics */}
            {gAnalytics && (
                <Script id="google-analytics" strategy="lazyOnload">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gAnalytics}');
                    `}
                </Script>
            )}

            {/* Google Tag Manager */}

            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-9EDP3TWTVW"></Script>
            <Script id="google-analytics_02" strategy="lazyOnload">
                {` window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GAnal}');
                `}
            </Script>


            {/* Trackdesk Script */}
            <Script
                src="//cdn.trackdesk.com/tracking.js"
                strategy="lazyOnload"
            />
            <Script
                id="trackdesk-init"
                strategy="lazyOnload"
            >
                {`
                (function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");
                trackdesk("cargoffer", "click");
                `}
            </Script>

            {/* Hotjar */}
            {HOTJAR_ID && (
                <Script
                    id="hotjar"
                    strategy="lazyOnload"
                >
                    {`
                    (function(h,o,t,j,a,r){
                        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                        h._hjSettings={hjid:${HOTJAR_ID},hjsv:${HOTJAR_SV}};
                        a=o.getElementsByTagName("head")[0];
                        r=o.createElement("script");
                        r.async=1;
                        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                        a.appendChild(r);
                    })(window,document,"https://static.hotjar.com/c/hotjar-",".js?sv=");
                    `}
                </Script>
            )}
        </>
    );
} 