input.onButtonPressed(Button.A, function () {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    mode = 1
    max = 0
})
function stop_display () {
	
}
input.onButtonPressed(Button.B, function () {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
    mode = 0
})
function sokutei () {
	
}
let max = 0
let mode = 0
serial.writeLine("スタート")
mode = 999
basic.forever(function () {
    if (mode == 1) {
        sokutei()
    }
    if (mode == 0) {
        stop_display()
    }
})
