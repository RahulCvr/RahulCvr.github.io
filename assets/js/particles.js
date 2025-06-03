// Interactive Particle System
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5; // Size: 0.5-2px
        this.speedX = (Math.random() - 0.5) * 0.3; // Speed: ±0.15
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.3 + 0.1; // Opacity: 0.1-0.4
        this.originalX = this.x;
        this.originalY = this.y;
        this.originalSpeedX = this.speedX;
        this.originalSpeedY = this.speedY;
        
        // Galaxy color palette
        const colors = [
            '#4B0082', // Galaxy Purple
            '#4682B4', // Stardust Blue
            '#FF6EC7', // Nebula Pink
            '#000000', // Cosmic Black
            '#FFD700', // Supernova Yellow
            '#00FF00', // Comet Green
            '#808080', // Meteor Gray
            '#FFFFFF'  // Original white
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update(mouseX, mouseY) {
        // Calculate distance from mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150; // Interaction radius

        if (distance < maxDistance) {
            // Calculate repulsion force
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            
            // Apply repulsion force
            this.speedX = this.originalSpeedX - Math.cos(angle) * force * 0.5;
            this.speedY = this.originalSpeedY - Math.sin(angle) * force * 0.5;
        } else {
            // Gradually return to original speed
            this.speedX += (this.originalSpeedX - this.speedX) * 0.1;
            this.speedY += (this.originalSpeedY - this.speedY) * 0.1;
        }

        // Update position
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Convert hex color to rgba with alpha
        const hex = this.color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
        this.ctx.fill();
    }
}

// Particle system - DISABLED
// Plain background instead of particle effects

class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.isEnabled = false; // Disabled particle system
    }

    init() {
        // Particle system is disabled - no initialization needed
        return;
    }

    createCanvas() {
        // No canvas needed for plain background
        return;
    }

    createParticles() {
        // No particles needed
        return;
    }

    animate() {
        // No animation needed
        return;
    }

    updateParticles() {
        // No particles to update
        return;
    }

    drawParticles() {
        // No particles to draw
        return;
    }

    handleResize() {
        // No resize handling needed
        return;
    }

    cleanup() {
        // No cleanup needed since no particles exist
        return;
    }

    start() {
        // No particles to start
        return;
    }

    stop() {
        // No particles to stop
        return;
    }
}

// Initialize particle system (disabled)
window.particleSystem = new ParticleSystem(); 