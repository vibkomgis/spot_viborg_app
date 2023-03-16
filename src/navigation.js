const sidebar = document.getElementById("mySidebar");
const button = document.getElementById("openbtn");

// When the button is clicked, open the navigation bar
button.addEventListener("click", openNav);

// Close the navigation bar when clicking outside
document.addEventListener("click", closeNavOnClickOutside);

// Function to open the navigation bar
function openNav() {
  sidebar.style.width = "250px";
  button.style.zIndex = "1900";
}

// Function to close the navigation bar
function closeNav() {
  sidebar.style.width = "0";
  button.style.zIndex = "2100";
}

// Function to handle clicks outside the navigation bar
function closeNavOnClickOutside(event) {
  if (!sidebar.contains(event.target) && event.target !== button) {
    closeNav();
  }
}
