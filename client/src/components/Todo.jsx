import { useEffect, useState } from "react";
import List from "./List";
import { AlertCircle, ClipboardPlus } from "lucide-react"; // Import an icon from Lucide
import { getData, createData } from "../api/Todo";

const Todo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Optional loading state
  const [title, setTitle] = useState("");

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    try {
      const res = await getData(); // Await the response from getData
      console.log(res.data.todos);
      setData(res.data.todos); // Set the data state with todos
    } catch (err) {
      console.log("Error fetching data:", err);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddData = () => {
    createData({ title })
      .then((res) => {
        console.log(res);
        handleGetData(); // Refresh the todo list
        setTitle(""); // Clear the input field
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="mb-4 flex items-center justify-center gap-2"> {/* Added margin-bottom to the input */}
          <input
            type="text"
            value={title} // Set the input value to the state
            placeholder="Type here"
            className="input w-full max-w-full"
            onChange={handleChange}
          />
          <button
            className="btn btn-ghost hover:bg-[#606c38] text-brandNewHighlightContrast bg-brandHighlightContrast"
            onClick={handleAddData}
          >
            <ClipboardPlus />
          </button>
        </div>
        {loading ? (
          <div className="alert bg-brandAccent shadow-lg flex items-center justify-center">
            <span className="loading loading-bars loading-lg text-brandSecondary"></span>
          </div>
        ) : (
          <>
            {data.length > 0 ? (
              <div className="flex flex-wrap gap-4 justify-center"> {/* Flex layout with gap */}
                {data.map((todo, index) => (
                  <div key={index} className="card w-96 border bg-brandSecondary">
                    <List todo={todo} handleGetData={handleGetData} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert bg-brandAccent shadow-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 mr-2" />
                <span className="text-lg text-brandNewHighlightContrast">
                  No todos available.
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Todo;
