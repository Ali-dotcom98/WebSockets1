const express = require("express");
const app = express();
const { Server } = require("socket.io");
const { createServer } = require("http");
const PORT = 3000;

let Users = []; // use let if you want to reassign OR use const and mutate

const server = createServer(app);
const io = new Server(server, {
    cors: {
        credentials: true,
        origin: "http://localhost:5173",
    },
});

io.on("connection", (socket) => {
    console.log(socket.id, "Connected");

    Users.push(socket.id);

    socket.emit("Welcome", "Welcome Everybody");
    socket.broadcast.emit("Welcome", `${socket.id} has Joined the Server`);

    io.emit("Users", Users);


    socket.on("Message", ({ id, text }) => {
        io.emit("ReceiveMessage", { id, text });
    });

    socket.on("disconnect", () => {
        console.log(socket.id, "Disconnected");
        Users = Users.filter((userId) => userId !== socket.id);
        io.emit("UserCount", Users.length);
        socket.broadcast.emit("Welcome", `${socket.id} has Left the Server`);
    });
});

server.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
