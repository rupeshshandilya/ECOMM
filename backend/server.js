const app = require("./app");
const connectDatabase = require("./db/Database");

/* ============================== HANDLING UNCAUGHT EXCEPTIONS ============================= */
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server for handling uncaught error");
});

/* ============================== CONFIG ============================= */
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

/* ============================== CONNECTING DATABASE ============================= */
connectDatabase();



/* ============================== SERVER ============================= */

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is runing on http://localhost:${process.env.PORT}`
  );
});

/* ============================== UNHANDLE PROMISE REJECTION ============================= */

process.on("unhandledRejection", (err) => {
  console.log(`Shutting down server for ${err.message}`);
  console.log("Shutting down server for unhandle promise rejection");

  /* ============================== CLOSING SERVER ============================= */
  server.close(()=>{
    process.exit(1);
  });
});
