/* Slide Hal1 ke Hal2 */
const lihatBtn = document.getElementById("lihatUndangan");
const landing = document.getElementById("landing");
const mainContent = document.getElementById("mainContent");

lihatBtn.addEventListener("click", function () {
  landing.style.display = "none"; // langsung hilang tanpa animasi
  mainContent.classList.add("visible"); // muncul dengan fade-in
  AOS.refresh();
  document.getElementById("navbar").classList.remove("hidden");
});

/* Sticky Top */
const navbar = document.getElementById("navbar");
const triggerPoint = document.getElementById("Journey"); // saat mulai sticky

window.addEventListener("scroll", () => {
  const triggerTop = triggerPoint.getBoundingClientRect().top;

  if (triggerTop <= 0) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

/* Best Wishes */
const guestMessage = document.getElementById("guestMessage");
const charCount = document.getElementById("charCount");

const wishes = []; // untuk simpan semua pesan
const perPage = 3;
let currentPage = 1;

guestMessage.addEventListener("input", () => {
  charCount.textContent = `${guestMessage.value.length} / 500`;
});

document.getElementById("wishForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const message = guestMessage.value.trim();

  if (name && message) {
    wishes.unshift({ name, message });
    this.reset();
    charCount.textContent = "0 / 500";
    renderWishes();
  }
});

function renderWishes() {
  const container = document.getElementById("wishContainer");
  container.innerHTML = "";
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginated = wishes.slice(start, end);

  paginated.forEach((wish) => {
    const div = document.createElement("div");
    div.className = "wish-item";
    div.innerHTML = `<strong>${wish.name}</strong><p>${wish.message}</p>`;
    container.appendChild(div);
  });

  renderPageNumbers();
}

function renderPageNumbers() {
  const totalPages = Math.ceil(wishes.length / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .map(
      (num) =>
        `<button onclick="goToPage(${num})" ${
          num === currentPage ? 'style="font-weight:bold"' : ""
        }>${num}</button>`
    )
    .join(" ");
  document.getElementById("pageNumbers").innerHTML = pageNumbers;
}

function goToPage(page) {
  currentPage = page;
  renderWishes();
}

function nextPage() {
  const totalPages = Math.ceil(wishes.length / perPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderWishes();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderWishes();
  }
}

/* List RSVP */
const rsvpForm = document.getElementById("rsvpForm");
const rsvpList = document.getElementById("rsvpList");
const rsvpPageNumbers = document.getElementById("rsvpPageNumbers");
const rsvpPerPage = 3;
let rsvpCurrentPage = 1;
const rsvpData = [];
rsvpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("rsvpName").value.trim();
  const address = document.getElementById("rsvpAddress").value.trim();
  const attend = document.getElementById("rsvpAttend").value;
  if (name && address) {
    rsvpData.unshift({ name, address, attend });
    rsvpForm.reset();
    renderRSVP();
  }
});
function renderRSVP() {
  rsvpList.innerHTML = "";
  const start = (rsvpCurrentPage - 1) * rsvpPerPage;
  const end = start + rsvpPerPage;
  const currentData = rsvpData.slice(start, end);
  currentData.forEach((entry) => {
    const div = document.createElement("div");
    div.className = "rsvp-item";
    div.innerHTML = `<strong>${entry.name}</strong> dari ${entry.address} — <em>${entry.attend}</em>`;
    rsvpList.appendChild(div);
  });
  renderPageNumbers();
}
function renderPageNumbers() {
  const totalPages = Math.ceil(rsvpData.length / rsvpPerPage);
  rsvpPageNumbers.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === rsvpCurrentPage) btn.style.fontWeight = "bold";
    btn.onclick = () => {
      rsvpCurrentPage = i;
      renderRSVP();
    };
    rsvpPageNumbers.appendChild(btn);
  }
}
function prevRsvpPage() {
  if (rsvpCurrentPage > 1) {
    rsvpCurrentPage--;
    renderRSVP();
  }
}
function nextRsvpPage() {
  const totalPages = Math.ceil(rsvpData.length / rsvpPerPage);
  if (rsvpCurrentPage < totalPages) {
    rsvpCurrentPage++;
    renderRSVP();
  }
}

/* Gift */
function toggleGift() {
  const info = document.getElementById("giftInfo");
  info.classList.toggle("hidden");
}

function copyRek(id) {
  const noRek = document.getElementById(id).innerText;
  navigator.clipboard.writeText(noRek).then(() => {
    alert("Nomor rekening berhasil disalin!");
  });
}

/* Backsound */
const music = document.getElementById("bgMusic");
const toggleBtn = document.getElementById("toggleMusic");
let isPlaying = false;

// Putar musik saat klik tombol "Lihat Undangan"
lihatBtn.addEventListener("click", function () {
  landing.style.display = "none";
  mainContent.classList.add("visible");

  // Play music setelah user interaction
  music
    .play()
    .then(() => {
      isPlaying = true;
      toggleBtn.textContent = "▶︎";
    })
    .catch((e) => {
      console.log("Autoplay gagal:", e);
    });
});

// Toggle music tombol
toggleBtn.addEventListener("click", function () {
  if (isPlaying) {
    music.pause();
    toggleBtn.textContent = "♫";
  } else {
    music.play();
    toggleBtn.textContent = "▶︎";
  }
  isPlaying = !isPlaying;
});

const musicControl = document.getElementById("musicControl");
const journeySection = document.getElementById("Journey");

window.addEventListener("scroll", () => {
  const journeyTop = journeySection.offsetTop;
  const scrollPos = window.scrollY + window.innerHeight;

  if (scrollPos >= journeyTop + 100) {
    musicControl.classList.add("show");
  } else {
    musicControl.classList.remove("show");
  }
});

/* Distribusi */
// Ambil parameter dari URL
const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get("to");

// Tampilkan nama jika ada
if (guest) {
  const decodedName = decodeURIComponent(guest.replace(/\+/g, " "));
  document.getElementById("guestName").textContent = decodedName;
}
