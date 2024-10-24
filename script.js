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

  const url = "https://app-jfabyc8k.b4a.run/api/mail"; // this is my final api endpoint.

  const formData = {
    name: name,
    email: email,
    phone: phone,
    inquiryType: inquiryType,
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // Removed Access-Control-Allow-Origin header

  var raw = JSON.stringify(formData);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include", // Include credentials if needed (e.g., for sessions)
  };

  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json(); // Assuming your API returns JSON
    })
    .then((result) => console.log(result))
    .catch((error) => console.log("Error:", error));
});

//Todo: Project Image Scroll control.
const scrollContainer = document.querySelector(".scroll-container");
const scrollImages = document.querySelector(".scroll-images");
let autoScrollTimeout;
let isUserScrolling = false;
let scrollEndTimeout;
const scrollWidth = scrollImages.scrollWidth / 2; // Total scrollable width

// Stop auto-scroll function
function stopAutoScroll() {
  scrollImages.style.animationPlayState = "paused";
  clearTimeout(autoScrollTimeout);
}

// Resume auto-scroll after 2 seconds
function resumeAutoScroll() {
  clearTimeout(autoScrollTimeout);
  autoScrollTimeout = setTimeout(() => {
    scrollImages.style.animationPlayState = "running";
  }, 2000);
}

// Handle when the user manually scrolls (both start and stop)
function handleUserScrollStart() {
  stopAutoScroll();
  isUserScrolling = true;
}

// Detect when the user stops manual scrolling and restart auto-scroll after 2 seconds
function handleUserScrollEnd() {
  clearTimeout(scrollEndTimeout);
  scrollEndTimeout = setTimeout(() => {
    isUserScrolling = false;
    resumeAutoScroll();
  }, 2000);
}

// Loop scroll back to the beginning or end if the user scrolls past the duplicated images
function checkScrollPosition() {
  if (scrollContainer.scrollLeft >= scrollWidth) {
    // Reset to the start
    scrollContainer.scrollLeft = scrollWidth / 2; // Jump back to the middle of the first set
  } else if (scrollContainer.scrollLeft <= 0) {
    // Jump to the end of the first set
    scrollContainer.scrollLeft = scrollWidth / 2; // Jump to the middle of the second set
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
  handleUserScrollStart();
  checkScrollPosition();
  handleUserScrollEnd();
});

// Start auto-scrolling
scrollImages.style.animation = "scroll 20s linear infinite"; // Adjust timing as needed
