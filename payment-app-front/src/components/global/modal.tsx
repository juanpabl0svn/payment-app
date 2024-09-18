export const handleCloseModal = (closeModal: () => void) => {
  const modal = document.getElementById("modal");

  if (!modal) return;

  modal.classList.add("close-modal");

  setTimeout(() => {
    closeModal();
  }, 200);
};

const Modal = ({
  isOpen,
  closeModal,
  className,
  children,
}: {
  isOpen: boolean;
  closeModal: () => void;
  className?: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <aside
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center`}
      onClick={() => handleCloseModal(closeModal)}
    >
      <section
        id="modal"
        className={`${className ? className : ""} modal`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </section>
    </aside>
  );
};

export default Modal;
