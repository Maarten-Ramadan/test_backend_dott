import { exit } from "process";

var fs = require("fs");

export class Reader
{
	private delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	public async read(inputFilePath: string): Promise<string> {
		var bitmap: string = '';
		if (inputFilePath)
			bitmap = await fs.readFileSync(inputFilePath, 'utf-8',);
		else {
			process.stdin.on('data', (chunk: Buffer) => {
				bitmap = chunk.toString();
			})
			while (bitmap === '') { await this.delay(100); }
		}
		if (bitmap === 'help\n') {
			console.log('Usage:' 										+ '\n' +
						' > App [options]'								+ '\n' +
						' > cat <path> | App' 							+ '\n' +
																		  '\n' +
						'Options:'										+ '\n' +
						' -f, --file <path>  input from file' 			+ '\n' +
						' -h, --help         display help for command'	+ '\n' +
																		  '\n' +
						'Example calls:'								+ '\n' +
						' $ node App.js -f <path>'						+ '\n' +
						' $ cat <path> | node App.js'					);
			exit(0);
		}
		return bitmap;
	}
}