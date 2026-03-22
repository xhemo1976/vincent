export interface GrammarExercise {
  id: string
  category: string
  sentence: string
  blank: string
  options: string[]
  correctIndex: number
  hint?: string
}

export const GRAMMAR_CATEGORIES = [
  { id: 'pronouns', name: 'Pronomen', emoji: '👤' },
  { id: 'verbs', name: 'Verben (be/have)', emoji: '🔄' },
  { id: 'simple-present', name: 'Simple Present', emoji: '📅' },
  { id: 'articles', name: 'Artikel (a/an/the)', emoji: '📰' },
  { id: 'prepositions', name: 'Praepositionen', emoji: '📍' },
  { id: 'questions', name: 'Fragen', emoji: '❓' },
  { id: 'negation', name: 'Verneinung', emoji: '🚫' },
  { id: 'word-order', name: 'Wortstellung', emoji: '🔀' },
]

export const GRAMMAR_EXERCISES: GrammarExercise[] = [
  // === Pronouns (8) ===
  { id: 'pr1', category: 'pronouns', sentence: '___ am a student.', blank: '___', options: ['He', 'I', 'You', 'We'], correctIndex: 1 },
  { id: 'pr2', category: 'pronouns', sentence: '___ is my brother.', blank: '___', options: ['He', 'I', 'They', 'We'], correctIndex: 0 },
  { id: 'pr3', category: 'pronouns', sentence: '___ are my friends.', blank: '___', options: ['He', 'She', 'It', 'They'], correctIndex: 3 },
  { id: 'pr4', category: 'pronouns', sentence: '___ is a cat.', blank: '___', options: ['It', 'They', 'We', 'I'], correctIndex: 0 },
  { id: 'pr5', category: 'pronouns', sentence: 'This is ___ book.', blank: '___', options: ['me', 'I', 'my', 'mine'], correctIndex: 2, hint: 'Possessivpronomen' },
  { id: 'pr6', category: 'pronouns', sentence: 'Give it to ___.', blank: '___', options: ['he', 'him', 'his', 'her'], correctIndex: 1, hint: 'Objektpronomen' },
  { id: 'pr7', category: 'pronouns', sentence: '___ are playing football.', blank: '___', options: ['Us', 'We', 'Our', 'Them'], correctIndex: 1 },
  { id: 'pr8', category: 'pronouns', sentence: 'Is this ___ pencil?', blank: '___', options: ['you', 'your', 'yours', 'yourself'], correctIndex: 1 },

  // === Verbs be/have (7) ===
  { id: 'vb1', category: 'verbs', sentence: 'I ___ happy today.', blank: '___', options: ['am', 'is', 'are', 'be'], correctIndex: 0 },
  { id: 'vb2', category: 'verbs', sentence: 'She ___ a teacher.', blank: '___', options: ['am', 'is', 'are', 'be'], correctIndex: 1 },
  { id: 'vb3', category: 'verbs', sentence: 'We ___ at school.', blank: '___', options: ['am', 'is', 'are', 'be'], correctIndex: 2 },
  { id: 'vb4', category: 'verbs', sentence: 'He ___ a dog.', blank: '___', options: ['have', 'has', 'is', 'are'], correctIndex: 1 },
  { id: 'vb5', category: 'verbs', sentence: 'They ___ two sisters.', blank: '___', options: ['have', 'has', 'is', 'am'], correctIndex: 0 },
  { id: 'vb6', category: 'verbs', sentence: 'The cat ___ black.', blank: '___', options: ['am', 'is', 'are', 'have'], correctIndex: 1 },
  { id: 'vb7', category: 'verbs', sentence: 'I ___ a new book.', blank: '___', options: ['am', 'is', 'has', 'have'], correctIndex: 3 },

  // === Simple Present (7) ===
  { id: 'sp1', category: 'simple-present', sentence: 'She ___ to school every day.', blank: '___', options: ['go', 'goes', 'going', 'gone'], correctIndex: 1, hint: '3. Person Singular: +s' },
  { id: 'sp2', category: 'simple-present', sentence: 'We ___ breakfast at 7.', blank: '___', options: ['eat', 'eats', 'eating', 'eaten'], correctIndex: 0 },
  { id: 'sp3', category: 'simple-present', sentence: 'He ___ football on Saturdays.', blank: '___', options: ['play', 'plays', 'playing', 'played'], correctIndex: 1 },
  { id: 'sp4', category: 'simple-present', sentence: 'They ___ English at school.', blank: '___', options: ['learn', 'learns', 'learning', 'learned'], correctIndex: 0 },
  { id: 'sp5', category: 'simple-present', sentence: 'My dad ___ the car every morning.', blank: '___', options: ['wash', 'washes', 'washing', 'washed'], correctIndex: 1 },
  { id: 'sp6', category: 'simple-present', sentence: 'The dog ___ in the garden.', blank: '___', options: ['sleep', 'sleeps', 'sleeping', 'slept'], correctIndex: 1 },
  { id: 'sp7', category: 'simple-present', sentence: 'I ___ music every evening.', blank: '___', options: ['listen to', 'listens to', 'listening to', 'listened to'], correctIndex: 0 },

  // === Articles (6) ===
  { id: 'ar1', category: 'articles', sentence: 'I have ___ apple.', blank: '___', options: ['a', 'an', 'the', '--'], correctIndex: 1, hint: 'Vor Vokalen: an' },
  { id: 'ar2', category: 'articles', sentence: 'She is ___ teacher.', blank: '___', options: ['a', 'an', 'the', '--'], correctIndex: 0 },
  { id: 'ar3', category: 'articles', sentence: '___ sun is shining.', blank: '___', options: ['A', 'An', 'The', '--'], correctIndex: 2, hint: 'Bestimmter Artikel' },
  { id: 'ar4', category: 'articles', sentence: 'He has ___ umbrella.', blank: '___', options: ['a', 'an', 'the', '--'], correctIndex: 1 },
  { id: 'ar5', category: 'articles', sentence: 'I live in ___ big house.', blank: '___', options: ['a', 'an', 'the', '--'], correctIndex: 0 },
  { id: 'ar6', category: 'articles', sentence: '___ elephant is very big.', blank: '___', options: ['A', 'An', 'The', '--'], correctIndex: 2 },

  // === Prepositions (6) ===
  { id: 'pp1', category: 'prepositions', sentence: 'The book is ___ the table.', blank: '___', options: ['in', 'on', 'at', 'under'], correctIndex: 1 },
  { id: 'pp2', category: 'prepositions', sentence: 'I go to school ___ 8 o\'clock.', blank: '___', options: ['in', 'on', 'at', 'to'], correctIndex: 2, hint: 'Uhrzeit: at' },
  { id: 'pp3', category: 'prepositions', sentence: 'She lives ___ Berlin.', blank: '___', options: ['in', 'on', 'at', 'to'], correctIndex: 0 },
  { id: 'pp4', category: 'prepositions', sentence: 'The cat is ___ the bed.', blank: '___', options: ['over', 'on', 'at', 'under'], correctIndex: 3 },
  { id: 'pp5', category: 'prepositions', sentence: 'We play football ___ Monday.', blank: '___', options: ['in', 'on', 'at', 'to'], correctIndex: 1, hint: 'Wochentage: on' },
  { id: 'pp6', category: 'prepositions', sentence: 'My birthday is ___ June.', blank: '___', options: ['in', 'on', 'at', 'to'], correctIndex: 0, hint: 'Monate: in' },

  // === Questions (6) ===
  { id: 'q1', category: 'questions', sentence: '___ is your name?', blank: '___', options: ['What', 'Who', 'Where', 'When'], correctIndex: 0 },
  { id: 'q2', category: 'questions', sentence: '___ do you live?', blank: '___', options: ['What', 'Who', 'Where', 'When'], correctIndex: 2 },
  { id: 'q3', category: 'questions', sentence: '___ old are you?', blank: '___', options: ['What', 'How', 'Where', 'When'], correctIndex: 1 },
  { id: 'q4', category: 'questions', sentence: '___ is your birthday?', blank: '___', options: ['What', 'Who', 'Where', 'When'], correctIndex: 3 },
  { id: 'q5', category: 'questions', sentence: '___ is your best friend?', blank: '___', options: ['What', 'Who', 'Where', 'How'], correctIndex: 1 },
  { id: 'q6', category: 'questions', sentence: '___ many brothers do you have?', blank: '___', options: ['What', 'Who', 'Where', 'How'], correctIndex: 3 },

  // === Negation (5) ===
  { id: 'ng1', category: 'negation', sentence: 'I ___ like spiders.', blank: '___', options: ["don't", "doesn't", "isn't", "aren't"], correctIndex: 0 },
  { id: 'ng2', category: 'negation', sentence: 'She ___ play tennis.', blank: '___', options: ["don't", "doesn't", "isn't", "aren't"], correctIndex: 1, hint: '3. Person: doesn\'t' },
  { id: 'ng3', category: 'negation', sentence: 'We ___ at home now.', blank: '___', options: ["don't", "doesn't", "isn't", "aren't"], correctIndex: 3 },
  { id: 'ng4', category: 'negation', sentence: 'He ___ a doctor.', blank: '___', options: ["don't", "doesn't", "isn't", "aren't"], correctIndex: 2 },
  { id: 'ng5', category: 'negation', sentence: 'They ___ have a car.', blank: '___', options: ["don't", "doesn't", "isn't", "aren't"], correctIndex: 0 },

  // === Word Order (5) ===
  { id: 'wo1', category: 'word-order', sentence: 'She ___ goes to school.', blank: '___', options: ['always', 'to always', 'goes always', 'school'], correctIndex: 0, hint: 'Haeufigkeitsadverbien vor dem Verb' },
  { id: 'wo2', category: 'word-order', sentence: 'I like ___ very much.', blank: '___', options: ['chocolate', 'very chocolate', 'much chocolate', 'chocolate very'], correctIndex: 0 },
  { id: 'wo3', category: 'word-order', sentence: '___ a nice dog!', blank: '___', options: ['What', 'How', 'Is', 'Has'], correctIndex: 0, hint: 'Ausrufe: What + Nomen' },
  { id: 'wo4', category: 'word-order', sentence: 'There ___ three cats in the garden.', blank: '___', options: ['is', 'are', 'has', 'have'], correctIndex: 1, hint: 'there is/are' },
  { id: 'wo5', category: 'word-order', sentence: 'Can you ___ me, please?', blank: '___', options: ['help', 'helps', 'helping', 'to help'], correctIndex: 0, hint: 'Nach can: Infinitiv ohne to' },
]
