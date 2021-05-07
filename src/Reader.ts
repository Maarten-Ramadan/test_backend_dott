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
	public async read(flags?: Flags, inputFilePath?: string): Promise<string> { // TODO how to read? // private?
		var bitmap: string = '';
		var inputStream;
		let readLine = require("readline");
		if (flags && flags & Flags.INPUT) {
			if (inputFilePath)
				inputStream = require("fs").createReadStream(inputFilePath); // TODO other files
			else
				inputStream = require("fs").createReadStream("/Users/Marty/Documents/Marty/GitHub/dott/bitmap.txt"); // TODO no absolute path
			readLine = readLine.createInterface({
				input: inputStream,
				crlfDelay: Infinity
			});
			
			for await (const line of readLine) {
				bitmap += line;
				bitmap += '\n';
			}
			readLine.close();
		}
		else {
			process.stdin.on('data', (chunk: Buffer) => {
				bitmap = chunk.toString();
			})

			while (bitmap === '') { await delay(100); }
		}
		// inputStream.close(); // TODO close?
		return bitmap;
	}
}