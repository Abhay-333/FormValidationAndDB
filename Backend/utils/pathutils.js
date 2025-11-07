const mongo=require('mongodb');

const MongoClient=mongo.MongoClient;
let _db;
const mongourl="mongodb+srv://shravantalokar:Shravan%40123@first.amw5ekf.mongodb.net/?appName=first";
const mongoconnect=(callback)=>{
MongoClient.connect(mongourl).then((client)=>{
  console.log(client);
  _db=client.db("form");
  callback();
}).catch(err=>{
console.log("erro while connecting to mongo",err);
});
}

const getdb=()=>{
  if(!_db){
    throw new Error('mongodb not connected properly');
  }
  return _db;
}
exports.mongoconnect=mongoconnect;
exports.getdb=getdb;