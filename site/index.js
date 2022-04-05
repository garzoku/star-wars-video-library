
const $ul = document.querySelector("ul")

console.log(addMovieListing())

function addMovieListing() {
    const $lis = document.createElement("li")
    $lis.innerHTML = `
    <div class="movie-listing">
        <a href="movie.html?movie=movie-id-goes-here">Movie Name Goes Here</a>
        <time>Movie release year here goes here</time>
    </div>
    `
    $ul.append($lis)
}