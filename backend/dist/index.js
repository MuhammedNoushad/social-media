"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const connectToMongoDB_1 = __importDefault(require("./db/connectToMongoDB"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const connection_routes_1 = __importDefault(require("./routes/connection.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const socket_1 = require("./socket/socket");
const story_routes_1 = __importDefault(require("./routes/story.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const ad_routes_1 = __importDefault(require("./routes/ad.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const clientURL = process.env.CLIENT_URL || "http://localhost:5173";
const corsOptions = {
    origin: clientURL,
    credentials: true,
};
socket_1.app.use((0, cookie_parser_1.default)());
socket_1.app.use((0, cors_1.default)(corsOptions));
socket_1.app.use(express_1.default.json());
socket_1.app.use(express_1.default.urlencoded({ extended: true }));
socket_1.app.use("/api/auth", auth_routes_1.default);
socket_1.app.use("/api/user", user_routes_1.default);
socket_1.app.use("/api/user/notification", notification_routes_1.default);
socket_1.app.use("/api/admin", admin_routes_1.default);
socket_1.app.use("/api/ad", ad_routes_1.default);
socket_1.app.use("/api/posts", post_routes_1.default);
socket_1.app.use("/api/connection", connection_routes_1.default);
socket_1.app.use("/api/messages", message_routes_1.default);
socket_1.app.use("/api/story", story_routes_1.default);
socket_1.app.use("/api/payment", order_routes_1.default);
// Connect to MongoDB and start the server
(0, connectToMongoDB_1.default)()
    .then(() => {
    socket_1.server.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
});
