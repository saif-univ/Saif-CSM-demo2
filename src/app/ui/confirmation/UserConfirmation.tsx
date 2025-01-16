import ReactDOM from "react-dom";

interface UserConfirmationProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const UserConfirmation: React.FC<UserConfirmationProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body // Render outside the main React tree
  );
};

export default UserConfirmation;
