import { ClipboardPenLine, ClipboardX, ClipboardCheck } from "lucide-react"; // Import Check icon for saving
import PropTypes from "prop-types";
import { removeData, updateData } from "../api/Todo";
import { useState } from "react";

const List = ({ todo, handleGetData }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title); // State for edit input
  const [showToast, setShowToast] = useState(false); // State to manage toast visibility

  const handleDelete = async (id) => {
    removeData(id)
      .then((res) => {
        console.log(res);
        handleGetData(); // Re-fetch the data after deletion
        setShowToast(true); // Show toast on successful deletion
        setTimeout(() => setShowToast(false), 3000); // Hide the toast after 3 seconds
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = () => {
    setIsEdit(!isEdit); // Toggle edit mode
  };

  const handleSaveEdit = (id) => {
    updateData(id, { title: editTitle })
      .then((res) => {
        console.log("Updated:", res);
        setIsEdit(false); // Exit edit mode after saving
        handleGetData(); // Refresh the list after updating
      })
      .catch((err) => {
        console.log("Error updating:", err);
      });
  };

  return (
    <div className="card w-96">
      <div className="card-body">
        {isEdit ? (
          <>
            {/* Edit input area */}
            <input
              type="text"
              className="input w-full max-w-xs mb-2"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)} // Update edit title
              placeholder="Edit title"
            />
            <button
              className="btn btn-active bg-[#606c38] text-white hover:bg-green-600 w-full"
              onClick={() => handleSaveEdit(todo.id)} // Save the edited title and pass the id
            >
              <ClipboardCheck className="mr-2" />
              Save
            </button>
          </>
        ) : (
          <h2 className="text-center">{todo.title}</h2>
        )}

        <div className="card-actions justify-end">
          <button
            className="btn btn-active bg-brandAccent text-brandHighlightContrast hover:bg-brandNewHighlight"
            onClick={() => handleDelete(todo.id)}
          >
            <ClipboardX />
          </button>
          <button
            className="btn btn-active bg-brandNewHighlight text-brandNewHighlightContrast hover:bg-brandPrimary"
            onClick={handleEdit}
          >
            <ClipboardPenLine />
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-end">
          <div className="alert bg-red-500 text-white shadow-lg">
            <span>Todo deleted successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

// PropTypes validation
List.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // id can be string or number
    title: PropTypes.string.isRequired, // title is required
  }).isRequired,
  handleGetData: PropTypes.func.isRequired, // handleGetData is a required function
};

export default List;
