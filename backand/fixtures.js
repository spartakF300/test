const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');
const {nanoid} = require("nanoid");

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

const [user,admin] =  await User.create({
    username: 'user',
    password: '123',
    token: '123',
  displayName:'User',

  }, {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
  displayName:'Антон Пикачу',
    token: '321',

  },{
  username: 'jon',
  password: '123',
  displayName:'Jon',
  role: 'user',
  token: '345',

});

  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});