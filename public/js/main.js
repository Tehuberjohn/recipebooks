let themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
let themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

var themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // if set via local storage previously
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});

//Delete ingredient event listener
document
  .getElementById("ingredientList")
  .addEventListener("click", deleteRecipe);

function deleteRecipe(e) {
  if (e.target.matches("a")) {
    e.preventDefault();
    e.path[2].remove();
  }
}

//Add ingredient event listener
document
  .getElementById("addIngredient")
  .addEventListener("click", addIngredient);

function addIngredient() {
  const input = document.getElementById("ingredient").value.trim();
  const id = Math.trunc(Math.random() * 1000 * 123456789);

  //ingredient template
  const ingredient = `
  <tr id="${id}"class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" name="ingredients" class="ingredients pl-2 py-3 px-1/2 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
          ${input}
      <input type="text" id="ingredients" class="hidden" name="ingredients" value="${input}">
      </th>
      <td class="py-3 px-1/2 text-center">
        <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
      </td>
  </tr>
`;
  if (input === "") return;
  document
    .getElementById("ingredientList")
    .insertAdjacentHTML("beforeend", ingredient);

  document.getElementById("ingredient").value = "";
}

//listener to store user scroll location
document.addEventListener("DOMContentLoaded", function (e) {
  let scrollpos = localStorage.getItem("scrollpos");
  if (scrollpos) window.scrollTo(0, scrollpos);
});

window.onbeforeunload = function (e) {
  localStorage.setItem("scrollpos", window.scrollY);
};
