const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;

// require('dotenv').config();

const conn = process.env.connectionString;

const connectToDb = async () => {
    try {
        console.log(conn);
        await Mongoose.connect(conn, { 
            autoIndex: true,
            //  useCreateIndex: true, 
         });
        
        console.log('Connected to mongo!!!');
        return 1;
    }catch(err){
        console.log('Could not connect to MongoDB',err);
        return 0;
    }  
  }


  

const connection = Mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    // useCreateIndex: true, 
});

// module.exports = connection;

  exports.connectToDb = connectToDb;
  exports.connection = connection;