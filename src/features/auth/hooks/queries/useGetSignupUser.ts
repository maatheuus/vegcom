import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to retrieve the recently signed-up user data from the cache.
 * Useful for accessing signup confirmation details or auto-login flow.
 *
 * @returns {UseQueryResult<unknown, Error>} The query result containing user data.
 */
export default function useGetSignupUser() {
  return useQuery({
    queryKey: ["signup_user"],
    enabled: true,
  });
}
