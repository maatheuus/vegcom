import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useEffect, useRef } from "react";

const AUTO_CLOSE_DELAY_MS = 4000;

interface FormSuccessProps {
  title: string;
  description?: string;
  /** Chamado após alguns segundos; o timer é cancelado se o modal fechar antes. */
  onDone: () => void;
}

export function FormSuccess({ title, description, onDone }: FormSuccessProps) {
  // Ref evita reiniciar o timer quando o pai recria o callback a cada render.
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const timeoutId = setTimeout(() => onDoneRef.current(), AUTO_CLOSE_DELAY_MS);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
      >
        <CheckCircle className="h-16 w-16 text-green-500" aria-hidden />
      </motion.div>
      <p className="text-center text-lg font-semibold text-green-800">
        {title}
      </p>
      {description && (
        <p className="max-w-xs text-center text-sm leading-relaxed text-green-600">
          {description}
        </p>
      )}
    </div>
  );
}
