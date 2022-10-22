const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const createError = require("../helpers/createError");
const userRegistrationSchema = require('../joi/usersJoiSchema')
const User = require("../models/user-model");
const { SECRET_KEY } = process.env;



const signUp = async (req, res, next) => {
  try {
    const {error} = userRegistrationSchema.validate(req.body)
    if (error) {
      throw createError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
      throw createError(409, "User with such email already exists");
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    const result = await User.create({
      email,
      password: hashedPassword,
      token: null,
    });

    const {_id} = await User.findOne({email})
    const token = jwt.sign({id: _id}, SECRET_KEY, {expiresIn: "1h"});
    await User.findByIdAndUpdate({_id}, {token})
  
    res.status(201).json({
      email: result.email,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};


const signInUser = async (req, res, next) => {
  try {
    const {error} = userRegistrationSchema.validate(req.body)
    if (error) {
      throw createError(400, error.message);
    }
    const {password, email} = req.body
    const user = await User.findOne({email})
  if (!user) {
    throw createError(401, "User with such email doesn't exist")
  }
  const passwordCompare = await bcryptjs.compare(password, user.password)
  if(!passwordCompare) {
    throw createError(401, "Your password is wrong")
  }
  const token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: "1h"})
  await User.findByIdAndUpdate(user.id, {token})
  res.json({
    email: user.email,
    token,
  })
  } catch (error) {
    next(error)
  }
 
}

const getCurrentUser = async (req, res, next) => {
  const {email, token} = req.user
    res.status(201).json({
      email,
      token
    })
};

const signOut = async (req, res, next) => {
  try {  
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    if (!user) {
      throw createError(401, "Not authorized");
    }

    await User.findOneAndUpdate(id, { token: null });
    res.status(204).json({message: "No content"});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  signInUser,
  signOut,
  getCurrentUser,
};
