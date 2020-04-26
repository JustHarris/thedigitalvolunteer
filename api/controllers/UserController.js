import User from '../models/User';
import authService from '../services/auth.service';
import bcryptService from '../services/bcrypt.service';

const UserController = () => {
  const register = async (req, res) => {
    const { body } = req;
    try {
      body.token = authService(body.id);
      const user = await User.create(User.parseUser(body));
      const output = await user.toJSON();
      return res.status(200).json(output);
    } catch (err) {
      return res.status(500).json({ msg: 'Could not create user' });
    }
  };

  const auth = async (req, res) => {
    const { email, bankId, password } = req.body;
    let user;
    if (email && password) {
      try {
        user = await User.findOne({
          where: { email },
        });
      } catch (err) {
        return res.status(500).json({ msg: 'Internal server error' });
      }
    } else if (bankId && password) {
      try {
        user = await User.findOne({
          where: { bankId },
        });
      } catch (err) {
        return res.status(500).json({ msg: 'Internal server error' });
      }
    } else {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    if (!user) {
      return res.status(404).json({ msg: 'Bad Request: User not found' });
    }
    if (bcryptService().comparePassword(password, user.password)) {
      user.token = authService(user.id);
      await user.save();
      const output = await user.toJSON();
      return res.status(200).json(output);
    }

    return res.status(401).json({ msg: 'Unauthorized' });
  };

  const logout = async (req, res) => {
    const { id } = req.params;
    try {
      const updated = await User.update({ token: null }, { where: { id } });
      if (updated) {
        const user = await User.findOne({
          where: { id },
        });
        const output = await user.toJSON();
        return res.status(200).json(output);
      }
      return res.status(404).json({ msg: 'Bad Request: User not found' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const get = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({
        where: { id },
      });
      if (!user) {
        return res.status(404).json({ msg: 'Bad Request: User not found' });
      }
      const output = await user.toJSON();
      return res.status(200).json(output);
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const remove = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    if (body.onlyDisable) {
      const user = await User.update({ status: -1 }, { where: { id } });
      if (!user) {
        return res.status(404).json({ msg: 'Bad Request: User not found' });
      }
    } else {
      const user = await User.findOne({
        where: { id },
      });
      if (!user) {
        return res.status(404).json({ msg: 'Bad Request: User not found' });
      }
      await user.destroy();
    }

    return res.status(200).json({ id });
  };

  const update = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      if (body.password) {
        body.password = bcryptService().password(body);
      }
      const updated = await User.update(User.parseUser(body), { where: { id } });
      if (updated) {
        const user = await User.findOne({
          where: { id },
        });
        const output = await user.toJSON();
        return res.status(200).json(output);
      }
      return res.status(404).json({ msg: 'Bad Request: User not found' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    register,
    auth,
    logout,
    get,
    update,
    remove,
  };
};

module.exports = UserController;
