const $main = document.querySelector("main")

function setMovie(element) {
    const $div = document.createElement("div")

    $div.innerHTML = `
    <div class="movie">
        <a href="movie.html?movie=${element.episode_id}">${element.title}</a>
        <time>${element.release_date}</time>

        <h2>Characters</h2>
    </div>
    `
    $main.append($div)
}

function setCharacters(element,) {
    const $ul = document.createElement("ul")
    $ul.classList.add("characters")
    element.append($ul)



}

window.fetch(`https://swapi.dev/api/films`)
    .then((response) => response.json())
    .then((parsedResponse) => {
        const results = parsedResponse.results
        setMovieTitle(results)
        const characters = results.map((result) => result.characters)
            .map((url) => {
                return fetch(url).then(response => response.json())
            })
        return Promise.all(characters)
    })


function setMovieTitle(movie) {
    return setMovie(movie)
}

function getCharacters() {

}

