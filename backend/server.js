require("dotenv").config();

const express = require("express");
const rateLimit = require("express-rate-limit");
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
const activityRoutes = require("./routes/activityRoutes");




const app = express();
// API Rate Limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Maximum 100 requests per window
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        message: "Too many requests. Please try again later."
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", apiLimiter);
app.use("/api/tasks", taskRoutes);//routes
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/attachments", attachmentRoutes);
app.use("/api/activities", activityRoutes);


 // Test route
app.get("/", (req, res) => {
    res.json({
        message: "Task Management API is running"
    });
});

// Error Handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);


const PORT = process.env.PORT || 5000;

if (require.main === module) {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            checkTaskNotifications();
        });
    });
}

module.exports = app;
