import { useEffect } from "react";
import useMyStore from "../../../../store";
import LoginUser from "../../../../features/auth/LoginUser";

const LoginModal: React.FC = () => {
  const { openLoginModal, handleCloseLogin } = useMyStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dialog = document.getElementById("modal-login-dialog");
      if (dialog && !dialog.contains(event.target as Node)) {
        handleCloseLogin();
      }
    };

    if (openLoginModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openLoginModal, handleCloseLogin]);

  return (
    <>
      {openLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            id="modal-register-dialog"
            className="bg-transparent bg-blend-saturation p-6 rounded-lg shadow-lg relative w-full"
          >
            <LoginUser />
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
