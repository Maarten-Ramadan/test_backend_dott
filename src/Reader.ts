var fs = require("fs");

export class Reader
{
	private delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	public async read(inputFilePath: string): Promise<string> {
		var input: string = '';

		// Read from file if path was passed
		if (inputFilePath)
			input = await fs.readFileSync(inputFilePath, 'utf-8',);
		else {
			// Else read from standard input
			process.stdin.on('data', (chunk: Buffer) => {
				input = chunk.toString();
			})

			// Wait until input has been received
			while (input === '') { await this.delay(100); }
		}
		return input;
	}
}