let radius = 50;
let speed = 0.33;

let size_hexagons = 20;
let smaller_sizehexagons = 12;

function draw_one_frame(cur_frac) {
	let yellow_orange = color(242, 183, 5)
	let orange = color(242, 135, 5)
	let cream = color(242, 213, 160)
	background(cream);

	stroke(yellow_orange)
	strokeWeight(10);
	fill(orange)

	// bees for the background ig
	// for (let i = 2; i < 10; i++){
		// let beeX = 0;
		// let beeY = 0;
		// if (i % 2==0){
		// 	beeX = getNoiseValue(x, y, 1, i.toString(), 0, width/3, 100);
		// 	beeY = sin(cur_frac * 6 - i * 0.4) * (30+i) + height/i;

		// } else {
		// 	beeX = getNoiseValue(x, y, 1, i.toString(), width/2, width-100, 100);
		// 	beeY = cos(cur_frac * 6 - i * 0.4) * (30+i) + height/i;
		// }

		push();
		translate(-100+cur_frac*450, 200);
		// rotate(cur_frac * 6.1);
		// draw shape as though (centerX, centerY) is the new
		// origin / (0, 0) point
		// rect(radius, 0, 50, 50);
		buzzy_bee(radius, 0, cur_frac, yellow_orange, 1.2)
		stroke('black')
		point(radius, 0)
		pop();
	
	// draw cow face shape
	draw_honeycomb(height/3.3, height/1.3, width/2.7, width/1.6);

	// ear shape
	draw_honeycomb(height/5.2, height/3.3, width/3.4, width/1.4);

	// lil horns
	draw_honeycomb(height/13, height/9, width/2.5, width/2.4);
	draw_honeycomb(height/13, height/9, width/1.8, width/1.7);

	// mouth area
	draw_honeycomb(height/1.15, height/1.05, width/2.4, width/1.7);

	honey_drop(width/1.45, height/4, cur_frac, yellow_orange, orange, 30)
	honey_drop(width/2.9, height/5, cur_frac, yellow_orange, orange, 35);
	honey_drop(width/2, height/6, cur_frac, yellow_orange, orange, 45);
	honey_drop(width/1.68, height/1.25, cur_frac, yellow_orange, orange, 40);
	honey_drop(width/1.95, height/1.3, cur_frac, yellow_orange, orange, 35);
	honey_drop(width/2.6, height/2, cur_frac, yellow_orange, orange, 30);

	// bees for the cows face features
	// the eyes
	buzzy_bee(width/3.6, height/4, 2, cream, 1.5, true)
	buzzy_bee(width/2.6, height/4, 4, cream, 1.5)

	// the nose
	buzzy_bee(width/1.9, height/1.3, cur_frac, cream, 1)
	buzzy_bee(width/2.1, height/1.3, cur_frac, cream, 1)


}

function draw_honeycomb(heightMax, heightMin, widthMax, widthMin){
	const x_offset = size_hexagons * cos(PI / 6);
	const y_offset = size_hexagons * sin(PI / 6) + size_hexagons;
	const x_space = 2 * x_offset;
	const y_space = 2 * y_offset;
	for (let y = heightMax; y < heightMin; y += y_space) {
		for (let x = widthMax; x < widthMin; x += x_space) {
			hexagon(x, y, size_hexagons);
			hexagon(x + x_offset, y + y_offset, size_hexagons);

			// making orangier outline
			push();
			stroke(242, 116, 5) // darker orange
			strokeWeight(3)
			hexagon(x, y, smaller_sizehexagons, true);
			hexagon(x + x_offset, y + y_offset, smaller_sizehexagons, true);
			pop();
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
function hexagon(x, y, r, lines) {
	push();
	if (lines){
		beginShape(LINES);
	}else {
		// shadow
		push();
		fill(242, 116, 5, 200)
		noStroke();
		let newX = x + 15;
		let newY = y + 15;
		beginShape();
		let angle = (2 * PI) / 6 / 2;
		for (let i = 0; i < 6; i++) {
			vertex(newX + r * cos(angle), newY + r * sin(angle));
			angle += (2 * PI) / 6;
			vertex(newX + r * cos(angle), newY + r * sin(angle));
		}
		endShape();
		pop();

		beginShape();
	}
	let angle = (2 * PI) / 6 / 2;
	for (let i = 0; i < 6; i++) {
	  vertex(x + r * cos(angle), y + r * sin(angle));
	  angle += (2 * PI) / 6;
	  vertex(x + r * cos(angle), y + r * sin(angle));
	}
	endShape();

	// lil shine
	if (!lines){
		noStroke();
		fill(242, 183, 5, 200)
		ellipse(x-5, y-3, 5, 10)
	}
	pop();
}

function honey_drop(x, y, cur_frac, light_color, dark_color, size){
	
	strokeWeight(4)
	let scale_height = 0;
	if(cur_frac <= 0.5){
		scale_height = map(cur_frac, 0, 0.5, 1, 1.5)
	}
	else{
		scale_height = map(cur_frac, 0.5,1, 1.5,1)
	}
	push();
	angleMode(DEGREES)
	translate(x, y)
	scale(1, scale_height)
	rotate(45);
	// shadow
	noStroke();
	fill(242, 116, 5, 90)
	rect(8, 0, size, size, 3,40,40);
	// actual drop
	fill(dark_color)
	stroke(light_color);
	rect(0, 0, size, size, 3,40,40);
	angleMode(RADIANS)
	pop();
	
	push();
	noStroke();
	translate(x-5, y+25)
	scale(1, scale_height)
	fill(light_color)
	ellipse(0, 0, 7, 15)
	pop();
}

function buzzy_bee(x, y, cur_frac, colour, size, mover){
	push();
	scale(size, size);
	let scale_height = 0;
	if(cur_frac <= 0.5){
		scale_height = map(cur_frac, 0, 0.5, 1, 1.3)
	}
	else{
		scale_height = map(cur_frac, 0.5,1, 1.3,1)
	}

	// shadow
	noStroke()
	fill(0, 0, 0, 90)
	ellipse(x+10, y+10, 35, 25)

	// buzzy bees
	rectMode(CENTER)
	fill(colour)
	ellipse(x, y, 35, 25)
	fill('black')
	rect(x, y, 5, 25, 30, 30, 30, 30)
	rect(x-10, y, 5, 20, 30, 30, 30, 30)
	rect(x+10, y, 5, 20, 30, 30, 30, 30)
if(mover){
	let manyLines = int(map(cur_frac, 0, 1, 0, 5));
	for(let i =0; i <manyLines; i++ ){
		stroke(colour)
		line(x - 30*i, y, x - 40*i, y )
	}
}
	 
	noStroke()
	// for wings
	fill(255, 255, 255, 200);
	angleMode(DEGREES);
	rectMode(CORNERS);
	
	// wing top
	push();
	translate(x, y)
	rotate(200 *scale_height);
	rect(0, 0, 20, 20, 3,40,40);
	pop();

	// wing bottom
	push();
	fill(255, 255, 255, 200)
	translate(x, y)
	rotate(200 *scale_height+180);
	rect(0, 0, 20, 20, 3,40,40);
	pop();

	angleMode(RADIANS);
	pop();
}