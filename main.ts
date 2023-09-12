function hensu_shokika () {
    kg_array = []
    max_array = []
    avr_array = []
    counter = 0
}
input.onButtonPressed(Button.A, function () {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    mode = 1
    hensu_shokika()
})
function stop_display () {
    counter += 1
    max = Math.round(custom.calculateMax(kg_array))
    average = Math.round(custom.calculateMean(kg_array))
    serial.writeValue("no", counter)
    serial.writeValue("最大値(kg)", max)
    serial.writeValue("平均値(kg)", average)
    max_array.push(max)
    avr_array.push(average)
    kg_array = []
    mode = 1
}
input.onButtonPressed(Button.B, function () {
    mode = 999
    serial.writeLine("----結果-max--avrage-")
    for (let カウンター = 0; カウンター <= counter - 1; カウンター++) {
        serial.writeNumber(カウンター + 1)
        serial.writeString("　")
        serial.writeNumber(max_array[カウンター])
        serial.writeString("　")
        serial.writeLine("" + (avr_array[カウンター]))
    }
    serial.writeLine("----全体の平均----")
    max = Math.round(custom.calculateMean(max_array))
    average = Math.round(custom.calculateMean(avr_array))
    serial.writeString("___")
    serial.writeNumber(max)
    serial.writeString("　")
    serial.writeLine("" + (average))
})
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
let counter = 0
let avr_array: number[] = []
let max_array: number[] = []
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
