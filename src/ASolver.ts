import { TestCase } from './TestCase'

export abstract class ASolver
{
	protected findLowestNeigbour(testCase: TestCase, x: number, y: number): number {
		var lowest: number = Infinity;

		let up = y - 1;
		let down = y + 1;
		let left = x - 1;
		let right = x + 1;
		
		if (up >= 0 && testCase.resultMap[up][x] != NaN && testCase.resultMap[up][x] < lowest)
			lowest = testCase.resultMap[up][x];
		if (down < testCase.rows && testCase.resultMap[down][x] != NaN && testCase.resultMap[down][x] < lowest)
			lowest = testCase.resultMap[down][x];
		if (left >= 0 && testCase.resultMap[y][left] != NaN && testCase.resultMap[y][left] < lowest)
			lowest = testCase.resultMap[y][left];
		if (right < testCase.columns && testCase.resultMap[y][right] != NaN && testCase.resultMap[y][right] < lowest)
			lowest = testCase.resultMap[y][right];

		return lowest;
	} // findLowestNeighbour()

	abstract solveIt(testCase: TestCase, x: number, y: number): void;

	public solve(testCases: TestCase[]): TestCase[] {
		for (const testCase of testCases) {
			// Initialize result array
			for (let y = 0; y < testCase.rows; ++y) {	
				let row: number[] = [];
				for (let x = 0; x < testCase.columns; ++x) {
					if (testCase.bitmap[y][x] == '1')
						row[x] = 0;
					else
						row[x] = NaN;
				}
				testCase.resultMap.push(row);
			}
			this.solveIt(testCase, 0, 0);
		}
		return testCases;
	} // solve()
} // ASolver
