import { selectDish, hoverEffects, fetchPage } from "./js/navigation.js";
import { loadAnimation } from "./js/animations.js";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  menuToggle.addEventListener("click", function () {
    this.parentElement.classList.toggle("open");
  });

  selectDish();
  hoverEffects();
  fetchPage();
  //   loadAnimation();
});
