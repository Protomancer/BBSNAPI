const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.use(require('./routing'));

mongoose.connect(process.env.MONGODB_URI || 'mongo://localhost/BBSNAPI',{
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`## Listening @ ${PORT} ##`));