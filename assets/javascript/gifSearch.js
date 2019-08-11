const topics = ["Hannibal Buress", "Amy Pohler", "John Mullaney"];

renderButtons();
queryClick();

//sets up the event listener for adding search terms
document.getElementById("button-addon2").addEventListener("click", function () {
    let searchItem;
    searchItem = document.getElementById("search-bar").value;
    if (searchItem !== "") {
        topics.push(searchItem);
        renderButtons();
        queryClick();
    }
})

//adds the search terms
function renderButtons() {
    document.getElementById("query-buttons").innerHTML = "";
    topics.forEach(function (item) {
        button = document.createElement("button");
        button.classList.add("btn", "btn-outline-warning", "mr-1", "query-button");
        button.innerText = item;
        document.getElementById("query-buttons").append(button);
    })
}

//sets up the event listener for the gify API query
function queryClick() {
    document.querySelectorAll(".query-button").forEach(function (node) {
        node.addEventListener("click", function (event) {
            querySearch();
        })
    })
}

//executes the search query
function querySearch() {
    let query = event.target.innerText;
    const queryURL = "https://api.giphy.com/v1/gifs/search?api_key=EBEbmryRHsMs8j6Vmrpesd0DPbM5wOyi&q=" + query + "&limit=10&offset=0&rating=G&rating=PG&lang=en";
    console.log(queryURL);
    fetch(queryURL)
        .then(function (result) {
            return result.json();
        }).then(function (responseJson) {
            console.log(responseJson);
            let data = responseJson.data;

            document.getElementById("gif-div").innerHTML = "";

            data.forEach(function (item) {
                createGifElements(item.rating, item.images.fixed_height_still.url, item.images.fixed_height.url);
            })
        })
}

//creates the giphs and click to play/pause functionality
function createGifElements(rating, gifStill, gifMoving) {


    card = document.createElement("div");
    card.classList.add("card", "mr-3", "mb-3", "text-white", "bg-dark");

    gif = document.createElement("img");
    gif.setAttribute("src", gifStill);
    gif.setAttribute("data-still", gifStill);
    gif.setAttribute("data-moving", gifMoving);
    gif.setAttribute("data-state", "still");
    gif.classList.add("gif", "card-img-top");

    card.append(gif);

    cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.append(cardBody);

    ratingEl = document.createElement("p");
    ratingEl.classList.add("card-text")
    ratingEl.innerText = "Rating: " + rating;
    cardBody.append(ratingEl);


    document.getElementById("gif-div").append(card);

    gif.addEventListener("click", function (event) {
        let state = event.target.getAttribute("data-state");
        if (state === "still") {
            event.target.setAttribute("src", gifMoving);
            event.target.setAttribute("data-state", "moving");
        }
        else if (state = "moving") {
            event.target.setAttribute("src", gifStill);
            event.target.setAttribute("data-state", "still");
        }
    })

}
