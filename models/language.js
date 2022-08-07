const Mongoose = require('mongoose');
// const StudentModel = require('./to-del/student.js');

const LanguageSchema = Mongoose.Schema(
    {
      LanguageName: { type: String, default: "" },
      // studentId: { type: Mongoose.Schema.ObjectId,ref:StudentModel, required:true, index:true },
     
      LanguageImg: { type: String, default: "" },
      

    },{ timestamps: true, collection: "language" })
    let LanguageModel = Mongoose.model("languages", LanguageSchema);


    LanguageModel.getXPerson = (where) => {
        return LanguageModel.findOne({  _id:"61d1b461b974ab6f0b816c73" });
      };
//    UserModel = Mongoose.model('User', UserSchema , { timestamps: true, collection: "user" });

    module.exports= LanguageModel;