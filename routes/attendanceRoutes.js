import express from 'express';
import { verifyToken } from "../middleware/authMiddleware.js";



const router = express.Router();

//仮のDB
let attendance = [];

//出勤
router.post('/check-in', verifyToken, (req, res) => {
    const today = new Date().toISOString().split("T")[0];
    //.split("T")例"2026-02-22T15:34:12.123Z" Tで分割して、[0]を取ると2026-02-22になる
    //今の日付を YYYY-MM-DD に変換してる

    //すでに出勤しているかの確認
    const exisiting = attendance.find(
        record => record.email === req.user.email && record.data === today
    );

    if (exisiting) {
        return res.status(400).json({ message: "Already checked in" })
    }

    attendance.push({
        email: req.user.email,
        data: today,
        checkIn: new Date(),
        checkOut: null
    });

    res.json({ message: "Checked in" });
});

//退勤
router.post('/check-out', verifyToken, (req, res) => {
    const today = new Date().toISOString().split("T")[0];

    const record = attendance.find(
        record => record.email === req.user.email && record.data == today
    );

    if (!record) {
        return res.status(400).json({ message: "Already checked out" });
    }

    if(record.checkOut) {
        return res.status(400).json({ message:  "Already checked out" });
    }

    record.checkOut = new Date();
    res.json({ message: "Checked out" });
});

//一覧取得
router.get('/records', verifyToken, (req, res) => {
    const userRecords = attendance.filter(record => record.email === req.user.email);
    res.json(userRecords);
});

export default router;