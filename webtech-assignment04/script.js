
let markdown = document.getElementById("markdown");
let slide = document.getElementById("slide");
let leftBtn = document.getElementById("leftBtn");
let rightBtn = document.getElementById("rightBtn");
let fullBtn = document.getElementById("fullBtn");
let slideCount = document.getElementById("slideCount");

let slides = [];
let currentSlide = 0;

// Show slides from Markdown
function updateSlides() {
    slides = markdown.value.split("---");

    if (currentSlide >= slides.length) {
        currentSlide = slides.length - 1;
    }

    showSlide();
}

// Show the current slide
function showSlide() {
    let content = slides[currentSlide];
    let lines = content.split("\n");
    let html = "";

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        if (line.startsWith("### ")) {
            html += "<h3>" + line.substring(4) + "</h3>";
        }
        else if (line.startsWith("## ")) {
            html += "<h2>" + line.substring(3) + "</h2>";
        }
        else if (line.startsWith("# ")) {
            html += "<h1>" + line.substring(2) + "</h1>";
        }
        else if (line.startsWith("- ")) {
            html += "<p>• " + line.substring(2) + "</p>";
        }
        else if (line !== "") {
            html += "<p>" + line + "</p>";
        }
    }

    slide.innerHTML = html;

    slideCount.innerText =
        (currentSlide + 1) + " / " + slides.length;

    leftBtn.disabled = currentSlide === 0;
    rightBtn.disabled = currentSlide === slides.length - 1;
}

// Previous slide
leftBtn.addEventListener("click", function () {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide();
    }
});

// Next slide
rightBtn.addEventListener("click", function () {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide();
    }
});

// Update preview when text changes
markdown.addEventListener("input", function () {
    updateSlides();
});

// Save slides
function saveSlides() {
    localStorage.setItem("mySlides", markdown.value);
    alert("Slides saved!");
}

function presentSlides() {
    document.body.classList.add("presenting");

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(function () {
            // Presentation mode can still work without full screen.
        });
    }
}

// Full screen
fullBtn.addEventListener("click", function () {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullBtn.innerText = "Exit Full Screen";
    } else {
        document.exitFullscreen();
        fullBtn.innerText = "Full Screen";
    }
});

// Keyboard shortcuts
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        saveSlides();
    }

    if (event.key === "ArrowLeft" && currentSlide > 0) {
        currentSlide--;
        showSlide();
    }

    if (event.key === "ArrowRight" &&
        currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide();
    }

    if (event.key === "F11") {
        event.preventDefault();

        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
});

// Load saved slides
let savedSlides = localStorage.getItem("mySlides");

if (savedSlides !== null) {
    markdown.value = savedSlides;
}

// Start the application
updateSlides();

document.addEventListener("fullscreenchange", function () {
    if (!document.fullscreenElement) {
        document.body.classList.remove("presenting");
    }
});
