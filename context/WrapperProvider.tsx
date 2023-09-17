"use client";

import { SessionProvider } from "next-auth/react";
import GlobalStyles from "@/components/shared/GlobalStyles";
import StyledComponentsRegistry from "@/lib/registry";
import { ToastProvider } from "./toast/ToastProvider";

const WrapperProvider = ({ children }: { children: React.ReactNode }) => {
  console.log("wrapper provider")
  return (
    <>
      <StyledComponentsRegistry>
        <GlobalStyles />
        <SessionProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </SessionProvider>
      </StyledComponentsRegistry>
    </>
  );
};

export default WrapperProvider;
