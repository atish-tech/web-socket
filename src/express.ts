import express, { response } from 'express'
import { WebSocket, WebSocketServer } from 'ws'

const app = express()
app.get('/' , (request:any , response:any) => {
  return response.status(200).json({message: "Socket api is connected"});
})

let httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(ws) {
  ws.on("error" , console.error);

  ws.on('message', function message(data, isBinary) {
    // ws.send(data , {binary: isBinary});   // data send to myself only    

    wss.clients.forEach((client) => {
      if(client.readyState === WebSocket.OPEN) {
        client.send(data , {binary: isBinary});
      }
    } )  
  });

  ws.send('Hello! Message From Express Server!!');
});