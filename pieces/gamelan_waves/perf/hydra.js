let ocean1 = "/Users/danielmanesh/Projects/Tidal/pieces/gamelan_waves/videos/ocean1.mp4";
let ocean2 = "/Users/danielmanesh/Projects/Tidal/pieces/gamelan_waves/videos/ocean2.mp4";
let beach1 = "/Users/danielmanesh/Projects/Tidal/pieces/gamelan_waves/videos/beach1.mp4";
let beach2 = "/Users/danielmanesh/Projects/Tidal/pieces/gamelan_waves/videos/beach2.mp4";
s0.initVideo(ocean1);
s3.initVideo(beach2);

let x = "hi lol";  // Clear the massive amount of code displayed lol

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
