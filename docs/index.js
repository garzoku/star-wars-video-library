
const $ul = document.querySelector('ul')

function addMovieListing(movie) {
  fetch(`https://www.omdbapi.com/?t=${movie.title}&apikey=708860ef`)
    .then((response) => response.json())
    .then((parsedResponse) => {
      const $li = document.createElement('li')
      $li.innerHTML = `
                <div class="movie-listing">
                    <img src="${parsedResponse.Poster}" alt="${movie.title}" >
                    <a href="movie.html?movie=${movie.episode_id}">${movie.title}</a>
                    <time>${buildDate(movie.release_date)}</time>
                </div>
                `
      $ul.append($li)
    })
}

fetch('https://swapi.dev/api/films')
  .then((response) => response.json())
  .then((parsedResponse) => {
    const movies = parsedResponse.results
    movies.forEach(movie => {
      addMovieListing(movie)
    })
  })

function buildDate(date) {
  const monthMap = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sept',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
    // Etc., could also be titles or whatever else too
  }
  const year = date.slice(0, 4)
  const month = +date.slice(5, 7)
  const day = date.slice(8, 9)
  const newId = monthMap[month]

  return `${newId} ${day}, ${year}`
}
