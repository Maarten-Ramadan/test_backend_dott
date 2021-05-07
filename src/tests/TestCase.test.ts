// import { TestCase } from '../TestCase'

// describe("TestCase", () => {
// 	describe('TestCase Parser', () => {
// 		test('sizeX', () => {
// 			var testCase: TestCase = new TestCase('3 4\n0001\n0011\n0110');
// 			testCase.parse()
// 			expect(testCase.sizeX).toBe(4);
// 		})
// 		test('sizeY', () => {
// 			var testCase: TestCase = new TestCase('3 4\n0001\n0011\n0110');
// 			testCase.parse()
// 			expect(testCase.sizeY).toBe(3);
// 		})
// 		test('Invalid map sizeY', () => {
// 			var testCase: TestCase = new TestCase('4 4\n0001\n0011\n0110');
// 			expect(() => {
// 				testCase.parse();
// 			}).toThrowError("invalid bitmap: number of rows doens't match input");
// 		})
// 		test('Invalid map sizeX', () => {
// 			var testCase: TestCase = new TestCase('3 5\n0001\n0011\n0110');
// 			expect(() => {
// 				testCase.parse();
// 			}).toThrowError("invalid bitmap: number of columns doens't match input");
// 		})
// 		test('Invalid map sizeY', () => {
// 			var testCase: TestCase = new TestCase('56 5\n0001\n0011\n0110');
// 			expect(() => {
// 				testCase.parse();
// 			}).toThrowError("invalid bitmap: number of rows doens't match input");
// 		})
// 		test('Invalid map sizeX', () => {
// 			var testCase: TestCase = new TestCase('1 183\n111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');
// 			expect(() => {
// 				testCase.parse();
// 			}).toThrowError('invalid bitmap: sizes must be bigger than 0 and smaller than 183');
// 		})
// 		test('Negative sizeY', () => {
// 			var testCase: TestCase = new TestCase('-1 3\n111');
// 			expect(() => {
// 				testCase.parse();
// 			}).toThrowError('invalid bitmap: invalid characters in map: \"-\"');
// 		})
// 		test('Negative sizeX', () => {
// 			var testCase: TestCase = new TestCase('3 -1\n111\n101\n001');
// 			expect(() => {
// 				testCase.parse();
// 			}).toThrowError('invalid bitmap: invalid characters in map: \"-\"');
// 		})
// 		// test('Invalid chars in map', () => { // TODO
// 		// 	var testCase: TestCase = new TestCase('1 20\n000\n0011111 1111111111');
// 		// 	expect(() => {
// 		// 		testCase.parse();
// 		// 	}).toThrowError("invalid bitmap: map doesn't match given size");
// 		// })
// 		// test('Missing sizes', () => { // TODO
// 		// 	var testCase: TestCase = new TestCase('000\n0011111 1111111111');
// 		// 	expect(() => {
// 		// 		testCase.parse();
// 		// 	}).toThrowError("invalid bitmap: map doesn't match given size");
// 		// })
// 		test('Invalid sizeY character', () => {
// 			var testCase: TestCase = new TestCase('f 3\n000');
// 			expect(() => {
// 				testCase.parse();
// 			}).toThrowError("invalid bitmap: invalid characters in map: \"f\"");
// 		})
// 		test('Invalid sizeX character', () => {
// 			var testCase: TestCase = new TestCase('1 -\n000');
// 			expect(() => {
// 				testCase.parse();
// 			}).toThrowError("invalid bitmap: invalid characters in map: \"-\"");
// 		})
// 		test('Invalid map character', () => {
// 			var testCase: TestCase = new TestCase('1 3\n0.0');
// 			expect(() => {
// 				testCase.parse();
// 			}).toThrowError("invalid bitmap: invalid characters in map: \".\"");
// 		})
// 		test('Invalid map character', () => {
// 			var testCase: TestCase = new TestCase('5 3\n$.@\nabc\n?!#\nxyz\n\'"*');
// 			expect(() => {
// 				testCase.parse();
// 			}).toThrowError("invalid bitmap: invalid characters in map: \"$,.,@,a,b,c,?,!,#,x,y,z,',\",*\"");
// 		})
// 	})
// 	describe('TestCase Parser', () => {
// 	})
// });