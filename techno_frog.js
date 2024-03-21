const ease = new p5.Ease();

function draw_one_frame(cur_frac) {
  // ripple stuff
  background('black');

  let scaleX = width/960;
  let scaleY = height/540;
  push();
  scale(scaleX, scaleY)
  // top and bottom ripples
  for (var i = 0; i < 3; i++){
		for (var k = 0; k < 2; k++){
      drawRipple(i*1.35, k*1.55, cur_frac, 10, -100);
		}
	}

  // middle and very top ripples
  for (var i = 0; i < 3; i++){
    drawRipple(i*1.35, 0.9, cur_frac, 7, 150);
    drawRipple(i*1.35, -0.7, cur_frac, 7, 150);
    drawRipple(i*1.35, 2.3, cur_frac, 7, 150);
  }
  
  // frog jumping stuff - variables
  let middleY = cos(cur_frac * 6) * 30 + 270
  let bottomY = sin(cur_frac * 6) * 30 + 415.4
  let topY = sin(cur_frac * 6) * 30 + 100
  let curve = sin(cur_frac * 6) * 30;
  
  let frog_size = 45;
  
  let grid_points_left = [
    -0.25 * 960,
    0.25 * 960,
    0.75 * 960,
    1.25 * 960
  ]
  
  // middle
  draw_frog_row(debugView, grid_points_left, middleY, frog_size, true, cur_frac, curve);
  
  let grid_points_right = [
    1.10 * 960,
    0.60 * 960,
    0.10 * 960,
    -0.40 * 960
  ]
  
  // bottom
  draw_frog_row(debugView, grid_points_right, bottomY, frog_size, false, cur_frac, curve)
  
  // top one
  draw_frog_row(debugView, grid_points_right, topY, frog_size, false, cur_frac, curve)
  pop();
}

function drawRipple(gridX, gridY, cur_frac, size, startingX){
  for (let i = 15; i > 0; i--) {
    let x = (960 / 15) + (gridX * 400) + startingX;
    let y = gridY + sin(cur_frac * 6 - i * 0.4) * 20 + (gridY * 200) + 150;
    if (startingX < 0){
      x += 80;
    }
    fill(0, 0, 255-(i*15));
		noStroke();

    let ripple_width = i * 3 * size;
    let ripple_height = i * 1.5 * size;

		ellipse(x, y, ripple_width, ripple_height);
	}
}

function draw_frog_row(debugView, grid_points, y, size, leftToRight, cur_frac, curve){
  let isJumping = curve < -1;
  
  if (debugView) {
    for(let i=0; i<grid_points.length; i++) {
      if (leftToRight){
        draw_froggy(grid_points[i], y, size, true, !isJumping)
      }
      else {
        push();
        scale(-1, 1);
        translate(-grid_points[i], y)
        draw_froggy(0, 0, size, true, isJumping)
        pop();
      }
    }
  }

  for(let i=0; i<grid_points.length-1; i++) {
    if (leftToRight){
      const ease_amount_across = ease.sineOut(cur_frac);
      let cur_x_pos = map(ease_amount_across, 0, 1, grid_points[i], grid_points[i+1])
      
      if (!isJumping){
        push();
        scale(-1, 1)
        noStroke();
        fill(140, 3, 252)
        let cur_x_music_note = map(ease_amount_across, 3, 0, grid_points[i], grid_points[i+1])
        draw_music_note(-cur_x_music_note, y)
        pop();
      }
      draw_froggy(cur_x_pos, y, size, false, !isJumping)
    }
    else {
      const ease_amount_across = ease.sineIn(cur_frac);
      let cur_x_pos = map(ease_amount_across, 0, 1, grid_points[i], grid_points[i+1])
      push();
      scale(-1, 1);
      translate(-cur_x_pos, y)
      draw_froggy(0, 0, size, false, isJumping)
      pop();

      if (isJumping){
        let cur_x_music_note = map(ease_amount_across, 0, 3, grid_points[i], grid_points[i+1])

        push();
        scale(-1, 1);
        translate(-960, 0);
        noStroke();
        fill(140, 3, 252)
        draw_music_note(cur_x_music_note - 90, y)
        pop();
      }
    }
  }
}

function draw_music_note(x, y){
  // top bar
  rect(x + 55, y+25, 30, 7)
  // left area
  rect(x +75, y+30, 10, 20)
  circle(x +83, y+50, 15)
  // right area
  rect(x +55, y+30, 10, 20)
  circle(x +63, y+50, 15)
}

function draw_froggy(x, y, size, isDebug, isJumping){
  angleMode(DEGREES); // cause i can't work in radians lol
  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = color(0, 109, 0);

  if (isDebug){
    stroke('red')
    noFill();
  }
  else {
    fill(2, 209, 54);
    stroke(0, 109, 0);
    strokeWeight(3)
  }

  // back foot leg
  if (isJumping){
    ellipse(x-70, y+40, size/2, size/6)
  }
  else {
    ellipse(x+10, y+25, size/2, size/6)
  }

  push();
    translate(x, y)
    if (isJumping){
      rotate(-10)
    
      // back leggy
      ellipse(-60, 15, size, size/2)
  
      // back arm
      ellipse(20, 15, size/4, size)
  
      // back foot arm
      ellipse(15, 37, size/3, size/6)
    }
    else {
      rotate(-20)
  
      // back leggy
      ellipse(0, 15, size, size/2)
  
      // back arm
      ellipse(20, 15, size/4, size)
    }

    // body
    ellipse(0, 0, size*2, size*1.1)
  pop();

  // front leggy
  push();
    translate(x,y)
    rotate(-30)
    if (isJumping){
      ellipse(-60, -15, size, size/2)
    }
    else {
      ellipse(-30, -5, size, size/2)
    }

    // front arm
    ellipse(20, 25, size/5, size)
  pop();

  if (isJumping){
    // front foot leg
    ellipse(x-90, y+35, size/2, size/4)
    // front foot arm
    ellipse(x+35, y+30, size/3, size/6)
  }
  else {
    ellipse(x-20, y+25, size/2, size/4)
    ellipse(x+42, y+27, size/3, size/6)
  }

  // head
  ellipse(x+38, y-35, size/2, size/2.4) // back eye
  ellipse(x+30, y-25, size/1.1, size/1.5)
  
  // eye stuff
  strokeWeight(2)
  ellipse(x+25, y-35, size/2, size/2.4)

  fill('black')
  circle(x+28, y-35, size/5)

  // smile
  noFill()
  arc(x+35, y-20, 15, 15, 0, 150, OPEN);

  angleMode(RADIANS); // changing it back for cosine function
  drawingContext.shadowBlur = 0;
}