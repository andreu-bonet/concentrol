import path from 'path'
import http from 'http'
import express from 'express'
import { Server } from 'socket.io'
import { config } from './config'
import tesseract from 'node-tesseract-ocr'
import { SerialPort } from 'serialport'
import { Region, screen, FileType } from '@nut-tree/nut-js'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const state: Record<string, number | boolean> = {
	pump_1_active: false,
	pump_1_flow: 1,
	pump_2_active: false,
	pump_2_flow: 1,
	valve_active: false,
	valve_bar: 10,
	led_active: false,
}

let valve_bar = 10000

function parse_pump_flow(value: number) {
	if (value < 0) value = 0
	if (value > 5) value = 5
	return Math.floor((value * 255) / 5)
}

const serialPort = new SerialPort({
	path: config.get('serial.path'),
	baudRate: config.get('serial.rate'),
})

app.use(express.static(path.join(process.cwd(), 'dist')))

io.on('connection', socket => {
	socket.emit('state', state)

	socket.on('control', payload => {
		let { key, value }: { key: string; value: string | number | boolean } =
			payload

		if (typeof value === 'string') {
			value = parseFloat(value.replace(',', '.'))
		}

		state[key] = value
		io.emit('state', state)

		if (key.match(/pump_\d_flow/) && typeof value !== 'boolean') {
			value = parse_pump_flow(value)
		}

		if (key === 'valve_bar' && typeof value !== 'boolean') {
			valve_bar = Math.round(value * 1000)
			console.log('special', valve_bar)
			return
		}

		const command = `${key}:${value}`
		console.log('command', command)

		serialPort.write(command, err => {
			if (err) {
				return console.log('Error on write: ', err?.message)
			}
		})
	})
})

async function read_bar() {
	try {
		await screen.captureRegion(
			'image.png',
			new Region(
				config.get('pos_1.x'),
				config.get('pos_1.y'),
				config.get('pos_2.x') - config.get('pos_1.x'),
				config.get('pos_2.y') - config.get('pos_1.y')
			),
			FileType.PNG
		)

		const text = await tesseract.recognize('image.png', { lang: 'rus' })
		const number = parseFloat(text.replace(',', '.'))

		console.log(number)

		if (number >= valve_bar && state.valve_active === false) {
			const command = 'valve_active:true'
			console.log('command', command)
			serialPort.write(command, err => {
				if (err) {
					return console.log('Error on write: ', err?.message)
				}
			})
			state['valve_active'] = true
			io.emit('state', state)
		}
	} catch (err) {
		console.log(err)
	}
}

setInterval(() => read_bar(), 1000)

server.listen(config.get('port'), () =>
	console.log(`Runing on port ${config.get('port')}`)
)
