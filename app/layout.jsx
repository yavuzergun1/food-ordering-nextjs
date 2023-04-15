import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Providers from "./Providers";

export const metadata = {
  title: "Food Order!",
  description: "Fullstack Ordering Project",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      
      <head />
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
