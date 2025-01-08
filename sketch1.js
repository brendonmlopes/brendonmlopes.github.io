// sketchA.js

const sA = (p) => {
  // Local variables for this sketch
  let timeSteps = 5000000;
  let counter = 0;
  let b1;
  let b2;

  // Define your Box class *inside* the instance
  class Box {
    constructor(x, w, v, m) {
      this.x = x;
      this.w = w;
      this.v = v;
      this.m = m;
    }

    move() {
      this.x += this.v;
    }

    render() {
      p.noStroke();
      p.rect(this.x, p.height / 2 - this.w, this.w, this.w);
    }

    bounce(other) {
      // Check collision
      if (!(this.x + this.w < other.x || this.x > other.x + other.w)) {
        let sumM = this.m + other.m;
        let newV = ((this.m - other.m) / sumM) * this.v;
        newV += (2 * other.m) / sumM * other.v;
        return newV;
      }
    }

    hitWall() {
      if (this.x < 0) {
        this.v *= -1;
        counter++;
      }
    }
  }

  // p.setup runs once, at the start
  p.setup = () => {
    const containerA = document.getElementById("p5-container-c");

    // Create a canvas with the container’s width and 400px height
    let canvasA = p.createCanvas(containerA.offsetWidth, 400);
    // Attach the canvas to #p5-container-a
    canvasA.parent("p5-container-c");

    b1 = new Box(400, 40, 0, 0.0001);
    b2 = new Box(500, 100, -1 / timeSteps, Math.pow(100, 5));

    // Set initial fill, etc.
    p.fill("cyan");
  };

  // p.draw is called on every frame
  p.draw = () => {
    p.background(100);

    b1.render();
    b2.render();

    // The main collision & movement loop
    for (let i = 0; i < timeSteps; i++) {
      let v1 = b1.bounce(b2);
      let v2 = b2.bounce(b1);

      // If collision is happening, update velocities
      if (!(b1.x + b1.w < b2.x || b1.x > b2.x + b2.w)) {
        b1.v = v1;
        b2.v = v2;
        counter++;
      }
      // Move boxes, check for wall collision
      b1.move();
      b2.move();
      b1.hitWall();
    }

    // Draw bottom black rectangle & text
    p.push();
    p.fill(0);
    p.rect(0, p.height / 2, p.width, p.height / 2);
    p.fill(255);
    p.noStroke();
    p.textSize(30);
    p.text(counter, p.width / 2, p.height - 50);
    p.text(",", p.width / 2 + 13, p.height - 50);
    p.text("π =", p.width / 2 - 60, p.height - 50);
    p.pop();
  };

  // (Optional) Handle window resizing
  p.windowResized = () => {
    const containerA = document.getElementById("p5-container-c");
    p.resizeCanvas(containerA.offsetWidth, 400);
  };
};

// Instantiate the sketch
new p5(sA);
