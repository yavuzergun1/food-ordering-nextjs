import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Providers from "./Providers";
import { josefin } from "@/styles/fonts";
import Head from "./head";
// export const metadata = {
//   title: "Food Order!",
//   description: "Fullstack Ordering Project",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={josefin.className}>
      <Head />
      <body >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
