
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            default: null,
        },
        taskTitle: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            enum: ["CREATED", "UPDATED", "COMPLETED", "DELETED"],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
