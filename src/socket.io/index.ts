import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";

export default function setupSocketIO(server: HTTPServer): SocketIOServer {
    const io = new SocketIOServer(server, {
        cors: {
            origin: `*`,
            // origin: "http://13.229.240.4",
            methods: ["GET", "POST"]
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

    io.of('/admin').on("connection", (socket) => {
        const userId = socket.handshake.auth.user_id;
        console.log(`New admin connected:`,socket.handshake.auth);

        socket.on("admin-ferry-location-update", (actionData) => {

        });

        socket.on("disconnect", () => {
            // console.log(`Admin disconnected: ${socket.id}`);
        });
    });


    return io;
}
