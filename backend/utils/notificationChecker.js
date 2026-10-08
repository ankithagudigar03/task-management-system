const Task = require("../models/Task");
const Notification = require("../models/Notification");

const checkTaskNotifications = async () => {
    try {
        const tasks = await Task.find({
            dueDate: { $exists: true, $ne: null }
        });

        const now = new Date();

        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);

        const startOfTomorrow = new Date(startOfToday);
        startOfTomorrow.setDate(
            startOfTomorrow.getDate() + 1
        );

        for (const task of tasks) {
            if (!task.user) continue;

            const dueDate = new Date(task.dueDate);

            let type;
            let message;

            // Due today
            if (
                dueDate >= startOfToday &&
                dueDate < startOfTomorrow &&
                task.status !== "COMPLETED"
            ) {
                type = "DUE_TODAY";
                message = `Task "${task.title}" is due today`;
            }

            // Overdue
            else if (
                dueDate < startOfToday &&
                task.status !== "COMPLETED"
            ) {
                type = "OVERDUE";
                message = `Task "${task.title}" is overdue`;
            }

            if (!type) continue;

            // Prevent duplicate notifications
            const existingNotification =
                await Notification.findOne({
                    user: task.user,
                    task: task._id,
                    type
                });

            if (!existingNotification) {
                await Notification.create({
                    user: task.user,
                    task: task._id,
                    type,
                    message
                });
            }
        }

        console.log("🔔 Task notifications checked");

    } catch (error) {
        console.error(
            "Notification checker error:",
            error.message
        );
    }
};

module.exports = {
    checkTaskNotifications
};