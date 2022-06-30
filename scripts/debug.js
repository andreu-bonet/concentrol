import { mouse, sleep } from '@nut-tree/nut-js'

async function main() {
	while (true) {
		const pos = await mouse.getPosition()
		console.log(pos)
		await sleep(200)
	}
}

main()
