import app from "./app";
const PORT = process.env.PORT || 3000;
app.express.listen(PORT, () => {
  `⚡Server is running here 👉 https://localhost:${PORT}`;
});
