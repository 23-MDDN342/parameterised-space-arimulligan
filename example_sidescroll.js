function draw_one_frame(cur_frac) {
  // variables
  let  middleY = cos(cur_frac * 6) * 30 + height/2
  let bottomY = sin(cur_frac * 6) * 30 + height/1.3
  let  topY = sin(cur_frac * 6) * 30 + height/5
  let curve = sin(cur_frac * 6) * 30;

  let frog_size = height/12;

  let grid_points_left = [
   -0.25 * width,
    0.25 * width,
    0.75 * width,
    1.25 * width
  ]

  // middle
  draw_frog_row(debugView, grid_points_left, middleY, frog_size, true, cur_frac, curve);

  let grid_points_right = [
    1.10 * width,
    0.60 * width,
    0.10 * width,
    -0.40 * width
  ]

  // bottom
  draw_frog_row(debugView, grid_points_right, bottomY, frog_size, false, cur_frac, curve)

  // top one
  draw_frog_row(debugView, grid_points_right, topY, frog_size, false, cur_frac, curve)
}

function draw_frog_row(debugView, grid_points, y, size, leftToRight, cur_frac, curve){
  let isJumping = curve < 1;
  
  if (debugView) {
    stroke(255, 0, 0);
    strokeWeight(height/100);
    noFill();
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

  fill(100, 100, 100);
  noStroke();
  for(let i=0; i<grid_points.length-1; i++) {
    let cur_x_pos = map(cur_frac, 0, 1, grid_points[i], grid_points[i+1])
    if (leftToRight){
      draw_froggy(cur_x_pos, y, size, false, !isJumping)
    }
    else {
      push();
      scale(-1, 1);
      translate(-cur_x_pos, y)
      draw_froggy(0, 0, size, false, isJumping)
      pop();
    }
  }
}

function draw_froggy(x, y, size, isDebug, isJumping){
  angleMode(DEGREES); // cause i can't work in radians lol

  if (isDebug){
    stroke('red')
    noFill();
  }
  else {
    fill(44, 97, 24)
    stroke('black')
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
  ellipse(x+25, y-35, size/2, size/2.4)

  fill('white')
  ellipse(x+25, y-35, size/4, size/4)

  fill('black')
  circle(x+28, y-35, size/5)

  //  smile
  noFill()
  arc(x+35, y-20, 15, 15, 0, 150, OPEN);

  angleMode(RADIANS); // changing it back for cosine function
}

// rippl e- need more contrast - and has a beat to it - should keep it like that?
// should do multiple different submissions with different experiments