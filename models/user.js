const Mongoose = require('mongoose');
const CourseModel = require('./course.js');
const CollegeModel = require('./college.js');
const UserRoleModel = require('./user_role.js');
var Schema = Mongoose.Schema;


const UserSchema = Mongoose.Schema(
    {
      index: {type: Number,  index: true, unique: true},
      fullName: { type: String, default: "" },
      userName: { type: String, default: "" },
      password: { type: String, required:true },
      course: { type: Mongoose.Schema.ObjectId,ref:CourseModel, required:true, index:true },
      college: { type: Mongoose.Schema.ObjectId,ref:CollegeModel, required:true, index:true },
      role: { type: Mongoose.Schema.ObjectId,ref:UserRoleModel, required:true, index:true },
      instructors:[this],
      age: {type: Number, default: null},
      gender: { type: String, default: "" },
      eyeColor: { type: String, default: "" },
      favoriteFruit: { type: String, default: "" },
      favoriteCinema: [{ type: String, unique: true }],
      zones: {type:Schema.Types.Mixed,default: {}},
      email: { type: String,required:true,unique:true},
      phone:   {type: String },
      location:  {type: {country: {type: String},
      address:  {type: String },  state:{type: String },
      zipcode:{type: String },},default: {} },
      customUrl: { type: String, default: "" },
      bio: { type: String, default: "" },
      profileImg: { type: String, default: "" },
      tags:{ type: Array, default: [] },
      registered:{type: Date, default: null },
      coverImg: { type: String, default: "" },
      isActive:  { type: Boolean, default: false },

    },{ timestamps: true, collection: "user" })
    let UserModel = Mongoose.model("users", UserSchema);


    UserModel.getXPerson = (where) => {
        return UserModel.findOne({  _id:"61d1b461b974ab6f0b816c73" });
      };
//    UserModel = Mongoose.model('User', UserSchema , { timestamps: true, collection: "user" });

    module.exports= UserModel;