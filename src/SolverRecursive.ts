import { ASolver } from './ASolver'
import { TestCase } from './TestCase'

export class SolverRecursive extends ASolver
{
	changed: boolean = true;

	private solver(testCase: TestCase, x: number, y: number): void {
		// Return if coördinates are out of bounce
		// console.log('x: ' + x);
		// console.log('cols: ' + testCase.columns);
		// console.log('y: ' + y);
		// console.log('rows: ' + testCase.rows);

		if (x >= testCase.columns || y >= testCase.rows)
			return ;

		// 0's are never changed
		if (testCase.resultMap[y][x] != 0) {

		 	// Find lowest neighbour
			let lowest = this.findLowestNeigbour(testCase, x, y);

			// Update positions distance if lowest neighbour has been found
			if (lowest != Infinity) { 
				let newDistance = 1 + lowest;
				if (newDistance != testCase.resultMap[y][x]) {
					this.changed = true; // Mark that a change has been made and another iteration is necessary
					testCase.resultMap[y][x] = newDistance;
				}
			}
		}
		// console.log(testCase.resultMap);

		// Go to next x & y position recursively
		this.solver(testCase, x + 1, y);
		this.solver(testCase, x, y + 1);
	}
	
	solveIt(testCase: TestCase, x: number, y: number): void {
		this.changed = true;
		while (this.changed) { 
			// console.log(testCase.resultMap);
			this.changed = false;
			this.solver(testCase, 0, 0)
			// console.log('here');
		}
	}
}
