const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });
const uuidv4 = require('uuid').v4;
const clients = [];

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    const entity = JSON.parse(data.toString());
    const client = clients.find((client) => client.ws === ws);
    console.log(entity);
    if (entity.type === 'setNickname') {
      client.nickname = entity.nickname;
      return;
    }
    if (entity.type === 'delete') {
      clients.forEach(function each(_client) {
        if (client.ws !== _client.ws && _client.ws.readyState === WebSocket.OPEN) {
          _client.ws.send(
            JSON.stringify({
              type: 'delete',
              message: entity.message,
              nickname: client.nickname,
              id: client.id
            })
          );
        }
      });
      return;
    }
    if (entity.type === 'typing') {
      clients.forEach(function each(_client) {
        if (client.ws !== _client.ws && _client.ws.readyState === WebSocket.OPEN) {
          _client.ws.send(
            JSON.stringify({
              type: 'typing',
              message: ' éppen ír',
              nickname: client.nickname,
              id: client.id
            })
          );
        }
      });
      return;
    }
    if (entity.type === 'typingEnded') {
      clients.forEach(function each(_client) {
        if (client.ws !== _client.ws && _client.ws.readyState === WebSocket.OPEN) {
          _client.ws.send(
            JSON.stringify({
              type: 'typingEnded',
              message: '',
              nickname: client.nickname,
              id: client.id
            })
          );
        }
      });
      return;
    }
    if (entity.type === 'sendMessage') {
      clients.forEach(function each(_client) {
        if (client.ws !== _client.ws && _client.ws.readyState === WebSocket.OPEN) {
          _client.ws.send(
            JSON.stringify({
              type: 'newMessage',
              message: entity.message,
              nickname: client.nickname,
              id: client.id
            })
          );
        }
      });
      return;
    }

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });
  ws.on('close', function () {
    const foundIndex = clients.findIndex((client) => client.ws === ws);
    const client = clients[foundIndex];
    clients.splice(foundIndex, 1);
    wss.clients.forEach(function each(_client) {
      _client.send(JSON.stringify({ type: 'logout', id: client.id, nickname: client.nickname }));
    });
  });

  const id = uuidv4();
  clients.push({ id, ws });
  ws.send(
    JSON.stringify({
      type: 'generateID',
      id
    })
  );
});
