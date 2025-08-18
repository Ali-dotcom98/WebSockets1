
const express = require("express")
const app = express();
const { Server } = require("socket.io")
const { createServer } = require("http");
const PORT = 3000


const server = createServer(app);
const io = new Server(server, {
    cors: {
        credentials: true,
        origin: "http://localhost:5173",
    }
});
io.on("connection", (socket) => {
    console.log(socket.id, "Connected");

    io.emit("Welcome", "Welcome Every Body")
    socket.broadcast.emit("Welcome", `${socket.id} has Joined the Server`)
    socket.on("Message", ({ id, text }) => {
        io.emit("ReceiveMessage", { id, text });
    });


})


server.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);

})