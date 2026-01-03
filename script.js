const checkbox = document.getElementById("messageState");
const message = document.querySelector(".message");
const heart = document.querySelector(".heart");

function openMessage() {
    checkbox.checked = true;
    message.classList.remove("close", "no-anim");
    message.classList.add("open");

    heart.classList.add("fade-out");
    heart.classList.remove("fade-in", "beating");
}

function closeMessage() {
    checkbox.checked = false;
    message.classList.remove("open", "no-anim");
    message.classList.add("close");

    heart.classList.remove("fade-out");
    heart.classList.add("fade-in", "beating");
}

/* CLICK HEART */
checkbox.addEventListener("change", () => {
    checkbox.checked ? openMessage() : closeMessage();
});

/* ===== SWIPE GESTURE ===== */
let startY = 0;
let endY = 0;

document.addEventListener("touchstart", e => {
    startY = e.touches[0].clientY;
});

document.addEventListener("touchend", e => {
    endY = e.changedTouches[0].clientY;
    handleSwipe();
});

function handleSwipe() {
    const distance = startY - endY;

    if (distance > 80) {
        // swipe up
        openMessage();
    } else if (distance < -80) {
        // swipe down
        closeMessage();
    }
}
