import { Reader } from './Reader';
import { Parser } from './Parser';
import { TestCase } from './TestCase'
import { Solver } from './Solver';
import { Printer } from './Printer';
import { exit } from 'process';
import { Command } from 'commander';

const main = async (args?: string[]): Promise<void> => { // TODO trackdown all trycatches
	const argsParser = new Command();
	const reader = new Reader();
	const parser = new Parser();
	const solver = new Solver();
	const printer = new Printer();
	
	argsParser
		.name('\n')
		.usage('- App [options]\n - cat <path> | App')
		.option('-f, --file <path>', 'input from file')
		.addHelpText('after', '\nExample calls:\n  $ node App.js -f <path>')
		.addHelpText('after', '  $ cat <path> | node App.js');

	argsParser.parse(args);
	const options = argsParser.opts();

	try {
		const input: string = await reader.read(options.file);
		var testCases: TestCase[] = parser.parseInput(input);
		solver.solve(testCases);
		printer.print(testCases);
	}
	catch (error) {
		console.error(error);
		exit(1);
	}

}

main(process.argv);