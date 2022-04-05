
const $ul = document.querySelector('ul')

function addMovieListing (element) {
  const $lis = document.createElement('li')
  $lis.innerHTML = `
    <div class="movie-listing">
        <a href="movie.html?movie=${element.episode_id}">${element.title}</a>
        <time>${element.release_date}</time>
    </div>
    `
  $ul.append($lis)
}

window.fetch('https://swapi.dev/api/films')
  .then((response) => response.json())
  .then((parsedResponse) => {
    const movies = parsedResponse.results
    setMovieTitles(movies)
  })

function setMovieTitles (array) {
  return array.forEach(movie => {
    addMovieListing(movie)
  })
}
