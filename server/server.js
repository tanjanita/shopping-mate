const express = require('express');

const apiPort = 3333;
const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  response.write("<h1>Welcome to your Shopping Mate!</h1>");
  response.write("<p>Yey, you're out shopping with your mate :)</p>");
  response.write("<p>Let's split up the list so you'll be free to sit down for a nice cuppa faster!</p>");
  response.send();
});



app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));