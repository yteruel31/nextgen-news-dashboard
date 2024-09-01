"use client";

import { AppProgressBar } from "next-nprogress-bar";
import React from "react";

export const ProgressBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <AppProgressBar
        shallowRouting
        options={{ showSpinner: false }}
        color="#001830"
      />
      {children}
    </>
  );
};
