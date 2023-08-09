import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
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

userSchema.plugin(mongoosePaginate);
const userModel = mongoose.model("user", userSchema);

mongoose.connect(`mongodb://127.0.0.1:27017/coderhouse`);

const docs = await userModel.paginate(
  { gender: "Female" },
  { limit: 20, page: 1 }
);

// * ?page=3&limit=10&sort=(1| -1)&query[]={first_name: "1"}&query[]={first_name: "1"}
app.get("/users", async (req, res) => {
  const { page = 1, limit = 10, query = {} } = req.query;
  // * [{first_name: "1"}, {first_name: "1"}]
  const docs = await userModel.paginate({ gender: "Female" }, { limit, page });
  res.send(docs);
});
console.log(docs.docs);
