var x = 300;
var y = 300;
var a = 100;
var b = 100;

let size_hexagons = 20;
// this is the fireworks example
function draw_one_frame(cur_frac) {
	background('black');
	x += 2;
	y += 2;
	a -= 2;
	b -= 2;
	
	stroke('white')
	strokeWeight(5);
	
	// draw cow face
	const x_offset = size_hexagons * cos(PI / 6);
	const y_offset = size_hexagons * sin(PI / 6) + size_hexagons;
	const x_space = 2 * x_offset;
	const y_space = 2 * y_offset;
	for (let y = height/3.3; y < height/1.3; y += y_space) {
		for (let x = width/2.5; x < width/1.7; x += x_space) {
			hexagon(x, y, size_hexagons);
			hexagon(x + x_offset, y + y_offset, size_hexagons, cur_frac);
		}
	}

	// ears
	for (let y = height/5.2; y < height/3.3; y += y_space) {
		for (let x = width/3.4; x < width/1.4; x += x_space) {
			hexagon(x, y, size_hexagons);
			hexagon(x + x_offset, y + y_offset, size_hexagons, cur_frac);
		}
	}


}

/**
 * Got this from kybr
 * @param x x position
 * @param y y position
 * @param r radius
 * @link https://editor.p5js.org/kybr/sketches/r_1FNQE5W
 */
function hexagon(x, y, r, cur_frac) {
	let spin_around_x = getNoiseValue(x, 1, 0, 'yo', 0, x, 1);
	let spin_around_y = getNoiseValue(y, 1, 0, 'y', 0, y, 1);
	let lets_spin_around_x = map(cur_frac, 1, 0, spin_around_x, x);
	let lets_spin_around_y = map(cur_frac, 1, 0, spin_around_y, y);

	push();
	translate(lets_spin_around_x, lets_spin_around_y);
	beginShape(LINES);
	let angle = (2 * PI) / 6 / 2;
	for (let i = 0; i < 6; i++) {
	  vertex(x + r * cos(angle), y + r * sin(angle));
	  angle += (2 * PI) / 6;
	  vertex(x + r * cos(angle), y + r * sin(angle));
	}
	endShape();
	pop();
}
  

  