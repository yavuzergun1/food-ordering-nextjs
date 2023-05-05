import React, { ReactNode } from "react";
import { oswald } from "@/styles/fonts";

interface TitlePageProps {
  children: ReactNode;
  addClass?: string;
}
const Title = ({ children, addClass }: TitlePageProps) => {
  return <div className={`${addClass} ${oswald.className} font-bold`}>{children}</div>;
};

export default Title;
