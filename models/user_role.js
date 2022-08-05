const Mongoose = require('mongoose');
// const StudentModel = require('./to-del/student.js');

const UserRoleSchema = Mongoose.Schema(
    {
      RoleName: { type: String, required:true, unique:true, default: "" },
      // studentId: { type: Mongoose.Schema.ObjectId,ref:StudentModel, required:true, index:true },
      Privilages: { type: String, required:true, unique:true, default: "" },
    },{ timestamps: true, collection: "user_role" })


    let UserRoleModel = Mongoose.model("user_roles", UserRoleSchema);


    UserRoleModel.getXPerson = (where) => {
        return UserRoleModel.findOne({  _id:"61d1b461b974ab6f0b816c73" });
      };
//    UserModel = Mongoose.model('User', UserSchema , { timestamps: true, collection: "user" });

    module.exports= UserRoleModel;