/* =========================
   MOBILE MENU
========================= */

const menuIcon = document.getElementById("menuIcon");
const navbar = document.getElementById("navbar");

menuIcon.addEventListener("click", () => {

    navbar.classList.toggle("active");

    const icon = menuIcon.querySelector("i");

    if (navbar.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* Close menu after clicking link */

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = menuIcon.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/* =========================
   COUNTER ANIMATION
========================= */

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    const statsSection = document.querySelector(".stats");

    const position = statsSection.getBoundingClientRect().top;

    if (position < window.innerHeight) {

        counterStarted = true;

        counters.forEach(counter => {

            const target = Number(counter.dataset.target);

            let value = 0;

            const increment = target / 60;

            function updateCounter() {

                value += increment;

                if (value < target) {

                    counter.textContent = Math.ceil(value);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target;

                }

            }

            updateCounter();

        });

    }

}

window.addEventListener("scroll", startCounters);

startCounters();


/* =========================
   ELECTRICITY CALCULATOR
========================= */

function calculateEnergy() {

    const power = Number(document.getElementById("power").value);

    const hours = Number(document.getElementById("hours").value);

    const days = Number(document.getElementById("days").value);

    const result = document.getElementById("result");


    if (power <= 0 || hours <= 0 || days <= 0) {

        result.innerHTML = `

            <i class="fa-solid fa-triangle-exclamation"></i>

            <h3>Invalid Input</h3>

            <p>Please enter valid values greater than zero.</p>

        `;

        return;

    }


    /*
        Energy calculation:

        Watts × Hours × Days
        ---------------------
              1000

        Result = kWh
    */

    const units = (power * hours * days) / 1000;


    result.innerHTML = `

        <i class="fa-solid fa-bolt"></i>

        <h3>Estimated Consumption</h3>

        <p>

            Your appliance may consume approximately

            <strong>${units.toFixed(2)} kWh</strong>

            per month.

        </p>

    `;

}


/* =========================
   QUIZ
========================= */

function answerQuiz(button, correct) {

    const result = document.getElementById("quizResult");

    const buttons = document.querySelectorAll(".options button");

    buttons.forEach(btn => {

        btn.disabled = true;

    });


    if (correct) {

        result.innerHTML = `
            <span style="color:#00ff9d">
                ✓ Correct! LED bulbs are generally more energy efficient.
            </span>
        `;

    } else {

        result.innerHTML = `
            <span style="color:#ff6464">
                ✕ Not quite. Try learning more about energy-efficient lighting.
            </span>
        `;

    }

}


/* =========================
   CONTACT FORM
========================= */

function submitForm(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;

    alert(
        "Thank you, " + name +
        "! Your awareness message has been submitted."
    );

    event.target.reset();

}


/* =========================
   SCROLL TO TOP
========================= */

const topButton = document.getElementById("topButton");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});


topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =========================
   REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(
    ".about-card, .reason-card, .tip-card, .renew-card, .efficiency-box"
);


const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(30px)";

    element.style.transition = "0.7s ease";

    observer.observe(element);

});