import { useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  ref?: React.Ref<ModalRef>;
};

export type ModalRef = {
  onOpen: () => void;
  onClose: () => void;
};

export default function Modal({ children, ref }: Props) {
  const [open, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
  }));

  if (!open) return null;

  return createPortal(
    <div className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-[#000000b3]">
      <div className="modal-content bg-surface-secondary max-h-[90vh] w-[90vw] max-w-[600px] overflow-auto rounded-2xl">
        {children}
      </div>
    </div>,
    document.body,
  );
}
