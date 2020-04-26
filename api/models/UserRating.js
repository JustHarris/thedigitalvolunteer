import { INTEGER, STRING } from 'sequelize';
import User from './User';
import database from '../../config/database';

const tableName = 'user_ratings';

const UserRating = database.define('UserRating', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fromUser: {
    type: INTEGER,    
  },
  toUser: {
    type: INTEGER,    
  },
  value: {
    type: INTEGER,
    validate: {
      min: 0,
      max: 10
    }
  },
  comment: {
    type: STRING(2048),    
    allowNull: true
  },
}, { tableName });

// eslint-disable-next-line
UserRating.prototype.toJSON = async function() {    
  const values = Object.assign({}, this.get());  
  if (values.fromUser) {
    const fromUser = await User.scope('lite').findOne({
      where: { id: values.fromUser },
    });
    const output = await fromUser.toJSON();
    values.fromUser = output;
  }

  if (values.toUser) {
    const toUser = await User.scope('lite').findOne({
      where: { id: values.toUser },
    });
    const output = await toUser.toJSON();
    values.toUser = output;
  }

  return values;
};

export default UserRating;
