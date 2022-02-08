const express = require('express')
const path = require('path')

const app = express();

const PORT = process.env.PORT || 5000;


// parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', require('./routes'))

app.listen(PORT, console.log(`server running on port ${PORT}`));