"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('LOGIN BODY:', req.body);
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }
    const user = await prisma_1.default.user.findUnique({
        where: { email },
        select: { id: true, email: true, password: true, role: true }
    });
    console.log('USER DB:', user);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const valid = await bcrypt_1.default.compare(password, user.password);
    console.log('COMPARE:', password, 'VS', user.password, '=>', valid);
    if (!valid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    console.log("JWT_SECRET usado en login:", JWT_SECRET);
    console.log("Token generado:", token);
    res.json({ token });
});
exports.default = router;
