import { useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void | Promise<void>;
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export function useInfiniteScroll({
  hasMore,
  isLoading,
  onLoadMore,
  threshold = 1000,
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingRef.current || isLoading || !hasMore) {
      return;
    }

    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    isLoadingRef.current = true;
    try {
      await onLoadMore();
    } finally {
      setTimeout(() => {
        isLoadingRef.current = false;
      }, 1500);
    }
  }, [isLoading, hasMore, onLoadMore]);

  useEffect(() => {
    isLoadingRef.current = isLoading;
    if (isLoading && observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, [isLoading]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!hasMore || isLoading || isLoadingRef.current) {
      return;
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry?.isIntersecting && !isLoadingRef.current && hasMore && !isLoading) {
        handleLoadMore();
      }
    }, options);

    const currentSentinel = sentinelRef.current;
    if (currentSentinel && observerRef.current) {
      observerRef.current.observe(currentSentinel);
    }

    return () => {
      if (observerRef.current && currentSentinel) {
        observerRef.current.unobserve(currentSentinel);
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [hasMore, isLoading, handleLoadMore, threshold]);

  return { sentinelRef };
}

