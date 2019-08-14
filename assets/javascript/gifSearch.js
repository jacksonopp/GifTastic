const topics = ["Hannibal Buress", "Amy Pohler", "John Mullaney", "Chris Rock", "Jerry Seinfeld", "Kevin Hart", "George Carlin", "Eddie Murphy", "Dave Chappelle", "Richord Pryor"];

//sets up the state of the auto-play toggle
let movingToggle = document.getElementById("moving-toggle");
movingToggle.setAttribute("data-state", "off");

//sets up the state of if gifs are loaded
let gifsLoaded = false;

//sets up the toggle function (so that it's visible in the html)
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

//runs the essential functions
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
        node.addEventListener("click", function () {
            querySearch();
            gifsLoaded = true;
            console.log(gifsLoaded);
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

            //actually renders the image
            data.forEach(function (item) {
                createGifElements(item.rating, item.images.fixed_height_still.url, item.images.fixed_height.url, item.url);
            })
            //actually executes the play-all function on click, but only after all the gifs are rendered
            document.getElementById("moving-toggle").addEventListener("click", function () {
                    playAll();
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

    //sees if the gifs should be moving when rendered
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

    //adds click to play/pause functionality
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

//plays and pauses all gifs at the same time
function playAll() {
    let toggleState = document.getElementById("moving-toggle").getAttribute("data-state");
    let gifs = document.querySelectorAll("img");
    gifs.forEach(function(node) {
        const gifMoving = node.getAttribute("data-moving");
        const gifStill = node.getAttribute("data-still");
        if (toggleState === "on") {
            node.setAttribute("src", gifMoving);
            node.setAttribute("data-state", "moving");

        } else if (toggleState === "off") {
            node.setAttribute("src", gifStill);
            node.setAttribute("data-state", "still");
        }
    })
    // console.log(toggleState);
}