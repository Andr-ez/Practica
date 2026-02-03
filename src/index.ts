

import express from "express";
import usuariosRoutes from "./routes/usuarios.routes";
import authRoutes from "./routes/auth.routes";
import routes from "./routes";
import 'dotenv/config';


const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ mensaje: "API funcionando 🚀" });
});


app.use(routes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto', PORT);
});


