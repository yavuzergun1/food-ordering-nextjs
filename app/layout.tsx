import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Providers } from "@/redux/provider";
import store from "../redux/store";

export const metadata = {
  title: "Food Order!",
  description: "Fullstack Ordering Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <Header />
      <Providers >
          {children}
        </Providers>
          <Footer />
      </body>
    </html>
  );
}
