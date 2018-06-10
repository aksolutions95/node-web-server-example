const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs')

//express middleware
app.use((req, res, next) => {

    var logTime = new Date().toString();
    fs.appendFile('server.log', `${logTime} : ${req.method} ${req.url}\n`, (error) => {
        
    }
    );
    next();
});


// app.use( (req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'NgDevelop',
        welcomeMsg: 'Welcome to Node Practice'
    })
})

app.get('/api', (req, res) => {
    res.send({ 'userName': 'Ankit', 'role': 'developer' });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Us',
        features: 'Great Tutorials'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);

});
