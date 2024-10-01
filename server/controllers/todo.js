const prisma = require("../config/prisma");

exports.create = async (req, res) => {
  try {
    const { title, status } = req.body;
    console.log("Title:", title, "Status:", status);

    // Convert status to boolean if necessary
    const statusBoolean = status === "true" || status === true;

    const newTodo = await prisma.todo.create({
      data: {
        title: title,
        status: statusBoolean, // Ensure status is a boolean
      },
    });

    res.json({
      data: newTodo,
    });
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(500).json({
      success: false,
      message: "Error creating todo",
      error: error.message, // Send error message to the response
    });
  }
};

exports.list = async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json({
    todos,
  });
};
exports.update = async (req, res) => {
  try {
    const { title, status } = req.body;
    const { todosId } = req.params;
    
    // Debugging logs to check parameters
    console.log("Updating Todo ID:", todosId);
    console.log("New Title:", title, "New Status:", status);

    // Convert status to boolean if necessary
    const statusBoolean = status === "true" || status === true;

    // Update the todo item
    const updated = await prisma.todo.update({
      where: {
        id: Number(todosId), // Ensure todosId is a number
      },
      data: {
        title: title,
        status: statusBoolean, // Ensure status is boolean
      },
    });

    res.json({
      updated,
    });
  } catch (error) {
    console.error("Error updating todo:", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating todo",
      error: error.message, // Send error message to the response
    });
  }
};
exports.remove = async (req, res) => {
  try {
    const { todosId } = req.params; // Get the ID from the URL params

    // Debugging log to confirm todosId is received correctly
    console.log("Deleting Todo ID:", todosId);

    // Attempt to delete the todo item
    const deleted = await prisma.todo.delete({
      where: {
        id: Number(todosId), // Ensure the ID is a number
      },
    });

    // If deletion is successful, return a response
    res.json({
      success: true,
      message: "Todo deleted successfully",
      data: deleted,
    });
  } catch (error) {
    // If there is an error, log it and send an error response
    console.error("Error deleting todo:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting todo",
      error: error.message,
    });
  }
};

