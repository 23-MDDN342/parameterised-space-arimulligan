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

	// draw cow oval face
	const x_offset = size_hexagons * cos(PI / 6);
	const y_offset = size_hexagons * sin(PI / 6) + size_hexagons;
	const x_space = 2 * x_offset;
	const y_space = 2 * y_offset;
	for (let y = height/3.3; y < height/1.3; y += y_space) {
		for (let x = width/2.5; x < width/1.7; x += x_space) {
			stroke('white')
			strokeWeight(5);
			hexagon(x, y, size_hexagons);
			hexagon(x + x_offset, y + y_offset, size_hexagons);
		}
	}

	for (let y = height/3; y < height/2.5; y += y_space) {
		for (let x = width/1.7; x < width/1.4; x += x_space) {
			stroke('white')
			strokeWeight(5);
			hexagon(x, y, size_hexagons);
			hexagon(x + x_offset, y + y_offset, size_hexagons);
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
function hexagon(x, y, r) {
	beginShape(LINES);
	let angle = (2 * PI) / 6 / 2;
	for (let i = 0; i < 6; i++) {
	  vertex(x + r * cos(angle), y + r * sin(angle));
	  angle += (2 * PI) / 6;
	  vertex(x + r * cos(angle), y + r * sin(angle));
	}
	endShape();
}
  

  