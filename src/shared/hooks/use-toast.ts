"use client";

import * as React from "react";
import type { ToastActionElement, ToastProps } from "../ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 300;

const getDurationByVariant = (variant?: string) => {
  if (variant === "destructive") return 6000;
  return 2500;
};

export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

const removeTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
const dismissTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function clearToastTimers(toastId: string) {
  const removeTimeout = removeTimeouts.get(toastId);
  if (removeTimeout) {
    clearTimeout(removeTimeout);
    removeTimeouts.delete(toastId);
  }

  const dismissTimeout = dismissTimeouts.get(toastId);
  if (dismissTimeout) {
    clearTimeout(dismissTimeout);
    dismissTimeouts.delete(toastId);
  }
}

function addToRemoveQueue(toastId: string) {
  if (removeTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    removeTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId,
    });
  }, TOAST_REMOVE_DELAY);

  removeTimeouts.set(toastId, timeout);
}

function addToDismissQueue(toastId: string, duration: number) {
  if (dismissTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    dismissTimeouts.delete(toastId);
    dispatch({
      type: "DISMISS_TOAST",
      toastId,
    });
  }, duration);

  dismissTimeouts.set(toastId, timeout);
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }

    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        state.toasts.forEach((toast) => clearToastTimers(toast.id));
        return {
          ...state,
          toasts: [],
        };
      }

      clearToastTimers(action.toastId);

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

export type Toast = Omit<ToasterToast, "id" | "variant"> & {
  variant?: "success" | "error" | "warning" | "info" | "destructive";
};

function toast({ variant, ...props }: Toast) {
  const id = genId();
  const duration = props.duration ?? getDurationByVariant(variant);

  const update = (props: ToasterToast) =>
    dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } });

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      duration,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss();
      },
    },
  });

  addToDismissQueue(id, duration);

  return { id, dismiss, update };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { toast, useToast };
