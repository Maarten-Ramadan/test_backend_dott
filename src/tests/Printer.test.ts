import { Printer } from '../Printer'
import { TestCase } from '../TestCase'

describe("Printer", () => {
	const printer = new Printer();
	
	test('Single testcases', () => {
		const log = console.log;
		console.log = jest.fn();

		var testCase = new TestCase();
		testCase.rows = 3;
		testCase.columns = 4;
		testCase.bitmap = [
			'0001',
			'0011',
			'0110'
		]
		testCase.resultMap = [
			[3,2,1,0],
			[2,1,0,0],
			[1,0,0,1]
		];

		var input: TestCase[] = [ testCase ];

		var expected = [
			[],
			[3,2,1,0],
			[2,1,0,0],
			[1,0,0,1],
		];

		printer.print(input);
		expect(console.log.mock.calls).toEqual(expected);
		console.log = log;
	});

	test('Multiple testcases', () => {
		const log = console.log;
		console.log = jest.fn();

		var testCase1 = new TestCase();

		testCase1.rows = 5;
		testCase1.columns = 7;
		testCase1.bitmap = [
			'0000010',
			'0101000',
			'1100001',
			'0000000',
			'0101001'
		]
		testCase1.resultMap = [
			[2,1,2,1,1,0,1],
			[1,0,1,0,1,1,1],
			[0,0,1,1,2,1,0],
			[1,1,2,1,2,2,1],
			[1,0,1,0,1,1,0]
		];

		var testCase2 = new TestCase();
		testCase2.rows = 5;
		testCase2.columns = 7;
		testCase2.bitmap = [
			'0001000',
			'0001000',
			'1111111',
			'0001000',
			'0001000'
		]
		testCase2.resultMap = [
			[2,2,1,0,1,2,2],
			[1,1,1,0,1,1,1],
			[0,0,0,0,0,0,0],
			[1,1,1,0,1,1,1],
			[2,2,1,0,1,2,2]
		];

		var testCase3 = new TestCase();
		testCase3.rows = 3;
		testCase3.columns = 4;
		testCase3.bitmap = [
			'0000',
			'0000',
			'1000'
		]
		testCase3.resultMap = [
			[2,3,4,5],
			[1,2,3,4],
			[0,1,2,3]
		];

		var testCase4 = new TestCase();
		testCase4.rows = 3;
		testCase4.columns = 4;
		testCase4.bitmap = [
			'0001',
			'0011',
			'0110'
		]
		testCase4.resultMap = [
			[3,2,1,0],
			[2,1,0,0],
			[1,0,0,1]
		];

		var testCase5 = new TestCase();
		testCase5.rows = 3;
		testCase5.columns = 5;
		testCase5.bitmap = [
			'10001',
			'00000',
			'10001'
		]
		testCase5.resultMap = [
			[0,1,2,1,0],
			[1,2,3,2,1],
			[0,1,2,1,0]
		];

		var input: TestCase[] = [ 
			testCase1,
			testCase2,
			testCase3,
			testCase4,
			testCase5
		];

		var expected = [
			[],
			[2,1,2,1,1,0,1],
			[1,0,1,0,1,1,1],
			[0,0,1,1,2,1,0],
			[1,1,2,1,2,2,1],
			[1,0,1,0,1,1,0],
			[],
			[2,2,1,0,1,2,2],
			[1,1,1,0,1,1,1],
			[0,0,0,0,0,0,0],
			[1,1,1,0,1,1,1],
			[2,2,1,0,1,2,2],
			[],
			[2,3,4,5],
			[1,2,3,4],
			[0,1,2,3],
			[],
			[3,2,1,0],
			[2,1,0,0],
			[1,0,0,1],
			[],
			[0,1,2,1,0],
			[1,2,3,2,1],
			[0,1,2,1,0]
		];

		printer.print(input);
		expect(console.log.mock.calls).toEqual(expected);
		console.log = log;
	});
});
