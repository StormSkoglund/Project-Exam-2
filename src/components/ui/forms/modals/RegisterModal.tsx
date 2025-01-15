import React, { useEffect } from "react";
import useMyStore from "../../../../store";
import RegisterUser from "../../../../features/auth/registerUser";

const RegisterModal: React.FC = () => {
  const { openRegisterModal, handleCloseRegister } = useMyStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dialog = document.getElementById("modal-login-dialog");
      if (dialog && !dialog.contains(event.target as Node)) {
        handleCloseRegister();
      }
    };

    if (openRegisterModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openRegisterModal, handleCloseRegister]);

  return (
    <>
      {openRegisterModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            id="modal-register-dialog"
            className="bg-transparent bg-blend-saturation p-6 rounded-lg shadow-lg relative w-full"
          >
            <RegisterUser />
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterModal;
