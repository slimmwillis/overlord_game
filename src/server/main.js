const { app, server, port } = require(".");

server.listen(port, async () => {
  await databaseManager.connectDatabase();

  app.post("/login", (req, res) => {
    accountManager.handleLogin(req, res);
  });

  setInterval(function () {
    world.updatePlayersPosition();
  }, 1000 / 15);

  // dead reckoning
  console.log("server is ready on port " + port);
});
