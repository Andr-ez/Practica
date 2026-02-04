"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.authMiddleware, (0, role_middleware_1.authorizeRole)(["ADMIN"]), async (req, res) => {
    const users = await prisma_1.default.user.findMany();
    res.json(users);
});
router.post('/', auth_middleware_1.authMiddleware, (0, role_middleware_1.authorizeRole)(["ADMIN"]), async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    const hashed = await bcrypt_1.default.hash(password, 10);
    //temporal mientras depuramos
    console.log('PLAIN:', password);
    console.log('HASHED:', hashed);
    const user = await prisma_1.default.user.create({
        data: {
            name,
            email,
            password: hashed,
            role: role || "USER",
        },
    });
    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        message: "Usuario creado correctamente",
    });
});
exports.default = router;
