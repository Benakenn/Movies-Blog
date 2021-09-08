const router = require('express').Router()
const { movies } = require('../db')

router.get('/movies', (req, res) => {
  res.json(movies)
})

router.post('/movies', (res, req) => {
  movies.push(req.body)
  res.sendStatus(200)
})

router.put('/movies/:text', (req, res) => {
  const text = req.params.text
  movies.forEach(movie => {
    if (movie.text === text) {
      item.isWatched = !item.isWatched
    }
  })
  res.sendStatus(200)
})

router.delete('/movies/:text', (req, res) => {
  const text = req.params.text
  movies = movies.filter(movie => movie.text !== text)
  res.sendStatus(200)
})

module.exports = router 