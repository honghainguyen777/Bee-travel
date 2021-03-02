//middleware
const loginCheck = () => {
  return (req, res, next) => {
      if (req.session.user) {
          next();
      } else {
          res.json({message: "unauthorized"});
      }
  };
};

module.exports = {loginCheck};