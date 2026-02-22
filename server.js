import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

//APIサーバーを作るためのコード

const app = express();
//サーバー本体を作っている。
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});
app.use(cors());
//これがないと、フロントからAPIにアクセスできない。
app.use(express.json());//JSONを受け取れるようにしている
app.use("/api/auth", authRoutes);
// /api/auth から始まるURLは
//  authRoutes.js に任せるよ、という意味。


app.listen(3100, () => {
  console.log("Server started on port 3100");
});