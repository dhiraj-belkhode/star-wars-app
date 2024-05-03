import { QueryClient } from "@tanstack/react-query";
const STALE_TIME = 1 * (60 * 1000); // 1 minute

/**
 * Global Query Client Instance
 * This instance is used throughout the application to manage data fetching and caching with React Query.
 */
const queryClient = new QueryClient({
  /**
   * Default Options for Queries
   * These options are applied to all queries unless explicitly overridden at the query level.
   */
  defaultOptions: {
    queries: {
      retry: false,
      /**
       * Stale Time for Queries (in milliseconds)
       * Inherits the value from `STALE_TIME` unless overridden at the query level.
       * This defines how long a query result will be considered fresh before refetching is triggered.
       */
      staleTime: STALE_TIME,
    },
  },
});

export default queryClient;
