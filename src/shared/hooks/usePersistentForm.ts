import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

interface PersistentFormOptions {
  key: string;
  ttlSeconds?: number;
  excludeFields?: string[];
}

export function usePersistentForm<T extends Record<string, any>>(
  form: UseFormReturn<T>,
  { key, ttlSeconds = 1800, excludeFields = [] }: PersistentFormOptions,
) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedItem = localStorage.getItem(key);
      if (storedItem) {
        const { data, timestamp } = JSON.parse(storedItem);
        const now = Date.now();
        const ageSeconds = (now - timestamp) / 1000;

        if (ageSeconds < ttlSeconds) {
          form.reset((currentValues) => ({
            ...currentValues,
            ...data,
          }));
        } else {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error("Failed to load persistent form data:", error);
    }
  }, [key, ttlSeconds, form]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const subscription = form.watch((value) => {
      try {
        const dataToSave = { ...value };

        excludeFields.forEach((field) => {
          delete dataToSave[field];
        });
        const item = {
          data: dataToSave,
          timestamp: Date.now(),
        };

        localStorage.setItem(key, JSON.stringify(item));
      } catch (error) {
        console.error("Failed to save persistent form data:", error);
      }
    });

    return () => subscription.unsubscribe();
  }, [key, excludeFields, form]);

  const clearStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  };

  return { clearStorage };
}
