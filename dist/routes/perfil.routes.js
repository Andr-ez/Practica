"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const perfilRoutes = (0, express_1.Router)();
auth_routes_1.default.get("/perfil", auth_middleware_1.authMiddleware, (req, res) => {
    res.json({
        mensaje: "Accediste a un perfil protegido",
        user: req.user
    });
});
exports.default = auth_routes_1.default;
