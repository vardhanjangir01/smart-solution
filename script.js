const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        navToggle.classList.remove("active");
    });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            const headerHeight = document.querySelector(".header").offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });
        }
    });
});

const header = document.querySelector(".header");
window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
        header.style.boxShadow = "0 5px 30px rgba(0,0,0,0.15)";
    } else {
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.08)";
    }
});

const fadeElements = document.querySelectorAll(
    ".service-card, .product-card, .problem-card, .about-item,.review-card",
);

const fadeObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

fadeElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    fadeObserver.observe(el);
});

const statNumbers = document.querySelectorAll(".stat-number");
let statsAnimated = false;

function animateStats() {
    statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-target"));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target.toLocaleString() + "+";
            }
        };
        updateCounter();
    });
}

const statsSection = document.querySelector(".stats");

const statsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !statsAnimated) {
                animateStats();
                statsAnimated = true;
            }
        });
    },
    { threshold: 0.5 },
);

if (statsSection) {
    statsObserver.observe(statsSection);
}

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    const headerHeight = document.querySelector(".header").offsetHeight;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
});

document.querySelectorAll(".area-tag").forEach((tag) => {
    tag.addEventListener("click", function () {
        const ctaSection = document.getElementById("cta");
        const headerHeight = document.querySelector(".header").offsetHeight;
        window.scrollTo({
            top: ctaSection.offsetTop - headerHeight,
            behavior: "smooth",
        });
    });
});
