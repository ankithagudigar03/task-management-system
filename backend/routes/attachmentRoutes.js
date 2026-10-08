const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const authMiddleware = require("../middleware/authMiddleware");

const {
    uploadAttachment,
    deleteAttachment
} = require("../controllers/attachmentController");

router.post(
    "/task/:taskId",
    authMiddleware,
    upload.single("file"),
    uploadAttachment
);

// Delete attachment
router.delete(
    "/task/:taskId/:attachmentId",
    authMiddleware,
    deleteAttachment
);

module.exports = router;