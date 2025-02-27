document.addEventListener('DOMContentLoaded', function() {
    // Initialize the background simulation
    initBackgroundSimulation();
});

function initBackgroundSimulation() {
    const canvas = document.getElementById('simulation-canvas');
    
    if (!canvas) return;
    
    // Create a simple ball animation for the background
    const balls = [];
    const ballCount = 15;
    
    // Create balls
    for (let i = 0; i < ballCount; i++) {
        createBall(canvas, balls);
    }
    
    // Set up animation
    function animateBalls() {
        moveBalls(balls);
        requestAnimationFrame(animateBalls);
    }
    
    // Start animation
    animateBalls();
}

function createBall(container, ballsArray) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    
    // Random size
    const size = Math.floor(Math.random() * 60) + 20;
    ball.style.width = `${size}px`;
    ball.style.height = `${size}px`;
    
    // Random position
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const x = Math.random() * containerWidth;
    const y = Math.random() * containerHeight;
    
    // Random velocity
    const vx = (Math.random() - 0.5) * 2;
    const vy = (Math.random() - 0.5) * 2;
    
    // Random opacity for depth effect
    const opacity = (Math.random() * 0.3) + 0.1;
    ball.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
    
    // Set initial position
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;
    
    // Unique animation delay
    const delay = Math.random() * 5;
    ball.style.animationDelay = `${delay}s`;
    
    // Add to container
    container.appendChild(ball);
    
    // Add to array with properties
    ballsArray.push({
        element: ball,
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        size: size
    });
}

function moveBalls(balls) {
    balls.forEach(ball => {
        // Update position based on velocity
        ball.x += ball.vx;
        ball.y += ball.vy;
        
        // Check boundaries
        const container = ball.element.parentElement;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        
        if (ball.x < 0 || ball.x > containerWidth - ball.size) {
            ball.vx *= -1;
            ball.x = ball.x < 0 ? 0 : containerWidth - ball.size;
        }
        
        if (ball.y < 0 || ball.y > containerHeight - ball.size) {
            ball.vy *= -1;
            ball.y = ball.y < 0 ? 0 : containerHeight - ball.size;
        }
        
        // Apply the new position
        ball.element.style.left = `${ball.x}px`;
        ball.element.style.top = `${ball.y}px`;
    });
}