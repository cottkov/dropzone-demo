import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "DROPZONE — CS2 Case Demo", description: "Original CS2 skin case opening demo" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
