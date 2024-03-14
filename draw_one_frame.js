var x = 300;
var y = 300;
var a = 100;
var b = 100;
// this is the fireworks example
function draw_one_frame() {
	background('black');
	x += 2;
	y += 2;
	a -= 2;
	b -= 2;

	// draw cow oval face
	for (let i = 0; i < 15; i++){
		for (let k = 0; k < 20; k++){
			hexagon(i*30, k*30, .1)
		}
	}

}

/**
 * Got this from jenagosta
 * @param transX x position
 * @param {*} transY y position
 * @param {*} s size
 * @link https://editor.p5js.org/jenagosta/sketches/Sy5wzBblg
 */
function hexagon(transX, transY, s) {
	stroke('white');
	strokeWeight(50);
	noFill();
	push();
	translate(transX, transY);
	scale(s);
	beginShape();
		vertex(-75, -130);
		vertex(75, -130);
		vertex(150, 0);
		vertex(75, 130);
		vertex(-75, 130);
		vertex(-150, 0);
	endShape(CLOSE); 
	pop();
}