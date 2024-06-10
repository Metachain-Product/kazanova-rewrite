import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='robots' content='index' />
          {/* <meta
            name='google-site-verification'
            content='1ntO_BEjab5JsbXv7eYD1nXhOBDgjk1l2Tkd6iyKNPk'
          /> */}

          {/* <link rel='shortcut icon' href='/favicon.png' /> */}
          {/* <link rel='manifest' href='/manifest.json' /> */}
          {/* <meta name='theme-color' content='#000000' /> */}

          {/* <link rel='shortcut icon' href='/favicon.png' /> */}
          {/* <meta name='msapplication-TileColor' content='#007aff' /> */}

          {/* <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' /> */}
          {/* <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' /> */}
          {/* <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' /> */}
        </Head>

        {/* <Script
          strategy='lazyOnload'
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <Script id={"1"} strategy='lazyOnload'>
          {googleAnalytics()}
        </Script> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// function googleAnalytics() {
//   return `
//       window.dataLayer = window.dataLayer || [];
//       function gtag(){dataLayer.push(arguments);}
//       gtag('js', new Date());
//       gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
//       page_path: window.location.pathname,
//       });
//   `;
// }
export default MyDocument;
