import { ArgParser } from './ArgParser'
import { Reader } from './Reader';
import { Parser } from './Parser';
import { TestCase } from './TestCase'
import { ASolver } from './ASolver';
import { SolverRecursive } from './SolverRecursive';
import { SolverIterative } from './SolverIterative';
import { Flags } from './Reader';
import { Printer } from './Printer';
import { exit } from 'process';

async function MainProcess(args?: string[]): Promise<void> { // TODO trackdown all trycatches
	var argParser = new ArgParser();
	var reader = new Reader();
	var parser = new Parser();
	var solver: ASolver;
	var printer = new Printer();

	if (args)
		argParser.ParseArgs(args);

	// Set flags
	var flags = 0;
	if (argParser.isInput) // TODO echt nodig?
		flags |= Flags.INPUT;
	if (argParser.isOutput)  // TODO fixen
		flags |= Flags.OUTPUT;

		
	try {
		var input: string = await reader.read(argParser.inputFilePath);
		var testCases: TestCase[] = parser.parseInput(input);
	}
	catch (error) {
		if (error.code == 'ENOENT')
			console.error(`Error! Failed to open file: "${argParser.inputFilePath}"`);
		else
			console.error(error);
		exit(1); // gracefully exit function?
	}

	if (argParser.isRecursive)
		solver = new SolverRecursive() // TODO try/catch?
	else
		solver = new SolverIterative() // TODO try/catch?

	testCases = solver.solve(testCases!); // TODO try/catch?
	
	printer.print(testCases);
}

try {
	MainProcess(process.argv.slice(2));
}
catch (error) {
	console.error(error);
	process.exit(1); // TODO test
}
