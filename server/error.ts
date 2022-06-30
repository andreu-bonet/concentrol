process.on('unhandledRejection', (reason: string) => {
	throw reason
})

process.on('uncaughtException', (error: Error) => console.log(error))
