const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(
            token,
            "VMvpi62eztD2fzfw2Wu6mtHeDIsijaoQuuGa2JPv6CRjXL3HXpJLcMOpeEQ68Mt",
        );
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw new Error("Invalid user ID");
        } else {
            req.userId = userId;
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
};
