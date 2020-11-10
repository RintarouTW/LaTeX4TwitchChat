'use strict';

class Row {
  constructor(vec) {
    this.vector = vec
  }
  add(vec) {
    return this.vector.map( (item, idx) => math.add(this.vector[idx] ,vec[idx]) )
  }
  addTo(vec) {
    this.vector.forEach( (item, idx) => this.vector[idx] = math.add(this.vector[idx], vec[idx]) )
  }
  mult(scaler) {
    return this.vector.map( x => math.multiply(x ,scaler) )
  }
  multTo(scaler) {
    this.vector.forEach( (x, idx) => this.vector[idx] = math.multiply(x ,scaler) )
  }
  valueByIndex(idx) {
    return this.vector[idx]
  }
  size() {
    return this.vector.length
  }
  toString(separator = ',') {
    return this.vector.map( x => {
      let str = x.toString()
      if (str.indexOf('.') == -1)
        return str
      // return in fraction format
      return "\\dfrac{" + math.format(x, {fraction: 'ratio'}).split('/').join('}{') + "}"
    }).join(separator)
  }
}

class Matrix {
  constructor(rows) {
    if (typeof rows === 'string') {
      this.rows = []
      // clean spaces
      let rows_list = rows.replace(/\s/g, '')
      // find rows by ';' as separator
      rows_list = rows_list.split(/;/g)
      rows_list.map( row => {
        row = row.replace(/(\[|\])/g, '')
        // extract the numbers separated by ','
        let numbers = row.split(',')
        // convert the string to math.Fraction type
        let vector = numbers.map( str => {
          try {
            let f = math.fraction(str)
            return f
          }
          catch(err) {
            return str
          }
        })
        this.rows.push(new Row(vector))
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
  toTeX() {
    let prefix = "\\pmatrix{", postfix = "}"
    return prefix + this.rows.map( row => row.toString('\&')).join('\\\\[6pt]') + postfix
  }
}

function matrix(textNode, text) {
  let m = new Matrix(text)
  textNode.textContent += "$$" + m.toTeX() + "$$"
}

function gauss(textNode, fnStr) {
  let m = new Matrix(fnStr)
  textNode.textContent += "$$" + m.toTeX() + "$$"
  m.gauss()
  textNode.textContent += " $$\\Downarrow$$ $$" + m.toTeX() + "$$"
}

export { matrix, gauss }

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
