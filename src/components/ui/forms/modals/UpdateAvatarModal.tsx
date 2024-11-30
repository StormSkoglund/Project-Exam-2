import { useEffect } from "react";
import useMyStore from "../../../../store";
import UpdateAvatar from "../../../profiles/UpdateAvatar";

const UpdateAvatarModal: React.FC = () => {
  const { openUpdateAvatarModal, handleCloseUpdateAvatar } = useMyStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dialog = document.getElementById("modal-update-avatar-dialog");
      if (dialog && !dialog.contains(event.target as Node)) {
        handleCloseUpdateAvatar();
      }
    };

    if (openUpdateAvatarModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openUpdateAvatarModal, handleCloseUpdateAvatar]);

  return (
    <>
      {openUpdateAvatarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            id="modal-update-avatar-dialog"
            className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md overflow-y-auto h-4/5 mt-40"
          >
            <UpdateAvatar />
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateAvatarModal;
