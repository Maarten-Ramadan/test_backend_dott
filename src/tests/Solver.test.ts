import { Solver } from '../Solver'
import { TestCase } from '../TestCase'

describe("Solver", () => {
	var solver = new Solver();

	describe("ResultMap", () => {
		test("Only zero's", () => {
			var testCase = new TestCase();
			testCase.columns = 5;
			testCase.rows = 3;
			testCase.bitmap = [
				'00000',
				'00000',
				'00000'
			]
			var input: TestCase[] = [ testCase ];
			
			var expected: TestCase[] = input;
			expected[0].resultMap = [
				[NaN,NaN,NaN,NaN,NaN],
				[NaN,NaN,NaN,NaN,NaN],
				[NaN,NaN,NaN,NaN,NaN]
			];

			var output = solver.solve(input);
			expect(output).toEqual(expected);
		});
		test("All 1's", () => {
			var testCase = new TestCase();
			testCase.columns = 5;
			testCase.rows = 3;
			testCase.bitmap = [
				'11111',
				'11111',
				'11111'
			]
			
			var input: TestCase[] = [ testCase ];
			var expected: TestCase[] = input;
			expected[0].resultMap = [
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0]
			];

			var output = solver.solve(input);
			output = solver.solve(output);
			expect(output).toEqual(expected);
		});
		test("One 0 top left", () => {
			var testCase = new TestCase();
			testCase.rows = 3;
			testCase.columns = 4;
			testCase.bitmap = [
				'0111',
				'1111',
				'1111'
			]
			
			var input: TestCase[] = [ testCase ];
			var expected: TestCase[] = input;
			expected[0].resultMap = [
				[1,0,0,0],
				[0,0,0,0],
				[0,0,0,0]
			];

			var output = solver.solve(input);
			output = solver.solve(output);
			expect(output).toEqual(expected);
		});
		test("One 1 top left", () => {
			var testCase = new TestCase();
			testCase.rows = 3;
			testCase.columns = 4;
			testCase.bitmap = [
				'1000',
				'0000',
				'0000'
			]
			
			var input: TestCase[] = [ testCase ];
			var expected: TestCase[] = input;
			expected[0].resultMap = [
				[0,1,2,3],
				[1,2,3,4],
				[2,3,4,5]
			];

			var output = solver.solve(input);
			output = solver.solve(output);
			expect(output).toEqual(expected);
		});
		test("One 1 bottom right", () => {
			var testCase = new TestCase();
			testCase.rows = 3;
			testCase.columns = 4;
			testCase.bitmap = [
				'0000',
				'0000',
				'0001'
			]
			
			var input: TestCase[] = [ testCase ];
			var expected: TestCase[] = input;
			expected[0].resultMap = [
				[5,4,3,2],
				[4,3,2,1],
				[3,2,1,0]
			];

			var output = solver.solve(input);
			output = solver.solve(output);
			expect(output).toEqual(expected);
		});
		test("One 1 top right", () => {
			var testCase = new TestCase();
			testCase.rows = 3;
			testCase.columns = 4;
			testCase.bitmap = [
				'0001',
				'0000',
				'0000'
			]
			
			var input: TestCase[] = [ testCase ];
			var expected: TestCase[] = input;
			expected[0].resultMap = [
				[3,2,1,0],
				[4,3,2,1],
				[5,4,3,2]
			];

			var output = solver.solve(input);
			output = solver.solve(output);
			expect(output).toEqual(expected);
		});
		test("One 1 bottom left", () => {
			var testCase = new TestCase();
			testCase.rows = 3;
			testCase.columns = 4;
			testCase.bitmap = [
				'0000',
				'0000',
				'1000'
			]
			
			var input: TestCase[] = [ testCase ];
			var expected: TestCase[] = input;
			expected[0].resultMap = [
				[2,3,4,5],
				[1,2,3,4],
				[0,1,2,3]
			];

			var output = solver.solve(input);
			output = solver.solve(output);
			expect(output).toEqual(expected);
		});
		test("One 1 in the middle", () => {
			var testCase = new TestCase();
			testCase.rows = 3;
			testCase.columns = 5;
			testCase.bitmap = [
				'00000',
				'00100',
				'00000'
			]
			
			var input: TestCase[] = [ testCase ];
			var expected: TestCase[] = input;
			expected[0].resultMap = [
				[3,2,1,2,3],
				[2,1,0,1,2],
				[3,2,1,3,3]
			];

			var output = solver.solve(input);
			output = solver.solve(output);
			expect(output).toEqual(expected);
		});
		test("A 1 in all corners", () => {
			var testCase = new TestCase();
			testCase.rows = 3;
			testCase.columns = 5;
			testCase.bitmap = [
				'10001',
				'00000',
				'10001'
			]
			
			var input: TestCase[] = [ testCase ];
			var expected: TestCase[] = input;
			expected[0].resultMap = [
				[0,1,2,1,0],
				[1,2,3,2,1],
				[0,1,2,1,0]
			];

			var output = solver.solve(input);
			output = solver.solve(output);
			expect(output).toEqual(expected);
		});
		test("Assignment example test case", () => {
			var testCase = new TestCase();
			testCase.rows = 3;
			testCase.columns = 4;
			testCase.bitmap = [
				'0001',
				'0011',
				'0110'
			]
			
			var input: TestCase[] = [ testCase ];
			var expected: TestCase[] = input;
			expected[0].resultMap = [
				[3,2,1,0],
				[2,1,0,0],
				[1,0,0,1]
			];

			var output = solver.solve(input);
			output = solver.solve(output);
			expect(output).toEqual(expected);
		});
		test("Cross of ones", () => {
			var testCase = new TestCase();
			testCase.rows = 5;
			testCase.columns = 7;
			testCase.bitmap = [
				'0001000',
				'0001000',
				'1111111',
				'0001000',
				'0001000'
			]
			
			var input: TestCase[] = [ testCase ];
			var expected: TestCase[] = input;
			expected[0].resultMap = [
				[2,2,1,0,1,2,2],
				[1,1,1,0,1,1,1],
				[0,0,0,0,0,0,0],
				[1,1,1,0,1,1,1],
				[2,2,1,0,1,2,2]
			];

			var output = solver.solve(input);
			output = solver.solve(output);
			expect(output).toEqual(expected);
		});
		test("Something random", () => {
			var testCase = new TestCase();
			testCase.rows = 5;
			testCase.columns = 7;
			testCase.bitmap = [
				'0000010',
				'0101000',
				'1100001',
				'0000000',
				'0101001'
			]
			
			var input: TestCase[] = [ testCase ];
			var expected: TestCase[] = input;
			expected[0].resultMap = [
				[2,1,2,1,1,0,1],
				[1,0,1,0,1,1,1],
				[0,0,1,1,2,1,0],
				[1,1,2,1,2,2,1],
				[1,0,1,0,1,1,0]
			];

			var output = solver.solve(input);
			output = solver.solve(output);
			expect(output).toEqual(expected);
		});
		test("Multiple test cases", () => {
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
			var testCase3 = new TestCase();
			testCase3.rows = 3;
			testCase3.columns = 4;
			testCase3.bitmap = [
				'0000',
				'0000',
				'1000'
			]
			var testCase4 = new TestCase();
			testCase4.rows = 3;
			testCase4.columns = 4;
			testCase4.bitmap = [
				'0001',
				'0011',
				'0110'
			]
			var testCase5 = new TestCase();
			testCase5.rows = 3;
			testCase5.columns = 5;
			testCase5.bitmap = [
				'10001',
				'00000',
				'10001'
			]
			var input: TestCase[] = [ testCase1, testCase2, testCase3, testCase4, testCase5 ];
			var expected: TestCase[] = input;
			expected[0].resultMap = [
				[2,1,2,1,1,0,1],
				[1,0,1,0,1,1,1],
				[0,0,1,1,2,1,0],
				[1,1,2,1,2,2,1],
				[1,0,1,0,1,1,0]
			];
			expected[1].resultMap = [
				[2,2,1,0,1,2,2],
				[1,1,1,0,1,1,1],
				[0,0,0,0,0,0,0],
				[1,1,1,0,1,1,1],
				[2,2,1,0,1,2,2]
			];
			expected[2].resultMap = [
				[2,3,4,5],
				[1,2,3,4],
				[0,1,2,3]
			];
			expected[3].resultMap = [
				[3,2,1,0],
				[2,1,0,0],
				[1,0,0,1]
			];
			expected[4].resultMap = [
				[0,1,2,1,0],
				[1,2,3,2,1],
				[0,1,2,1,0]
			];

			var output = solver.solve(input);
			output = solver.solve(output);
			expect(output).toEqual(expected);
		});
	});
});