// Find all sub-menus.
const subMenus = document.querySelectorAll(".main-nav ul ul");
// Find all sub-menu trigger buttons. */
const menuTriggers = document.querySelectorAll(".menu-trigger");

// Hide all sub-menus.
subMenus.forEach((subMenu) => {
  subMenu.classList.add("hide");
});

/**
 * Toggle sub-menu open/closed.
 * @param {DOM node} parent
 * @param {boolean} status
 */
const toggleMenu = (parent, status) => {
  const trigger = parent.querySelector("button");
  const subMenu = parent.querySelector("ul");
  const sectionName = parent.getAttribute("data-section");

  if (status == "false") {
    parent.classList.add("open");
    subMenu.classList.remove("hide");
    trigger.setAttribute("aria-expanded", "true");
    trigger.setAttribute("aria-label", `Close ${sectionName} menu.`);
  } else {
    parent.classList.remove("open");
    subMenu.classList.add("hide");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-label", `Open ${sectionName} menu.`);
  }
};

// For each trigger button:
// - add a down-arrow
// - set aria attributes
// - add event listener
menuTriggers.forEach((trigger) => {
  trigger.classList.add("sub");
  const sectionName = trigger.parentElement.getAttribute("data-section");

  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-label", `Open ${sectionName} menu.`);
  trigger.addEventListener("click", function () {
    const parent = trigger.parentElement;
    const status = trigger.getAttribute("aria-expanded");
    toggleMenu(parent, status);
  });
});

// Closes sub-menus when user clicks on a menu item.
subMenus.forEach((subMenu) => {
  subMenu.querySelectorAll("li").forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
      const openSubMenu = document.querySelector(".main-nav ul ul:not(.hide)");
      if (openSubMenu) {
        toggleMenu(openSubMenu.parentElement, "true");
      }
    });
  });
});

// Close sub-menus when user tabs outside menu.
document.addEventListener("focusin", (e) => {
  let currentSubMenu = document.querySelector(".open");
  if (currentSubMenu && e.target.closest(".has-sub-menu") !== currentSubMenu) {
    toggleMenu(currentSubMenu, true);
  }
});

// Close sub-menus when user clicks outside menu.
document.addEventListener("click", (e) => {
  let currentSubMenu = document.querySelector(".open");
  if (currentSubMenu && e.target.closest(".has-sub-menu") !== currentSubMenu) {
    toggleMenu(currentSubMenu, true);
  }
});

// Card flip
document.addEventListener("DOMContentLoaded", (event) => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const card = checkbox.nextElementSibling;
      const frontFace = card.querySelector(".front");
      const backFace = card.querySelector(".back");

      // Check if the card is flipped to the back
      if (checkbox.checked) {
        frontFace.style.opacity = "0";
        setTimeout(() => {
          frontFace.style.visibility = "hidden";
          backFace.style.visibility = "visible";
          backFace.style.opacity = "1";
        }, 400); // Delay the visibility change by 0.4s
      } else {
        backFace.style.opacity = "0";
        setTimeout(() => {
          backFace.style.visibility = "hidden";
          frontFace.style.visibility = "visible";
          frontFace.style.opacity = "1";
        }, 400); // Delay the visibility change by 0.4s
      }
    });
  });
});

// Theme Toggle

const themeToggle = document.getElementById("theme-toggle");

// Apply the saved theme when the page loads
window.addEventListener("load", function () {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.src = "image/lightmode.png";
  } else if (savedTheme === "light") {
    document.body.classList.remove("dark-theme");
    themeToggle.src = "image/darkmode.png";
  }
});

// Define light and dark color schemes
const lightScheme = {
  "--clr-background-primary": "hsl(0, 0%, 97%)",
  "--clr-background-secondary": "hsl(0, 0%, 87%)",
  "--clr-background-tertiary": "hsl(0, 0%, 77%)",
  "--clr-text-tertiary": "hsl(0, 0%, 47%)",
  "--clr-text-secondary": "hsl(0, 0%, 37%)",
  "--clr-text-primary": "hsl(0, 0%, 7%)",
};

const darkScheme = {
  "--clr-background-primary": "hsl(0, 0%, 7%)",
  "--clr-background-secondary": "hsl(0, 0%, 37%)",
  "--clr-background-tertiary": "hsl(0, 0%, 47%)",
  "--clr-text-tertiary": "hsl(0, 0%, 77%)",
  "--clr-text-secondary": "hsl(0, 0%, 87%)",
  "--clr-text-primary": "hsl(0, 0%, 97%)",
};

// Apply the color scheme based on the user's system preference
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  applyColorScheme(darkScheme);
  themeToggle.src = "image/lightmode.png";
} else {
  applyColorScheme(lightScheme);
  themeToggle.src = "image/darkmode.png";
}

themeToggle.addEventListener("click", function () {
  if (document.body.classList.contains("dark-theme")) {
    applyColorScheme(lightScheme);
    themeToggle.src = "image/darkmode.png";
    localStorage.setItem("theme", "light");
  } else {
    applyColorScheme(darkScheme);
    themeToggle.src = "image/lightmode.png";
    localStorage.setItem("theme", "dark");
  }
  document.body.classList.toggle("dark-theme");
});

// Function to apply a color scheme
function applyColorScheme(scheme) {
  for (let color in scheme) {
    document.documentElement.style.setProperty(color, scheme[color]);
  }
}
