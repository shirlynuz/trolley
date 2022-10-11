let distance = 0
radio.setGroup(3)
radio.setTransmitPower(7)
radio.setTransmitSerialNumber(true)
basic.forever(function on_forever() {
    
    basic.showIcon(IconNames.Happy)
    radio.sendString("trolley " + ("" + control.deviceSerialNumber()))
    if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        basic.showIcon(IconNames.Yes)
        basic.pause(1000)
        basic.clearScreen()
        while (pins.digitalReadPin(DigitalPin.P2) == 1) {
            pins.digitalWritePin(DigitalPin.P1, 1)
            distance = Math.idiv(pins.pulseIn(DigitalPin.P1, PulseValue.High), 58)
            basic.showNumber(distance)
            if (distance < 20) {
                pins.digitalWritePin(DigitalPin.P0, 1)
            } else {
                pins.digitalWritePin(DigitalPin.P0, 0)
            }
            
            if (pins.digitalReadPin(DigitalPin.P2) == 0) {
                basic.showIcon(IconNames.No)
                basic.pause(5000)
            }
            
        }
    }
    
})
