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

  const url =
    "https://myportfolioapi-50022963340.development.catalystappsail.in/api/mail";

  const formData = {
    name: name,
    email: email,
    phone: phone,
    inquiryType: inquiryType,
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const postContent = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(formData),
    redirect: "follow",
  };

  console.log("Sending data:", formData); // Log the data being sent
  fetch(url, postContent)
    .then((response) => {
      console.log("Response received:", response);
      if (response.ok) {
        alert("Your message has been sent successfully");
      } else {
        alert("Error sending message");
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

  console.log(JSON.stringify(formData, null, 2));
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
