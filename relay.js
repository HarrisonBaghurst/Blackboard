const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8080 });

const cts = []
const bds = []
wss.on("connection", (ws) => {  // add the client to the list of clients and boards
  cts.push(ws);  // push client to list
  bds.push(null)  // push null, to be updated when client sends requested board
  console.log("[network] CLIENT CONNECTED, ID", cts.length - 1);

  ws.on("close", () => {
    const idx = cts.indexOf(ws);
    if (idx !== -1) {  // remove the client from the lists if it disconnects
      cts.splice(idx, 1)
      bds.splice(idx, 1)
    }
    console.log("[network] DISCONNECTED, removed client at index", idx);
  });

  ws.on("message", (msg) => {
    const text = JSON.parse(msg.toString())  // convert message to json
    console.log("[traffic] RECIEVED:", text);
    
    if (text["type"] == "connect") {  // use the connect message to assign the client to a board
      bds[-1] = text["board"]
      console.log(`[boards] BOARD ${text["board"]} ADDED TO CLIENT ID ${cts.length-1}`)
    }

    current_board = text["board"]
    wss.clients.forEach(client => {
      if (client.readyState === 1 && bds[cts.indexOf(client)] == current_board) {  // if the client is ready and they have access to the board
        client.send(msg);  // fwd the message
      };
    });
  });
});

console.log("[network] LIVE ON ws://localhost:8080");
