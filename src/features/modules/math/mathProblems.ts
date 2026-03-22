export interface MathProblem {
  question: string
  answer: number
  options: number[]
  category: string
}

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

function makeMultipleChoice(question: string, answer: number, category: string): MathProblem {
  const options = new Set<number>([answer])
  const absAnswer = Math.abs(answer)
  const range = Math.max(5, Math.ceil(absAnswer * 0.3))
  while (options.size < 4) {
    const offset = rand(-range, range)
    const wrong = answer + (offset === 0 ? 1 : offset)
    options.add(wrong)
  }
  const shuffled = [...options].sort(() => Math.random() - 0.5)
  return { question, answer, options: shuffled, category }
}

// --- Grade 5 generators ---

function addition5(scale: number): MathProblem {
  const max = 100 * scale
  const a = rand(10, max)
  const b = rand(10, max)
  return makeMultipleChoice(`${a} + ${b}`, a + b, 'Addition')
}

function subtraction5(scale: number): MathProblem {
  const max = 100 * scale
  const a = rand(50, max)
  const b = rand(10, a)
  return makeMultipleChoice(`${a} - ${b}`, a - b, 'Subtraktion')
}

function multiplication5(scale: number): MathProblem {
  const maxMult = 6 + scale * 2
  const a = rand(2, maxMult)
  const b = rand(2, maxMult)
  return makeMultipleChoice(`${a} x ${b}`, a * b, 'Multiplikation')
}

function division5(scale: number): MathProblem {
  const maxDiv = 6 + scale * 2
  const b = rand(2, maxDiv)
  const answer = rand(2, maxDiv)
  const a = b * answer
  return makeMultipleChoice(`${a} / ${b}`, answer, 'Division')
}

function fractions5(): MathProblem {
  const denom = [2, 4, 5, 10][rand(0, 3)]
  const num1 = rand(1, denom - 1)
  const num2 = rand(1, denom - num1)
  return makeMultipleChoice(
    `${num1}/${denom} + ${num2}/${denom} = ?/${denom}`,
    num1 + num2,
    'Brueche'
  )
}

function fractionCompare(): MathProblem {
  const pairs: [string, string, number][] = [
    ['1/2', '1/4', 1], ['3/4', '1/2', 1], ['1/3', '2/3', 2],
    ['2/5', '3/5', 2], ['1/2', '2/4', 0],
  ]
  const [a, b, relation] = pairs[rand(0, pairs.length - 1)]
  const question = `${a} ist ___ als ${b}`
  return {
    question,
    answer: relation,
    options: [0, 1, 2, 3].sort(() => Math.random() - 0.5),
    category: 'Brueche vergleichen',
  }
}

function textProblem5(scale: number): MathProblem {
  const type = rand(0, 3)
  switch (type) {
    case 0: {
      const price = rand(2, 5 * scale)
      const count = rand(2, 6)
      return makeMultipleChoice(
        `${count} Aepfel kosten je ${price} Cent.\nWie viel kostet alles?`,
        price * count,
        'Textaufgabe'
      )
    }
    case 1: {
      const total = rand(20, 50 * scale)
      const spent = rand(5, total - 5)
      return makeMultipleChoice(
        `Du hast ${total} Euro und gibst ${spent} Euro aus.\nWie viel bleibt uebrig?`,
        total - spent,
        'Textaufgabe'
      )
    }
    case 2: {
      const perBox = rand(4, 12)
      const boxes = rand(2, 5)
      return makeMultipleChoice(
        `In jeder Kiste sind ${perBox} Buecher.\n${boxes} Kisten: wie viele Buecher?`,
        perBox * boxes,
        'Textaufgabe'
      )
    }
    default: {
      const kids = rand(10, 30)
      const groups = [2, 3, 5][rand(0, 2)]
      const perGroup = Math.floor(kids / groups)
      return makeMultipleChoice(
        `${kids} Kinder in ${groups} gleiche Gruppen.\nWie viele pro Gruppe?`,
        perGroup,
        'Textaufgabe'
      )
    }
  }
}

// --- Grade 6 generators ---

function percentage6(scale: number): MathProblem {
  const base = [50, 100, 200, 500, 1000][rand(0, Math.min(4, scale))]
  const pct = [10, 20, 25, 50, 75][rand(0, Math.min(4, scale))]
  return makeMultipleChoice(`${pct}% von ${base}`, (pct / 100) * base, 'Prozente')
}

function negativeNumbers6(scale: number): MathProblem {
  const range = 10 * scale
  const a = rand(-range, range)
  const b = rand(-range, range)
  return makeMultipleChoice(`(${a}) + (${b})`, a + b, 'Negative Zahlen')
}

function area6(scale: number): MathProblem {
  const a = rand(3, 5 + scale * 3)
  const b = rand(3, 5 + scale * 3)
  return makeMultipleChoice(`Flaeche: ${a} cm x ${b} cm = ? cm2`, a * b, 'Flaechen')
}

function bigMultiplication6(scale: number): MathProblem {
  const a = rand(10, 20 * scale)
  const b = rand(2, 4 + scale)
  return makeMultipleChoice(`${a} x ${b}`, a * b, 'Multiplikation')
}

function decimals6(): MathProblem {
  const a = rand(1, 99) / 10
  const b = rand(1, 99) / 10
  const answer = Math.round((a + b) * 10) / 10
  return makeMultipleChoice(`${a.toFixed(1)} + ${b.toFixed(1)}`, answer, 'Dezimalzahlen')
}

function orderOfOps6(): MathProblem {
  const a = rand(2, 10)
  const b = rand(2, 5)
  const c = rand(1, 10)
  const answer = a + b * c
  return makeMultipleChoice(`${a} + ${b} x ${c}`, answer, 'Reihenfolge')
}

function textProblem6(scale: number): MathProblem {
  const type = rand(0, 2)
  switch (type) {
    case 0: {
      const original = [50, 100, 200, 400][rand(0, Math.min(3, scale))]
      const pct = [10, 20, 25, 50][rand(0, 3)]
      const discount = (pct / 100) * original
      return makeMultipleChoice(
        `Ein Spiel kostet ${original} Euro.\n${pct}% Rabatt. Neuer Preis?`,
        original - discount,
        'Textaufgabe'
      )
    }
    case 1: {
      const speed = rand(4, 12) * 5
      const hours = rand(2, 5)
      return makeMultipleChoice(
        `Ein Zug faehrt ${speed} km/h.\nWie weit in ${hours} Stunden?`,
        speed * hours,
        'Textaufgabe'
      )
    }
    default: {
      const length = rand(5, 15)
      const width = rand(3, 10)
      return makeMultipleChoice(
        `Ein Garten ist ${length} m lang und ${width} m breit.\nUmfang in Metern?`,
        2 * (length + width),
        'Textaufgabe'
      )
    }
  }
}

// --- Main generator ---

const GENERATORS_5: ((scale: number) => MathProblem)[] = [
  addition5, subtraction5, multiplication5, division5,
  () => fractions5(), () => fractionCompare(), textProblem5,
]

const GENERATORS_6: ((scale: number) => MathProblem)[] = [
  percentage6, negativeNumbers6, area6, bigMultiplication6,
  () => decimals6(), () => orderOfOps6(), textProblem6,
]

export type Difficulty = '5' | '6'

export function generateProblem(grade: Difficulty, diffLevel: number): MathProblem {
  const scale = Math.max(1, diffLevel)
  const generators = grade === '5' ? GENERATORS_5 : GENERATORS_6
  const gen = generators[rand(0, generators.length - 1)]
  return gen(scale)
}
