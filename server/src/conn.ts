import { create } from "domain";
import "reflect-metadata";
import { createConnection } from "typeorm";

const conn = createConnection();

conn
  .then(() => {
    console.log("Connected to database.");
  })
  .catch(() => {
    console.error("Error in database connection.");
  });

export default conn;
