//Holds the images
const images = [
    "images/angelcinnamoroll.jpg",
    "images/angelhellokitty.jpg",
    "images/angelkuromi.jpg",
    "images/angelmelody.jpg"
]

let currentIndex = 0;

function showSlide (index) {
    const slide = document.getElementById("slide");
    slide.src = images[index];
}

//Moves to the next slide
function next() {
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
}

//Moves to the previous
function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showSlide(currentIndex);
}

window.onload = () => {
    showSlide(currentIndex);
};