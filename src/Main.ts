import { ArgParser } from './ArgParser'
import { Reader } from './Reader';
import { Parser } from './Parser';
import { TestCase } from './TestCase'
import { ASolver } from './ASolver';
import { SolverRecursive } from './SolverRecursive';
import { SolverIterative } from './SolverIterative';
import { Flags } from './Reader';
import { Printer } from './Printer';

async function MainProcess(args?: string[]): Promise<void> {
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

	var bitmap: string = await reader.read(flags, argParser.inputFilePath);

	var testCases: TestCase[] = parser.parseInput(bitmap);

	if (argParser.isRecursive)
		solver = new SolverRecursive() // TODO try/catch?
	else
		solver = new SolverIterative() // TODO try/catch?

	testCases = solver.solve(testCases); // TODO try/catch?
	
	printer.print(testCases);
}

try {
	MainProcess(process.argv.slice(2));
}
catch (error) {
	console.error(error);
	process.exit(1); // TODO test
}
