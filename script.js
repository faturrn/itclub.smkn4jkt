// Initialize AOS
AOS.init({
  duration: 800,
  easing: "ease-out-cubic",
  once: false,
  offset: 60,
});

// Initialize Lucide
if (typeof lucide !== "undefined") {
  lucide.createIcons();
}

// ============ DARK/LIGHT MODE ============
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

// Check saved theme
const savedTheme = localStorage.getItem("itclub-theme");
if (savedTheme === "light") {
  body.classList.add("light-mode");
  themeIcon.className = "fas fa-sun";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  const isLight = body.classList.contains("light-mode");
  themeIcon.className = isLight ? "fas fa-sun" : "fas fa-moon";
  localStorage.setItem("itclub-theme", isLight ? "light" : "dark");
});

// ============ NAVBAR SCROLL EFFECT ============
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Navbar shadow on scroll
  if (scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Back to top visibility
  if (scrollY > 600) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }

  // Active nav link detection
  updateActiveNavLink();
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============ MOBILE MENU ============
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

function closeMenu() {
  navLinks.classList.remove("open");
}

// Close menu on outside click
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    closeMenu();
  }
});

// ============ ACTIVE NAV LINK ============
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a:not(.cta-nav)");
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navAnchors.forEach((anchor) => {
    anchor.classList.remove("active");
    if (anchor.getAttribute("href") === "#" + currentSection) {
      anchor.classList.add("active");
    }
  });
}

// ============ FAQ ACCORDION ============
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    // Close all
    faqItems.forEach((i) => i.classList.remove("active"));
    // Open clicked (unless it was already open)
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// ============ FORM SUBMISSION ============
const form = document.getElementById("registrationForm");
const formMessage = document.getElementById("formMessage");

// Ganti "URL_APPS_SCRIPT_ANDA" dengan URL Web App yang Anda salin dari Langkah 3
const scriptURL =
  "https://script.google.com/macros/s/AKfycbz2thMWgzg1nSMNoLVF6s-ceorufsGXomysUFPG_Vldy7N4jF8hjR6InR733P6YwpZBVQ/exec";

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const kelas = document.getElementById("kelas").value;
  const jurusan = document.getElementById("jurusan").value;
  const minat = document.getElementById("minat").value;
  const whatsapp = document.getElementById("whatsapp").value.trim();

  // Validasi form kosong
  if (!nama || !kelas || !jurusan || !minat || !whatsapp) {
    formMessage.style.display = "block";
    formMessage.style.color = "#ef4444";
    formMessage.textContent = "⚠️ Mohon isi semua field yang diperlukan.";
    return;
  }

  // Siapkan data untuk dikirim
  const formData = new FormData();
  formData.append("nama", nama);
  formData.append("kelas", kelas);
  formData.append("jurusan", jurusan);
  formData.append("minat", minat);
  formData.append("whatsapp", whatsapp);

  try {
    // Tampilkan pesan loading
    formMessage.style.display = "block";
    formMessage.style.color = "#3b82f6"; // Warna biru
    formMessage.textContent = "Sedang mengirim data pendaftaran...";

    // Kirim data ke Google Apps Script
    const response = await fetch(scriptURL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // Jika berhasil
      formMessage.style.color = "#10b981"; // Warna hijau
      formMessage.textContent =
        "Pendaftaran berhasil! Kami akan menghubungi kamu via WhatsApp.";
      form.reset();
    } else {
      throw new Error("Jaringan bermasalah");
    }
  } catch (error) {
    // Jika gagal/error
    console.error("Error!", error.message);
    formMessage.style.color = "#ef4444"; // Warna merah
    formMessage.textContent =
      "⚠️ Gagal mengirim pendaftaran. Silakan coba lagi.";
  }

  // Sembunyikan pesan setelah 5 detik
  setTimeout(() => {
    formMessage.style.display = "none";
  }, 5000);
});

// ============ SMOOTH SECTION REVEAL ON LOAD ============
// Refresh AOS on dynamic changes
window.addEventListener("load", () => {
  AOS.refresh();
});

console.log("🚀 IT Club ELITS - Landing Page Ready!");
console.log("💡 Tip: Klik ikon bulan/matahari di navbar untuk ganti tema.");
