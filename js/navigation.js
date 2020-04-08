const navList = document.getElementById("nav-list");

export const selectDish = () => {
  const contentList = document.getElementById("content-list");
  const contentImages = document.querySelectorAll(".content-image");
  contentList.addEventListener("click", (event) => {
    contentList.querySelector(".active").classList.remove("active");
    event.target.classList.add("active");
    let oldActiveImage = document.querySelector(".active.content-image");
    let newActiveImage;
    for (let contentImage of contentImages) {
      if (
        contentImage.getAttribute("data-patty") ===
        event.target.getAttribute("data-patty")
      ) {
        newActiveImage = contentImage.className;

        setTimeout(
          contentImage.setAttribute("class", oldActiveImage.className),
          700
        );

        oldActiveImage.setAttribute("class", newActiveImage);
      }
    }
  });
};

export const hoverEffects = () => {
  navList.addEventListener("mouseover", (event) => {});
};

export const fetchPage = () => {
  navList.addEventListener("click", async (event) => {
    for (let link of event.target.parentNode.childNodes) {
      if (link.classList) {
        link.classList.remove("active");
      }
    }
    event.target.classList.add("active");

    const newPage = await getPage(event.target.textContent.toLowerCase());
    var duration = 700;
    anime
      .timeline({
        easing: "easeInExpo",
        duration,
        opacity: 0,
      })
      .add({
        targets: ".content-wrapper .title, .content-list",
        translateX: 1500,
      })
      .add(
        {
          targets: ".content-wrapper .image",
          delay: anime.stagger(200),
          translateY: 1500,
          complete: (anim) => {
            // document.querySelector(".hero").remove();
          },
        },
        `-=${duration}`
      );

    setTimeout(() => {
      document.querySelector("main").innerHTML = newPage.querySelector(
        "main"
      ).innerHTML;
      anime
        .timeline({
          easing: "easeOutExpo",
          duration,
          opacity: 0,
        })
        .add({
          targets: ".content-wrapper .title, .content-list",
          translateX: [-1500, 0],
          delay: 800,
        })
        .add(
          {
            targets: ".content-wrapper .image",
            delay: anime.stagger(200),
            translateY: [1500, 0],
            complete: (anim) => {
              selectDish();
            },
          },
          `-=${duration}`
        );
    }, duration);
  });
};

const getPage = async (linkName) => {
  const response = await fetch(`/${linkName}.html`, {
    method: "GET",
  });
  try {
    const page = await response.text();
    var parser = new DOMParser();
    return parser.parseFromString(page, "text/html");
  } catch (error) {
    console.log("error", error);
  }
};
