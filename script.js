const storyVideo = document.getElementById("storyVideo");
const playVideoButton = document.getElementById("playVideoButton");
const openLetterButton = document.getElementById("openLetterButton");
const videoStatus = document.getElementById("videoStatus");

const letterUrl = "letter.html";

function burstHearts() {
    const amount = 14;

    for (let index = 0; index < amount; index += 1) {
        const heart = document.createElement("span");
        heart.textContent = "❤";
        heart.className = "burst-heart";

        const size = 12 + Math.random() * 18;
        const x = 25 + Math.random() * 50;
        const delay = Math.random() * 0.25;
        const drift = -120 + Math.random() * 240;
        const duration = 1500 + Math.random() * 700;

        heart.style.left = `${x}%`;
        heart.style.bottom = "20%";
        heart.style.fontSize = `${size}px`;
        heart.style.setProperty("--drift", `${drift}px`);
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}ms`;

        document.body.appendChild(heart);

        window.setTimeout(() => {
            heart.remove();
        }, duration + 250);
    }
}

function showLetterButton(message) {
    if (message) {
        videoStatus.textContent = message;
    }

    openLetterButton.hidden = false;
    openLetterButton.focus({ preventScroll: true });
}

async function playIntroVideo() {
    if (!storyVideo) {
        return;
    }

    const sourceElement = storyVideo.querySelector("source");
    const videoSource = sourceElement ? sourceElement.getAttribute("src")?.trim() : "";

    if (!videoSource) {
        showLetterButton("Videonya belum dipasang dulu. Surat kecilnya tetap disiapkan, jadi kamu bisa lanjut sekarang.");
        return;
    }

    try {
        playVideoButton.disabled = true;
        playVideoButton.textContent = "Video sedang diputar";
        videoStatus.textContent = "Videonya lagi berjalan... tunggu sebentar ya.";
        await storyVideo.play();
    } catch (error) {
        playVideoButton.disabled = false;
        playVideoButton.textContent = "Putar video";
        videoStatus.textContent = "Browser menahan pemutaran video. Coba klik lagi setelah file videonya siap.";
    }
}

if (playVideoButton && storyVideo) {
    playVideoButton.addEventListener("click", playIntroVideo);
}

if (openLetterButton) {
    openLetterButton.addEventListener("click", () => {
        window.location.href = letterUrl;
    });
}

if (storyVideo) {
    storyVideo.addEventListener("ended", () => {
        showLetterButton("Videonya selesai. Sekarang kamu bisa buka surat kecilnya.");
    });
}

window.addEventListener("load", () => {
    if (storyVideo && !storyVideo.querySelector("source")?.getAttribute("src")?.trim()) {
        videoStatus.textContent = "Videonya masih kosong. Kalau file sudah siap, tombol putar akan langsung memainkannya.";
    }
});
