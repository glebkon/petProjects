const { v4: uuidv4 } = require("uuid");
const UserModel = require("./users.entity");

/* 
  saveUser should be a function that calls the save() function on Users Model 
  to persist user data in MongoDB Users collection of shoppingcartDB
*/
const saveUser = (userReq, callback) => {
  const userModelInstance = new UserModel(userReq);

  userModelInstance.save((err, savedUser) => {
    if (err) {
      console.log("Error in saving user: ", err);
      callback(err, null);
    } else {
      callback(null, savedUser);
    }
  });
};

/* 
  findUsers should be a function that calls the find() function on Users Model 
  to fetch all documents from Users collection of shoppingcartDB
*/
const findUsers = (done) => {
  UserModel.find({})
    .select({ __v: 0 })
    .lean() // to return a plain JavaScript object instead of a Mongoose document
    .exec() // to execute the query
    .then((res) => done(undefined, res))
    .catch((err) => {
      console.log("Error in fetching users: ", err);
      return done("Failed to fetch users due to data error!..");
    });
};

/* 
  getUserByEmail should be a function that calls the findOne() function on Users Model 
  to fetch User document from Users collection of shoppingcartDB,
  containing data of Users for given email
*/
const getUserByEmail = (email, done) => {
  UserModel.findOne({ email: email })
    .select({ __v: 0 })
    .lean()
    .exec()
    .then((res) => done(undefined, res))
    .catch((err) => {
      console.log(
        "An error occurred while retrieving the user with the specified email: ",
        err
      );
      return done("Failed to fetch the user due to data error!..");
    });
};

/* 
  getUserById should be a function that calls the findOne() function on Users Model 
  to fetch User document from Users collection of shoppingcartDB,
  containing data of Users for given userId
*/
const getUserById = (id, done) => {
  UserModel.findById(id)
    .select({ __v: 0 })
    .lean()
    .exec()
    .then((res) => done(undefined, res))
    .catch((err) => {
      console.log(
        "An error occurred while retrieving the user with the specified id: ",
        err
      );
      return done("Failed to fetch the user due to data error!..");
    });
};

/* 
  updateUserDetails should be a function that calls the findOneAndUpdate() 
  function on Users Model that fetches user by id from Products collection of shoppingcartDB and updates it
*/
const updateUserDetails = (id, updateReq, done) => {
  UserModel.findOneAndUpdate({ _id: id }, updateReq, { new: true })
    .then((res) => {
      if (res === null) {
        console.log("No matching user found to update");
        return done("No matching user found to update");
      }
      return done(undefined, res);
    })
    .catch((err) => {
      console.log("Error in updating user details ", err);
      done("Failed to update user due to data errors");
    });
};

module.exports = {
  saveUser,
  findUsers,
  getUserByEmail,
  updateUserDetails,
  getUserById,
};
