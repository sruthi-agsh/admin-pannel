const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Add CORS
server.use(cors({
  origin: "https://admin-pannel-sigma-three.vercel.app",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});