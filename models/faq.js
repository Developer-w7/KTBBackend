const Mongoose = require('mongoose');
const CourseModel = require('./course.js');

const FaqSchema = Mongoose.Schema(
    {
      CourseName: { type: String, default: "" },
      course: { type: Mongoose.Schema.ObjectId,ref:CourseModel, required:true, index:true },
      id:{ type: Number, default: "", required:true, unique: true },
      faqImg: { type: String, default: "" },
      question: { type: String, default: "" },
      answer: { type: String, default: "" },
      

    },{ timestamps: true, collection: "faq" })
    // mongoose.model.createIndexes();
    let FaqModel = Mongoose.model("faqs", FaqSchema);


    FaqModel.getXPerson = (where) => {
        return FaqModel.findOne({  _id:"61d1b461b974ab6f0b816c73" });
      };
//    UserModel = Mongoose.model('User', UserSchema , { timestamps: true, collection: "user" });

    module.exports= FaqModel;