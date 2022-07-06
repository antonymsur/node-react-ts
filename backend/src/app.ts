import createServer from "./server";
import { database } from "./app/models";
const PORT = process.env.PORT || 8080;

console.log("db is ",database);
database.mongoose
  .connect(database.url, {
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err: any) => {
    console.log(`Cannot connect to the database! ${err}`);
    process.exit();
  });
createServer()
  .then((server) => {
    server.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

