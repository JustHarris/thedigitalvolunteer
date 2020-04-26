import User from '../models/User';

export default async (req, res, next) => {
  // usually: "X-Auth-Token: [token]"
  let tokenToVerify;
  if (req.header('X-Auth-Token')) {
    tokenToVerify = req.header('X-Auth-Token');
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.query.token;
  } else {
    return res.status(401).json({ msg: 'No X-Auth-Token was found' });
  }

  const user = await User.findOne({
    where: { token: tokenToVerify },
  });
  if (!user) {
    return res.status(401).json({ msg: 'Auth failed' });
  }
  req.authUser = user;
  return next();
};
