//import all the necessary components to set up a server

//http core module to launch a server
//import modules by using the require() keyword
const http = require('http')

//import routes.js as constant
const routes = require("./routes")

//creates a server and accepts a requestListener function
const server = http.createServer(routes)

//listen for incoming requests from the browser
server.listen(7007);