//Todo: Theme of website
document
  .getElementById("outside-border")
  .addEventListener("click", function () {
    document.body.classList.toggle("light-theme");
  });

//Todo: Form to get info JS.
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const inquiryType = document.getElementById("inquiryType").value;

  const formData = {
    name: name,
    email: email,
    phone: phone,
    inquiryType: inquiryType,
  };

  console.log(JSON.stringify(formData, null, 2));
});

//Todo: Project Image Scroll control.
const scrollContainer = document.querySelector(".scroll-container");
const scrollImages = document.querySelector(".scroll-images");
let autoScrollTimeout;
let isUserScrolling = false;
let scrollEndTimeout;
const scrollWidth = scrollImages.scrollWidth / 2; // Half of the duplicated image width

// Stop auto-scroll function
function stopAutoScroll() {
  scrollImages.style.animationPlayState = "paused";
  clearTimeout(autoScrollTimeout); // Reset any pending auto-scroll resumes
}

// Resume auto-scroll after 2 seconds
function resumeAutoScroll() {
  clearTimeout(autoScrollTimeout); // Clear any existing timeouts
  autoScrollTimeout = setTimeout(() => {
    scrollImages.style.animationPlayState = "running";
  }, 2000); // Resume auto-scroll after 2 seconds
}

// Handle when the user manually scrolls (both start and stop)
function handleUserScrollStart() {
  stopAutoScroll(); // Pause auto-scroll when user starts scrolling manually
  isUserScrolling = true; // Indicate that the user is scrolling manually
}

// Detect when the user stops manual scrolling and restart auto-scroll after 2 seconds
function handleUserScrollEnd() {
  clearTimeout(scrollEndTimeout);
  scrollEndTimeout = setTimeout(() => {
    isUserScrolling = false; // User stopped scrolling
    resumeAutoScroll(); // Resume auto-scroll after 2s
  }, 2000); // 2 seconds debounce after user stops scrolling
}

// Loop scroll back to the beginning or end if the user scrolls past the duplicated images
function checkScrollPosition() {
  if (scrollContainer.scrollLeft >= scrollWidth) {
    // Scroll back to the start seamlessly when scrolling to the right
    scrollContainer.scrollLeft = 0;
  } else if (scrollContainer.scrollLeft <= 0) {
    // Scroll to the end of the duplicated images when scrolling to the left
    scrollContainer.scrollLeft = scrollWidth;
  }
}

// Mouse and touch event listeners to stop/restart auto-scroll
scrollContainer.addEventListener("mousedown", handleUserScrollStart);
scrollContainer.addEventListener("mouseup", handleUserScrollEnd);

scrollContainer.addEventListener("touchstart", handleUserScrollStart);
scrollContainer.addEventListener("touchend", handleUserScrollEnd);

// Detect manual scrolling using scroll events
scrollContainer.addEventListener("scroll", () => {
  clearTimeout(scrollEndTimeout);
  handleUserScrollStart(); // Pause auto-scroll while user is scrolling
  checkScrollPosition(); // Check and reset scroll position for infinite scrolling
  handleUserScrollEnd(); // Detect scroll stop and debounce auto-scroll restart
});
