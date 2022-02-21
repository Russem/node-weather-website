const path =require('path');
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const pubDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(pubDirPath)))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Racem Haddad.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Racem Haddad.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpmsg: 'we are here to help',
        name: 'Racem Haddad.'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address_provided: req.query.address
            })
        })
    })
} )



app.get('/help/*', (req, res) => {
    res.render('404',{
        errormsg: 'HELP ARTICALE NOT FOUND',
        name: 'Racem Haddad',
        title: '404 Help'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errormsg: 'PAGE NOT FOUND',
        name: 'Racem Haddad',
        title: '404'
    })
})

app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})