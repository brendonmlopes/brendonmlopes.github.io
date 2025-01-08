// sketchSpiral.js (Instance Mode)

const sSpiral = (p) => {
  // Sketch variables
  let R = 0;
  let r = 100;
  let a = 0;
  let b = 0;
  let f = 0;
  let k1 = 10;
  let k2 = 1;
  let d = 10;
  let lim = 0;
  let res = 3;

  p.setup = () => {
    // Grab the container
    const container = document.getElementById("p5-container-b");

    // Create a canvas with container’s width and 400px height
    const canvas = p.createCanvas(container.offsetWidth, 400);
    // Parent it to #p5-container-c so it appears in that div
    canvas.parent("p5-container-b");

    p.angleMode(p.DEGREES);
  };

  p.draw = () => {
    p.background(220);
    // Center the drawing
    p.translate(p.width / 2, p.height / 2);
    p.noFill();

    // Loop from 0 to lim, stepping by res
    for (let i = 0; i <= lim; i += res) {
      // Compute x, y, z from your parametric equations
      let x =
        (R + r * p.cos(i)) *
          (p.cos(b) * p.cos(f) + p.sin(a) * p.sin(b) * p.sin(f)) -
        r * p.cos(a) * p.sin(b) * p.sin(i);

      let y =
        (R + r * p.cos(i)) *
          (p.cos(f) * p.sin(b) - p.cos(b) * p.sin(a) * p.sin(f)) +
        r * p.cos(a) * p.cos(b) * p.sin(i);

      let z =
        p.cos(a) * (R + r * p.cos(i)) * p.sin(f) +
        r * p.sin(a) * p.sin(i);

      // Project to px, py
      let px = (k1 * x) / (k2 + d);
      let py = (k1 * y) / (k2 + d);

      // Draw an ellipse at (px, py)
      p.ellipse(px, py, r);
    }

    // Increase lim until 360
    if (lim < 360) {
      lim += 3;
    } else {
      // After 360, modify angles
      f += 2;
      a -= 1;
      b += 1;
    }
  };

  // (Optional) Handle window resizing if you like
  p.windowResized = () => {
    const container = document.getElementById("p5-container-b");
    p.resizeCanvas(container.offsetWidth, 400);
  };
};
