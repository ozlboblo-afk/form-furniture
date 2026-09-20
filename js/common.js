const drawerButton = document.querySelector(".drawerButton");
const headerMenu = document.querySelector(".headerNav");
const drawerOverlay = document.querySelector(".drawerOverlay");

drawerButton.addEventListener("click", () => {
  const isOpen = headerMenu.classList.toggle("is-open");

  drawerButton.classList.toggle("is-open", isOpen);
  drawerOverlay.classList.toggle("is-open", isOpen);

  document.body.classList.toggle("is-fixed", isOpen);

  drawerButton.setAttribute("aria-expanded", isOpen);
});

drawerOverlay.addEventListener("click", closeDrawer);

document.querySelectorAll(".headerNav a").forEach((link) => {
  link.addEventListener("click", closeDrawer);
});

function closeDrawer() {
  headerMenu.classList.remove("is-open");
  drawerButton.classList.remove("is-open");
  drawerOverlay.classList.remove("is-open");

  document.body.classList.remove("is-fixed");

  drawerButton.setAttribute("aria-expanded", "false");
}
