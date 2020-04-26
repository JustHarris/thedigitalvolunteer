import bcryptService from './bcrypt.service';

const secret = process.env.NODE_ENV === 'production' ? 'averylongsecret12323277242349021823129301239213823djksfjfkdsfjsdfsdf' : 'secret';

const authService = (id) => {
  const token = `${Math.floor(Date.now() / 1000)}${secret}${id}`;
  return bcryptService().hash(token);
};

export default authService;
