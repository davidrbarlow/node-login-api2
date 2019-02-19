const {ObjectID} = require('mongodb');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users =[{
    _id: userOneId,
    email: 'abc@123.com',
    password: 'Test123!',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userOneId, access:'auth'},process.env.JWT_SECRET).toString()
    }]
    },{
      _id: userTwoId,
      email: 'bob@example.com',
      password: 'userTwoPass',
      tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access:'auth'},process.env.JWT_SECRET).toString()
      }]
    
    }];

    const populateUsers = (done) => {
        User.deleteMany({}).then(() => {
            var userOne = new User(users[0]).save();
            var userTwo = new User(users[1]).save();
      
            return Promise.all([userOne, userTwo])
        }).then(()=> done());
      };

      module.exports = {users, populateUsers};