// ==========================================
// PORTFOLIO SCRIPT - M FITROH SODIKIN
// ==========================================

// ========== DATA PROYEK ==========
const projects = [
  {
    id: 1,
    title: "Website Pondok Pesantren Al Ijma Garut",
    category: "Web Application",
    desc: "Website profil Pondok Pesantren Al Ijma yang menampilkan informasi lengkap tentang profil pesantren, program pendidikan salafiyah, kegiatan santri, serta jaringan komunitas global alumni internasional. Dibuat dengan desain modern dan responsif untuk memperkenalkan pesantren kepada masyarakat luas.",
    url: "https://placehold.co/800x600/22c55e/ffffff?text=al+ijma",
    year: "2026",
    duration: "3 minggu",
    tags: ["html", "css", "JavaScript"],
    results: [
        "Mengembangkan website profil pesantren dengan tampilan modern yang menampilkan profil, program pendidikan, dan kegiatan santri secara terstruktur.",
        "Meningkatkan kecepatan akses dan pengalaman pengguna dengan desain responsif yang optimal di berbagai perangkat.",
        "Membuat sistem informasi digital yang memudahkan calon santri dan masyarakat mengenal Pondok Pesantren Al Ijma secara online.",
    ],
    liveUrl: "https://jagoweb35.github.io/Pondok-Pesantren-Al-Ijma/",
  },
  {
    id: 2,
    title: "Website SMP Boarding School RABBANY",
    category: "Web Application",
    desc: "Website profil SMP Boarding School RABBANY yang berlokasi di Garut, Jawa Barat. Menampilkan informasi lengkap mengenai profil sekolah, program pendidikan boarding school, fasilitas, kegiatan siswa, dan sistem informasi akademik untuk memudahkan orang tua dan calon siswa mengenal sekolah secara digital.",
    url: "https://placehold.co/800x600/1e3a8a/ffffff?text=SMP+RABBANY",
    year: "2026",
    duration: "3 minggu",
    tags: ["HTML", "CSS", "JavaScript"],
    results: [
        "Mengembangkan website profil sekolah boarding yang menampilkan informasi program pendidikan, fasilitas, dan kegiatan siswa secara terstruktur.",
        "Meningkatkan aksesibilitas informasi sekolah dengan desain responsif yang optimal di perangkat mobile dan desktop.",
        "Membangun sistem informasi digital yang memudahkan calon siswa dan orang tua mengakses profil SMP Boarding School RABBANY secara online."
    ],
    liveUrl: "https://jagoweb35.github.io/SMP-Boarding-School-RABBANY/"
  },
 {
    id: 3,
    title: "Universal Data Entry System",
    category: "Web Application",
    desc: "Sistem manajemen data serbaguna berbasis web yang memungkinkan pengguna untuk melakukan entry data secara efisien melalui form input, mengimport data dari file CSV, serta mengelola berbagai jenis data seperti data karyawan dalam satu platform tanpa memerlukan backend server.",
    url: "https://placehold.co/800x600/f8fafc/334155?text=Universal+Data+Entry",
    year: "2026",
    duration: "3 minggu",
    tags: ["HTML", "CSS", "JavaScript"],
    results: [
        "Mengembangkan sistem data entry universal dengan fitur form input dan import CSV untuk berbagai kebutuhan data management.",
        "Membuat antarmuka yang menampilkan statistik data real-time seperti total records dan data yang ditambahkan hari ini.",
        "Mengimplementasikan sistem tanpa backend yang memungkinkan pengelolaan data karyawan dan jenis data lainnya secara lokal.",
        "Meningkatkan efisiensi input data dengan desain form yang intuitif dan responsif di berbagai perangkat."
    ],
    liveUrl: "https://jagoweb35.github.io/DataEntry/"
  },
  

  
];

// ========== STATE ==========
let currentSection = "home";
let scene, camera, renderer, galleryGroup;
let artMeshes = [];
let isAutoRotating = true;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let mouse = new THREE.Vector2();
let raycaster;
let isThreeInitialized = false;
let animationId;

// ========== NAVIGATION ==========
function showSection(sectionName) {
  currentSection = sectionName;

  // Update nav active state
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.dataset.section === sectionName) {
      link.classList.add("active");
    }
  });

  // Hide all sections
  document.querySelectorAll(".section-page").forEach((section) => {
    section.classList.remove("active");
    section.classList.add("hidden-section");
  });

  // Show target section
  const target = document.getElementById(`section-${sectionName}`);
  if (target) {
    target.classList.remove("hidden-section");
    setTimeout(() => target.classList.add("active"), 10);
  }

  // Init 3D only when proyek section is shown
  if (sectionName === "proyek" && !isThreeInitialized) {
    setTimeout(initThreeJS, 100);
  }

  // Update navbar style
  const navbar = document.getElementById("navbar");
  if (sectionName === "home") {
    navbar.classList.remove("glass-nav");
  } else {
    navbar.classList.add("glass-nav");
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("show");
}

// ========== THREE.JS 3D GALLERY ==========
function initThreeJS() {
  if (isThreeInitialized) return;

  const container = document.getElementById("canvas-container");
  const status = document.getElementById("loading-status");

  try {
    status.textContent = "Memuat 3D Scene...";

    if (typeof THREE === "undefined") {
      throw new Error("Three.js not loaded");
    }

    // Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.02);

    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 2, 18);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const mainLight = new THREE.DirectionalLight(0x06b6d4, 0.8);
    mainLight.position.set(10, 15, 10);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x8b5cf6, 0.4);
    fillLight.position.set(-10, 5, 5);
    scene.add(fillLight);

    // Gallery group
    galleryGroup = new THREE.Group();
    scene.add(galleryGroup);

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({
        color: 0x020617,
        roughness: 0.1,
        metalness: 0.6,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -4;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid
    const grid = new THREE.GridHelper(100, 50, 0x1e293b, 0x0f172a);
    grid.position.y = -3.99;
    scene.add(grid);

    // Load project cards
    loadProjectCards();

    raycaster = new THREE.Raycaster();

    // Events
    window.addEventListener("resize", onWindowResize);
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("click", onClick);

    // Touch events
    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd);

    isThreeInitialized = true;
    status.textContent = "Ready!";

    // Hide loading
    setTimeout(() => {
      const loading = document.getElementById("loading-screen");
      if (loading && loading.style.display !== "none") {
        loading.style.opacity = "0";
        setTimeout(() => (loading.style.display = "none"), 700);
      }
    }, 500);

    animate();
  } catch (err) {
    console.error("Three.js init error:", err);
    status.textContent = "Error memuat 3D";
    document.getElementById("error-message").classList.remove("hidden");
  }
}

function loadProjectCards() {
  const loader = new THREE.TextureLoader();
  const radius = 12;

  projects.forEach((proj, i) => {
    const angle = (i / projects.length) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = -angle + Math.PI / 2;
    group.userData = { id: proj.id, isProject: true };

    // Frame
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(4.6, 3.1, 0.1),
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.3,
        metalness: 0.8,
      }),
    );
    frame.castShadow = true;
    group.add(frame);

    // Image with fallback
    loader.load(
      proj.url,
      (tex) => {
        tex.encoding = THREE.sRGBEncoding;
        const canvas = new THREE.Mesh(
          new THREE.PlaneGeometry(4.4, 2.9),
          new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.4,
          }),
        );
        canvas.position.z = 0.06;
        group.add(canvas);
      },
      undefined,
      () => {
        // Fallback color
        const canvas = new THREE.Mesh(
          new THREE.PlaneGeometry(4.4, 2.9),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(i * 0.15, 0.6, 0.5),
          }),
        );
        canvas.position.z = 0.06;
        group.add(canvas);
      },
    );

    galleryGroup.add(group);
    artMeshes.push({
      mesh: group,
      baseY: 0,
      speedOffset: i * 0.8,
    });
  });
}

// ========== INTERACTION ==========
function onMouseDown(e) {
  isDragging = true;
  previousMousePosition = { x: e.clientX, y: e.clientY };
}

function onMouseMove(e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  if (isDragging && galleryGroup) {
    const delta = e.clientX - previousMousePosition.x;
    galleryGroup.rotation.y += delta * 0.005;
    previousMousePosition.x = e.clientX;
    isAutoRotating = false;
    updateRotateButton();
  }

  checkHover();
}

function onMouseUp() {
  isDragging = false;
}

function onClick(e) {
  if (isDragging) return;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(galleryGroup.children, true);

  if (intersects.length > 0) {
    let target = intersects[0].object;
    while (target.parent && target.parent !== galleryGroup) {
      target = target.parent;
    }

    if (target.userData.isProject) {
      const proj = projects.find((p) => p.id === target.userData.id);
      if (proj) openDetailModal(proj);
    }
  }
}

function onTouchStart(e) {
  isDragging = true;
  previousMousePosition = {
    x: e.touches[0].clientX,
    y: e.touches[0].clientY,
  };
}

function onTouchMove(e) {
  e.preventDefault();
  if (!isDragging || !galleryGroup) return;

  const delta = e.touches[0].clientX - previousMousePosition.x;
  galleryGroup.rotation.y += delta * 0.008;
  previousMousePosition.x = e.touches[0].clientX;
  isAutoRotating = false;
  updateRotateButton();
}

function onTouchEnd() {
  isDragging = false;
}

function checkHover() {
  if (!raycaster || !camera) return;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(galleryGroup.children, true);

  const container = document.getElementById("canvas-container");

  if (intersects.length > 0) {
    container.style.cursor = "pointer";
  } else {
    container.style.cursor = isDragging ? "grabbing" : "grab";
  }
}

function onWindowResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// ========== ANIMATION ==========
function animate() {
  animationId = requestAnimationFrame(animate);

  const time = Date.now() * 0.001;

  // Auto rotate
  if (isAutoRotating && !isDragging && galleryGroup) {
    galleryGroup.rotation.y += 0.002;
  }

  // Float animation
  artMeshes.forEach((item) => {
    item.mesh.position.y = Math.sin(time * 1.2 + item.speedOffset) * 0.15;
  });

  renderer.render(scene, camera);
}

// ========== UI CONTROLS ==========
function toggleAutoRotate() {
  isAutoRotating = !isAutoRotating;
  updateRotateButton();
}

function updateRotateButton() {
  const icon = document.getElementById("rotate-icon");
  const btn = document.getElementById("auto-rotate-btn");

  if (!icon || !btn) return;

  if (isAutoRotating) {
    icon.innerHTML = `<svg class="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>`;
    btn.classList.add("bg-cyan-500/20");
  } else {
    icon.innerHTML = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
    btn.classList.remove("bg-cyan-500/20");
  }
}

function resetView() {
  if (galleryGroup) {
    gsap.to(galleryGroup.rotation, {
      y: 0,
      duration: 1,
      ease: "power2.out",
    });
  }
  isAutoRotating = true;
  updateRotateButton();
}

// ========== MODAL ==========
function openDetailModal(project) {
  isAutoRotating = false;
  updateRotateButton();

  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-category").textContent = project.category;
  document.getElementById("modal-desc").textContent = project.desc;
  document.getElementById("modal-image").src = project.url;
  document.getElementById("modal-year").textContent = project.year;
  document.getElementById("modal-duration").textContent = project.duration;
  document.getElementById("modal-live").href = project.liveUrl;
  document.getElementById("modal-github").href = project.githubUrl;

  document.getElementById("modal-tags").innerHTML = project.tags
    .map((t) => `<span class="tech-tag">${t}</span>`)
    .join("");

  document.getElementById("modal-results").innerHTML = project.results
    .map(
      (r) =>
        `<li class="flex items-start gap-2"><svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><span>${r}</span></li>`,
    )
    .join("");

  const modal = document.getElementById("detail-modal");
  modal.classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("modal-backdrop").classList.remove("opacity-0");
    document
      .getElementById("modal-card")
      .classList.remove("opacity-0", "scale-90");
  }, 10);
}

function closeDetailModal() {
  document.getElementById("modal-backdrop").classList.add("opacity-0");
  document.getElementById("modal-card").classList.add("opacity-0", "scale-90");

  setTimeout(() => {
    document.getElementById("detail-modal").classList.add("hidden");
    isAutoRotating = true;
    updateRotateButton();
  }, 300);
}

// ========== UTILITIES ==========
function forceStart() {
  const loading = document.getElementById("loading-screen");
  loading.style.opacity = "0";
  setTimeout(() => (loading.style.display = "none"), 700);
}

function animateCounters() {
  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.target);
          let current = 0;
          const increment = target / 30;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target + "+";
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, 50);

          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((c) => observer.observe(c));
}

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
  animateCounters();

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDetailModal();
    if (e.key === "1") showSection("home");
    if (e.key === "2") showSection("tentang");
    if (e.key === "3") showSection("proyek");
    if (e.key === "4") showSection("keahlian");
    if (e.key === "5") showSection("kontak");
  });

  // Auto-hide loading after 5 seconds
  setTimeout(() => {
    const loading = document.getElementById("loading-screen");
    if (loading && loading.style.display !== "none") {
      forceStart();
    }
  }, 5000);
});

// Expose functions globally
window.showSection = showSection;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleAutoRotate = toggleAutoRotate;
window.resetView = resetView;
window.closeDetailModal = closeDetailModal;
window.forceStart = forceStart;
