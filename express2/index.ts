const createAzureFunctionHandler = require("azure-function-express").createAzureFunctionHandler;
const express = require("express");
 
// Create express app as usual 
const app = express();
app.get("/", (req, res) => {
  res.json({
    message: 'hello'
  });
});
 
// Binds the express app to an Azure Function handler 
export default createAzureFunctionHandler(app);
