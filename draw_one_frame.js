var x = 300;
var y = 300;
var a = 100;
var b = 100;
// this is the fireworks example
function draw_one_frame() {
	background(10, 30, 150);
	x += 2;
	y += 2;
	a -= 2;
	b -= 2;

	// for (var i = 0; i < 3; i++){
	// 	for (var k = 0; k < 3; k++){
		// 	}
		// }
		
	// next need to create shell, then make shell scroll while doing one bounce into the center of the ripple
	drawRipple(y, 1, 1);
}

function drawRipple(height, gridX, gridY){
	for (let i = 100; i > 0; i--) {
		
		let y = getNoiseValue(i, height / 2, 1, "backgroundGrid", 3, 50, 40) + (gridY * 150) + 100;
		fill(52, getNoiseValue(i, height / 2, 1, "hi", 90, 130, 20), 235)
		noStroke();
		if (i < 50) {
			ellipse((width / 9) + (gridX * 300) + 50, y,  i * 20, i*10);
		}
		else {
			if ( i % 10 == 0){
				ellipse((width / 9) + (gridX * 300) + 50, y,i * 20, i*10);
			}
		}

	}
}