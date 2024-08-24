import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";

export default function setupSocketIO(server: HTTPServer): SocketIOServer {
    const io = new SocketIOServer(server, {
        cors: {
            origin: `*`,
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on("driver-current-location", (locationData:any) => {
            console.log("Received client location:", locationData);
            // You can process or save the location data here
        });


        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });

        socket.on("ferry-location-update", (data) => {
            console.log("Ferry location update:", data);
            io.emit("ferry-location-update", data);
        });
    });

    return io;
}