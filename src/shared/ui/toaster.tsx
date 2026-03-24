"use client";

import { useToast } from "@/shared/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        duration,
        ...props
      }) {
        return (
          <Toast key={id} duration={duration} {...props}>
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="text-green-500">{title}</ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-green-500">
                  {description}
                </ToastDescription>
              )}
            </div>
            {/* {action} */}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
