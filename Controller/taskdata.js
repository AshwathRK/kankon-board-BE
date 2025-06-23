const Task = require('../Model/taskdata');

const getAllToDoTaskData = async (req, res, next) => {
    try {
        const projectId = req.params?.projectId;
        const todo = await Task.find({
            projectId: projectId,
            status: "todo"
        })

        if (!todo || todo.length === 0) {
            return res.status(404).json({
                message: "No data found"
            })
        }
        return res.status(200).json({
            message: "Data fetched successfully",
            todo
        })
    } catch (error) {
        console.error("Error fetching todos:", error);
        return res.status(500).json({
            message: "Something went wrong!",
        })
    }
}

const getAllinprogressTaskData = async (req, res, next) => {
    try {
        const projectId = req.params?.projectId;
        const inprogress = await Task.find({
            projectId: projectId,
            status: "inprogress"
        })

        if (!inprogress || inprogress.length === 0) {
            return res.status(404).json({
                message: "No data found"
            })
        }
        return res.status(200).json({
            message: "Data fetched successfully",
            inprogress
        })
    } catch (error) {
        console.error("Error fetching inprogress:", error);
        return res.status(500).json({
            message: "Something went wrong!",
        })
    }
}

const getAllDoneTaskData = async (req, res, next) => {
    try {
        const projectId = req.params?.projectId;
        const done = await Task.find({
            projectId: projectId,
            status: "done"
        })

        if (!done || done.length === 0) {
            return res.status(404).json({
                message: "No data found"
            })
        }
        return res.status(200).json({
            message: "Data fetched successfully",
            done
        })
    } catch (error) {
        console.error("Error fetching done:", error);
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
        const requiredFields = { title, description, userId, projectId, dueDate };
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

module.exports = {
    getAllToDoTaskData, getAllinprogressTaskData, getAllDoneTaskData, handleCreateTaskData
};