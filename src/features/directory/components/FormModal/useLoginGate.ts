import { getAccessToken } from "@/shared/api/axios/axiosInstance";
import { toast } from "@/shared/hooks/use-toast";
import { useState } from "react";

/**
 * Controla o QuickLoginModal dos formulários: abre quando não há token
 * (ou a API responde 401) e avisa que o formulário foi mantido após o login.
 */
export function useLoginGate(subject: string) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const requireLogin = () => {
    if (getAccessToken()) return false;
    setIsLoginOpen(true);
    return true;
  };

  const loginModalProps = {
    isOpen: isLoginOpen,
    onClose: () => setIsLoginOpen(false),
    onAuthenticated: () => {
      setIsLoginOpen(false);
      toast({
        variant: "success",
        title: "Login realizado!",
        description: `Seu formulário foi mantido. Agora você pode publicar ${subject}.`,
      });
    },
  };

  return { requireLogin, openLogin: () => setIsLoginOpen(true), loginModalProps };
}
