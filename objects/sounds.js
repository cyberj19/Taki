var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var Sound = {
    tikBeep: function() {
        this.tik();
        window.setTimeout(this.beep, 140);
    },
    tik: function() {
        noise(140, 0.16);
    },
    beep: function() {
        noise(140, 0.42)
    }
};



function noise(duration, volume) {
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.value = volume;
    oscillator.frequency.value = 1987;
    oscillator.type = 'triangle';

    oscillator.start();

    window.setTimeout(
        function() {
            oscillator.stop();
        },
        duration
    );
}