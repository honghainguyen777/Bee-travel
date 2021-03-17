const axios = require("axios");
const router = require("express").Router();
const FavoriteCity = require("../../models/FavoriteCity");
const Trip = require("../../models/Trip");
const { loginCheck } = require("../../middlewares/loginCheck");
const helpers = require("../../helpers/helpers");
const City = require("../../models/City");

// later getting image here
router.get("/image", loginCheck(), async (req, res) => {
  // cityCopy.imageUrl =  await helpers.getImage(cityCopy);
});

router.get("/", loginCheck(), async (req, res) => {
  // later change it to user specific
  const user = req.session.user;
  let favoriteCities;
  try {
    favoriteCities = await FavoriteCity.find({ user: user._id }).populate(
      "city"
    );
    favoriteCities = favoriteCities.map((city) => city.city);
    // console.log(favoriteCities);
    res.json({ favoriteCities });
  } catch (error) {
    console.log(error);
    res.json({ message: "something wrong in the backend" });
  }
});

router.post("/delete", loginCheck(), async (req, res) => {
  const user = req.session.user;
  const cityId = req.body.cityId;
  // console.log("userid: ", user._id, "city: id", cityId);
  try {
    const removedCity = await FavoriteCity.findOneAndRemove({
      user: user._id,
      city: cityId,
    });
    if (removedCity) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.json({ success: false });
  }
});

router.post("/", loginCheck(), async (req, res) => {
  // console.log(req.body);
  const user = req.session.user;
  const cityId = req.body.cityId;
  try {
    let existingFavoriteCity = await FavoriteCity.findOne({
      user: user._id,
      city: cityId,
    });
    if (existingFavoriteCity) {
      res.json({ success: false });
      return;
    }
  } catch (err) {
    console.log(error);
    res.json({ success: false });
    return;
  }
  // try {
  //   // does not know why is is not populated
  //   let addedFavoriteCity = await FavoriteCity.create({user: user._id, city: cityId}).populate('city');
  //   // let cities = addedFavoriteCity.populate('city').populate.exec();
  //   console.log(addedFavoriteCity);
  //   // addedFavoriteCity.imageUrl = await helpers.getImage(addedFavoriteCiy.city);
  //   res.json({addedFavoriteCity: addedFavoriteCity.city, message});
  // } catch(error) {
  //   message = "Something wrong with the backend";
  //   console.log(error);
  //   res.json({message});
  // }
  FavoriteCity.create({ user: user._id, city: cityId })
    .then((city) => {
      City.findById(city.city)
        .then((city) => res.json({ city, success: true }))
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
});

module.exports = router;
