import { useEffect } from 'react';

type ToastProps = {
  message: string;
  onClose: () => void;
};

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="animate-fadein fixed bottom-5 left-1/2 z-50 -translate-x-1/2 transform rounded-md px-5 py-3 text-white opacity-90 shadow-custom-shadow">
      {message}
    </div>
  );
}
