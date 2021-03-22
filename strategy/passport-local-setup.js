const passport = require("passport");

const User = require("../models/user-model");

passport.use(User.createStrategy());
