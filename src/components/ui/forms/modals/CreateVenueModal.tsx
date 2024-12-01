import { useEffect } from "react";
import useMyStore from "../../../../store";
import CreateVenue from "../../../profiles/CreateVenue";

const CreateVenueModal: React.FC = () => {
  const { openCreateVenueModal, handleCloseCreateVenue } = useMyStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dialog = document.getElementById("modal-create-venue-dialog");
      if (dialog && !dialog.contains(event.target as Node)) {
        handleCloseCreateVenue();
      }
    };

    if (openCreateVenueModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openCreateVenueModal, handleCloseCreateVenue]);

  return (
    <>
      {openCreateVenueModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            id="modal-create-venue-dialog"
            className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md overflow-y-auto h-4/5 mt-40"
          >
            <CreateVenue />
          </div>
        </div>
      )}
    </>
  );
};

export default CreateVenueModal;
