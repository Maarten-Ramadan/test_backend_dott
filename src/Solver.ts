import { TestCase } from './TestCase'

export class Solver
{
	private findLowestNeighbour(testCase: TestCase, y: number, x: number): number {
		var lowest: number = Infinity;

		let up = y - 1;
		let down = y + 1;
		let left = x - 1;
		let right = x + 1;
		
		// Check all neighbours and return the lowest one
		if (up >= 0 && testCase.resultMap[up][x] < lowest)
			lowest = testCase.resultMap[up][x];
		if (down < testCase.rows && testCase.resultMap[down][x] < lowest)
			lowest = testCase.resultMap[down][x];
		if (left >= 0 && testCase.resultMap[y][left] < lowest)
			lowest = testCase.resultMap[y][left];
		if (right < testCase.columns && testCase.resultMap[y][right] < lowest)
			lowest = testCase.resultMap[y][right];

		return lowest;
	} // findLowestNeighbour()

	private fillInResult(testCase: TestCase, y: number, x: number): void {
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
					let lowest = this.findLowestNeighbour(testCase, y, x);

					// Update distance if a lowest neighbour was found
					if (lowest != Infinity) {
						// Distance is lowest neigbour + 1
						let newDistance = lowest + 1;
						
						// Update distance only if newDistance is different from current distance
						if (newDistance != testCase.resultMap[y][x]) {
							// Mark that a change has been made and another iteration is necessary
							changed = true;
							// Update distance
							testCase.resultMap[y][x] = newDistance;
						}
					}
				}
			}
		}
	} // fillInResult

	private makeResultArray(testCase: TestCase) {
		// Initialize result array
		for (let y = 0; y < testCase.rows; ++y) {	
			let row: number[] = [];
			for (let x = 0; x < testCase.columns; ++x) {
				// Set the distance to 0 if the position is a whitepixel
				if (testCase.bitmap[y][x] == '1')
					row[x] = 0;
				else // else NaN -> needs to be solved
					row[x] = NaN;
			}
			testCase.resultMap.push(row);
		}
	} // makeResultArray

	public solve(testCases: TestCase[]): TestCase[] {
		for (const testCase of testCases) {
			this.makeResultArray(testCase);
			this.fillInResult(testCase, 0, 0);
		}
		return testCases;
	} // solve
} // Solver
