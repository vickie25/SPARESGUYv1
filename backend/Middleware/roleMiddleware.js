
// Middleware to check if user is admin


export const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();  // User is admin, allow access
    } else {
        res.status(403).json({ message: "Access denied. Admins only." });
    }
};

export default requireAdmin;