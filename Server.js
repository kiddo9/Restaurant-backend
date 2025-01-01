require('dotenv').config();
require('./config/db_connection');
const express = require('express');
const app = express()
const cors = require('cors')
const port = process.env.PORT
const Guestroute = require('./src/route/guestRoutes')
const MemberRoute = require('./src/route/MembersRoute')
const AdminRoute = require('./src/route/AdminRoute');


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json('we are ok')
})

app.use(Guestroute)
app.use(MemberRoute)
app.use(AdminRoute)


app.listen(port, () => {
    console.log('we are up and running on port' + ' ' + port);
})  