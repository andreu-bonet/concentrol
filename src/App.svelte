<script>
	import { io } from 'socket.io-client'

	const socket = io()

	let state = null
	let pressure = 0

	function emit(key) {
		socket.emit('control', { key, value: state[key] })
	}

	socket.on('state', new_state => {
		state = new_state
	})

	socket.on('pressure', new_pressure => {
		pressure = new_pressure
	})
</script>

{#if state}
	<div class="w-full justify-center flex m-4">
		<div class="flex flex-col space-y-4">
			<h1 class="text-2xl text-center">Control Panel</h1>
			<div
				class="flex items-center justify-between p-2 border rounded-md bg-gray-50"
			>
				<label class="inline-flex relative items-center mr-5 cursor-pointer">
					<input
						type="checkbox"
						value=""
						class="sr-only peer"
						bind:checked={state.led_active}
						on:change={() => emit('led_active')}
					/>
					<div
						class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
					/>
					<span class="ml-3 text-sm font-medium">LED</span>
				</label>
			</div>
			<div
				class="flex items-center justify-between p-2 border rounded-md bg-gray-50"
			>
				<label class="inline-flex relative items-center mr-5 cursor-pointer">
					<input
						type="checkbox"
						value=""
						class="sr-only peer"
						bind:checked={state.pump_1_active}
						on:change={() => emit('pump_1_active')}
					/>
					<div
						class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
					/>
					<span class="ml-3 text-sm font-medium">PUMP#1</span>
				</label>
				<div class="wrapper bg-white border rounded-md">
					<input
						type="text"
						class="w-10 text-center"
						bind:value={state.pump_1_flow}
					/>
					<span class="mr-2">ml/min</span>
					<button
						class="border-l px-4 py-2"
						on:click={() => emit('pump_1_flow')}
					>
						Set
					</button>
				</div>
			</div>
			<div
				class="flex items-center justify-between p-2 border rounded-md bg-gray-50"
			>
				<label class="inline-flex relative items-center mr-5 cursor-pointer">
					<input
						type="checkbox"
						value=""
						class="sr-only peer"
						bind:checked={state.pump_2_active}
						on:change={() => emit('pump_2_active')}
					/>
					<div
						class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
					/>
					<span class="ml-3 text-sm font-medium">PUMP#2</span>
				</label>
				<div class="wrapper bg-white border rounded-md">
					<input
						type="text"
						class="w-10 text-center"
						bind:value={state.pump_2_flow}
					/>
					<span class="mr-2">ml/min</span>
					<button
						class="border-l px-4 py-2"
						on:click={() => emit('pump_2_flow')}
					>
						Set
					</button>
				</div>
			</div>
			<div
				class="flex items-center justify-between p-2 border rounded-md bg-gray-50"
			>
				<label class="inline-flex relative items-center mr-5 cursor-pointer">
					<input
						type="checkbox"
						value=""
						class="sr-only peer"
						bind:checked={state.valve_active}
						on:change={() => emit('valve_active')}
					/>
					<div
						class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
					/>
					<span class="ml-3 text-sm font-medium">VALVE</span>
				</label>
				<div class="wrapper bg-white border rounded-md">
					<input
						type="text"
						class="w-16 text-center"
						bind:value={state.valve_bar}
					/>
					<span class="mr-2">Bar</span>
					<button class="border-l px-4 py-2" on:click={() => emit('valve_bar')}>
						Set
					</button>
				</div>
			</div>
			<div
				class="flex items-center justify-between p-2 border rounded-md bg-gray-50"
			>
				<span class="ml-3 text-sm font-medium">PRESSURE</span>
				<div class="wrapper bg-white border rounded-md">
					<input
						type="text"
						class="w-32 text-center my-2 bg-white"
						disabled
						bind:value={pressure}
					/>
					<span class="mr-4">Bar</span>
				</div>
			</div>
		</div>
	</div>
{/if}
