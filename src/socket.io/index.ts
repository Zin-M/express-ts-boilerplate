import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";

export default function setupSocketIO(server: HTTPServer): SocketIOServer {
    const io = new SocketIOServer(server, {
        cors: {
            // origin: `*`,
            origin: "http://122.248.213.148",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],

        },
    });

    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);
        socket.on("driver-current-location", (locationData: { latitude: number; longitude: number }) => {
            console.log("Received client location:", locationData);
            io.emit("ferry-location-update", locationData);
        });
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

    return io;
}
