// const { connect, connection } = require('mongoose');

// connect('mongodb://localhost/socialmediadb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// module.exports = connection;

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialMediaDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;