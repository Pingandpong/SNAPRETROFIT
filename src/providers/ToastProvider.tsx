import React, { createContext, ReactNode, useContext } from 'react';
import {
  useToast as useGSToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from '@gluestack-ui/themed';

interface ToastOptions {
  title: string;
  description?: string;
}

type ToastContextType = (options: ToastOptions) => void;

const ToastContext = createContext<ToastContextType>(() => {});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const toast = useGSToast();

  const showToast: ToastContextType = ({ title, description }) => {
    toast.show({
      render: () => (
        <Toast>
          <ToastTitle>{title}</ToastTitle>
          {description ? <ToastDescription>{description}</ToastDescription> : null}
        </Toast>
      ),
    });
  };

  return <ToastContext.Provider value={showToast}>{children}</ToastContext.Provider>;
};

export const useAppToast = () => useContext(ToastContext);
