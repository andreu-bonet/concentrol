import prompt from 'prompt'
import { mouse } from '@nut-tree/nut-js'
import { readFile, writeFile } from 'fs/promises'

async function readConfig() {
	const data = (await readFile('.env')).toString()
	const config = data
		.split('\n')
		.filter(line => line !== '')
		.reduce((config, line) => {
			const [key, value] = line.split('=')
			config[key] = value
			return config
		}, {})
	return config
}

async function writeConfig(config) {
	const config_as_text = Object.entries(config)
		.map(entry => entry.join('='))
		.join('\n')

	await writeFile('.env', config_as_text)
}

async function main() {
	prompt.start()
	const config = await readConfig()

	console.log(
		'the following is for calibrating the region from the screen from which to read the pressure readings'
	)

	await prompt.get(
		'keeping the terminal window active hover the mouse cursor over the top left point of the desired region and press enter'
	)
	const position1 = await mouse.getPosition()
	config['POS_1_X'] = position1.x
	config['POS_1_Y'] = position1.y

	await prompt.get(
		'keeping the terminal window active hover the mouse cursor over the bottom right point of the desired region and press enter'
	)
	const position2 = await mouse.getPosition()
	config['POS_2_X'] = position2.x
	config['POS_2_Y'] = position2.y

	await writeConfig(config)
	console.log('configuration written successfully')
}

main()
