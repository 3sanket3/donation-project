const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.static(__dirname));

const corsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));

app.use(express.json());

require('./routes')(app);

app.listen(process.env.PORT || 9000, () => {
    console.log('Server started.');
});
