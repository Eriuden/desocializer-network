const mongoose = require("mongoose");

mongoose
.connect(
    
)
    .then(() => console.log("connecté à mongoDB"))
    .catch((err) => console.log("echec de connection à mongoDB",err))
