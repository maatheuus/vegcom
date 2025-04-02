import { createClient } from "./client";
const supabase = createClient();

export const login = async (email: string, password: string) => {
  const { error, data: loginData } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return { error, loginData };
};
export const loginWithGoogle = async () => {
  const { error, data: loginData } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      skipBrowserRedirect: true,
    }
  });

  return { error, loginData };
};
export const signup = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  const { error, data: singupData } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: username,
      },
    },
  });

  return { error, singupData };
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  return { data, error };
};
