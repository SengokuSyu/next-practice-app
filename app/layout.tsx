import "./globals.css";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <title>タスク管理アプリ</title>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
