const $main = document.querySelector("main")

const starWarsIdMap = {
    1: 4,
    2: 5,
    3: 6,
    4: 1,
    5: 2,
    6: 3,
    // Etc., could also be titles or whatever else too
}

function setMovieInnerHTML(object) {
    const $div = document.createElement("div")

    $div.innerHTML = `
    <div class="movie">
        <a href="movie.html?movie=${object.episode_id}">${object.title}</a>
        <time>${buildDate(object.release_date)}</time>

        <h2>Characters</h2>
    </div>
    `
    $main.append($div)
}

const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
const query = queryString.get('movie')
const newId = starWarsIdMap[query]
window.fetch(`https://swapi.dev/api/films/${newId}`)
    .then((response) => response.json())
    .then((parsedResponse) => {
        const movieObject = parsedResponse
        setMovieInnerHTML(movieObject)
        console.log(movieObject)
        const characters = movieObject.characters.map((element) => {
            return fetch(element).then(response => response.json())
        })
        return Promise.all(characters)
    }).then(response => {
        const savedResponse = response
        setCharacters(savedResponse)
        console.log(savedResponse)
    })

function setCharacters(array) {
    const $movie = document.querySelector(".movie")

    const $ul = document.createElement("ul")
    $ul.classList.add("characters")
    $movie.append($ul)

    for (const element of array) {
        const $li = document.createElement("li")
        $li.textContent = element.name
        $ul.append($li)
    }
}

function buildDate(date) {
    const monthMap = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "Jun",
        7: "Jul",
        8: "Aug",
        9: "Sept",
        10: "Oct",
        11: "Nov",
        12: "Dec",
        // Etc., could also be titles or whatever else too
    }
    const year = date.slice(0, 4)
    const month = +date.slice(5, 7)
    const day = date.slice(8, 9)
    const newId = monthMap[month]

    return `${newId} ${day}, ${year}`
}


