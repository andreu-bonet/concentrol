import { Region, screen, FileType } from '@nut-tree/nut-js'
import dotenv from 'dotenv'

dotenv.config()

async function main() {
	console.log(
		parseInt(process.env.POS_1_X),
		parseInt(process.env.POS_1_Y),
		parseInt(process.env.POS_2_X) - parseInt(process.env.POS_1_X),
		parseInt(process.env.POS_2_Y) - parseInt(process.env.POS_1_Y)
	)
	await screen.captureRegion(
		'image.png',
		new Region(
			parseInt(process.env.POS_1_X),
			parseInt(process.env.POS_1_Y),
			parseInt(process.env.POS_2_X) - parseInt(process.env.POS_1_X),
			parseInt(process.env.POS_2_Y) - parseInt(process.env.POS_1_Y)
		),
		FileType.PNG
	)
}

main()
