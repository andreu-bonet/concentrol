import convict from 'convict'
import dotenv from 'dotenv'

dotenv.config()

const config = convict({
	port: { format: 'port', default: 80, env: 'PORT' },
	serial: {
		path: { format: String, default: 'COM4', env: 'SERIAL_PATH' },
		rate: { format: Number, default: 9600, env: 'SERIAL_RATE' },
	},
	pos_1: {
		x: { format: Number, default: 0, env: 'POS_1_X' },
		y: { format: Number, default: 0, env: 'POS_1_Y' },
	},
	pos_2: {
		x: { format: Number, default: 500, env: 'POS_2_X' },
		y: { format: Number, default: 300, env: 'POS_2_Y' },
	},
})

config.validate({ allowed: 'strict' })

export { config }
