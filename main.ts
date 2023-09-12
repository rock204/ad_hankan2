input.onButtonPressed(Button.A, function () {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    mode = 1
    kg_array = []
})
function stop_display () {
    max = Math.round(custom.calculateMax(kg_array))
    average = Math.round(custom.calculateMean(kg_array))
    serial.writeValue("最大値(kg)", max)
    serial.writeValue("平均値(kg)", average)
    basic.showString("max")
    basic.showNumber(max)
    basic.showString("m")
    basic.showNumber(average)
    mode = 999
}
function sokutei () {
    kg = pins.map(
    pins.analogReadPin(AnalogPin.P0),
    0,
    1023,
    0,
    100
    )
}
let kg = 0
let average = 0
let max = 0
let kg_array: number[] = []
let mode = 0
serial.writeLine("スタート")
mode = 999
let ikichi = 2
basic.forever(function () {
    sokutei()
    if (mode == 1) {
        if (kg > ikichi) {
            mode = 2
        }
    }
    if (mode == 2) {
        if (kg < ikichi) {
            music.play(music.tonePlayable(262, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
            mode = 0
            stop_display()
        } else {
            kg_array.push(kg)
            serial.writeLine("" + (kg))
        }
    }
})
