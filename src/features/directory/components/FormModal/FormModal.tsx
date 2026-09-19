"use client";

import { X } from "lucide-react";
import styles from "../../directory.module.css";

interface FormModalProps {
  isOpen: boolean;
  title: string;
  icon: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
}

export function FormModal({
  isOpen,
  title,
  icon,
  onClose,
  children,
}: FormModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className={`${styles.overlayEnter} fixed inset-0 z-[1300] bg-black/30`}
        onClick={onClose}
        aria-hidden
      />
      <div
        className={`${styles.modalEnter} fixed inset-4 z-[1400] m-auto flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-green-200 bg-white shadow-2xl sm:max-h-[90vh]`}
        role="dialog"
        aria-modal
        aria-label={title}
      >
        <div className="flex items-center justify-between border-b border-green-100 px-5 py-4">
          <div className="flex items-center gap-2 text-green-700">
            {icon}
            <h2 className="text-base font-semibold">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-green-200 transition-colors hover:bg-green-100 hover:text-green-600 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
