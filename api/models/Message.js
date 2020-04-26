import { INTEGER, STRING } from 'sequelize';
import User from './User';
import database from '../../config/database';

const tableName = 'messages';

const Message = database.define('Message', {
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
  helpRequest: {
    type: INTEGER,    
    allowNull: true
  },
  title: {
    type: STRING(1024),    
    allowNull: true
  },
  content: {
    type: STRING(4096),    
    allowNull: true
  },
}, { tableName });


// eslint-disable-next-line
Message.prototype.toJSON = async function() {    
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

export default Message;
