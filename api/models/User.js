import { INTEGER, STRING, FLOAT, ENUM, Op, literal } from 'sequelize';
import bcryptService from '../services/bcrypt.service';
import database from '../../config/database';
import UserRating from './UserRating';
import HelpRequest from './HelpRequest';

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign    
  },
  beforeUpdate(user) {
  },
};

const tableName = 'users';
const ROLE_HELPER = 'helper';
const ROLE_INNEED = 'inneed';
const ROLE_ADMIN = 'admin';
const SKILL_DRIVER = 'driver';
const SKILL_PICKER = 'picker';
const SKILL_SHOPPER = 'shopper';
const SKILL_WALKER = 'walker';
const SKILL_ARTIST = 'artist';
const SKILL_INMUNE = 'inmune';


const User = database.define('User', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: STRING,    
  },
  lastName: {
    type: STRING,    
  },
  email: {
    type: STRING,        
    unique: true
  },
  bankId: {
    type: STRING,    
    unique: true
  },
  password: {
    type: STRING,
  },
  phone: {
    type: STRING,
  },
  about: {
    type: STRING(2048),        
    allowNull: true
  },
  avatar: {
    type: STRING(1024),        
    allowNull: true
  },
  token: {
    type: STRING(1024),
    allowNull: true
  },
  status: {
    type: INTEGER,
    defaultValue: 0,    
    validate: {
      min: -1,
      max: 1
    }
  },
  role: {
    type: ENUM('inneed', 'helper', 'admin'),
    defaultValue: 'helper',
  },
  locationLatitude: {
    type: FLOAT(9, 6),    
  },
  locationLongitude: {
    type: FLOAT(9, 6),    
  },
  addressStreet: {
    type: STRING(512),        
  },
  addressPostalCode: {
    type: STRING,        
  },
  addressCity: {
    type: STRING,        
  },
  skills: {
    // pipe-separeted list of skills: driver|picker|shopper|walker|artist|inmune
    type: STRING(1024),        
  },
}, {
  defaultScope: {
    attributes: { },    
  },
  scopes: {
    lite: {
      attributes: { 
        exclude: [
        'bankId', 'email', 'password', 'locationLatitude', 'locationLongitude', 'createdAt', 'updatedAt', 
        'token', 'addressStreet', 'addressCity', 'addressPostalCode', 'status', 'role', 'phone', 'skills'
        ]
      },
    },
    helpRequest: {
      attributes: { 
        exclude: [
        'bankId', 'email', 'password', 'locationLatitude', 'locationLongitude', 'createdAt', 'updatedAt','token', 'status', 'role', 'skills'
        ]
      },
    }
  },
  hooks, 
  tableName 
});


// eslint-disable-next-line
User.parseUser = function(userData) {
  if (userData.address) {
    userData.addressStreet = userData.address.street;
    userData.addressPostalCode = userData.address.postalCode;
    userData.addressCity = userData.address.city;
    delete userData.address;
  }  
  if (userData.location) {
    userData.locationLatitude = userData.location.latitude;
    userData.locationLongitude = userData.location.longitude;
    delete userData.location;      
  } 
  if (userData.skills && typeof userData.skills == "object") {
    userData.skills = userData.skills.join("|");
  }
  return userData; 
}

// eslint-disable-next-line
User.searchForHelpers = async function(latitude, longitude, helpType) {
  const radius = 5000; // 5km  
  let helpTypeToSkill = {}
  helpTypeToSkill[HelpRequest.HELP_TYPE_SHOP] = SKILL_SHOPPER;
  helpTypeToSkill[HelpRequest.HELP_TYPE_TRANSPORT] = SKILL_DRIVER;
  helpTypeToSkill[HelpRequest.HELP_TYPE_MEDICINE] = SKILL_PICKER;
  helpTypeToSkill[HelpRequest.HELP_TYPE_OTHER] = SKILL_SHOPPER;  
  console.log(helpTypeToSkill);
  try {        
    const users = await User.scope("helpRequest").findAll({    
      attributes: {
        include: [
          [literal(`ST_Distance_Sphere(point(${longitude}, ${latitude}),point(locationLongitude, locationLatitude))`), 'distance']
        ]
      },
      where: { role: User.ROLE_HELPER, skills: {[Op.like]: `%${helpTypeToSkill[helpType]}%`}} ,
      having: { distance: {[Op.lt]: radius}}
    });
  
    return users; 
  } catch (err) {
    console.log(err);
    return [];
  }
}

// eslint-disable-next-line
User.prototype.getRating = async function(userId) {
  const ratings = await UserRating.findAll({
    where: { toUser: userId },
  });
  const average = (ratingsList) => {
    if (ratingsList.length == 0) {
      return 0;
    }
    let average = 0;
    for (var rating of ratingsList) {
      average += parseInt(rating.value);      
    }
    return average / (ratingsList.length);    
  };
  return {
    total: ratings.length,
    average: average(ratings),
  }
};

// eslint-disable-next-line
User.prototype.toJSON = async function () {
  const values = Object.assign({}, this.get());

  if (values.addressStreet) {
    values.address = {
      street: values.addressStreet,
      postalCode: values.addressPostalCode,
      city: values.addressCity,
    };
    delete values.addressStreet;
    delete values.addressPostalCode;    
    delete values.addressCity;
  }
  if (values.locationLatitude) {
    values.location = {
      latitude: values.locationLatitude,
      longitude: values.locationLongitude,
    };
    delete values.locationLatitude;
    delete values.locationLongitude;
  }  
  if (values.skills) {
    values.skills = values.skills.split("|");
  }
  values.rating = await this.getRating(values.id);    

  return values;
};

User.ROLE_HELPER = ROLE_HELPER;
User.ROLE_INNEED = ROLE_INNEED;
User.ROLE_ADMIN = ROLE_ADMIN;
User.SKILL_DRIVER = SKILL_DRIVER;
User.SKILL_PICKER = SKILL_PICKER;
User.SKILL_SHOPPER = SKILL_SHOPPER;

export default User;
