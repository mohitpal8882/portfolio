// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll-Based Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe sections for fade-in
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Animate skill bars on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.fill');
            bars.forEach(bar => {
                const skillLevel = bar.parentElement.parentElement.dataset.skill;
                bar.style.width = skillLevel + '%';
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Add 'animate' class for CSS animations
document.addEventListener('DOMContentLoaded', () => {
    // Initial animations
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('animate');
    }, 500);
});
// Zoom Feature for Project Cards
const projectCards = document.querySelectorAll('.project-card');
const zoomOverlay = document.createElement('div');
zoomOverlay.classList.add('zoom-overlay');
document.body.appendChild(zoomOverlay);

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.add('zoomed');
        zoomOverlay.classList.add('active');
        
        // Add close button if not present
        if (!card.querySelector('.close-zoom')) {
            const closeBtn = document.createElement('button');
            closeBtn.classList.add('close-zoom');
            closeBtn.textContent = '×';
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeZoom();
            });
            card.appendChild(closeBtn);
        }
    });
});

// Close zoom on overlay click
zoomOverlay.addEventListener('click', closeZoom);

function closeZoom() {
    document.querySelectorAll('.project-card.zoomed').forEach(card => {
        card.classList.remove('zoomed');
    });
    zoomOverlay.classList.remove('active');
}

// Keyboard support for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && zoomOverlay.classList.contains('active')) {
        closeZoom();
    }
});
// Scroll Zoom In / Out Animation
const zoomElements = document.querySelectorAll('.zoom-scroll');

const zoomObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show'); // zoom out when leaving
        }
    });
}, {
    threshold: 0.2
});

zoomElements.forEach(el => zoomObserver.observe(el));
const glow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});
/* =========================
   DATA SCIENCE BACKGROUND
========================= */

const canvas = document.getElementById("data-bg");
const ctx = canvas.getContext("2d");

let width, height;
function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Data Nodes
const nodes = [];
const NODE_COUNT = 80;

for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 2
    });
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#00d4ff";
        ctx.fill();

        // Connect nodes
        for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const dist = Math.hypot(node.x - other.x, node.y - other.y);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = "rgba(0,212,255,0.15)";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(draw);
}

draw();
