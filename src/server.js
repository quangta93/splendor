const { Server, Origins } = require('boardgame.io/server');
const { Splendor } = require('./Game');

const server = Server({
  games: [Splendor],
  origins: [Origins.LOCALHOST],
});

server.run(8000);