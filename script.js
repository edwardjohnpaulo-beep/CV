const EMAILJS_PUBLIC_KEY = "kF9UbAjEFsKjFxohi";
const EMAILJS_SERVICE = "service_3drpftj";
const EMAILJS_TEMPLATE = "template_fxp52wq";
const EMAILJS_TEMPLATE_AUTOREPLY = "template_autoreply";

const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const scrollTopBtn = document.getElementById("scrollTop");
const preloader = document.getElementById("preloader");
const contactForm = document.getElementById("contact-form");
const yearEl = document.getElementById("year");

document.addEventListener("DOMContentLoaded", () => {
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light");
    if (themeToggle) themeToggle.textContent = "☀️";
  }

  if (window.emailjs) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
});

if (themeToggle) {
  themeToggle.onclick = () => {
    const isLight = body.classList.toggle("light");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  };
}

window.addEventListener("scroll", () => {
  if (scrollTopBtn) {
    scrollTopBtn.style.display = window.scrollY > 200 ? "flex" : "none";
  }
});

if (scrollTopBtn) {
  scrollTopBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

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
          message: "Thank you for reaching out! I will get back to you shortly.",
          time: data.time
        });
      })
      .catch(() => alert("❌ Failed to send message."));
  });
}

window.addEventListener("load", () => {
  if (preloader) {
    preloader.style.display = "none";
  }
});

/* Accordion */
document.querySelectorAll(".accordion").forEach(btn => {
  btn.addEventListener("click", () => {
    const panel = btn.nextElementSibling;
    if (!panel) return;
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  });
});