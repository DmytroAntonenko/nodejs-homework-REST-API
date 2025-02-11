const app = require('./app')

const mongoose = require("mongoose");
const { DB_HOST, PORT = 3000 } = process.env;
console.log(process.env)
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
