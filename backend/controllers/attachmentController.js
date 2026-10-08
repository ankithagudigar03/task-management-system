const cloudinary = require("../config/cloudinary");
const Task = require("../models/Task");

const uploadAttachment = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.taskId,
            user: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
                folder: "task-management"
            },
            async (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);

                    return res.status(500).json({
                        message: error.message
                    });
                }

                task.attachments.push({
                    fileName: req.file.originalname,
                    fileUrl: result.secure_url,
                    fileType: req.file.mimetype
                });

                try {
                    await task.save();
                } catch (saveError) {
                    console.error("Task save error:", saveError);

                    return res.status(500).json({
                        message: saveError.message
                    });
                }

                res.status(201).json({
                    message: "File uploaded successfully",
                    attachment:
                        task.attachments[
                            task.attachments.length - 1
                        ]
                });
            }
        );

        uploadStream.end(req.file.buffer);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// 👇 SEPARATE FUNCTION
const deleteAttachment = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.taskId,
            user: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const attachment = task.attachments.id(
            req.params.attachmentId
        );

        if (!attachment) {
            return res.status(404).json({
                message: "Attachment not found"
            });
        }

        // Remove attachment from MongoDB
        attachment.deleteOne();

        await task.save();

        res.status(200).json({
            message: "Attachment deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    uploadAttachment,
    deleteAttachment
};