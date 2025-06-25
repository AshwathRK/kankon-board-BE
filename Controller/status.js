const Status = require('../Model/status')
const Task = require('../Model/taskdata')

const handleGetStatus = async (req, res, next) => {
    try {
        const projectId = req.params?.projectId;
        const getStatus = await Status.find({
            projectId: projectId,
        })
        return res.status(200).json({
            message: "Status fetched successfully",
            getStatus: getStatus ? getStatus : []
        })
    } catch (error) {
        console.error("Error fetching statues:", error);
        return res.status(500).json({
            message: "Something went wrong!",
        })
    }
}

const handleCreateStatus = async (req, res, next) => {
    try {
        const {
            status,
            description,
            projectId,
        } = req.body;
        // Required field check
        const requiredFields = { status, projectId };
        for (const [key, value] of Object.entries(requiredFields)) {
            if (!value) {
                return res.status(400).json({
                    status: false,
                    message: `${key} is required.`,
                });
            }
        }

        const newStatus = await Status.create({
            status,
            description,
            projectId
        });
        // Respond with created task
        return res.status(201).json({
            status: true,
            message: "Status created successfully.",
            status: newStatus
        });
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({
            status: false,
            message: "An internal server error occurred.",
        })
    }
}

const handleUpdateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, description, projectId } = req.body;

        const updatedStatus = await Status.findByIdAndUpdate(id, {
            $set: {
                status,
                description,
                projectId,
            }
        }, { new: true });

        if (!updatedStatus) {
            return res.status(404).json({
                status: false,
                message: "Status not found.",
            });
        }

        // Respond with updated status
        return res.status(200).json({
            status: true,
            message: "Status updated successfully.",
            getStatus: updatedStatus
        });
    } catch (error) {
        console.error("Error updating status:", error);
        return res.status(500).json({
            status: false,
            message: "An internal server error occurred.",
        })
    }
}

const handleDeleteStatus = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Delete the status
        const deletedStatus = await Status.findByIdAndDelete(id);

        if (!deletedStatus) {
            return res.status(404).json({
                status: false,
                message: "Status not found.",
            });
        }

        // Respond with success message
        return res.status(200).json({
            status: true,
            message: "Status deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting status:", error);
        return res.status(500).json({
            status: false,
            message: "An internal server error occurred.",
        })
    }
}

module.exports = {
    handleGetStatus, handleCreateStatus, handleUpdateStatus, handleDeleteStatus
};