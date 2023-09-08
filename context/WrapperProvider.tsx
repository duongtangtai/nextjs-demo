"use client";

import { SessionProvider } from "next-auth/react";
import GlobalStyles from "@/components/shared/GlobalStyles";
import StyledComponentsRegistry from "@/lib/registry";

const WrapperProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <StyledComponentsRegistry>
        <GlobalStyles />
        <SessionProvider>{children}</SessionProvider>
      </StyledComponentsRegistry>
    </>
  );
};

export default WrapperProvider;
