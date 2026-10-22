/** Splits a chemical formula into runs; digits that follow a letter or ")" are subscripts ("6CO2" -> 6, CO, 2). */
export interface FormulaRun {
  s: string
  sub: boolean
}

export function formulaRuns(text: string): FormulaRun[] {
  const runs: FormulaRun[] = []
  let prevAlpha: boolean = false
  for (const ch of text) {
    const isDigit = ch >= '0' && ch <= '9'
    const sub: boolean = isDigit && prevAlpha
    const last = runs[runs.length - 1]
    if (last && last.sub === sub) last.s += ch
    else runs.push({ s: ch, sub })
    prevAlpha = /[A-Za-z)]/.test(ch) || (isDigit && sub)
  }
  return runs
}

const SUB = '₀₁₂₃₄₅₆₇₈₉'

/** Unicode-subscript version of a formula string, for HTML text. */
export function toSubscript(text: string): string {
  return formulaRuns(text)
    .map((r) => (r.sub ? [...r.s].map((d) => SUB[Number(d)]).join('') : r.s))
    .join('')
}
