input.onButtonPressed(Button.A, function () {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    mode = 1
    max = 0
    kg_array = []
})
function stop_display () {
    max = Math.round(max)
    serial.writeValue("握力(kg)", max)
    basic.showNumber(max)
    mode = 999
}
input.onButtonPressed(Button.B, function () {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
    mode = 0
})
function sokutei () {
    kg = pins.map(
    pins.analogReadPin(AnalogPin.P0),
    0,
    1023,
    0,
    100
    )
    kg_array.push(kg)
    serial.writeLine("" + (kg))
}
let kg = 0
let kg_array: number[] = []
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
