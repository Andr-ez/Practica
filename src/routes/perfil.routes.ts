import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import router from "./auth.routes";


const perfilRoutes = Router();

router.get("/perfil", authMiddleware, (req, res) => {

    res.json({
        mensaje: "Accediste a un perfil protegido", 
        user: (req as any).user
    });
});

export default router; 