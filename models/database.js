const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_URL;


mongoose.connect(mongo_url).then(() => console.log('Database is connected')).catch(() => console.log('databsae was not connected'))



