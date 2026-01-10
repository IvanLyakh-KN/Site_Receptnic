import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { login, password } = req.body;
    try {
        const existingUser = await User.findOne({ login });
        if (existingUser) {
            return res.status(400).json({ msg: "Користувач з таким login вже існує" });
        }

        // Хешування пароля
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ login, password: hashedPassword });
        await newUser.save();

        // Створення та відправка JWT токена
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ token, user: { id: newUser._id, login: newUser.login } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Помилка сервера при реєстрації");
    }
});

router.post("/login", async (req, res) => {
    const { login, password } = req.body;
    try {
        const user = await User.findOne({ login });
        if (!user) {
            return res.status(400).json({ msg: "Невірні облікові дані" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Невірні облікові дані" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user._id, login: user.login } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Помилка сервера при вході");
    }
});

export default router;