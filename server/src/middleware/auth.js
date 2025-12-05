import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    // 1. Отримання токена із заголовка 'x-auth-token'
    const token = req.header("x-auth-token");

    // 2. Перевірка наявності токена
    if (!token) {
        return res.status(401).json({ msg: "Немає токена, авторизація заборонена" });
    }

    try {
        // 3. Перевірка токена
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Додавання ID користувача до об'єкта запиту
        req.userId = decoded.id;
        next();
    } catch (e) {
        res.status(401).json({ msg: "Токен недійсний" });
    }
};

export default auth;