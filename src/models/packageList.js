import mongoose from "mongoose";

const packingUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    ref: "Trip",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const PackageList = mongoose.model("packageList", packingUserSchema);

export default PackageList;

// user management
