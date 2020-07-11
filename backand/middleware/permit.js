const permit = (...roles) => {   // rest operator - permit('admin', 'moderator', 'someone') -> roles = ['admin', 'moderator', 'someone']
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({message: 'Unauthenticated'});
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).send({message: 'Forbidden'})
        }

        next();
    }
};

module.exports = permit;