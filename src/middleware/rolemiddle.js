const isArtist = async (req, res, next) => {
    // ✅ safety check
    console.log("HEADERS:", req.headers.authorization);
    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized - user not found in request"
        });
    }

    if (req.user.role !== "artist") {
        return res.status(403).json({ message: "Only artists allowed" });
    }

    next();
};

export default isArtist;