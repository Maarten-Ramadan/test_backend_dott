import { TestCase } from './TestCase'

export class Printer
{
	public print(testCases: TestCase[]) {
		// Nested for-loop to print each row of the resultMap of each TestCase
		for (const cases of testCases) {
			console.log(); // Print newline before each TestCases
			for (const column of cases.resultMap) {
				console.log(...column);
			}
		}
	}
}