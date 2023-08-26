document.addEventListener("DOMContentLoaded", function () {
  const toggleThemeButton = document.getElementById("toggleTheme");

  toggleThemeButton.addEventListener("click", function () {
    const body = document.body;

    if (body.classList.contains("theme-dark")) {
      body.classList.remove("theme-dark");
      // Add light theme class and modify variables
    } else {
      body.classList.add("theme-dark");
    }
  });
});
