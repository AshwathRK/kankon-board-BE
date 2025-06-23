const Projects = require('../Model/Project');

const handleGetAllProjectsbyuser = async (req, res, next) => {
    try {

        const userID = req.params?.userID;
        const projects = await Projects.find({
            userID
        });

        return res.status(200).json({
            message: "Projects are fetched successfully",
            projects: projects?projects:{}
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return res.status(500).json({
            message: "An internal server error occurred while fetching projects."
        });
    }
}

const handleCreateProject = async (req, res, next) => {
    try {
        const {
            title,
            description,
            userID
        } = req.body;

        // Required field check
        const requiredFields = { title, description, userID };
        for (const [key, value] of Object.entries(requiredFields)) {
            if (!value) {
                return res.status(400).json({
                    status: false,
                    message: `${key} is required.`,
                });
            }
        }

        // Create task
        const newProject = await Projects.create({
            title,
            description,
            userID
        });

        // Respond with created task
        return res.status(201).json({
            status: true,
            message: "Project created successfully.",
            task: newProject,
        });

    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({
            status: false,
            message: "An internal server error occurred.",
        });
    }
}

const handleUpdateProject = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        const {
            title,
            description
        } = req.body;

        // Check if project exists
        const existingProject = await Projects.findById(id);
        if (!existingProject) {
            return res.status(404).json({
                status: false,
                message: "Project not found.",
            });
        }

        // Required field check (optional, adjust according to your needs)
        if (title || description) {
            const updatedFields = { title, description };
            for (const [key, value] of Object.entries(updatedFields)) {
                if (value && typeof value !== 'string') {
                    return res.status(400).json({
                        status: false,
                        message: `${key} must be a string.`,
                    });
                }
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "At least one field (title or description) is required for update.",
            });
        }

        // Update project
        const updatedProject = await Projects.findByIdAndUpdate(id, {
            $set: {
                title: title || existingProject.title,
                description: description || existingProject.description,
            }
        }, { new: true });

        // Respond with updated project
        return res.status(200).json({
            status: true,
            message: "Project updated successfully.",
            task: updatedProject,
        });

    } catch (error) {
        console.error("Error updating project:", error);
        return res.status(500).json({
            status: false,
            message: "An internal server error occurred.",
        });
    }
}

const handleDeleteProject = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        // Check if project exists
        const existingProject = await Projects.findById(id);
        if (!existingProject) {
            return res.status(404).json({
                status: false,
                message: "Project not found.",
            });
        }

        // Delete project
        await Projects.findByIdAndDelete(id);

        // Respond with success message
        return res.status(200).json({
            status: true,
            message: "Project deleted successfully.",
        });

    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).json({
            status: false,
            message: "An internal server error occurred.",
        });
    }
}

module.exports = {
    handleGetAllProjectsbyuser, handleCreateProject, handleUpdateProject, handleDeleteProject
};