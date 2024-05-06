/***
 * A data attribute data-carousel-button has been declared and assigned in the
 * html. By being present we can use a querySelectorAll to easily select it instead
 * of having to use a class. This helps to avoid possible future overlap among classes and js ***/
const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    /* button.dataset.carouselButton is supposed to access the value of the
     * data-carousel-attribute assigned to each button in index.html which
     * is either prev or next. Offset will be assigned a value of 1 if it is
     * next otherwise it will be assigned -1 */
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;

    /* assigns slides the element found at the current button closest
     * carousel. which should just be the neighboring element tbh. but it is
     * accessed this way to MAINTAIN FUNCTIONALITY despite the amount of
     * carousel pages we may have. 'working from inside out' */
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const menuPrices = button
      .closest(".mini-menu")
      .querySelector(".menu-prices-container").children[1];

    /* whatever slide is active*/
    const activeSlide = slides.querySelector("[data-active]");

    /* newIndex is the index of
     * converts the slides children into an array and gets the value of the
     * index of the activeSlide it will then add the offset that was either
     * 1 or -1. The index is assigned to newIndex */
    let oldIndex = [...slides.children].indexOf(activeSlide);
    menuPrices.children[oldIndex].setAttribute("style", "color:white;");

    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    menuPrices.children[newIndex].setAttribute("style", "color: red;");
    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});
