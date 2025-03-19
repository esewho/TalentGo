const server = require("./src/server");
const { conn } = require("./src/common/config/db");
const PORT = process.env.PORT || 3001;

conn
  .sync({ force: true }) // Sincronizamos los modelos con la base de datos
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
