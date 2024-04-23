import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

/**
 * This is only used for testing hooks.
 * Creates a React Query Provider wrapper component for test cases.
 * This function helps wrap your application with the global QueryClient instance.
 *
 * @returns {React.FC<{ children: ReactNode }>} - A React component that wraps application with the QueryClientProvider.
 */
export const createWrapper = (): React.FC<{ children: ReactNode }> => {
  const mutationCache = new MutationCache();
  const queryCache = new QueryCache();

  const queryClient = new QueryClient({
    queryCache,
    mutationCache,
    defaultOptions: {
      queries: {
        /**
         * Disable Automatic Query Retries
         * By default, React Query retries failed queries a few times.
         * This option sets retry to false to disable retries for all queries by default.
         */
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default createWrapper;

// import React, { ReactNode } from "react";
// import {
//   MutationCache,
//   QueryCache,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";

// /**
//  * Wrapper component providing Query context.
//  */
// export function createQueryWrapper() {
//   const mutationCache = new MutationCache();

//   const queryCache = new QueryCache();

//   const queryClient = new QueryClient({
//     queryCache,
//     mutationCache,
//     defaultOptions: {
//       queries: {
//         retry: false,
//       },
//     },
//   });

//   const wrapper = (): React.FC<{ children: ReactNode }> => {
//     return ({ children }: { children: ReactNode }) => (
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     );
//   };

//   return {
//     queryClient,
//     wrapper,
//   };
// }
