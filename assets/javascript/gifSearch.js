const topics = ["Hannibal Buress", "Amy Pohler", "John Mullaney", "Chris Rock", "Jerry Seinfeld", "Kevin Hart", "George Carlin", "Eddie Murphy", "Dave Chappelle", "Richord Pryor"];

let movingToggle = document.getElementById("moving-toggle");
movingToggle.setAttribute("data-state", "off");

function movingToggleCheck() {
    movingToggle.addEventListener("click", function () {
        let movingState = event.target.getAttribute("data-state");
        if (movingState === "off") {
            event.target.setAttribute("data-state", "on");
        } else if (movingState === "on") {
            event.target.setAttribute("data-state", "off");
        }
    })
}

movingToggleCheck();
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
        button.classList.add("btn", "btn-outline-warning", "mr-1", "mb-1", "query-button");
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
                createGifElements(item.rating, item.images.fixed_height_still.url, item.images.fixed_height.url, item.url);
            })
        })
}

//creates the giphs and click to play/pause functionality
function createGifElements(rating, gifStill, gifMoving, giphyURL) {


    card = document.createElement("div");
    card.classList.add("card", "mr-3", "mb-3", "text-white", "bg-dark");

    gif = document.createElement("img");
    gif.setAttribute("data-still", gifStill);
    gif.setAttribute("data-moving", gifMoving);


    if (movingToggle.getAttribute("data-state") === "off") {
        gif.setAttribute("src", gifStill);
        gif.setAttribute("data-state", "still");
    } else if (movingToggle.getAttribute("data-state") === "on") {
        gif.setAttribute("src", gifMoving);
        gif.setAttribute("dta-state", "moving");
    }

    gif.classList.add("gif", "card-img-top");

    card.append(gif);

    cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.append(cardBody);

    ratingEl = document.createElement("p");
    ratingEl.classList.add("card-text");
    ratingEl.innerText = "Rating: " + rating;
    cardBody.append(ratingEl);

    linkP = document.createElement("p");
    linkP.classList.add("card-text");
    linkA = document.createElement("a");
    linkA.setAttribute("href", giphyURL);
    linkA.setAttribute("target", "_blank");
    linkA.innerHTML = '<i class="fa fa-external-link" aria-hidden="true"></i>' + " View on Giphy";
    linkP.append(linkA);
    cardBody.append(linkP);


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

