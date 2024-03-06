const express = require('express')
const app = express()
const path = require('path')
const redditData = require('./data.json')

app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', "bethany", "Grey"
    ]
    res.render('cats.ejs', { cats })
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params
    const data = redditData[subreddit]
    if (data) {
        res.render('subreddit.ejs', { ...data })
    } else {
        res.render('notFound.ejs', { subreddit })
    }

})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1
    res.render('random.ejs', { rand: num })
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})