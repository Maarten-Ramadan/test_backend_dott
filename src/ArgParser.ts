export class ArgParser // TODO wat hiermee doen?
{
	isRecursive: boolean;
	isIterative: boolean;
	isInput: boolean;
	isOutput: boolean;
	inputFilePath: string;
	
	constructor() {
		this.isRecursive = false;
		this.isIterative = false;
		this.isInput = false;
		this.isOutput = false;
		this.inputFilePath = '';
	}
	
	public ParseArgs(args: string[]) { // TODO comments & tests
		let inputFile = false;
		for (const arg of args) {
			if (inputFile) {
				this.inputFilePath = arg; // TODO check input
				inputFile = false;
				continue ;
			}
			else if (arg === '-r' || arg === '--recursive')
				this.isRecursive = true;
			else if (arg === '-i' || arg === '--iterative')
				this.isIterative = true;
			else if (arg === '-o' || arg === '--output')
				this.isOutput = true;
			else if (arg === '-f' || arg === '--file') {
				this.isInput = true;
				inputFile = true;
			}
			else
				throw new Error('Unrecognised argument'); // TODO options?
		}
		if (this.isIterative && this.isRecursive)
			throw new Error('Choose either recursive (-r) or iterative (-i)');
	}
}