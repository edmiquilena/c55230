import mongoose from "mongoose";
const con = mongoose.connect(`mongodb://127.0.0.1:27017/coderhouse`);
con.then(() => console.log("conectados"));
con.catch((e) => console.log(e));
// * users
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    index: true,
  },
  last_name: String,
  email: String,
  gender: String,
  courses: {
    type: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "courses",
        },
      },
    ],
    default: [],
  },
});

userSchema.pre("find", function () {
  this.populate("courses.course");
  const user = this;
});
// * Array<{course: ObjectId}>
const userModel = mongoose.model("users", userSchema);
// await userModel.create({
//   first_name: "Matias",
//   last_name: "Isnardi",
//   email: "mati@example.com",
//   gender: "Male",
// });

// * courses model
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  professor: String,
});

const courseModel = mongoose.model("courses", courseSchema);
// console.log(
//   await courseModel.create({
//     title: "Programacion backend",
//     description: "mongodb",
//     professor: "eduardo",
//   })
// );

//

const user = await userModel.find({ email: "mati@example.com" });

console.log(JSON.stringify(user, null, "\t"));
// user.courses.push({ course: "64cc3ad2d388aeb60533b4ce" });
// await user.save();
// await userModel.findByIdAndUpdate({ _id: user._id }, user);
