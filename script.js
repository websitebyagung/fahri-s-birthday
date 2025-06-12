document.addEventListener("DOMContentLoaded", function () {
  // Initialize Particles.js
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#FF5E14",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#3E92CC",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });

  // Create floating balloons
  function createBalloons() {
    const colors = ["#FF5E14", "#3E92CC", "#0A2463", "#FFD700", "#FF1493"];
    const balloonsContainer = document.querySelector(".floating-balloons");

    for (let i = 0; i < 10; i++) {
      const balloon = document.createElement("div");
      balloon.className = "balloon floating-element";
      balloon.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      balloon.style.left = `${Math.random() * 100}%`;
      balloon.style.animationDuration = `${15 + Math.random() * 10}s`;
      balloon.style.animationDelay = `${Math.random() * 5}s`;
      balloon.style.width = `${80 + Math.random() * 80}px`;
      balloon.style.height = `${100 + Math.random() * 80}px`;
      balloon.style.opacity = 0.5 + Math.random() * 0.5;

      balloonsContainer.appendChild(balloon);
    }
  }

  createBalloons();

  // Birthday information
  const birthDate = new Date("June 20, 2009");
  const currentDate = new Date();

  // Calculate age
  function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  // Update age display
  document.getElementById("age").textContent = calculateAge(birthDate);

  // Countdown timer
  function updateCountdown() {
    const now = new Date();
    let nextBirthday = new Date(
      now.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );

    if (now > nextBirthday) {
      nextBirthday = new Date(
        now.getFullYear() + 1,
        birthDate.getMonth(),
        birthDate.getDate()
      );
    }

    const diff = nextBirthday - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Music player functionality
  const audioPlayer = document.getElementById("audio-player");
  const playBtn = document.getElementById("play-btn");
  const progress = document.getElementById("progress");
  const currentTimeDisplay = document.getElementById("current-time");
  const durationDisplay = document.getElementById("duration");
  const volumeBtn = document.getElementById("volume-btn");
  const volumeSlider = document.getElementById("volume");
  const albumArt = document.getElementById("album-art");
  const vinyl = document.querySelector(".vinyl");

  // Format time (seconds to MM:SS)
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  // Update time display
  function updateTime() {
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    progress.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  }

  // Update duration display when metadata is loaded
  audioPlayer.addEventListener("loadedmetadata", function () {
    durationDisplay.textContent = formatTime(audioPlayer.duration);
  });

  // Update time while playing
  audioPlayer.addEventListener("timeupdate", updateTime);

  // Play/Pause functionality
  playBtn.addEventListener("click", function () {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      albumArt.style.animation = "rotating 20s linear infinite";
      vinyl.style.animation = "rotating 10s linear infinite";
      createConfetti();
    } else {
      audioPlayer.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
      albumArt.style.animation = "none";
      vinyl.style.animation = "none";
    }
  });

  // Seek functionality
  progress.addEventListener("input", function () {
    const seekTime = (this.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
  });

  // Volume control
  volumeSlider.addEventListener("input", function () {
    audioPlayer.volume = this.value;

    if (this.value == 0) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (this.value < 0.5) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  });

  volumeBtn.addEventListener("click", function () {
    if (audioPlayer.volume > 0) {
      audioPlayer.volume = 0;
      volumeSlider.value = 0;
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
      audioPlayer.volume = 0.7;
      volumeSlider.value = 0.7;
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  });

  // Create confetti effect
  function createConfetti() {
    const colors = ["#FF5E14", "#3E92CC", "#0A2463", "#FFD700", "#FFFFFF"];
    const container = document.querySelector(".particles-container");

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";

      // Random properties
      const size = Math.random() * 10 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 2;
      const animationDelay = Math.random() * 5;

      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = color;
      confetti.style.left = `${left}%`;
      confetti.style.animationDuration = `${animationDuration}s`;
      confetti.style.animationDelay = `${animationDelay}s`;
      confetti.style.position = "absolute";
      confetti.style.top = "-10px";
      confetti.style.borderRadius = "50%";
      confetti.style.zIndex = "10";
      confetti.style.animation = "confetti-fall linear forwards";

      container.appendChild(confetti);

      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove();
      }, animationDuration * 1000);
    }
  }

  // Feedback form
  const wishForm = document.getElementById("wish-form");

  wishForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    // Send via WhatsApp
    const phoneNumber = "+6283148584061";
    const encodedMessage = encodeURIComponent(
      `🎉 Birthday Wishes for Farhi 🎉\n\nFrom: ${name}\n\nMessage: ${message}\n\nSent from Farhi's Birthday Website`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    // Reset form
    wishForm.reset();

    // Show thank you animation
    const thankYou = document.createElement("div");
    thankYou.textContent = "Thank You!";
    thankYou.style.position = "fixed";
    thankYou.style.top = "50%";
    thankYou.style.left = "50%";
    thankYou.style.transform = "translate(-50%, -50%)";
    thankYou.style.backgroundColor = "var(--primary)";
    thankYou.style.color = "var(--dark)";
    thankYou.style.padding = "1rem 2rem";
    thankYou.style.borderRadius = "50px";
    thankYou.style.fontWeight = "bold";
    thankYou.style.fontSize = "1.5rem";
    thankYou.style.zIndex = "100";
    thankYou.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";
    thankYou.style.animation = "fadeInUp 0.5s ease-out";

    document.body.appendChild(thankYou);

    setTimeout(() => {
      thankYou.style.animation = "fadeInUp 0.5s ease-out reverse forwards";
      setTimeout(() => {
        thankYou.remove();
      }, 500);
    }, 2000);
  });

  // Add hover effect to gallery items
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.querySelector("img").style.transform = "scale(1.1)";
      this.querySelector(".gallery-overlay").style.opacity = "1";
      this.querySelector(".gallery-overlay").style.transform = "translateY(0)";
    });

    item.addEventListener("mouseleave", function () {
      this.querySelector("img").style.transform = "scale(1)";
      this.querySelector(".gallery-overlay").style.opacity = "0";
      this.querySelector(".gallery-overlay").style.transform =
        "translateY(20px)";
    });
  });

  // Add scroll animations
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".countdown-box, .music-player, .gallery-item, #wish-form"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.animation = "fadeInUp 1s ease-out forwards";
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on load

  // Add keyframe for confetti fall
  const style = document.createElement("style");
  style.innerHTML = `
        @keyframes confetti-fall {
            0% {
                transform: translateY(-10px) rotate(0deg);
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
  document.head.appendChild(style);
});
