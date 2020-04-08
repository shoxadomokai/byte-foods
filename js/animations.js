export const loadAnimation = () => {
  anime
    .timeline({
      easing: "easeOutExpo",
    })
    .add({
      targets: ".navigation",
      opacity: 1,
    })
    .add(
      {
        targets: ".logo img",
        translateX: [-150, 0],
        delay: 1000,
        opacity: [0, 1],
      },
      "-=1000"
    )
    .add({
      targets: ".btn-group .btn",
      opacity: [0, 1],
      translateX: [500, 0],
      delay: anime.stagger(200),
    })
    .add({
      targets: ".menu-icon .line",
      translateX: [500, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      complete: (anim) => {
        for (let line of document.querySelectorAll(".menu-icon .line")) {
          line.removeAttribute("style");
        }
      },
    })
    .add({
      targets: ".content-wrapper .title",
      translateY: [500, 0],
      opacity: [0, 1],
      delay: 500,
    })
    .add({
      targets: ".content-wrapper .image",
      translateY: [-500, 0],
      opacity: [0, 1],
      delay: anime.stagger(500),
      duration: 2000,
    })
    .add(
      {
        targets: ".content-list .content-link",
        translateY: [500, 0],
        opacity: [0, 1],
        delay: anime.stagger(500),
        duration: 2000,
      },
      "-=3500"
    );
};
