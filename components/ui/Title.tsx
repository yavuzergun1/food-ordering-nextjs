import React, { ReactNode } from "react";

interface TitlePageProps {
  children: ReactNode;
  addClass?: string;
}
const Title = ({ children, addClass }: TitlePageProps) => {
  return <div className={`${addClass} font-oswald font-bold`}>{children}</div>;
};

export default Title;
