import { TestCase } from './TestCase'

export class Solver
{
	private findLowestNeigbour(testCase: TestCase, x: number, y: number): number { // TODO kan dit beter?
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

	private solveIt(testCase: TestCase, x: number, y: number): void {
		var changed: boolean = true;

		while (true) {
			// Break if no elements where changed in previous iteration (=> all distinces are found)
			if (changed == false)
				return ;
			changed = false;

			// Nested for loop to iterate through bitmap
			for (let y = 0; y < testCase.rows; ++y) {
				for (let x = 0; x < testCase.columns; ++x) {

					// 0's are never changed so continue ;
					if (testCase.resultMap[y][x] == 0)
						continue ;
					
					// Else find lowest neighbour
					let lowest = this.findLowestNeigbour(testCase, x, y);

					// Update positions distance if lowest neighbour has been found
					if (lowest != Infinity) {
						let newDistance = 1 + lowest;
						if (newDistance != testCase.resultMap[y][x]) {
							// Mark that a change has been made and another iteration is necessary
							changed = true;
							testCase.resultMap[y][x] = newDistance;
						}
					}
				}
			}
		}
	} // solveIt

	private makeResultArray(testCase: TestCase) {
		// Initialize result array
		for (let y = 0; y < testCase.rows; ++y) {	
			let row: number[] = [];
			for (let x = 0; x < testCase.columns; ++x) {
				// Set the distance to 0 if the position is a whitepixel
				if (testCase.bitmap[y][x] == '1')
					row[x] = 0;
				// else NaN -> needs to be solved
				else
					row[x] = NaN;
			}
			testCase.resultMap.push(row);
		}
	}

	public solve(testCases: TestCase[]): TestCase[] {
		for (const testCase of testCases) {
			this.makeResultArray(testCase);
			this.solveIt(testCase, 0, 0);
		}
		return testCases;
	} // solve()
} // ASolver
