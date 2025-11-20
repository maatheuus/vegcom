import { useQuery } from "@tanstack/react-query";

export default function useGetSignupUser() {
  return useQuery({
    queryKey: ["signup_user"],
    enabled: true,
  });
}
