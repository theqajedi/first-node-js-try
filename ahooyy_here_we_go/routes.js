//Routes to handle client requests


//Package contains writeFile functionality which allows us to create a file
const fs = require("fs");

//CreateServer() method in server.js accepts a requestListener function
const requestListener = (req, res) => {
    //Can filter various fields
    console.log(req.url, req.method, req.headers)
    const url = req.url;
    if (url === "/") {
        res.setHeader("Content-Type", 'text/html')
        res.write("<html>");
        res.write("<head><title>All the Feels</title></head>");
        res.write(
            '<body><h1>Hey there, welcome to the food tracker!</h1><p>Enter any food below and hit send to save your food.</p><form action = "/food" method="POST"><input type = "text" name="food"><button type = "submit">Send</button></body>'
        );
        res.write("</html>");
        return res.end();
    }
    if (url === "/food" && req.method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });
        //The first parameter specifies the name of the event and the second parameter defines the function triggered by an event
        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody)
            const food = parsedBody.split("=")[1];
            fs.writeFile('user_food.txt', food, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
            return res.end();
        });
    }
};

//export routes file so that routes could be imported into server.js
module.exports = requestListener;