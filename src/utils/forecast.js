const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=df1edb0ef522f5953662a419a10cf72f&query='+latitude +','+ longitude

    request({
        url,
        json: true
    }, (error, {body}) => {

        const {current} = body

        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, current.weather_descriptions[0]+'. it is currently ' + current.temperature + ' degrees out. And there is ' + current.precip + '% chance of rain. The Humidity for now is : ' + current.humidity)
        }
    })
}

module.exports = forecast