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
		return bitmap;
	}
}