import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    token = token.substring(7);

    let decodedToken;

    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).send({
        success: false,
        message: 'Failed to authenticate',
      });
    }

    if (decodedToken) {
      req.user = decodedToken;

      next();
    } else if (!decodedToken) {
      return res.status(401).send({
        success: false,
        message: 'Failed to authenticate',
      });
    }
  } else if (!token) {
    return res.status(403).send({
      success: false,
      message: 'No token provided',
    });
  }

  return null;
};
