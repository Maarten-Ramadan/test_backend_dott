var fs = require("fs");

export enum Flags {
	RECURSIVE = 1, 	// 0b0001
	ITERATIVE = 2, 	// 0b0010
	OUTPUT = 4, 	// 0b0100
	INPUT = 8		// 0b1000
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