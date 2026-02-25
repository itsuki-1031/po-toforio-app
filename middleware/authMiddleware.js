import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next ) => {
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:", authHeader);


    if (!authHeader) {
        return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN RECEIVED:", token)

    try {
        const decoded = jwt.verify(token, "secretkey");
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid token" });
    }
};