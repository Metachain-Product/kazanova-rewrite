import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ProviderRpcError } from "viem";

type MutationError = AxiosError | ProviderRpcError | Error;

export const queryClientConfig = {
  defaultOptions: {
    mutations: {
      retry: false,
      // onError: (error: MutationError) => {
      //   console.error("Mutation error:", error);

      //   let errorMessage = "An unknown error occurred";

      //   if ((error as AxiosError).isAxiosError) {
      //     errorMessage =
      //       //@ts-ignore
      //       (error as AxiosError).response?.data?.message || (error as AxiosError).message;
      //   } else if ((error as ProviderRpcError).code !== undefined) {
      //     errorMessage = (error as ProviderRpcError).message;
      //   } else if (error instanceof Error) {
      //     errorMessage = error.message;
      //   }

      //   toast.error(`An error occurred: ${errorMessage}`);
      // },
    },
    queries: {
      retry: false,
      staleTime: 15 * 60 * 1000, // 15 minutes
      refetchOnWindowFocus: false,
    },
  },
};
