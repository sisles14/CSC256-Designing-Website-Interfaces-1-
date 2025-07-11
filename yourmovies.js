const movieList = [];

// Prompts user to input movies
function addMovie() {
    const input = document.getElementById('movieInput');
    const title = input.value.trim();

    if (title !== "") {
        movieList.push(title);
        input.value = "";
        alert(`"${title}" added to list.`);
    } else {
        alert("Please enter a movie title.")
    }
}

// Displays sorted movie list
function displayList() {
    const display = document.getElementById('movieDisplay');
    const sortedList = [...movieList].sort();
    display.innerHTML = "<strong>Sorted Movie Titles:</strong><br>" + sortedList.join("<br>"); 
}

// Resets movie list
function resetList() {
    movieList.length = 0;
    document.getElementById('movieDisplay').innerHTML = "";
    alert("Your Movie list has been reset")
}

// Allow Enter key to act like clicking "Add"
document.getElementById("movieInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addMovie();             
  }
});
