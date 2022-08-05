const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;

// require('dotenv').config();

const conn = process.env.connectionString;

const connectToDb = async () => {
    try {
        console.log(conn);
        await Mongoose.connect(conn, { autoIndex: false });
        
        console.log('Connected to mongo!!!');
        return 1;
    }catch(err){
        console.log('Could not connect to MongoDB');
        return 0;
    }  
  }


  

const connection = Mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// module.exports = connection;

  exports.connectToDb = connectToDb;
  exports.connection = connection;