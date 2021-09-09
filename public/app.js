const { axios } = window

document.getElementById('addMovie').addEventListener('click', event => {
 event.preventDefault()

 const movie = {
  text: document.getElementById('text').value,
  isWatched: false
 }

 axios.post('/api/movies', movie)
  .then( () => {
   const movieElem = document.createElement('div')
   movieElem.innerHTML = `
   <p>${movie.text}</p>
   <button class="isWatched" data-text="${movie.text}" style="background-color: lightcoral; border: none; border-radius: 5px; color: white; height: 45px; width: 150px;">${movie.isWatched ? 'Watched' : 'Not Watched'}</button>
   <button class="delete" data-text="${movie.text}" style="background-color: darkgrey; border: none; border-radius: 5px; color: black; height: 45px; width: 150px;">Delete</button>
   <hr>
   `

   document.getElementById('movies').append(movieElem)

   document.getElementById('text').value = ''
  })
  .catch(err => console.log(err))
})

document.addEventListener('click', event => {
 if (event.target.className === 'delete') {
  const text = event.target.dataset.text
  axios.delete(`/api/movies/${text}`)
   .then(() => event.target.parentNode.remove())
   .catch(err => console.error(err))
 }
})

document.addEventListener('click', event => {
 if (event.target.className === 'isWatched') {
  const text = event.target.dataset.text

  axios.put(`/api/movies/${text}`)
   .then(() => {
    if (event.target.textContent === 'Watched') {
     event.target.textContent = 'Not Watched'
    } else {
     event.target.textContent = 'Watched'
    }
   })
   .catch(err => console.error(err))
 }
})

axios.get('/api/movies')
 .then(({ data: movies }) => {
  movies.forEach(movie => {
   const movieElem = document.createElement('div')
   movieElem.innerHTML = `
        <p>${movie.text}</p>
        <button class="isWatched" data-text="${movie.text}" style="background-color: lightcoral; border: none; border-radius: 5px; color: white; height: 45px; width: 150px;">${movie.isWatched ? 'Watched' : 'Not Watched'}</button>
        <button class="delete" data-text="${movie.text}" style="background-color: darkgrey; border: none; border-radius: 5px; color: black; height: 45px; width: 150px;">Delete</button>
        <hr>
      `
   document.getElementById('movies').append(movieElem)
  })
 })
 .catch(err => console.error(err))