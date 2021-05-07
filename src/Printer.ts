import { TestCase } from './TestCase'

export class Printer
{
	public print(testCases: TestCase[]) {
		for (const cases of testCases) {
			for (const column of cases.resultMap) {
				console.log(...column);
			}
		}
	}
}