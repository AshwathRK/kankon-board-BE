const Task = require('../Model/taskdata');

const getAllTaskData = async (req, res, next) => {
    try {
        const projectId = req.params?.projectId;
        const allTasks = await Task.find({
            projectId: projectId,
        })

        if (!allTasks || allTasks.length === 0) {
            return res.status(404).json({
                message: "No data found"
            })
        }
        return res.status(200).json({
            message: "Data fetched successfully",
            allTasks
        })
    } catch (error) {
        console.error("Error fetching all the Tasks:", error);
        return res.status(500).json({
            message: "Something went wrong!",
        })
    }
}

const handleCreateTaskData = async (req, res, next) => {
    try {
        const {
            title,
            description,
            status = "todo",
            userId,
            projectId,
            dueDate,
            priority = "medium"
        } = req.body;

        // Required field check
        const requiredFields = { title, description, projectId, dueDate };
        for (const [key, value] of Object.entries(requiredFields)) {
            if (!value) {
                return res.status(400).json({
                    status: false,
                    message: `${key} is required.`,
                });
            }
        }

        // Create task
        const newTask = await Task.create({
            title,
            description,
            status,
            userId,
            projectId,
            dueDate,
            priority,
        });

        // Respond with created task
        return res.status(201).json({
            status: true,
            message: "Task created successfully.",
            task: newTask,
        });

    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({
            status: false,
            message: "An internal server error occurred.",
        });
    }
};

const handleUpdateTaskData = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const {
      title,
      description,
      status,
      userId,
      projectId,
      dueDate,
      priority
    } = req.body;

    // Find task by ID
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        status: false,
        message: "Task not found.",
      });
    }

    // Update task fields
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (userId) task.userId = userId;
    if (projectId) task.projectId = projectId;
    if (dueDate) task.dueDate = dueDate;
    if (priority) task.priority = priority;

    // Save updated task
    const updatedTask = await task.save();

    // Respond with updated task
    return res.status(200).json({
      status: true,
      message: "Task updated successfully.",
      task: updatedTask,
    });

  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({
      status: false,
      message: "An internal server error occurred.",
    });
  }
};

const handleDeleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    // Check if taskId is provided
    if (!taskId) {
      return res.status(400).json({
        status: false,
        message: "Task ID is required.",
      });
    }

    // Find and delete task
    const deletedTask = await Task.findByIdAndDelete(taskId);

    // Check if task exists
    if (!deletedTask) {
      return res.status(404).json({
        status: false,
        message: "Task not found.",
      });
    }

    // Respond with success message
    return res.status(200).json({
      status: true,
      message: "Task deleted successfully.",
    });

  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({
      status: false,
      message: "An internal server error occurred.",
    });
  }
};

module.exports = {
    getAllTaskData, handleCreateTaskData, handleUpdateTaskData, handleDeleteTask
};