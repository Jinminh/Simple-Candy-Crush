var express = require("express");
var app = express();
app.use(express.static('public'));



app.listen(process.env.PORT || 8088, function () {
    console.log("Listening on port 8088");
});