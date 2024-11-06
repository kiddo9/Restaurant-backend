require('dotenv').config();
require('./db/config/db_connection');
const express = require('express');
const app = express()
const cors = require('cors')
const port = process.env.PORT
const Guestroute = require('./src/route/guestRoutes')
const MemberRoute = require('./src/route/MembersRoute')

app.use(cors());
app.use(express.json());

app.use(Guestroute)
app.use(MemberRoute)

app.listen(port, () => {
    console.log('we are up and running on port' + ' ' + port);
})