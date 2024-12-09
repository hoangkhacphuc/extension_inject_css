const chokidar = require("chokidar");
const WebSocket = require("ws");
const express = require('express');
const cors = require('cors');

const PORT = 3000;
const PORT_WS = 24021;
const CSS_FOLDER = "./assets/build";
const MAIN_CSS = "./assets/build/module.css";
const app = express();

app.use(cors());
// Cung cấp quyền truy cập tĩnh cho folder build
app.use('/assets/build', express.static(CSS_FOLDER));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

var pathWeb = `http://localhost:${PORT}/`;

// Khởi tạo server WebSocket
const wss = new WebSocket.Server({ port: PORT_WS }, () => {
    console.log(`WebSocket server is running on ws://localhost:${PORT_WS}`);
});

// Theo dõi thay đổi file CSS
const watcher = chokidar.watch(CSS_FOLDER, { ignoreInitial: true });

// Lắng nghe khi client kết nối
wss.on("connection", (ws) => {
    console.log("A client connected");
    // Gửi đi file main CSS khi client kết nối
    ws.send(pathWeb+MAIN_CSS);
    
    // Gửi thông điệp khi file CSS thay đổi
    watcher.on("change", (filePath) => {
        console.log(`File changed: ${filePath}`);
        ws.send(pathWeb+filePath);
    });
});

// Bắt lỗi
watcher.on("error", (error) => {
    console.error(`Watcher error: ${error}`);
});
