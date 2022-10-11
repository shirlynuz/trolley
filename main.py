distance = 0
radio.set_group(3)
radio.set_transmit_power(7)
radio.set_transmit_serial_number(True)

def on_forever():
    global distance
    basic.show_icon(IconNames.HAPPY)
    radio.send_string("trolley " + str(control.device_serial_number()))
    if pins.digital_read_pin(DigitalPin.P2) == 1:
        basic.show_icon(IconNames.YES)
        basic.pause(1000)
        basic.clear_screen()
        while pins.digital_read_pin(DigitalPin.P2) == 1:
            pins.digital_write_pin(DigitalPin.P1, 1)
            distance = Math.idiv(pins.pulse_in(DigitalPin.P1, PulseValue.HIGH), 58)
            basic.show_number(distance)
            if distance < 20:
                pins.digital_write_pin(DigitalPin.P0, 1)
            else:
                pins.digital_write_pin(DigitalPin.P0, 0)
            if pins.digital_read_pin(DigitalPin.P2) == 0:
                basic.show_icon(IconNames.NO)
                basic.pause(5000)
basic.forever(on_forever)
