import { ArgParser } from './ArgParser'
import { Reader } from './Reader';
import { Parser } from './Parser';
import { TestCase } from './TestCase'
import { Solver } from './Solver';
// import { Flags } from './Reader';
import { Printer } from './Printer';
import { exit } from 'process';
import { Command } from 'commander';

async function MainProcess(args?: string[]): Promise<void> { // TODO trackdown all trycatches
	const argParser = new ArgParser();// TODO remove
	const reader = new Reader();
	const parser = new Parser();
	const solver = new Solver();
	const printer = new Printer();
	const argsParser = new Command();


	argsParser
		.option('-d, --debug', 'output extra debugging')
		.option('-s, --small', 'small pizza size')
		.option('-p, --pizza-type <type>', 'flavour of pizza');

	argsParser.parse(args);

	const options = argsParser.opts();
	if (options.debug)
		console.log(options);
	console.log('pizza details:');
	if (options.small)
		console.log('- small pizza size');
	if (options.pizzaType)
		console.log(`- ${options.pizzaType}`);

	// // Set flags
	// var flags = 0;
	// if (argParser.isInput) // TODO echt nodig?
	// 	flags |= Flags.INPUT;
	// if (argParser.isOutput)  // TODO fixen
	// 	flags |= Flags.OUTPUT;

		
	try {
		const input: string = await reader.read(argParser.inputFilePath);
		var testCases: TestCase[] = parser.parseInput(input);
	}
	catch (error) {
		if (error.code == 'ENOENT')
			console.error(`Error! Failed to open file: "${argParser.inputFilePath}"`);
		else
			console.error(error);
		exit(1); // gracefully exit function?
	}

	solver.solve(testCases);
	printer.print(testCases);
}

try {
	MainProcess(process.argv);
}
catch (error) {
	console.error(error);
	process.exit(1); // TODO test
}
