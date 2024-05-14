const express = require("express");
const validator = require("express-validator");
const User = require("../models/User");
const body = validator.body;
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_STRING = "Drishikar@";
const fetchuser = require("../middleware/fetchUser");
const multer = require("multer");
const path = require("path")
const cloudinary = require("cloudinary").v2;
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpeg" && ext !== ".jpg") {
      cb(new Error("file type not supported"), false);
    }
    cb(null, true);
  },
});
cloudinary.config({
  cloud_name: "dpg7bprgl",
  api_key: "227298919955989",
  api_secret: "OXeDB8-uvLZuBO4TX2dyMtwtJy8",
});

router.post(
  "/signin",upload.single('image'),
  async (req, res) => {
    const details =req.body;
    const image = req.file;
    const result = validator.validationResult(req);
    let success = false;
    if (!result.isEmpty()) {
      return res.status(200).json({ errors: result.array() });
    }
    cloudinary.uploader.upload(
      image.path,
      { resource_type: "image" },
      async (err, result) => {
        if (err) {
          console.log(err);
        }
        let user = await User.findOne({ email: details.email });
        if (user) {
          return res.status(200).json({
            message: "A user with this email already exsists",
            success,
          });
        }   
        const salt = await bcrypt.genSalt(10);
        const updatedPassword = await bcrypt.hash(details.password, salt);
        user = await User.create({
          name: details.name,
          age: details.age,
          acres: details.acres,
          email: details.email,
          phone: details.phone,
          password: updatedPassword,
          address: details.address,
          url: result.url,
          cloudinaryId: result.public_id,
        });
        const data = {
          user: {
            id: user.id,
          },
        };
        const token = jwt.sign(data, JWT_STRING);
        success = true;
        return res.status(200).json({ success, token, user });
      }
    );

    // let user = await User.findOne({email:details.email})
    // if(user){
    //     return res.status(200).json({message:"A user with this email already exsists",success})
    // }
    // const salt = await bcrypt.genSalt(10);
    // const updatedPassword = await bcrypt.hash(details.password,salt)
    // user = await User.create({
    //     name:details.name,
    //     age:details.age,
    //     acres:details.acres,
    //     email:details.email,
    //     phone:details.phone,
    //     password:updatedPassword,
    //     address:details.address,
    // })
  }
);

router.post("/login", async (req, res) => {
  let success = false;
  const details = req.body;
  let user = await User.findOne({ email: details.email });
  if (!user) {
    return res.status(200).json({
      message: "A user with this email doesnot exsists please signup first",
      success,
    });
  }
  const passwordCompare = await bcrypt.compare(details.password, user.password);
  if (!passwordCompare) {
    return res
      .status(200)
      .json({ message: "please enter correct password", success });
  }
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, JWT_STRING);
  success = true;
  return res.status(200).json({ success, token, user });
});
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.msg);
  }
});

router.get('/getallusers',async(req,res)=>{
  try {
    const users = await User.find()
    return res.status(200).send({users,message:"success"})
  } catch (error) {
    return res.status(200).send({error,message:"some error occured"})
  }
})

module.exports = router;
