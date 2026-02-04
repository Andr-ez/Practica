"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = authorizeRole;
function authorizeRole(roles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ mensaje: "No autenticado" });
        }
        console.log("Rol recibido en middleware:", user.role);
        console.log("Roles permitidos:", roles);
        const roleNormalized = user.role?.trim().toUpperCase();
        if (!roleNormalized || !roles.includes(roleNormalized)) {
            return res.status(403).json({ mensaje: "Acceso denegado" });
        }
        next();
    };
}
