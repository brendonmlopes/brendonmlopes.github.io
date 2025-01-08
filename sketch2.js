// sketchNoise.js (Instance Mode)

const sNoise = (p) => {
  // Local variables for this sketch
  let scroll = 1;
  let speedSlider, spikeSlider;
  let speed, spike;

  p.setup = () => {
    // Example: fixed-size canvas (600x600)
    const container = document.getElementById("p5-container-a");

    // Create a canvas with container’s width and 400px height
    const canvas = p.createCanvas(container.offsetWidth, 400);
    // Parent it to #p5-container-c so it appears in that div
    canvas.parent("p5-container-a");

    // Create a slider for speed, range: 1..100, default: 1
    speedSlider = p.createSlider(1, 100, 1);
    speedSlider.position(10, 70);
    speedSlider.style("width", "300px");


    // Create a slider for spike, range: 0.0001..0.1, default: 0.01
    //  with a step of 0.0001
    spikeSlider = p.createSlider(0.0001, 0.1, 0.01, 0.0001);
    spikeSlider.position(10, 100);
    spikeSlider.style("width", "300px");
  };

  p.draw = () => {
    p.background(220);

    // Get current slider values
    speed = speedSlider.value();
    // Convert the "spike" value so smaller slider = bigger noise scale
    spike = 1 / spikeSlider.value();

    p.translate(0, p.height / 3);
    p.fill(0);

    // Begin the shape
    p.beginShape();
    // Start at the bottom-left corner
    p.vertex(0, 2 * p.height / 3);

    // Draw the noise-based “terrain”
    for (let x = scroll; x <= p.width + scroll; x += 1) {
      // We shift horizontally by -scroll to move the wave left
      let nx = x - scroll;
      // p.noise(...) returns a value in [0,1], scale it by 200 for vertical offset
      p.vertex(nx, p.noise(x / spike) * 200);
    }

    // End at the bottom-right corner
    p.vertex(p.width, 2 * p.height / 3);
    p.endShape();

    // Scroll the noise terrain horizontally
    scroll += speed;
  };
};
