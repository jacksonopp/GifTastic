const topics = ["Hannibal Buress", "Amy Pohler", "John Mullaney"];

document.getElementById("button-addon2").addEventListener("click", function() {
    let searchItem;
    searchItem = document.getElementById("search-bar").value;
    if (searchItem !== ""){
    topics.push(searchItem);
    renderButtons();
    }
})

function renderButtons() {
    document.getElementById("query-buttons").innerHTML = "";
    topics.forEach(function(item) {
        button = document.createElement("button");
        button.classList.add("btn", "btn-outline-secondary", "mr-1");
        button.innerText = item;
        document.getElementById("query-buttons").append(button);
    })
}
    // < button type = "button" class="btn btn-outline-secondary" > Primary</button >
