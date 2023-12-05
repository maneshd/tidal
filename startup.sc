// Updates
// Quarks.checkForUpdates({Quarks.install("SuperDirt", "v1.7.2"); thisProcess.recompile()});

Quarks.gui


s.quit


(
// Set up OSC forwarding for Hydra, but only if we need it!

// This code forwards messages from tidal to an additional port via OSC.
// From https://github.com/tado/ofxTidalCycles
var hydraAddr = NetAddr.new("127.0.0.1", 3333);
var tidalAddr = NetAddr.new("127.0.0.1", 6010);
OSCFunc.newMatching({ |msg, time, addr, port|
	var latency = time - Main.elapsedTime;
	msg = msg ++ ["time", time, "latency", latency];
	// msg.postln;
	hydraAddr.sendBundle(latency, msg)
}, '/dirt/play', tidalAddr);
)

/*
This is an example startup file. You can load it from your startup file
(to be found in Platform.userAppSupportDir +/+ "startup.scd")
*/

(
// ServerOptions.outDevices;
// s.options.outDevice = "MacBook Pro Speakers";
s.options.outDevice = "External Headphones";
// s.options.outDevice = "soundflower + speakers";
// s.options.outDevice = "ZoomAudioD";
// s.options.inDevice = "ZoomAudioD";



s.reboot { // server options are only updated on reboot

  // s.options.numInputBusChannels = 0;
  s.options.numInputBusChannels = 2;
	// configure the sound server: here you could add hardware specific options
	// see http://doc.sccode.org/Classes/ServerOptions.html
	s.options.numBuffers = 1024 * 256; // increase this if you need to load more samples
	s.options.memSize = 8192 * 32; // increase this if you get "alloc failed" messages
	s.options.numWireBufs = 64; // increase this if you get "exceeded number of interconnect buffers" messages
	s.options.maxNodes = 1024 * 32; // increase this if you are getting drop outs and the message "too many nodes"
	s.options.numOutputBusChannels = 2; // set this to your hardware output channel size, if necessary
	// s.options.numInputBusChannels = 2; // set this to your hardware output channel size, if necessary
	// boot the server and start SuperDirt
	s.waitForBoot {
		~dirt.stop; // stop any old ones, avoid duplicate dirt (if it is nil, this won't do anything)
		~dirt = SuperDirt(2, s); // two output channels, increase if you want to pan across more channels
		~dirt.loadSoundFiles;   // load samples (path containing a wildcard can be passed in)
		// ~dirt.doNotReadYet = true;  // Uncomment for lazy loading.
		~dirt.loadSoundFiles("/Users/danielmanesh/Projects/tidal/samples/branch-piece/*");
		~dirt.loadSoundFiles("/Users/danielmanesh/Projects/tidal/samples/intro-course/*");
		~dirt.loadSoundFiles("/Users/danielmanesh/Projects/tidal/samples/gamelan/*");
		~dirt.loadSoundFiles("/Users/danielmanesh/Projects/tidal/samples/misc/*");
		~dirt.loadSoundFiles("/Users/danielmanesh/Projects/tidal/samples/tedthetrumpet/nmsamples/*");
		// s.sync; // optionally: wait for samples to be read
		~dirt.start(57120, 0 ! 12);   // start listening on port 57120, create two busses each sending audio to channel 0

		// optional, needed for convenient access from sclang:
		(
			~d1 = ~dirt.orbits[0]; ~d2 = ~dirt.orbits[1]; ~d3 = ~dirt.orbits[2];
			~d4 = ~dirt.orbits[3]; ~d5 = ~dirt.orbits[4]; ~d6 = ~dirt.orbits[5];
			~d7 = ~dirt.orbits[6]; ~d8 = ~dirt.orbits[7]; ~d9 = ~dirt.orbits[8];
			~d10 = ~dirt.orbits[9]; ~d11 = ~dirt.orbits[10]; ~d12 = ~dirt.orbits[11];
		);
	};

	s.latency = 0.3; // increase this if you get "late" messages
	// ~dirt.soundLibrary.addSynth(\superpanic, (play: { ~dirt.orbits.do(_.freeSynths) }));


};
);
