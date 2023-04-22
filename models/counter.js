const Mongoose = require('mongoose');
const StudentModel = require('./to-del/student.js');

const CounterSchema = Mongoose.Schema(
    {
      CounterId: { type: String, default: "" },
      // studentId: { type: Mongoose.Schema.ObjectId,ref:StudentModel, required:true, index:true },
     
      Count: { type: Number },
      

    },{ timestamps: true, collection: "counter" })
    let CounterModel = Mongoose.model("counters", CounterSchema);


    CounterModel.getXPerson = (where) => {
        return  CounterModel.findOne({  _id:"61d1b461b974ab6f0b816c73" });
      };
//    UserModel = Mongoose.model('User', UserSchema , { timestamps: true, collection: "user" });

    module.exports= CounterModel;