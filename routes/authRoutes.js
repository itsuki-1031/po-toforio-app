import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

let users = [
    {
        // email: "test@test.gmail.com",
        email: "abc@test.gmail.com",
        password: await bcrypt.hash("123456", 10)
    }
];//仮のDB 実務ではここが: •MongoDB •PostgreSQL •Prismaのどれかになる
console.log("CURRENT USERS:", users);

router.post('/register', async (req, res) => {
    try {
        const { email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing fields" }); 
        }

        // すでに登録されているか確認
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // パスワードをハッシュ化
        const hashedPassword = await bcrypt.hash(password, 10);

        users.push({
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "User registered" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = users.find(user => user.email === email);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if  (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { email: user.email },
            "secretkey",
            { expiresIn: "1h"}
        );
        
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/me', verifyToken, (req, res) => {
    res.json({
        message: "User data",
        user: req.user
    })
});

router.post('/logout', (req, res) => {
    res.json({ message: "Logged out" });
});

export default router;