"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
app.get('/', (request, response) => {
    return response.status(200).json({ message: "Socket api is connected" });
});
let httpServer = app.listen(8080, () => console.log("server running on port 800"));
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on('connection', function connection(ws) {
    ws.on("error", console.error);
    ws.on('message', function message(data, isBinary) {
        // ws.send(data , {binary: isBinary});   // data send to myself only    
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    ws.send('Hello! Message From socket Server!!');
});
// import WebSocket, { WebSocketServer } from 'ws';
// import http from 'http';
// const server = http.createServer(function(request: any, response: any) {
//     console.log((new Date()) + ' Received request for ' + request.url);
//     response.end("hi there");
// });
// const wss = new WebSocketServer({ server });
// wss.on('connection', function connection(ws) {
//   ws.on('error', console.error);
//   ws.on('message', function message(data, isBinary) {
//     wss.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         console.log(data);
//         client.send(data, { binary: isBinary });
//       }
//     });
//   });
//   console.log("user connected");
//   ws.send('Hello! Message From Server!!');
// });
// server.listen(8080, function() {
//     console.log((new Date()) + ' Server is listening on port 8080');
// });
