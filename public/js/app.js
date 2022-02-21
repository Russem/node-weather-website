const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.innerHTML = 'Loading ...'
    messageTwo.innerHTML = ''    

    fetch('/weather?address='+encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.innerHTML = data.error
        } else {
            messageOne.innerHTML = data.location
            messageTwo.innerHTML = data.forecast
        }
    })
})
    
})