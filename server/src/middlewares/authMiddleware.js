import jwt from 'jsonwebtoken';

/*
This middleware is for protecting an endpoint. It ensured that
the endpoint can only be accessed if a valid token is assigned
in the http header.
*/

export default (req, res, next) => {
  // get token from the http header
  let token = req.headers.authorization;

  if (token) {
    // strips the Bearer keyword from the token
    token = token.substring(7);

    let decodedToken;

    // attemps to verify the token with the secret key
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      // if it can't verify, an error response is sent
      return res.status(401).send({
        success: false,
        message: 'Failed to authenticate',
      });
    }

    if (decodedToken) {
      // attach the decoded token which has the user id in it is attatched to the request
      req.user = decodedToken;

      next();
    } else if (!decodedToken) {
      // if there is no user id in the decoded token, an error response is sent
      return res.status(401).send({
        success: false,
        message: 'Failed to authenticate',
      });
    }
  } else if (!token) {
    // if a token wasn't provided an error response is sent
    return res.status(403).send({
      success: false,
      message: 'No token provided',
    });
  }

  return null;
};
