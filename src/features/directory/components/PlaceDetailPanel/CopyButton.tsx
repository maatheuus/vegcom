import { toast } from "@/shared/hooks/use-toast";
import { Copy } from "lucide-react";

interface CopyButtonProps {
  value: string;
  /** Nome do campo em minúsculas, ex.: "endereço". */
  label: string;
}

export function CopyButton({ value, label }: CopyButtonProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        variant: "success",
        title: `${label.charAt(0).toUpperCase()}${label.slice(1)} copiado`,
        description: `O ${label} está pronto para colar.`,
      });
    } catch {
      toast({
        variant: "destructive",
        title: `Não foi possível copiar o ${label}`,
        description: "Selecione o texto e tente novamente.",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="-my-2 flex size-10 shrink-0 items-center justify-center rounded-full text-green-500 transition-[background-color,color,scale] duration-150 hover:bg-green-100 hover:text-green-700 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none active:scale-[0.96]"
      aria-label={`Copiar ${label}`}
      title={`Copiar ${label}`}
    >
      <Copy className="h-3.5 w-3.5" aria-hidden />
    </button>
  );
}
