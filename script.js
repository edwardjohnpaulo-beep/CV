const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const scrollTopBtn = document.getElementById("scrollTop");
const preloader = document.getElementById("preloader");
const contactForm = document.getElementById("contact-form");
const yearEl = document.getElementById("year");

const EMAILJS_PUBLIC_KEY = "kF9UbAjEFsKjFxohi";
const EMAILJS_SERVICE = "service_3drpftj";
const EMAILJS_TEMPLATE = "template_fxp52wq";
const EMAILJS_TEMPLATE_AUTOREPLY = "template_autoreply";

document.addEventListener("DOMContentLoaded", () => {
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light");
    themeToggle.textContent = "☀️";
  }

  if (window.emailjs) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
});

themeToggle.addEventListener("click", () => {
  const isLight = body.classList.toggle("light");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 200 ? "flex" : "none";
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(contactForm).entries());
    data.time = new Date().toLocaleString();

    emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, data)
      .then(() => {
        alert("✅ Message sent!");
        contactForm.reset();

        emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_AUTOREPLY, {
          user_name: data.user_name,
          user_email: data.user_email,
          message: "Thank you for contacting me! I will reply as soon as possible.",
          time: data.time
        });
      })
      .catch(() => alert("❌ Failed to send message."));
  });
}

window.addEventListener("load", () => {
  preloader.style.opacity = 0;
  setTimeout(() => preloader.style.display = "none", 400);
});
