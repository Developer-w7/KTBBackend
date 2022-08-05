const Mongoose = require('mongoose');
const CourseModel = require('../course.js');
const CollegeModel = require('../college.js');
var Schema = Mongoose.Schema;
const StudentSchema = Mongoose.Schema(
    {
      index: {type: Number,  index: true, unique: true},
      fullName: { type: String, default: "" },
      userName: { type: String, default: "" },
      // course: { type: Mongoose.Schema.ObjectId,ref:CourseModel, required:true, index:true },
      // college: { type: Mongoose.Schema.ObjectId,ref:CollegeModel, required:true, index:true },
      age: {type: Number, default: null},
      gender: { type: String, default: "" },
      eyeColor: { type: String, default: "" },
      favoriteFruit: { type: String, default: "" },
      favoriteCinema: [{ type: String, unique: true }],
      zones: {type:Schema.Types.Mixed,default: {}},
      email: { type: String, default: "" },
      phone:   {type: String },
      location:  {type: {country: {type: String},
      address:  {type: String },  state:{type: String },
      zipcode:{type: String },},default: {} },
    
     
      customUrl: { type: String, default: "" },
      // college: {type:{
      //   date:     {type: Date, default: Date.now },
      //   phone:   {type: String },
      //   title:  {type: String },
      //   location:  {type: {country: {type: String},
      // address:  {type: String },  state:{type: String },
      // zipcode:{type: String },},default: {} },
      //   email:  {type: String },
      // }, default: {}},
      bio: { type: String, default: "" },
      profileImg: { type: String, default: "" },
      tags:{ type: Array, default: [] },
      registered:{type: Date, default: null },
      coverImg: { type: String, default: "" },
      isActive:  { type: Boolean, default: false },

    },{ timestamps: true, collection: "student" })
    // StudentSchema.index({ favoriteCinema: 1 });
    
    let StudentModel = Mongoose.model("students", StudentSchema);
        // StudentModel.ensureIndexes({favoriteCinema: 1});
  //   StudentModel.ensureIndexes({favoriteCinema: 1},function(err) {
  //     if (err)
  //         console.log(err);
  //     else
  //         console.log('create profile index successfully');
  // });
    StudentModel.getXPerson = (where) => {
        return StudentModel.findOne({  _id:"61d1b461b974ab6f0b816c73" });
      };
     
//    UserModel = Mongoose.model('User', UserSchema , { timestamps: true, collection: "user" });

    module.exports= StudentModel;