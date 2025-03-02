const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/seminari4", {
  serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
})
  .then(() => console.log("Connexió a MongoDB establerta"))
  .catch(err => {
    console.error("Error connectant a MongoDB:", err);
    process.exit(1); // Exit the process with an error code
  });

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

