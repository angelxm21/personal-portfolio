// ===============================
// MOBILE NAVIGATION
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });
}


// ===============================
// CLOSE MOBILE MENU ON CLICK
// ===============================

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu?.classList.remove("active");
        menuToggle?.classList.remove("active");
    });
});

// ===============================
// DARK / LIGHT THEME TOGGLE
// ===============================

const themeButton = document.querySelector("#themeButton");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeButton.textContent = "☀️";
}

// Toggle theme
if (themeButton) {
    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("dark-theme");

        const isDark =
            document.body.classList.contains("dark-theme");

        // Change button icon
        themeButton.textContent = isDark ? "☀️" : "🌙";

        // Save preference
        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );
    });
}


// ===============================
// ACTIVE NAVIGATION LINK
// ===============================

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

const revealElements = document.querySelectorAll(
    ".reveal, .project-card, .skill-card, .about-content, .contact-content"
);

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {
    element.classList.add("hidden");
    revealObserver.observe(element);
});


// ===============================
// CONTACT FORM
// ===============================

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        const name = document.querySelector("#name")?.value.trim();
        const email = document.querySelector("#email")?.value.trim();
        const message = document.querySelector("#message")?.value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all the fields.");
            return;
        }

        alert(`Thank you, ${name}! Your message has been received.`);

        contactForm.reset();
    });
}


// ===============================
// CURRENT YEAR IN FOOTER
// ===============================

const yearElement = document.querySelector("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ===============================
// SCROLL TO TOP BUTTON
// ===============================

const scrollTopButton = document.querySelector("#scroll-top");

if (scrollTopButton) {

    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            scrollTopButton.classList.add("show");
        } else {
            scrollTopButton.classList.remove("show");
        }
    });

    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// ===============================
// TYPING EFFECT
// ===============================

const typingElement = document.querySelector(".typing");

if (typingElement) {

    const words = [
        "Computer Science Student",
        "Web Developer",
        "UI/UX Enthusiast",
        "Problem Solver"
    ];

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {
            typingElement.textContent =
                currentWord.substring(0, characterIndex + 1);

            characterIndex++;

            if (characterIndex === currentWord.length) {
                deleting = true;

                setTimeout(typeEffect, 1500);
                return;
            }

        } else {

            typingElement.textContent =
                currentWord.substring(0, characterIndex - 1);

            characterIndex--;

            if (characterIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, deleting ? 60 : 100);
    }

    typeEffect();
}
