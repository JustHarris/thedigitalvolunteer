import { INTEGER, STRING, ENUM, FLOAT, Op, literal } from 'sequelize';
import User from './User';
import database from '../../config/database';

const tableName = 'help_requests';
const REQUEST_STATUS_INIT = 0;
const REQUEST_STATUS_ACCEPTED = 1;
const REQUEST_STATUS_DONE = 2;

const HELP_TYPE_SHOP = 'groceries';
const HELP_TYPE_TRANSPORT = 'transport';
const HELP_TYPE_MEDICINE = 'medicine';
const HELP_TYPE_OTHER = 'other';

const DELIVERY_DOOR = 'door';
const DELIVERY_PORCH = 'porch';
const DELIVERY_DRONE = 'drone';

const DELIVERY_CASH = 'cash';
const DELIVERY_CARD = 'card';
const DELIVERY_SWISH = 'swish';

const HelpRequest = database.define('HelpRequest', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fromUser: {
    type: INTEGER,    
  },
  assignedUser: {
    type: INTEGER, 
    allowNull: true   
  },
  description: {
    type: STRING(4096),
  },
  priority: {
    type: INTEGER,    
    defaultValue: 1
  },
  status: {
    // Created=0, Assigned&Accepted=1, Done=2
    type: INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 2
    }
  },
  locationLatitude: {
    type: FLOAT(9, 6),    
  },
  locationLongitude: {
    type: FLOAT(9, 6),    
  },
  helpType: {    
    type: ENUM(HELP_TYPE_SHOP, HELP_TYPE_TRANSPORT, HELP_TYPE_MEDICINE, HELP_TYPE_OTHER),        
  },
  timeOptions: {    
    // pipe-separeted list of time-ranges: 10:00-11:00|12:00-13:00|19:00-20:00|20:00-21:00
    type: STRING(4096),
  },
  deliveryOption: {    
    type: ENUM(DELIVERY_DOOR, DELIVERY_PORCH, DELIVERY_DRONE),
  },
  paymentOption: {    
    type: ENUM(DELIVERY_CASH, DELIVERY_CARD, DELIVERY_SWISH),            
  }
}, { tableName });


// eslint-disable-next-line
HelpRequest.parseHelpRequest = function(helpRequestData) {
  if (helpRequestData.location) {
    helpRequestData.locationLatitude = helpRequestData.location.latitude;
    helpRequestData.locationLongitude = helpRequestData.location.longitude;
    delete helpRequestData.location;      
  } 
  if (helpRequestData.timeOptions && typeof helpRequestData.timeOptions == "object") {
    helpRequestData.timeOptions = helpRequestData.timeOptions.join("|");
  }
  return helpRequestData; 
}

// eslint-disable-next-line
HelpRequest.searchForInNeed = async function(latitude, longitude, authUser) {
  const radius = 5000; // 5km  
  let skillToHelpType = {};
  skillToHelpType[User.SKILL_SHOPPER] = HELP_TYPE_SHOP;
  skillToHelpType[User.SKILL_DRIVER] = HELP_TYPE_TRANSPORT;
  skillToHelpType[User.SKILL_PICKER] = HELP_TYPE_MEDICINE;
  skillToHelpType[User.SKILL_SHOPPER] = HELP_TYPE_OTHER;    
  const helpTypes = [];
  for (var item of authUser.get("skills").split("|")) {    
    if (skillToHelpType[item]) {
      helpTypes.push(skillToHelpType[item]);
    }    
  }           
  try {        
    const helpRequests = await HelpRequest.findAll({    
      attributes: {
        include: [
          [literal(`ST_Distance_Sphere(point(${longitude}, ${latitude}),point(locationLongitude, locationLatitude))`), 'distance']
        ]
      },
      where: { assignedUser: null, status: REQUEST_STATUS_INIT, helpType: helpTypes} ,
      having: { distance: {[Op.lt]: radius}}
    });
  
    return helpRequests; 
  } catch (err) {
    console.log(err);
    return [];
  }
}

// eslint-disable-next-line
HelpRequest.prototype.toJSON = async function() {    
  const values = Object.assign({}, this.get());  

  if (values.fromUser) {
    const fromUser = await User.scope('helpRequest').findOne({
      where: { id: values.fromUser },
    });
    const output = await fromUser.toJSON();
    values.fromUser = output;
  }
  if (values.assignedUser) {
    const assignedUser = await User.scope('helpRequest').findOne({
      where: { id: values.assignedUser },
    });
    const output = await assignedUser.toJSON();
    values.assignedUser = output;
  }
  if (values.timeOptions) {
    values.timeOptions = values.timeOptions.split("|");
  }
  if (values.locationLatitude) {
    values.location = {
      latitude: values.locationLatitude,
      longitude: values.locationLongitude,
    };
    delete values.locationLatitude;
    delete values.locationLongitude;
  }  

  HelpRequest.REQUEST_STATUS_INIT = REQUEST_STATUS_INIT;
  HelpRequest.REQUEST_STATUS_ACCEPTED = REQUEST_STATUS_ACCEPTED;
  HelpRequest.REQUEST_STATUS_DONE = REQUEST_STATUS_DONE;

  return values;
};

HelpRequest.HELP_TYPE_SHOP = HELP_TYPE_SHOP;
HelpRequest.HELP_TYPE_TRANSPORT = HELP_TYPE_TRANSPORT;
HelpRequest.HELP_TYPE_MEDICINE = HELP_TYPE_MEDICINE;
HelpRequest.HELP_TYPE_OTHER = HELP_TYPE_OTHER;

export default HelpRequest;
