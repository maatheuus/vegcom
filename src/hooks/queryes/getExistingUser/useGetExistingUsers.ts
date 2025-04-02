import { getUser } from "@/lib/supabase/authFunctions";
import { useQuery } from "@tanstack/react-query";

export default function useGetExistingUsers() {
  return useQuery({
    queryKey: ["user_data"],
    queryFn: getUser,
    enabled: true,
  });
}
