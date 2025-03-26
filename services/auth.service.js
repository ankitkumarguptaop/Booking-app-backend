const { BadRequest, ForBidden, UnAuthorized } = require("../libs/errors");
const {userRepository, imageRepository} = require("../repositories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (payload) => {
  const { name, email, password ,role } = payload.body;

  const path  = payload?.file?.path || null;

  if (await userRepository.findOne({ email: email })) {
    throw new ForBidden("User alredy exists");
  }
 
  const user = await userRepository.create({
    name: name,
    email: email,
    password: password,
    profile_image : path,
    role : role
  });
  
  return user;
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

exports.signIn = async (payload) => {
  const { email, password } = payload.body;

  if (!email || !password) {
    throw new BadRequest("data is not given");
  }

  const user = await userRepository.findOne({ email: email });
  if (!user) {
    throw new UnAuthorized("Need to register first");
  }
  const validate = await bcrypt.compare(password, user.password);

  if (!validate) {
    throw new UnAuthorized("Unauthorised access Password not matched!");
  }
   
  return { token: generateToken(user.id), user: user  };
};
