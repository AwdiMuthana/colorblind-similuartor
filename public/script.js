// Script for handling modal window
const openModalBtn = document.getElementById("openModalBtn");
const backendModal = document.getElementById("backendModal");
const closeModalBtn = document.querySelector(".close-btn");

// Open modal
openModalBtn.addEventListener("click", () => {
  backendModal.style.display = "block";
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  backendModal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === backendModal) {
    backendModal.style.display = "none";
  }
});

// Script for handling popup window
function openPopup() {
  const popupWindow = document.querySelector(".popup-window");
  popupWindow.style.display = "block";
}

document
  .querySelector(".popup-window .close-btn")
  .addEventListener("click", () => {
    document.querySelector(".popup-window").style.display = "none";
  });

// Script for mobile menu toggle
const mobileMenu = document.getElementById("mobile-menu");
const navbarMenu = document.getElementById("navbar-menu");

mobileMenu.addEventListener("click", () => {
  navbarMenu.classList.toggle("active");
});

// Tab functionality
const tabItems = document.querySelectorAll(".tab-item");
const tabContentItems = document.querySelectorAll(".tab-content-item");

// Select tab content
function selectItem(e) {
  removeBorder();
  removeShow();
  // Add border to current tab
  this.classList.add("tab-border");
  // Grab content item from DOM
  const tabContentItem = document.querySelector(`#${this.id}-content`);
  // Add show class
  tabContentItem.classList.add("show");
}

// Remove bottom borders
function removeBorder() {
  tabItems.forEach((item) => item.classList.remove("tab-border"));
}

// Remove show class
function removeShow() {
  tabContentItems.forEach((item) => item.classList.remove("show"));
}

// Listen for tab click
tabItems.forEach((item) => item.addEventListener("click", selectItem));
