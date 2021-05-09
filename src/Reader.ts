var fs = require("fs");

export enum Flags {
	OUTPUT = 1, 	// 0b0001
	INPUT = 2		// 0b0010
};

function delay(ms: number) { // TODO iffie?
	return new Promise(resolve => setTimeout(resolve, ms));
}

export class Reader
{
	public async read(inputFilePath: string): Promise<string> {
		var bitmap: string = '';
		if (inputFilePath) {
			bitmap = await fs.readFileSync(inputFilePath, 'utf-8',);
		}
		else {
			process.stdin.on('data', (chunk: Buffer) => {
				bitmap = chunk.toString();
			})
			while (bitmap === '') { await delay(100); }
		}
		// TODO build option to type map into stdin with end signal
		return bitmap;
	}
}