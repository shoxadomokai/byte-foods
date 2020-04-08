![](./img/landscape-logo-black.svg)

# About Byte Foods

[Byte Foods](https://www.behance.net/gallery/94994769/Byte-Foods-Branding-Concept?share=1) is a concept brand which I created as a case study on my Behance page.

## The Website

The site utilises fetch API to retrieve the relevant page and anime.js to create custom navigations not possible with traditional routing.

### How it Works

The names of the links are currently set to match the names of the html files (Although you can overide this by using an if-else or switch statement) and a single event listener is added to the navbar.

Using event.target we pass the link to the fetch API which retrieves the new page.

Once the new page is loaded, the old page is animated out and the new page is animated in. The Promises embedded in the fetch API make it possible to add page loading animations as well (coming soon maybe).
