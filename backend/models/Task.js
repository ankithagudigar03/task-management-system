const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        // Owner of the task
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        description: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: ["TODO", "IN PROGRESS", "COMPLETED"],
            default: "TODO"
        },

        priority: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH"],
            default: "MEDIUM"
        },

        assignedTo: {
            type: String,
            trim: true
        },

          dueDate: {
                type: Date
            },

                    tags: {
                type: [String],
                default: []
            },

    attachments: [
    {
        fileName: {
            type: String,
            required: true
        },
        fileUrl: {
            type: String,
            required: true
        },
        fileType: {
            type: String
        }
    }
]

        
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", taskSchema);