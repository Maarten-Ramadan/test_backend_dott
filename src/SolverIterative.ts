import { ASolver } from './ASolver'
import { TestCase } from './TestCase'

export class SolverIterative extends ASolver
{
	solveIt(testCase: TestCase, x: number, y: number): void {
		var changed: boolean = true;

		while (true) {
			if (changed == false)
				return ; // Break if no elements where changed in last iteration (all distinces are found)
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
							changed = true; // Mark that a change has been made and another iteration is necessary
							testCase.resultMap[y][x] = newDistance;
						}
					}
				}
			}
		}
	} // solveIt
} // SolverIterative
