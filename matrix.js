'use strict';

class Row {
	constructor(vec) {
		this.vector = vec
	}
	add(vec) {
		return this.vector.map((item, idx) => this.vector[idx] + vec[idx])
	}
	addTo(vec) {
		this.vector.forEach((item, idx) => this.vector[idx] += vec[idx])
	}
	mult(scaler) {
		return this.vector.map( x => x * scaler)
	}
	multTo(scaler) {
		this.vector.forEach( (x, idx) => this.vector[idx] = x * scaler)
	}
	valueByIndex(idx) {
		return this.vector[idx]
	}
	size() {
		return this.vector.length
	}
	toString(separator = ',') {
		return this.vector.join(separator)
	}
}

class Matrix {
	constructor(rows) {
		if (typeof rows === 'string') {
			this.rows = []
			// clean spaces
			let rows_list = rows.replace(/\s/g, '')
			// find rows by ',[' as separator
			rows_list = rows_list.split(/,\[/g)
			rows_list.map( row => {
				// extract the numbers separated by ','
				let numbers_list = row.match(/-?\d*(\.?\d*)?(,-?\d*(\.?\d*)?)*/g)
				numbers_list.map( l => {
					if (l.length) {
						let numbers = l.split(',')
						// convert the string to real number type
						let vector = numbers.map( str => Number(str))
						this.rows.push(new Row(vector))
					}
				})
			})
		} else {
			this.rows = rows.map( x => new Row(x) )
		}
	}
	multRow(row, scaler) {
		return this.rows[row].mult(scaler)
	}
	scaleRow(row, scaler) {
		this.rows[row].multTo(scaler)
	}
	addToRow(row, vec) {
		this.rows[row].addTo(vec)
	}
	entryByRowCol(row, col) {
		return this.rows[row].valueByIndex(col)
	}

	gauss() {
		let i = 0
		let m = this.rows.length, n = this.rows[0].size()

		while (i < m) {
			let maxrow = i
			// find the max row
			for (let r = i + 1; r < m; r++) {
				if (Math.abs(this.entryByRowCol(r, i)) > Math.abs(this.entryByRowCol(maxrow, i))) {
					maxrow = r
				}
			}
			// swap rows
			let max_row = this.rows[maxrow]
			this.rows[maxrow] = this.rows[i]
			this.rows[i] = max_row
			// scale the row to 1
			let s = this.entryByRowCol(i, i)
			if (Math.abs(s) > 0)
				this.scaleRow(i, 1 / s)
			// clear the other rows
			for (let r = 0; r < m; r++) {
				if (r == i) continue
				let scaler = this.entryByRowCol(r, i)
				if (scaler == 0) continue
				let scaledRow = this.multRow(i, -scaler)
				this.addToRow(r, scaledRow)
			}
			//console.log(this.toString('\n'))
			i++
		}
	}
	toString(separator) {
		return this.rows.map( row => row.toString()).join(separator)
	}
	toLaTeX() {
		let prefix = "\\pmatrix{", postfix = "}"
		return prefix + this.rows.map( row => row.toString('\&')).join('\\\\') + postfix
	}
}

function matrix(text, fnStr, gauss = false) {
	let m = new Matrix(fnStr)
	text.textContent += "$$" + m.toLaTeX() + "$$"
	if (gauss) {
		m.gauss()
		text.textContent += " $$\\Downarrow$$ $$" + m.toLaTeX() + "$$"
	}
}

// Usage Examples:
/*
// init with array
m = new Matrix([[1,-1,0,0,1], [1,5,1,0,2], [1,2,1,0,-3], [1,1,1,1,3]])
console.log(m.toLaTeX())
m.gauss()
console.log(m.toString('\n'))
console.log(m.toLaTeX())
// init by string
let m = new Matrix("[1,-1,0,0,-3], [1,5,1,0,2], [1,2,1,0,-3], [1,1,1,1,3]")
console.log(m.toString('\n'))
console.log(m.toLaTeX())
m.gauss()
console.log(m.toString('\n'))
console.log(m.toLaTeX())
*/

export { matrix }
