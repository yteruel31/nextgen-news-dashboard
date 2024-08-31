"use client";

import React, { forwardRef, useEffect } from "react";
import { FetchNextPageOptions } from "@tanstack/react-query";

interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<any>;
  hasNextPage: boolean;
  loadingMessage: React.ReactNode;
  endingMessage: React.ReactNode;
}

export const InfiniteScroller = forwardRef<HTMLDivElement, InfiniteScrollProps>(
  (
    {
      fetchNextPage,
      hasNextPage,
      endingMessage,
      loadingMessage,
      children,
      ...props
    },
    ref,
  ) => {
    const observerTarget = React.useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        async (entries) => {
          console.log(entries);
          if (entries[0]?.isIntersecting && hasNextPage) {
            await fetchNextPage();
          }
        },
        { threshold: 1 },
      );

      if (observerTarget.current) {
        observer.observe(observerTarget.current);
      }

      return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage]);

    return (
      <div ref={ref} {...props} style={{ overflowAnchor: "none" }}>
        {children}
        <div ref={observerTarget} />
        {hasNextPage ? loadingMessage : endingMessage}
      </div>
    );
  },
);

InfiniteScroller.displayName = "InfiniteScroller";
