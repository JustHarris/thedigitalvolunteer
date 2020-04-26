import UserRating from '../models/UserRating';

const UserRatingController = () => {
  const register = async (req, res) => {
    const { body } = req;  
    try {      
      const userRating = await UserRating.create(body);                              
      const output = await userRating.toJSON();
      return res.status(200).json(output);      
    } catch (err) {                  
      console.log(err);
      return res.status(500).json({ msg: 'Could not create UserRating' });
    }    
  };

  const created = async (req, res) => {
    const id = req.params.id;
    try {
      const userRatings = await UserRating.findAll({ 
        where: { fromUser: id } 
      });

      let output = [];
      for (var rating of userRatings) {
        output.push(await rating.toJSON());
      }      
      return res.status(200).json(output);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  const received = async (req, res) => {
    const id = req.params.id;
    try {
      const userRatings = await UserRating.findAll({ 
        where: { toUser: id } 
      });

      let output = [];
      for (var rating of userRatings) {
        output.push(await rating.toJSON());
      }      
      return res.status(200).json(output);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  return {
    register,
    created,
    received,
  };
};

module.exports = UserRatingController;
