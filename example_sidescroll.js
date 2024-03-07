function draw_one_frame(cur_frac) {
  stroke(0);
  angleMode(DEGREES);
  rectMode(CENTER)
  fill(100, 100, 100);

  let b1_y = 0.55 * height;
  let b2_y = 0.85 * height;
  let b3_y = 0.25 * height;

  let b1_size = height/12;

  let grid_points1 = [
   -0.25 * width,
    0.25 * width,
    0.75 * width,
    1.25 * width
  ]

  if (debugView) {
    stroke(255, 0, 0);
    strokeWeight(height/100);
    noFill();
    for(let i=0; i<grid_points1.length; i++) {
      draw_froggy(grid_points1[i], b1_y, b1_size, true)
    }    
  }

  fill(100, 100, 100);
  noStroke();
  for(let i=0; i<grid_points1.length-1; i++) {
    let cur_x_pos = map(cur_frac, 0, 1, grid_points1[i], grid_points1[i+1])
    draw_froggy(cur_x_pos, b1_y, b1_size, false)
  }

  let grid_points2 = [
    1.10 * width,
    0.60 * width,
    0.10 * width,
    -0.40 * width
  ]

  if(debugView) {
    stroke(255, 0, 0);
    strokeWeight(height/100);
    noFill(); 
    for(let i=0; i<grid_points2.length; i++) {
      push();
      scale(-1, 1);
      translate(-grid_points2[i], b2_y)
      draw_froggy(0, 0, b1_size, true)
      pop();
    }    
  }

  fill(100, 100, 100);
  noStroke();
  for(let i=0; i<grid_points2.length-1; i++) {
    let cur_x_pos = map(cur_frac, 0, 1, grid_points2[i], grid_points2[i+1])
    push();
    scale(-1, 1);
    translate(-cur_x_pos, b2_y)
    draw_froggy(0, 0, b1_size, false)
    pop();
  }

  /// third oneeee
  if(debugView) {
    stroke(255, 0, 0);
    strokeWeight(height/100);
    noFill(); 
    for(let i=0; i<grid_points2.length; i++) {
      push();
      scale(-1, 1);
      translate(-grid_points2[i], b3_y)
      draw_froggy(0, 0, b1_size, true)
      pop();
    }    
  }

  fill(100, 100, 100);
  noStroke();
  for(let i=0; i<grid_points2.length-1; i++) {
    let cur_x_pos = map(cur_frac, 0, 1, grid_points2[i], grid_points2[i+1])
    push();
    scale(-1, 1);
    translate(-cur_x_pos, b3_y)
    draw_froggy(0, 0, b1_size, false)
    pop();
  }
}

function draw_froggy(x, y, size, isDebug){

  
  if (isDebug){
    stroke('red')
    noFill();
  } 
  else {
    
    fill(44, 97, 24)
    stroke('black')
  }

  // back foot leg
  ellipse(x+10, y+25, size/2, size/6)
  // front foot arm
  // ellipse(x+12, y+27, size/3, size/6)

  push();
    translate(x,y)
    rotate(-20)

    // back leggy
    ellipse(0, 15, size, size/2)

    // back arm
    ellipse(20, 15, size/4, size)

    // body
    ellipse(0, 0, size*2, size*1.1)
  pop();

  // front leggy
  push();
    translate(x,y)
    rotate(-30)
    ellipse(-30, -5, size, size/2)

    // front arm
    ellipse(20, 25, size/5, size)
  pop();

  // front foot leg 
  ellipse(x-20, y+25, size/2, size/4)
  // front foot arm
  ellipse(x+42, y+27, size/3, size/6)

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
}
// rippl e- need more contrast - and has a beat to it - should keep it like that?
// should do multiple different submissions with different experiments 