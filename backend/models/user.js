import mongoose from "mongoose";
const Schema = mongoose.Schema;
import passportLocalMongooseModule from "passport-local-mongoose";

const passportLocalMongoose =
  passportLocalMongooseModule.default || passportLocalMongooseModule;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

export default mongoose.model("User", userSchema);
