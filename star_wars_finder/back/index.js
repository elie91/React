const express = require("express");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();


const securityRoutes = require('./routes/security');
const swapiRoutes = require('./routes/swapi');

app.use(securityRoutes);
app.use(swapiRoutes);

app.listen(4000, () => console.log("listening on port 4000"));
