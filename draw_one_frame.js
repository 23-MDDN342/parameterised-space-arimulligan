var x = 300;
var y = 300;
var a = 100;
var b = 100;
let count = 0;

let size_hexagons = 20;
let smaller_sizehexagons = 12;
// this is the fireworks example
function draw_one_frame(cur_frac) {
	x += 2;
	y += 2;
	a -= 2;
	b -= 2;
	let yellow_orange = color(242, 183, 5)
	let orange = color(242, 135, 5)
	let darker_orange = color(242, 116, 5)
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

			// making orangier outline
			push();
			stroke(darker_orange)
			strokeWeight(3)
			hexagon(x, y, smaller_sizehexagons, true);
			hexagon(x + x_offset, y + y_offset, smaller_sizehexagons, true);
			pop();
		}
	}

	// ears
	for (let y = height/5.2; y < height/3.3; y += y_space) {
		for (let x = width/3.4; x < width/1.4; x += x_space) {
			hexagon(x, y, size_hexagons);
			hexagon(x + x_offset, y + y_offset, size_hexagons);

			// making orangier outline
			push();
			stroke(darker_orange)
			strokeWeight(3)
			hexagon(x, y, smaller_sizehexagons, true);
			hexagon(x + x_offset, y + y_offset, smaller_sizehexagons, true);
			pop();
		}
	}

	honey_drop(width/1.45, height/4, cur_frac, yellow_orange, orange, 30)
	honey_drop(width/2.9, height/5, cur_frac, yellow_orange, orange, 35);
	honey_drop(width/2, height/6, cur_frac, yellow_orange, orange, 45);
	honey_drop(width/1.73, height/1.22, cur_frac, yellow_orange, orange, 40);
	honey_drop(width/2.6, height/2, cur_frac, yellow_orange, orange, 30);


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

	// buzzy bees

}

/**
 * Got this from kybr
 * @param x x position
 * @param y y position
 * @param r radius
 * @link https://editor.p5js.org/kybr/sketches/r_1FNQE5W
 */
function hexagon(x, y, r, lines) {

	push();
	if (lines){
		beginShape(LINES);
	}else {
		beginShape();
	}
	let angle = (2 * PI) / 6 / 2;
	for (let i = 0; i < 6; i++) {
	  vertex(x + r * cos(angle), y + r * sin(angle));
	  angle += (2 * PI) / 6;
	  vertex(x + r * cos(angle), y + r * sin(angle));
	}
	endShape();
	pop();
}

function honey_drop(x, y, cur_frac, light_color, dark_color, size){
	fill(dark_color)
	stroke(light_color);
	strokeWeight(4)
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
	rect(0, 0, size, size, 3,40,40);
	angleMode(RADIANS)
	pop();
	
	push();
	noStroke();
	translate(x+5, y+25)
	scale(1, scale_height)
	fill(light_color)
	ellipse(0, 0, 7, 15)
	pop();
}