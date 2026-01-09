import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "Немає токена, авторизація заборонена" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Додавання ID користувача до об'єкта запиту
        req.userId = decoded.id;
        next();
    } catch (e) {
        res.status(401).json({ msg: "Токен недійсний" });
    }
};

export default auth;