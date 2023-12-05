let ocean1 = "/Users/danielmanesh/Projects/live-coding-cruft/vidz/videos/ocean1.mp4";
let ocean2 = "/Users/danielmanesh/Projects/live-coding-cruft/vidz/videos/ocean2.mp4";
let beach1 = "/Users/danielmanesh/Projects/live-coding-cruft/vidz/videos/beach1.mp4";
let beach2 = "/Users/danielmanesh/Projects/live-coding-cruft/vidz/videos/beach2.mp4";
s0.initVideo(ocean1);
s3.initVideo(beach2);
// s1.initVideo(ocean2);
// s2.initVideo(beach1);

let x = "hi lol";

msg.setPort(3333)
let makeRamp = (a, b, s) => {
  let t0 = performance.now();
  let t1 = t0 + 1000*s;
  return () => {
    let t = performance.now();
    if (t >= t1) return b;
    return a + (b-a)*(t-t0)/(t1-t0);
  };
};
let scenes = {
  0: () => {
    // Starting scene
    src(s3).blend(
      solid(),
      ()=>0.5 + Math.sin(time/4)/2*0.1
    ).blend(
      noise(100, 0.8),
      0.02
    ).out(o0);
  },
  1: () => {
    // Alternating w/ open water
    src(s3).blend(
      solid(),
      ()=>0.5 + Math.sin(time/4)/2*0.1
    ).blend(
      noise(100, 0.8),
      0.02
    ).blend(
      s0,
      () => 0.0 + Math.sin(time/10)/2*0.2
    ).out(o0);
  },
  2: () => {
    // Ramp to pixely ocean biz
    src(s3).blend(
      solid(),
      ()=>0.5 + Math.sin(time/4)/2*0.1
    ).blend(
      noise(100, 0.8),
      0.02
    ).blend(
      s0,
      () => 0.0 + Math.sin(time/10)/2*0.2
    ).blend(
      src(s0).shift(
        ()=>(Math.sin(time*0.09)+1)/2*0.1,
        ()=>(Math.sin(time*0.11)+1)/2*0.2,
        ()=>(Math.sin(time*0.12)+1)/2*0.8
      ).pixelate(200, 200),
      makeRamp(0.0, 1.0, 30)
    ).out(o0);
  },
  3: () => {
    osc(1).blend(
      src(s0).kaleid(2).shift(
        ()=>(Math.sin(time*0.08)+1)/2*0.3,
        ()=>(Math.sin(time*0.12)+1)/2*0.6,
        ()=>(Math.sin(time*0.14)+1)/2
      ).blend(
        src(s0).shift(
          ()=>(Math.sin(time*0.09)+1)/2*0.1,
          ()=>(Math.sin(time*0.11)+1)/2*0.2,
          ()=>(Math.sin(time*0.12)+1)/2
        ).pixelate(200, 200),
        () => 0.1+(Math.sin(time/4.5)+1)/2.0 *0.8
      ),
      0.99  // why do I have to do this???
    ).out(o0);
  },
  4: () => {
    osc(1).blend(
      src(s0).shift(
        ()=>(Math.sin(time*0.09)+1)/2*0.1,
        ()=>(Math.sin(time*0.11)+1)/2*0.2,
        ()=>(Math.sin(time*0.12)+1)/2
      ).pixelate(200, 200),
      0.99
    ).out(o0);
  },
  5: () => {
    src(s0).shift(
      ()=>(Math.sin(time*0.09)+1)/2*0.1,
      ()=>(Math.sin(time*0.11)+1)/2*0.2,
      ()=>(Math.sin(time*0.12)+1)/2
    ).pixelate(200, 200).blend(solid(), makeRamp(0, 1.0, 20)).out(o0);
  }
};
var parseTidal = (args) => {
  let obj = {}
  for(var i = 0; i < args.length; i+=2){
    obj[args[i]] = args[i+1]
  }
  return obj
};
// receive messages from supercollider in hydra. '/play2' corresponds to the
// address of the OSC message, defined in the file tidal-forward.sc
// open the console to see the messages, using Ctrl+Alt+I (windows), Cmd+Opt+I (mac), or Ctrl + Shift + I(linux)
msg.on('/dirt/play', (args) => {
 let tidal = parseTidal(args)
 if (tidal.s && tidal.s == "bd") {
   console.log("scene: ", tidal.n);
   scenes[tidal.n] ? scenes[tidal.n]() : scenes[0]();
 }
});

let x = "hi there";

osc(1).blend(
    src(s0).kaleid(2).shift(
      ()=>(Math.sin(time*0.08)+1)/2*0.3,
      ()=>(Math.sin(time*0.12)+1)/2*0.6,
      ()=>(Math.sin(time*0.14)+1)/2
    ).blend(
      src(s0).shift(
        ()=>(Math.sin(time*0.09)+1)/2*0.1,
        ()=>(Math.sin(time*0.11)+1)/2*0.2,
        ()=>(Math.sin(time*0.12)+1)/2
      ).pixelate(200, 200),
      () => 0.1+(Math.sin(time/4.5)+1)/2.0 *0.8
    ),
    0.99
  ).out(o0);

src(s0).shift(
  ()=>(Math.sin(time*0.09)+1)/2*0.1,
  ()=>(Math.sin(time*0.11)+1)/2*0.2,
  ()=>(Math.sin(time*0.12)+1)/2
).pixelate(200, 200).out(o0);

src(s0).pixelate(200, 200).out(o0);

src(s0).pixelate(200, 200).out(o0);

osc(1).blend(
  src(s0).shift(
    ()=>(Math.sin(time*0.09)+1)/2*0.1,
    ()=>(Math.sin(time*0.11)+1)/2*0.2,
    ()=>(Math.sin(time*0.12)+1)/2*0.8
  ).pixelate(200, 200),
  0.99).out(o0);

///////////////////
// SCRATCH SPACE //
///////////////////

    // // Maybe use, maybe don't?
    // src(s1).modulateRepeat(
    //   // noise(0.8, 0.3),
    //   osc(1),
    //   3, 3,
    //   0.1, 0.5
    // ).blend(
    //   s0,
    //   () => (Math.sin(time/2)+1)/2*0.5 + 0.1
    // ).out(o0);

    // src(s0).modulateRepeat(
    //   osc(3),
    //   5, 5, 0.1, 0.5).blend(
    //     src(s0).shift(
    //       ()=>(Math.sin(time*0.09)+1)/2*0.1,
    //       ()=>(Math.sin(time*0.11)+1)/2*0.2,
    //       ()=>(Math.sin(time*0.12)+1)/2
    //     ).pixelate(200, 200),
    //     () => (Math.sin(time/2.2)+1)/2.0 *0.8
    //   ).out(o0);

let makeRamp = (a, b, s) => {
  let t0 = performance.now();
  let t1 = t0 + 1000*s;
  return () => {
    let t = performance.now();
    if (t >= t1) return b;
    return a + (b-a)*(t-t0)/(t1-t0);
  };
};
src(s0).shift(
  ()=>(Math.sin(time*0.09)+1)/2*0.1,
  ()=>(Math.sin(time*0.11)+1)/2*0.2,
  ()=>(Math.sin(time*0.12)+1)/2
).pixelate(200, 200).blend(solid(), makeRamp(0, 1.0, 8)).out(o0);


src(s3).blend(
  solid(),
  ()=>0.5 + Math.sin(time/4)/2*0.1
).blend(
  noise(100, 0.4),
  0.01
).pixelate(
  100, 100
).blend(
  src(s0).shift(
    ()=>(Math.sin(time*0.09)+1)/2*0.1,
    ()=>(Math.sin(time*0.11)+1)/2*0.2,
    ()=>(Math.sin(time*0.12)+1)/2
  ).pixelate(200, 200),
  () => 0.1+(Math.sin(time/6.2)+1)/2.0 *0.8
).out(o0);

src(s0).shift(
  ()=>(Math.sin(time*0.09)+1)/2*0.1,
  ()=>(Math.sin(time*0.11)+1)/2*0.2,
  ()=>(Math.sin(time*0.12)+1)/2
).pixelate(200, 200).out(o0);



let makeRamp = (a, b, s) => {
  let t0 = performance.now();
  let t1 = t0 + 1000*s;
  return () => {
    let t = performance.now();
    if (t >= t1) return b;
    return a + (b-a)*(t-t0)/(t1-t0);
  };
};
src(s3).blend(
  solid(),
  ()=>0.5 + Math.sin(time/4)/2*0.1
).blend(
  noise(100, 0.8),
  0.02
).blend(
  s0,
  () => 0.0 + Math.sin(time/10)/2*0.2
).blend(
  src(s0).shift(
    ()=>(Math.sin(time*0.09)+1)/2*0.1,
    ()=>(Math.sin(time*0.11)+1)/2*0.2,
    ()=>(Math.sin(time*0.12)+1)/2*0.8
  ).pixelate(200, 200),
  makeRamp(0.1, 1.0, 20)
).out(o0);


src(s3).blend(
  solid(),
  ()=>0.5 + Math.sin(time/4)/2*0.1
).blend(
  noise(100, 0.8),
  0.02
).blend(
  s0,
  () => 0.0 + Math.sin(time/10)/2*0.2
).blend(
  src(s0).shift(
    ()=>(Math.sin(time*0.09)+1)/2*0.1,
    ()=>(Math.sin(time*0.11)+1)/2*0.2,
    ()=>(Math.sin(time*0.12)+1)/2*0.8
  ).pixelate(200, 200),
  () => 0.3+(Math.sin(time/5)+1)/2.0 *0.7
).out(o0);







// Scene 0
// Start (Dark beach)
src(s3).blend(
  solid(),
  ()=>0.5 + Math.sin(time/4)/2*0.1
).blend(
  noise(100, 0.2),
  0.01
).out(o0);

// // Start (Dark beach)
// src(s3).blend(
//   solid(),
//   ()=>0.5 + Math.sin(time/4)/2*0.1
// ).pixelate(
//   150+Math.sin(time)*150,
//   150+Math.sin(time)*150
// ).out(o0);


// Alternating w/ open water
src(s3).blend(
  solid(),
  ()=>0.5 + Math.sin(time/4)/2*0.1
).blend(
  s0,
  () => 0.0 + Math.sin(time/10)/2*0.2
).out(o0);


solid().out(o0);


// Thing 3
src(s1).modulateRepeat(
  // noise(0.8, 0.3),
  osc(1),
  3, 3,
  0.1, 0.5
).blend(
  s0,
  () => (Math.sin(time/2)+1)/2*0.5 + 0.1
).out(o0);


// Maybe start w/o the shift?
src(s0).modulateRepeat(
  osc(1),
  5, 5, 0.1, 0.5).blend(
    src(s0).shift(
      ()=>(Math.sin(time*0.09)+1)/2*0.1,
      ()=>(Math.sin(time*0.11)+1)/2*0.2,
      ()=>(Math.sin(time*0.12)+1)/2
    ).pixelate(200, 200),
    () => (Math.sin(time/10.2)+1)/2.0 *0.8
  ).out(o0);

  // Maybe start w/o the shift?
  src(s0).modulateRepeat(
    osc(3),
    5, 5, 0.1, 0.5).blend(
      src(s0).shift(
        ()=>(Math.sin(time*0.09)+1)/2*0.1,
        ()=>(Math.sin(time*0.11)+1)/2*0.2,
        ()=>(Math.sin(time*0.12)+1)/2
      ).pixelate(200, 200),
      () => 0.1+(Math.sin(time/2.2)+1)/2.0 *0.8
    ).out(o0);



// WHy won't this work...?
  src(s0).modulateRepeat(
    osc(3),
    4, 4, 0.1, 0.5).blend(
      src(s0).shift(
        ()=>(Math.sin(time*0.09)+1)/2*0.1,
        ()=>(Math.sin(time*0.11)+1)/2*0.2,
        ()=>(Math.sin(time*0.12)+1)/2
      ).pixelate(200, 200),
      1.0
      // () => (Math.sin(time/2.2)+1)/2.0 *0.8
    ).out(o0);

src(s0).pixelate(200, 200).shift(0.3, 0.2, 0.1).out(o0);

src(s0).shift(
    ()=>(Math.sin(time*0.09)+1)/2*0.1,
    ()=>(Math.sin(time*0.11)+1)/2*0.2,
    ()=>(Math.sin(time*0.12)+1)/2
  ).pixelate(200, 200).out(o0);


src(s0).shift(
  0,
  0,
  0
).pixelate(200, 200).out(o0);




src(s3).blend(
  solid(),
  ()=>0.5 + Math.sin(time/4)/2*0.1
).blend(
  noise(100, 0.2),
  0.01
).blend(
  src(s0).shift(
    ()=>(Math.sin(time*0.09)+1)/2*0.1,
    ()=>(Math.sin(time*0.11)+1)/2*0.2,
    ()=>(Math.sin(time*0.12)+1)/2
  ).pixelate(200, 200),
  () => 0.1+(Math.sin(time/2.2)+1)/2.0 *0.8
).out(o0);









  src(s0).modulateRepeat(
    osc(6),
    4, 4, 0.1, 0.5).blend(
      src(s3).shift(
        ()=>(Math.sin(time*0.09)+1)/2*0.1,
        ()=>(Math.sin(time*0.11)+1)/2*0.2,
        ()=>(Math.sin(time*0.12)+1)/2
      ).pixelate(200, 200),
      () => (Math.sin(time/2.2)+1)/2.0 *0.8
    ).out(o0);

    src(s0).modulateRepeat(
      osc(6),
      4, 4, 0.1, 0.5).blend(
        solid(), 0.2
      ).out(o0);



src(s2).blend(s0, () => (Math.sin(time)+1)/8).out(o0);




src(s1).shift(
  0.0,
  // () => (Math.sin(time * 0.5)+1)/2,
  () => (Math.sin(time * 0.11)+1)/8,
  0.0,
  () => (Math.sin(time*0.12)+1)/2
).out(o0);

src(o0).kaleid(4).out(o1);

src(o1).kaleid(5).out(o2);

src(o0).shift(
  () => (Math.sin(time * 0.1)+1)/4,
  0.0, 0.0
).out(o3);

render(o0);


src(s2).out(o2);

src(s0).out(o0);


src(s0).kaleid(4).out(o0);

src(s0).blend(noise(0.5, 0.6)).out(o0);

src(s1).out(o1);

render();






s0.initVideo("/Users/danielmanesh/Projects/live-coding-cruft/vidz/videos/beach2.mp4")

src(s0).pixelate(500, 500).out(o0)

src(s0).kaleid(4).out(o0)


src(s0).modulate(osc(1)).out(o0)



// By default, the environment contains four separate output buffers that can each render different graphics.
// The outputs are accessed by the variables o0, o1, o2, and o3.

// to show all render buffers at once:
render()

// If no output is specified in out(), the graphics are rendered to buffer o0.
s0.initCam()
src(s0).out() // src(s0).out() is the same as saying src(s0).out(o0)

// to render an oscillator to output buffer o1:
osc(20, 0.1, 0.6).out(o1)

render(o1) // show only o1

render(o0) // show only o0

render() // show all four outputs o0, o1, o2, o3

// Blending modes (similar to photoshop) allow you to combine multiple sources together
// multiply o0 with o1, and render the result to o2
src(o0).mult(o1).out(o2)

// 'multiply' means that the rgb values of each pixel of one image is multiplied by
// the rgb values of the pixel in the same place in the other image

src(o0).add(o1).out(o2)
src(o0).diff(o1).out(o2)
src(o0).mask(o1).out(o2)

// The composite functions blend(), diff(), mult(), and add() perform arithmetic operations to combine
// the input texture color with the base texture color, similar to photoshop blend modes.
// modulate(texture, amount) uses the red and green channels of the input texture to modify the x and y coordinates of the base texture. More about modulation at: https://lumen-app.com/guide/modulation/

src(o0).modulate(o1).out(o2)

src(o0).modulateScale(o1).out(o2)

osc(20, 0.1, 0.6).color(1, 0, 0).out(o1)
osc(20, 0.1, 0.6).color(0, 1, 0).out(o1)
osc(20, 0.1, 0.6).out(o1)

src(o0).modulateRotate(o1).out(o2)
src(o0).modulatePixelate(o1).out(o2)


// composite operations can also be added onto each other within the same
// chain of functions
src(s0).mult(osc(20, 0.1, 0.8).rotate(0, 0.2)).out(o3)

// This can also be written as follows. (ctrl + enter to evaluate a block)
src(s0)
  .mult(osc(20, 0.1, 0.8).rotate(0, 0.4))
  .out(o3)
render(o3)

// more examples
osc(80, 0.1, 0.8)
  .color(1.0, 0.8, -1.0)
  .rotate(0.51, 0.1)
  .modulate(osc(40, -0.1), 0.1)
  .out(o3)

  osc(80, 0.1, 0.8)
    .thresh()
    .rotate(1.71)
    .modulateRotate(osc(20, -0.1), 1)
    .out(o3)
