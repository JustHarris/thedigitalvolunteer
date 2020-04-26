import HelpRequest from '../models/HelpRequest';
import User from '../models/User';

const HelpRequestController = () => {
  const register = async (req, res) => {
    const { body } = req;  
    try {      
      const helpRequest = await HelpRequest.create(HelpRequest.parseHelpRequest(body));                  
      const output = await helpRequest.toJSON();
      return res.status(200).json(output);
    } catch (err) {  
      console.log(err);          
      return res.status(500).json({ msg: 'Could not create HelpRequest' });
    }    
  };

  const get = async (req, res) => {
    const id = req.params.id;
    try {
      const helpRequest = await HelpRequest.findOne({ 
        where: { id: id } 
      });
      if (!helpRequest) {
        return res.status(404).json({ msg: 'Bad Request: HelpRequest not found' });
      }
      const output = await helpRequest.toJSON();
      return res.status(200).json(output);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  const update = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {      
      const updated = await HelpRequest.update(HelpRequest.parseHelpRequest(body), { where: { id: id } });
      if (updated) {
        const helpRequest = await HelpRequest.findOne({ 
          where: { id: id } 
        });       
        const output = await helpRequest.toJSON();            
        return res.status(200).json(output);
      }
      return res.status(404).json({ msg: 'Bad Request: HelpRequest not found' });      
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  const remove = async (req, res) => {
    const id = req.params.id;    
    try {
      const helpRequest = await HelpRequest.findOne({ 
        where: { id: id } 
      });
      if (!helpRequest) {
        return res.status(404).json({ msg: 'Bad Request: HelpRequest not found' });
      }
      await helpRequest.destroy();      
      return res.status(200).json({id: id});
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  const assign = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {      
      const user = await User.findOne({ where: { id: body.userId } });
      if (!user) {
        return res.status(404).json({ msg: 'Bad Request: User not found' });
      }
      const updated = await HelpRequest.update({ assignedUser: body.userId }, { where: { id: id } });
      if (updated) {
        const helpRequest = await HelpRequest.findOne({ where: { id: id } });       
        const output = await helpRequest.toJSON();            
        return res.status(200).json(output);
      }
      return res.status(404).json({ msg: 'Bad Request: HelpRequest not found' });      
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  const assignAccept = async (req, res) => {
    const id = req.params.id;
    return await changeStatus(id, HelpRequest.REQUEST_STATUS_ACCEPTED, res);
  }

  const markDone = async (req, res) => {
    const id = req.params.id;
    return await changeStatus(id, HelpRequest.REQUEST_STATUS_DONE, res);
  }

  const searchInNeed = async (req, res) => {
    const authUser = req.authUser;        
    const {latitude, longitude} = req.body;
    try {
      const helpRequests = await HelpRequest.searchForInNeed(latitude, longitude, authUser);
      let output = [];
      for (var helpRequest of helpRequests) {
        output.push(await helpRequest.toJSON());
      }            
      return res.status(200).json(output);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }    
  }

  const searchHelper = async (req, res) => {
    const id = req.params.id;        
    try {
      const helpRequest = await HelpRequest.findOne({ 
        where: { id: id } 
      });
      if (!helpRequest) {
        return res.status(404).json({ msg: 'Bad Request: HelpRequest not found' });
      }
      const users = await User.searchForHelpers(
        helpRequest.get("locationLatitude"), 
        helpRequest.get("locationLongitude"), 
        helpRequest.get("helpType")
      );      
      let output = [];
      for (var user of users) {
        output.push(await user.toJSON());
      }      
      return res.status(200).json(output);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  const changeStatus = async (helpRequestId, statusLevel, res) => {
    try {      
      const updated = await HelpRequest.update({ status: statusLevel }, { where: { id: helpRequestId } });
      if (updated) {
        const helpRequest = await HelpRequest.findOne({ where: { id: helpRequestId } });       
        const output = await helpRequest.toJSON();
        return res.status(200).json(output);
      }
      return res.status(404).json({ msg: 'Bad Request: HelpRequest not found' });      
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }    
  }

  return {
    register,
    get,
    update,
    remove,
    assign,
    assignAccept,
    markDone,
    searchInNeed,
    searchHelper,
  };
};

module.exports = HelpRequestController;
