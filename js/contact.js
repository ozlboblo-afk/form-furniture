/* =========================
   Contact Form
========================= */

const contactForm = document.querySelector(".contactFormBody");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    window.location.href = "/thanks.html";
  });
}
