import { hash } from "bcrypt";
import asyncHandler from "express-async-handler";
import User from "../models/user.js"; // Assuming you have a User model defined in models/user.js

const createUser = asyncHandler(async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already exists");
  }
  userData.password = await hash(userData.password, 10);
  return await User.create(userData);
});

const create = asyncHandler(async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json(user);
});
export { create, createUser };
