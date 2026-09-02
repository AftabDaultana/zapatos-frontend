import {
  CheckCircle2,
  CircleAlert,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import Button from "./Button";

interface AlertModalProps {
  isOpen: boolean;
  type: "confirmation" | "success" | "error" | "info";
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onClose: () => void;
}

export default function AlertModal({
  isOpen,
  type,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
}: AlertModalProps) {
  if (!isOpen) return null;

  const iconConfig = {
    confirmation: {
      icon: TriangleAlert,
      container: "bg-red-100 text-red-600",
    },
    success: {
      icon: CheckCircle2,
      container: "bg-green-100 text-green-600",
    },
    error: {
      icon: CircleAlert,
      container: "bg-red-100 text-red-600",
    },
    info: {
      icon: Info,
      container: "bg-blue-100 text-blue-600",
    },
  };

  const { icon: Icon, container } = iconConfig[type];

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex min-h-screen items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-modal-title"
      aria-describedby="alert-modal-message"
    >
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${container}`}
            >
              <Icon size={22} aria-hidden="true" />
            </div>

            <h2
              id="alert-modal-title"
              className="text-xl font-semibold text-neutral-950"
            >
              {title}
            </h2>
          </div>

          <Button
            type="button"
            variant="none"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-neutral-500 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-950"
          >
            <X size={20} />
          </Button>
        </div>

        <p
          id="alert-modal-message"
          className="mt-5 text-sm leading-6 text-neutral-600"
        >
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          {type === "confirmation" ? (
            <>
              <Button
                type="button"
                variant="light"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-medium"
              >
                {cancelText}
              </Button>

              <Button
                type="button"
                variant="dark"
                onClick={onConfirm}
                className="bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
              >
                {confirmText}
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="dark"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium"
            >
              Close
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
