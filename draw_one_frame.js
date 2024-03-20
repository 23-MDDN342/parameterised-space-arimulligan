var x = 300;
var y = 300;
var a = 100;
var b = 100;
let count = 0;

let size_hexagons = 20;
// this is the fireworks example
function draw_one_frame(cur_frac) {
	x += 2;
	y += 2;
	a -= 2;
	b -= 2;
	let yellow_orange = color(242, 183, 5)
	let orange = color(242, 135, 5)
	let cream = color(242, 213, 160)
	background(cream);

	
	stroke(yellow_orange)
	strokeWeight(10);
	fill(orange)
	
	// draw cow face
	const x_offset = size_hexagons * cos(PI / 6);
	const y_offset = size_hexagons * sin(PI / 6) + size_hexagons;
	const x_space = 2 * x_offset;
	const y_space = 2 * y_offset;
	for (let y = height/3.3; y < height/1.3; y += y_space) {
		for (let x = width/2.5; x < width/1.7; x += x_space) {
			hexagon(x, y, size_hexagons);
			hexagon(x + x_offset, y + y_offset, size_hexagons);
		}
	}

	// ears
	for (let y = height/5.2; y < height/3.3; y += y_space) {
		for (let x = width/3.4; x < width/1.4; x += x_space) {
			hexagon(x, y, size_hexagons);
			hexagon(x + x_offset, y + y_offset, size_hexagons);
		}
	}

	honey_drop(width/1.1, 400, cur_frac, yellow_orange, orange, 55)
	honey_drop(100, 100, cur_frac, yellow_orange, orange, 1)
	// honey_drop(100, 100, cur_frac, yellow_orange, orange)
	// honey_drop(100, 100, cur_frac, yellow_orange, orange)
	

	// for buzzy bees
	// let scale_height = 0;
	// if (count == 0){
	// 	count = 1;
	// 	scale_height = cur_frac;
	// }
	// else {
	// 	count = 0;
	// 	scale_height = -cur_frac;
	// }

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
	beginShape();
	let angle = (2 * PI) / 6 / 2;
	for (let i = 0; i < 6; i++) {
	  vertex(x + r * cos(angle), y + r * sin(angle));
	  angle += (2 * PI) / 6;
	  vertex(x + r * cos(angle), y + r * sin(angle));
	}
	endShape();
	pop();
}

function honey_drop(x, y, cur_frac, light_color, dark_color, minusY){
	fill(dark_color)
	noStroke();
	let scale_height = 0;
	let little_height = 0;
	if(cur_frac <= 0.5){
		scale_height = map(cur_frac, 0, 0.5, 1, 1.5)
		little_height = map(cur_frac, 0, 0.5, 1.2, 1.3)
	}
	else{
		scale_height = map(cur_frac, 0.5,1, 1.5,1)
		little_height = map(cur_frac, 0.5, 1, 1.3, 1.2)
	}
	push();
	angleMode(DEGREES)
	translate(x, y)
	scale(1, scale_height)
	rotate(45);
	rect(0, 0, 30, 30, 3,40,40);
	angleMode(RADIANS)
	pop();
	
	push();
	scale(1, little_height)
	fill(light_color)
	translate(x+5, y-minusY)
	ellipse(0, 0, 7, 15)
	pop();
}