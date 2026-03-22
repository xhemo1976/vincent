export interface VocabWord {
  id: string
  en: string
  de: string
  topic: string
  difficulty: 1 | 2 | 3
  example?: string
}

export const VOCAB_TOPICS = [
  { id: 'numbers', name: 'Zahlen', emoji: '🔢' },
  { id: 'colors', name: 'Farben', emoji: '🎨' },
  { id: 'family', name: 'Familie', emoji: '👨‍👩‍👦' },
  { id: 'school', name: 'Schule', emoji: '🏫' },
  { id: 'greetings', name: 'Begruessung', emoji: '👋' },
  { id: 'animals', name: 'Tiere', emoji: '🐾' },
  { id: 'food', name: 'Essen', emoji: '🍕' },
  { id: 'body', name: 'Koerper', emoji: '🦴' },
  { id: 'weather', name: 'Wetter', emoji: '🌦️' },
  { id: 'time', name: 'Zeit', emoji: '🕐' },
  { id: 'clothes', name: 'Kleidung', emoji: '👕' },
  { id: 'verbs', name: 'Verben', emoji: '🏃' },
]

export const VOCAB_WORDS: VocabWord[] = [
  // === Numbers (20) ===
  { id: 'n1', en: 'one', de: 'eins', topic: 'numbers', difficulty: 1 },
  { id: 'n2', en: 'two', de: 'zwei', topic: 'numbers', difficulty: 1 },
  { id: 'n3', en: 'three', de: 'drei', topic: 'numbers', difficulty: 1 },
  { id: 'n4', en: 'four', de: 'vier', topic: 'numbers', difficulty: 1 },
  { id: 'n5', en: 'five', de: 'fuenf', topic: 'numbers', difficulty: 1 },
  { id: 'n6', en: 'six', de: 'sechs', topic: 'numbers', difficulty: 1 },
  { id: 'n7', en: 'seven', de: 'sieben', topic: 'numbers', difficulty: 1 },
  { id: 'n8', en: 'eight', de: 'acht', topic: 'numbers', difficulty: 1 },
  { id: 'n9', en: 'nine', de: 'neun', topic: 'numbers', difficulty: 1 },
  { id: 'n10', en: 'ten', de: 'zehn', topic: 'numbers', difficulty: 1 },
  { id: 'n11', en: 'twenty', de: 'zwanzig', topic: 'numbers', difficulty: 1 },
  { id: 'n12', en: 'thirty', de: 'dreissig', topic: 'numbers', difficulty: 1 },
  { id: 'n13', en: 'fifty', de: 'fuenfzig', topic: 'numbers', difficulty: 2 },
  { id: 'n14', en: 'hundred', de: 'hundert', topic: 'numbers', difficulty: 2 },
  { id: 'n15', en: 'thousand', de: 'tausend', topic: 'numbers', difficulty: 2 },
  { id: 'n16', en: 'first', de: 'erste/r/s', topic: 'numbers', difficulty: 2 },
  { id: 'n17', en: 'second', de: 'zweite/r/s', topic: 'numbers', difficulty: 2 },
  { id: 'n18', en: 'third', de: 'dritte/r/s', topic: 'numbers', difficulty: 2 },
  { id: 'n19', en: 'half', de: 'Haelfte', topic: 'numbers', difficulty: 2 },
  { id: 'n20', en: 'double', de: 'doppelt', topic: 'numbers', difficulty: 3 },

  // === Colors (15) ===
  { id: 'c1', en: 'red', de: 'rot', topic: 'colors', difficulty: 1 },
  { id: 'c2', en: 'blue', de: 'blau', topic: 'colors', difficulty: 1 },
  { id: 'c3', en: 'green', de: 'gruen', topic: 'colors', difficulty: 1 },
  { id: 'c4', en: 'yellow', de: 'gelb', topic: 'colors', difficulty: 1 },
  { id: 'c5', en: 'black', de: 'schwarz', topic: 'colors', difficulty: 1 },
  { id: 'c6', en: 'white', de: 'weiss', topic: 'colors', difficulty: 1 },
  { id: 'c7', en: 'purple', de: 'lila', topic: 'colors', difficulty: 1 },
  { id: 'c8', en: 'orange', de: 'orange', topic: 'colors', difficulty: 1 },
  { id: 'c9', en: 'pink', de: 'rosa', topic: 'colors', difficulty: 1 },
  { id: 'c10', en: 'brown', de: 'braun', topic: 'colors', difficulty: 1 },
  { id: 'c11', en: 'grey', de: 'grau', topic: 'colors', difficulty: 1 },
  { id: 'c12', en: 'dark', de: 'dunkel', topic: 'colors', difficulty: 2 },
  { id: 'c13', en: 'light', de: 'hell', topic: 'colors', difficulty: 2 },
  { id: 'c14', en: 'bright', de: 'leuchtend', topic: 'colors', difficulty: 2 },
  { id: 'c15', en: 'golden', de: 'golden', topic: 'colors', difficulty: 2 },

  // === Family (15) ===
  { id: 'f1', en: 'mother', de: 'Mutter', topic: 'family', difficulty: 1, example: 'My mother is kind.' },
  { id: 'f2', en: 'father', de: 'Vater', topic: 'family', difficulty: 1, example: 'My father is tall.' },
  { id: 'f3', en: 'sister', de: 'Schwester', topic: 'family', difficulty: 1 },
  { id: 'f4', en: 'brother', de: 'Bruder', topic: 'family', difficulty: 1 },
  { id: 'f5', en: 'grandmother', de: 'Grossmutter', topic: 'family', difficulty: 1 },
  { id: 'f6', en: 'grandfather', de: 'Grossvater', topic: 'family', difficulty: 1 },
  { id: 'f7', en: 'uncle', de: 'Onkel', topic: 'family', difficulty: 1 },
  { id: 'f8', en: 'aunt', de: 'Tante', topic: 'family', difficulty: 1 },
  { id: 'f9', en: 'cousin', de: 'Cousin/Cousine', topic: 'family', difficulty: 2 },
  { id: 'f10', en: 'parents', de: 'Eltern', topic: 'family', difficulty: 1 },
  { id: 'f11', en: 'son', de: 'Sohn', topic: 'family', difficulty: 1 },
  { id: 'f12', en: 'daughter', de: 'Tochter', topic: 'family', difficulty: 1 },
  { id: 'f13', en: 'baby', de: 'Baby', topic: 'family', difficulty: 1 },
  { id: 'f14', en: 'twins', de: 'Zwillinge', topic: 'family', difficulty: 2 },
  { id: 'f15', en: 'neighbour', de: 'Nachbar/in', topic: 'family', difficulty: 2 },

  // === School (15) ===
  { id: 's1', en: 'teacher', de: 'Lehrer/in', topic: 'school', difficulty: 1 },
  { id: 's2', en: 'student', de: 'Schueler/in', topic: 'school', difficulty: 1 },
  { id: 's3', en: 'classroom', de: 'Klassenzimmer', topic: 'school', difficulty: 1 },
  { id: 's4', en: 'homework', de: 'Hausaufgaben', topic: 'school', difficulty: 1 },
  { id: 's5', en: 'pencil', de: 'Bleistift', topic: 'school', difficulty: 1 },
  { id: 's6', en: 'book', de: 'Buch', topic: 'school', difficulty: 1 },
  { id: 's7', en: 'desk', de: 'Schreibtisch', topic: 'school', difficulty: 1 },
  { id: 's8', en: 'lunch break', de: 'Mittagspause', topic: 'school', difficulty: 1 },
  { id: 's9', en: 'test', de: 'Test', topic: 'school', difficulty: 1 },
  { id: 's10', en: 'lesson', de: 'Unterrichtsstunde', topic: 'school', difficulty: 1 },
  { id: 's11', en: 'blackboard', de: 'Tafel', topic: 'school', difficulty: 1 },
  { id: 's12', en: 'rubber', de: 'Radiergummi', topic: 'school', difficulty: 2 },
  { id: 's13', en: 'ruler', de: 'Lineal', topic: 'school', difficulty: 2 },
  { id: 's14', en: 'scissors', de: 'Schere', topic: 'school', difficulty: 2 },
  { id: 's15', en: 'timetable', de: 'Stundenplan', topic: 'school', difficulty: 2 },

  // === Greetings (15) ===
  { id: 'g1', en: 'hello', de: 'hallo', topic: 'greetings', difficulty: 1 },
  { id: 'g2', en: 'goodbye', de: 'auf Wiedersehen', topic: 'greetings', difficulty: 1 },
  { id: 'g3', en: 'good morning', de: 'guten Morgen', topic: 'greetings', difficulty: 1 },
  { id: 'g4', en: 'good night', de: 'gute Nacht', topic: 'greetings', difficulty: 1 },
  { id: 'g5', en: 'how are you?', de: 'wie geht es dir?', topic: 'greetings', difficulty: 1 },
  { id: 'g6', en: 'thank you', de: 'danke', topic: 'greetings', difficulty: 1 },
  { id: 'g7', en: 'please', de: 'bitte', topic: 'greetings', difficulty: 1 },
  { id: 'g8', en: "you're welcome", de: 'gern geschehen', topic: 'greetings', difficulty: 1 },
  { id: 'g9', en: 'excuse me', de: 'Entschuldigung', topic: 'greetings', difficulty: 1 },
  { id: 'g10', en: 'see you later', de: 'bis spaeter', topic: 'greetings', difficulty: 1 },
  { id: 'g11', en: 'nice to meet you', de: 'freut mich', topic: 'greetings', difficulty: 2 },
  { id: 'g12', en: 'have a nice day', de: 'schoenen Tag noch', topic: 'greetings', difficulty: 2 },
  { id: 'g13', en: 'congratulations', de: 'Glueckwunsch', topic: 'greetings', difficulty: 3 },
  { id: 'g14', en: 'welcome', de: 'willkommen', topic: 'greetings', difficulty: 1 },
  { id: 'g15', en: 'cheers', de: 'prost / tschuess', topic: 'greetings', difficulty: 2 },

  // === Animals (20) ===
  { id: 'a1', en: 'dog', de: 'Hund', topic: 'animals', difficulty: 1 },
  { id: 'a2', en: 'cat', de: 'Katze', topic: 'animals', difficulty: 1 },
  { id: 'a3', en: 'bird', de: 'Vogel', topic: 'animals', difficulty: 1 },
  { id: 'a4', en: 'fish', de: 'Fisch', topic: 'animals', difficulty: 1 },
  { id: 'a5', en: 'horse', de: 'Pferd', topic: 'animals', difficulty: 1 },
  { id: 'a6', en: 'rabbit', de: 'Kaninchen', topic: 'animals', difficulty: 1 },
  { id: 'a7', en: 'mouse', de: 'Maus', topic: 'animals', difficulty: 1 },
  { id: 'a8', en: 'elephant', de: 'Elefant', topic: 'animals', difficulty: 1 },
  { id: 'a9', en: 'lion', de: 'Loewe', topic: 'animals', difficulty: 1 },
  { id: 'a10', en: 'monkey', de: 'Affe', topic: 'animals', difficulty: 1 },
  { id: 'a11', en: 'bear', de: 'Baer', topic: 'animals', difficulty: 1 },
  { id: 'a12', en: 'snake', de: 'Schlange', topic: 'animals', difficulty: 1 },
  { id: 'a13', en: 'wolf', de: 'Wolf', topic: 'animals', difficulty: 1 },
  { id: 'a14', en: 'dolphin', de: 'Delfin', topic: 'animals', difficulty: 2 },
  { id: 'a15', en: 'eagle', de: 'Adler', topic: 'animals', difficulty: 2 },
  { id: 'a16', en: 'butterfly', de: 'Schmetterling', topic: 'animals', difficulty: 2 },
  { id: 'a17', en: 'whale', de: 'Wal', topic: 'animals', difficulty: 2 },
  { id: 'a18', en: 'turtle', de: 'Schildkroete', topic: 'animals', difficulty: 2 },
  { id: 'a19', en: 'penguin', de: 'Pinguin', topic: 'animals', difficulty: 2 },
  { id: 'a20', en: 'shark', de: 'Hai', topic: 'animals', difficulty: 2 },

  // === Food (20) ===
  { id: 'fd1', en: 'bread', de: 'Brot', topic: 'food', difficulty: 1 },
  { id: 'fd2', en: 'water', de: 'Wasser', topic: 'food', difficulty: 1 },
  { id: 'fd3', en: 'milk', de: 'Milch', topic: 'food', difficulty: 1 },
  { id: 'fd4', en: 'apple', de: 'Apfel', topic: 'food', difficulty: 1 },
  { id: 'fd5', en: 'cheese', de: 'Kaese', topic: 'food', difficulty: 1 },
  { id: 'fd6', en: 'rice', de: 'Reis', topic: 'food', difficulty: 1 },
  { id: 'fd7', en: 'chicken', de: 'Haehnchen', topic: 'food', difficulty: 1 },
  { id: 'fd8', en: 'pizza', de: 'Pizza', topic: 'food', difficulty: 1 },
  { id: 'fd9', en: 'ice cream', de: 'Eis', topic: 'food', difficulty: 1 },
  { id: 'fd10', en: 'cake', de: 'Kuchen', topic: 'food', difficulty: 1 },
  { id: 'fd11', en: 'banana', de: 'Banane', topic: 'food', difficulty: 1 },
  { id: 'fd12', en: 'egg', de: 'Ei', topic: 'food', difficulty: 1 },
  { id: 'fd13', en: 'butter', de: 'Butter', topic: 'food', difficulty: 1 },
  { id: 'fd14', en: 'salad', de: 'Salat', topic: 'food', difficulty: 1 },
  { id: 'fd15', en: 'soup', de: 'Suppe', topic: 'food', difficulty: 1 },
  { id: 'fd16', en: 'orange juice', de: 'Orangensaft', topic: 'food', difficulty: 2 },
  { id: 'fd17', en: 'sandwich', de: 'Sandwich/belegtes Brot', topic: 'food', difficulty: 2 },
  { id: 'fd18', en: 'noodles', de: 'Nudeln', topic: 'food', difficulty: 1 },
  { id: 'fd19', en: 'strawberry', de: 'Erdbeere', topic: 'food', difficulty: 2 },
  { id: 'fd20', en: 'chocolate', de: 'Schokolade', topic: 'food', difficulty: 1 },

  // === Body (20) ===
  { id: 'b1', en: 'head', de: 'Kopf', topic: 'body', difficulty: 1 },
  { id: 'b2', en: 'hand', de: 'Hand', topic: 'body', difficulty: 1 },
  { id: 'b3', en: 'arm', de: 'Arm', topic: 'body', difficulty: 1 },
  { id: 'b4', en: 'leg', de: 'Bein', topic: 'body', difficulty: 1 },
  { id: 'b5', en: 'foot', de: 'Fuss', topic: 'body', difficulty: 1 },
  { id: 'b6', en: 'eye', de: 'Auge', topic: 'body', difficulty: 1 },
  { id: 'b7', en: 'ear', de: 'Ohr', topic: 'body', difficulty: 1 },
  { id: 'b8', en: 'nose', de: 'Nase', topic: 'body', difficulty: 1 },
  { id: 'b9', en: 'mouth', de: 'Mund', topic: 'body', difficulty: 1 },
  { id: 'b10', en: 'hair', de: 'Haare', topic: 'body', difficulty: 1 },
  { id: 'b11', en: 'tooth', de: 'Zahn', topic: 'body', difficulty: 1 },
  { id: 'b12', en: 'finger', de: 'Finger', topic: 'body', difficulty: 1 },
  { id: 'b13', en: 'knee', de: 'Knie', topic: 'body', difficulty: 2 },
  { id: 'b14', en: 'shoulder', de: 'Schulter', topic: 'body', difficulty: 2 },
  { id: 'b15', en: 'stomach', de: 'Bauch/Magen', topic: 'body', difficulty: 2 },
  { id: 'b16', en: 'back', de: 'Ruecken', topic: 'body', difficulty: 2 },
  { id: 'b17', en: 'neck', de: 'Hals/Nacken', topic: 'body', difficulty: 2 },
  { id: 'b18', en: 'heart', de: 'Herz', topic: 'body', difficulty: 1 },
  { id: 'b19', en: 'brain', de: 'Gehirn', topic: 'body', difficulty: 2 },
  { id: 'b20', en: 'skin', de: 'Haut', topic: 'body', difficulty: 2 },

  // === Weather (15) ===
  { id: 'w1', en: 'sun', de: 'Sonne', topic: 'weather', difficulty: 1 },
  { id: 'w2', en: 'rain', de: 'Regen', topic: 'weather', difficulty: 1 },
  { id: 'w3', en: 'snow', de: 'Schnee', topic: 'weather', difficulty: 1 },
  { id: 'w4', en: 'wind', de: 'Wind', topic: 'weather', difficulty: 1 },
  { id: 'w5', en: 'cloud', de: 'Wolke', topic: 'weather', difficulty: 1 },
  { id: 'w6', en: 'hot', de: 'heiss', topic: 'weather', difficulty: 1 },
  { id: 'w7', en: 'cold', de: 'kalt', topic: 'weather', difficulty: 1 },
  { id: 'w8', en: 'warm', de: 'warm', topic: 'weather', difficulty: 1 },
  { id: 'w9', en: 'storm', de: 'Sturm', topic: 'weather', difficulty: 2 },
  { id: 'w10', en: 'thunder', de: 'Donner', topic: 'weather', difficulty: 2 },
  { id: 'w11', en: 'lightning', de: 'Blitz', topic: 'weather', difficulty: 2 },
  { id: 'w12', en: 'rainbow', de: 'Regenbogen', topic: 'weather', difficulty: 2 },
  { id: 'w13', en: 'fog', de: 'Nebel', topic: 'weather', difficulty: 2 },
  { id: 'w14', en: 'ice', de: 'Eis', topic: 'weather', difficulty: 1 },
  { id: 'w15', en: 'temperature', de: 'Temperatur', topic: 'weather', difficulty: 3 },

  // === Time (15) ===
  { id: 't1', en: 'today', de: 'heute', topic: 'time', difficulty: 1 },
  { id: 't2', en: 'tomorrow', de: 'morgen', topic: 'time', difficulty: 1 },
  { id: 't3', en: 'yesterday', de: 'gestern', topic: 'time', difficulty: 1 },
  { id: 't4', en: 'morning', de: 'Morgen', topic: 'time', difficulty: 1 },
  { id: 't5', en: 'afternoon', de: 'Nachmittag', topic: 'time', difficulty: 2 },
  { id: 't6', en: 'evening', de: 'Abend', topic: 'time', difficulty: 1 },
  { id: 't7', en: 'night', de: 'Nacht', topic: 'time', difficulty: 1 },
  { id: 't8', en: 'week', de: 'Woche', topic: 'time', difficulty: 1 },
  { id: 't9', en: 'month', de: 'Monat', topic: 'time', difficulty: 1 },
  { id: 't10', en: 'year', de: 'Jahr', topic: 'time', difficulty: 1 },
  { id: 't11', en: 'hour', de: 'Stunde', topic: 'time', difficulty: 1 },
  { id: 't12', en: 'minute', de: 'Minute', topic: 'time', difficulty: 1 },
  { id: 't13', en: 'always', de: 'immer', topic: 'time', difficulty: 2 },
  { id: 't14', en: 'never', de: 'nie', topic: 'time', difficulty: 2 },
  { id: 't15', en: 'sometimes', de: 'manchmal', topic: 'time', difficulty: 2 },

  // === Clothes (15) ===
  { id: 'cl1', en: 'shirt', de: 'Hemd/T-Shirt', topic: 'clothes', difficulty: 1 },
  { id: 'cl2', en: 'trousers', de: 'Hose', topic: 'clothes', difficulty: 1 },
  { id: 'cl3', en: 'shoes', de: 'Schuhe', topic: 'clothes', difficulty: 1 },
  { id: 'cl4', en: 'jacket', de: 'Jacke', topic: 'clothes', difficulty: 1 },
  { id: 'cl5', en: 'hat', de: 'Hut/Muetze', topic: 'clothes', difficulty: 1 },
  { id: 'cl6', en: 'dress', de: 'Kleid', topic: 'clothes', difficulty: 1 },
  { id: 'cl7', en: 'socks', de: 'Socken', topic: 'clothes', difficulty: 1 },
  { id: 'cl8', en: 'skirt', de: 'Rock', topic: 'clothes', difficulty: 1 },
  { id: 'cl9', en: 'scarf', de: 'Schal', topic: 'clothes', difficulty: 2 },
  { id: 'cl10', en: 'gloves', de: 'Handschuhe', topic: 'clothes', difficulty: 2 },
  { id: 'cl11', en: 'boots', de: 'Stiefel', topic: 'clothes', difficulty: 2 },
  { id: 'cl12', en: 'sweater', de: 'Pullover', topic: 'clothes', difficulty: 1 },
  { id: 'cl13', en: 'coat', de: 'Mantel', topic: 'clothes', difficulty: 2 },
  { id: 'cl14', en: 'belt', de: 'Guertel', topic: 'clothes', difficulty: 2 },
  { id: 'cl15', en: 'uniform', de: 'Uniform', topic: 'clothes', difficulty: 2 },

  // === Verbs (20) ===
  { id: 'v1', en: 'to be', de: 'sein', topic: 'verbs', difficulty: 1 },
  { id: 'v2', en: 'to have', de: 'haben', topic: 'verbs', difficulty: 1 },
  { id: 'v3', en: 'to go', de: 'gehen', topic: 'verbs', difficulty: 1 },
  { id: 'v4', en: 'to eat', de: 'essen', topic: 'verbs', difficulty: 1 },
  { id: 'v5', en: 'to drink', de: 'trinken', topic: 'verbs', difficulty: 1 },
  { id: 'v6', en: 'to play', de: 'spielen', topic: 'verbs', difficulty: 1 },
  { id: 'v7', en: 'to read', de: 'lesen', topic: 'verbs', difficulty: 1 },
  { id: 'v8', en: 'to write', de: 'schreiben', topic: 'verbs', difficulty: 1 },
  { id: 'v9', en: 'to run', de: 'rennen/laufen', topic: 'verbs', difficulty: 1 },
  { id: 'v10', en: 'to sleep', de: 'schlafen', topic: 'verbs', difficulty: 1 },
  { id: 'v11', en: 'to learn', de: 'lernen', topic: 'verbs', difficulty: 1 },
  { id: 'v12', en: 'to speak', de: 'sprechen', topic: 'verbs', difficulty: 2 },
  { id: 'v13', en: 'to listen', de: 'zuhoeren', topic: 'verbs', difficulty: 2 },
  { id: 'v14', en: 'to sing', de: 'singen', topic: 'verbs', difficulty: 1 },
  { id: 'v15', en: 'to swim', de: 'schwimmen', topic: 'verbs', difficulty: 2 },
  { id: 'v16', en: 'to draw', de: 'zeichnen', topic: 'verbs', difficulty: 2 },
  { id: 'v17', en: 'to cook', de: 'kochen', topic: 'verbs', difficulty: 2 },
  { id: 'v18', en: 'to think', de: 'denken', topic: 'verbs', difficulty: 2 },
  { id: 'v19', en: 'to understand', de: 'verstehen', topic: 'verbs', difficulty: 3, example: 'I understand the question.' },
  { id: 'v20', en: 'to remember', de: 'sich erinnern', topic: 'verbs', difficulty: 3, example: 'I remember your name.' },
]

// SM-2 Spaced Repetition data per word
export interface SM2Data {
  wordId: string
  interval: number
  repetitions: number
  easeFactor: number
  nextReview: string
  lastReview: string | null
}

export function initSM2(wordId: string): SM2Data {
  return {
    wordId,
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
    nextReview: new Date().toISOString(),
    lastReview: null,
  }
}

// quality: 0-5 (0=blackout, 5=perfect)
export function updateSM2(data: SM2Data, quality: number): SM2Data {
  const newData = { ...data }
  newData.lastReview = new Date().toISOString()

  if (quality >= 3) {
    if (newData.repetitions === 0) {
      newData.interval = 1
    } else if (newData.repetitions === 1) {
      newData.interval = 6
    } else {
      newData.interval = Math.round(newData.interval * newData.easeFactor)
    }
    newData.repetitions += 1
  } else {
    newData.repetitions = 0
    newData.interval = 1
  }

  newData.easeFactor = Math.max(
    1.3,
    newData.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  )

  const next = new Date()
  next.setDate(next.getDate() + newData.interval)
  newData.nextReview = next.toISOString()

  return newData
}
