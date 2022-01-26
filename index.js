const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Creating the Player
class Player {
  constructor(x, y, radius, color) {
    // this method is called whever an new instance of player is created

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, 'blue');

const projectiles = [];

function animate() {
  // loop function, for example we can use it in order to fires can move from cordonate to other.
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height); // to clear the colisions between projectiles; 0,0 : means start from x0, y0, canvas.width, canvas.height: clear the whole canvas.
  player.draw();
  projectiles.forEach((projectile) => {
    projectile.update();
  });
}
// to move the projectile from the center to the mouse clicked, we need to add vilocity
window.addEventListener('click', (event) => {
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, 'red', velocity)
  );
});

animate();
