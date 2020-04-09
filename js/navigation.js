const navList = document.getElementById("nav-list");
var iso = new Isotope(".grid", {
  itemSelector: ".box",
  layoutMode: "fitRows",
  percentPosition: true,
  fitRows: {
    gutter: 32,
  },
});
iso.arrange({
  filter: `.${document
    .querySelector(".content-link.active")
    .textContent.toLowerCase()}`,
});

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
    console.log(`.${event.target.textContent.toLowerCase()}`);
    iso.arrange({ filter: `.${event.target.textContent.toLowerCase()}` });
  });
};

export const fetchPage = () => {
  navList.addEventListener("click", (event) => {
    animatePages(event.target);
  });
};

const links = document.querySelectorAll(".nav-links");
const getPage = async (element, isWindowNav) => {
  // let baseURL = window.location.href;
  let linkName = element.textContent.toLowerCase();
  const response = await fetch(`./${linkName}.html`, {
    method: "GET",
  });

  // assign the page_id to the index of the active link
  const state = { page_id: Array.prototype.indexOf.call(links, element) };
  // add a new history state to the browser with the new link
  if (!isWindowNav) {
    history.pushState(state, linkName, `${linkName}.html`);
  }

  try {
    const page = await response.text();
    var parser = new DOMParser();
    return parser.parseFromString(page, "text/html");
  } catch (error) {
    console.log("error", error);
  }
};

window.onpopstate = function (event) {
  let id = `${JSON.stringify(event.state.page_id)}`;
  animatePages(links[id], true);
};

const animatePages = async (elem, isWindowNav) => {
  for (let link of elem.parentNode.childNodes) {
    if (link.classList) {
      link.classList.remove("active");
    }
  }
  elem.classList.add("active");

  const newPage = await getPage(elem, isWindowNav);
  let duration = 700;

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
};
