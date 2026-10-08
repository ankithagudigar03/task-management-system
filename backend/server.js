require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const {
    checkTaskNotifications
} = require("./utils/notificationChecker");
const commentRoutes = require("./routes/commentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");
const attachmentRoutes = require("./routes/attachmentRoutes");



connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);//routes
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/attachments", attachmentRoutes);

//Error Handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Task Management API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    checkTaskNotifications();
});