import { useEffect } from "react";
import useMyStore from "../../../../store";
import UpdateVenue from "../../../profiles/UpdateVenue";
import { Venue } from "../../../../utils/interfaces";

interface UpdateVenueModalProps {
  venue: Venue;
  onClose: () => void;
}

const UpdateVenueModal: React.FC<UpdateVenueModalProps> = ({
  venue,
  onClose,
}) => {
  const { openUpdateVenueModal, handleCloseUpdateVenue } = useMyStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dialog = document.getElementById("modal-update-venue-dialog");
      if (dialog && !dialog.contains(event.target as Node)) {
        handleCloseUpdateVenue();
      }
    };

    if (openUpdateVenueModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openUpdateVenueModal, handleCloseUpdateVenue]);

  return (
    <>
      {openUpdateVenueModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            id="modal-update-venue-dialog"
            className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md overflow-y-auto h-4/5 mt-40"
          >
            <UpdateVenue venue={venue} onClose={onClose} />
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateVenueModal;
