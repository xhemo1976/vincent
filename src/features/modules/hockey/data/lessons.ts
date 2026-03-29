import type { Lesson } from '../types'

export const LESSONS: Lesson[] = [
  {
    id: 'equipment', title: 'Ausruestung', emoji: '🏒', requiredLevel: 1,
    content: [
      'Jeder Spieler braucht einen Schlaeger (Stick). Er hat eine flache und eine runde Seite.',
      'Man darf nur mit der flachen Seite des Schlaegers den Ball spielen!',
      'Schienbeinschoner und Mundschutz sind Pflicht.',
      'Der Torwart traegt extra Schutzausruestung: Helm, Beinschienen, Kicker und Handschuhe.',
    ],
    images: [
      { src: '/images/hockey/equipment-stick.jpg', alt: 'Hockey-Schlaeger mit flacher und runder Seite', caption: 'Die flache Seite des Schlaegers', afterPoint: 0 },
      { src: '/images/hockey/equipment-goalkeeper.jpg', alt: 'Torwart mit voller Schutzausruestung', caption: 'Torwart-Ausruestung', afterPoint: 3 },
    ],
  },
  {
    id: 'rules', title: 'Regeln', emoji: '📋', requiredLevel: 1,
    content: [
      'Zwei Teams mit je 11 Spielern (10 Feldspieler + 1 Torwart).',
      'Ein Spiel hat 2 Halbzeiten a 35 Minuten.',
      'Tore zaehlen nur aus dem Schusskreis (D-Kreis).',
      'Karten: Gruen = 2 Min. Strafe, Gelb = 5 Min. Strafe, Rot = Platzverweis.',
      'Foul: Gefaehrliches Spiel, Fuss am Ball oder Behinderung.',
    ],
    images: [
      { src: '/images/hockey/rules-cards.jpg', alt: 'Gruene, gelbe und rote Karte im Hockey', caption: 'Das Kartensystem', afterPoint: 3 },
    ],
  },
  {
    id: 'techniques', title: 'Techniken', emoji: '🎯', requiredLevel: 1,
    content: [
      'Stoppen: Ball mit dem Schlaeger kontrollieren und anhalten.',
      'Push: Ball wird mit einer schiebenden Bewegung gespielt.',
      'Schlenzen (Flick): Ball wird angehoben, z.B. fuer Ecken.',
      'Dribbling: Ball eng am Schlaeger fuehren, Richtungswechsel einbauen.',
      'Indischer Dribbling: Ball schnell von links nach rechts fuehren.',
    ],
    images: [
      { src: '/images/hockey/technique-push.jpg', alt: 'Push-Technik im Hockey', caption: 'Der Push-Pass', afterPoint: 1 },
      { src: '/images/hockey/technique-flick.jpg', alt: 'Schlenzen/Flick-Technik', caption: 'Schlenzen (Flick)', afterPoint: 2 },
      { src: '/images/hockey/technique-indian-dribbling.jpg', alt: 'Indischer Dribbling', caption: 'Indischer Dribbling', afterPoint: 4 },
    ],
  },
  {
    id: 'positions', title: 'Positionen', emoji: '👥', requiredLevel: 1,
    content: [
      'Torwart (TW): Schuetzt das Tor, darf im Kreis den Ball mit dem Koerper spielen.',
      'Verteidiger (VT): Stehen hinten und verhindern Tore des Gegners.',
      'Mittelfeld (MF): Verbinden Abwehr und Angriff, laufen am meisten.',
      'Stuermer (ST): Spielen vorne und schiessen Tore.',
      'Typische Formation: 1-4-3-3 oder 1-3-3-4.',
    ],
    images: [
      { src: '/images/hockey/positions-overview.jpg', alt: 'Uebersicht der Spielpositionen', caption: 'Positionen auf dem Feld', afterPoint: 3 },
    ],
  },
  {
    id: 'field', title: 'Spielfeld', emoji: '🏟️', requiredLevel: 1,
    content: [
      'Das Feld ist 91,4 m lang und 55 m breit.',
      'Vor jedem Tor gibt es einen D-Kreis (Schusskreis) mit 14,63 m Radius.',
      'Die Mittellinie teilt das Feld in zwei Haelften.',
      'Eckfahnen markieren die vier Ecken des Feldes.',
      'Der 7-Meter-Punkt (Penalty Spot) liegt direkt vor dem Tor.',
    ],
    images: [
      { src: '/images/hockey/field-overview.jpg', alt: 'Hockey-Spielfeld mit Markierungen', caption: 'Das Hockey-Spielfeld (91,4 x 55 m)', afterPoint: 1 },
    ],
  },
  {
    id: 'warmup', title: 'Aufwaermen', emoji: '🔥', requiredLevel: 1,
    content: [
      'Leichtes Joggen (5 Min.) bringt den Kreislauf in Schwung.',
      'Dynamisches Dehnen: Ausfallschritte, Beinschwingen, Hueftkreisen.',
      'Passuebungen zu zweit: Push, Stoppen, Vorhand/Rueckhand.',
      'Kleine Spielformen wie 3-gegen-3 aktivieren Kopf und Koerper.',
      'Torschuesse zum Eingrooven vor dem Spiel.',
    ],
    images: [
      { src: '/images/hockey/warmup-stretching.jpg', alt: 'Aufwaermuebungen vor dem Spiel', caption: 'Dynamisches Dehnen', afterPoint: 1 },
    ],
  },
  {
    id: 'shortcorner', title: 'Kurzecke', emoji: '🔄', requiredLevel: 2,
    content: [
      'Die Kurzecke ist eine der wichtigsten Standardsituationen.',
      'Ein Spieler spielt den Ball von der Grundlinie zu einem Mitspieler.',
      'Der Ball muss erst gestoppt werden, bevor geschossen wird.',
      'Angreifer stehen am Kreisrand, Verteidiger hinter der Torlinie.',
      'Viele Tore fallen durch gut einstudierte Kurzecken-Varianten.',
    ],
    images: [
      { src: '/images/hockey/shortcorner-setup.jpg', alt: 'Aufstellung bei einer Kurzecke', caption: 'Kurzecken-Aufstellung', afterPoint: 1 },
      { src: '/images/hockey/shortcorner-shot.jpg', alt: 'Schuss bei der Kurzecke', caption: 'Der Schuss nach dem Stoppen', afterPoint: 3 },
    ],
  },
  {
    id: 'fitness', title: 'Fitness', emoji: '💪', requiredLevel: 2,
    content: [
      'Hockey erfordert Ausdauer, Schnelligkeit und Wendigkeit.',
      'Sprints mit Richtungswechsel trainieren die Spielschnelligkeit.',
      'Koordinationsleiter-Uebungen verbessern die Fussarbeit.',
      'Rumpfstabilitaet schuetzt vor Verletzungen.',
      'Dehnen vor und nach dem Training ist wichtig.',
    ],
    images: [
      { src: '/images/hockey/fitness-sprint.jpg', alt: 'Sprintuebung mit Richtungswechsel', caption: 'Sprints mit Richtungswechsel', afterPoint: 1 },
      { src: '/images/hockey/fitness-ladder.jpg', alt: 'Koordinationsleiter-Training', caption: 'Koordinationsleiter', afterPoint: 2 },
    ],
  },
  {
    id: 'history', title: 'Geschichte', emoji: '📜', requiredLevel: 2,
    content: [
      'Hockey ist eine der aeltesten Sportarten der Welt.',
      'Schon im alten Aegypten gab es Stockballspiele.',
      'Modernes Feldhockey entstand im 19. Jahrhundert in England.',
      'Seit 1908 ist Hockey olympisch (Maenner), seit 1980 auch fuer Frauen.',
      'Deutschland ist eine der staerksten Hockey-Nationen weltweit.',
    ],
    images: [
      { src: '/images/hockey/history-ancient.jpg', alt: 'Historisches Stockballspiel', caption: 'Stockballspiel im alten Aegypten', afterPoint: 1 },
      { src: '/images/hockey/history-olympics.jpg', alt: 'Hockey bei den Olympischen Spielen', caption: 'Olympisches Hockey', afterPoint: 3 },
    ],
  },
  {
    id: 'tournaments', title: 'Turniere', emoji: '🏆', requiredLevel: 2,
    content: [
      'Die wichtigsten Turniere: Olympische Spiele, WM, EM.',
      'Die Hockey-Bundesliga ist die staerkste Liga Europas.',
      'Die Hockey World League wird alle 2 Jahre ausgetragen.',
      'Champions Trophy war ein Einladungsturnier der Top-Nationen.',
      'Jugendturniere beginnen ab der U12 und gehen bis zur U21.',
    ],
    images: [
      { src: '/images/hockey/tournament-trophy.jpg', alt: 'Hockey-WM Pokal', caption: 'WM-Pokal', afterPoint: 0 },
    ],
  },
  {
    id: 'referee', title: 'Schiedsrichter', emoji: '🟢', requiredLevel: 2,
    content: [
      'Zwei Schiedsrichter leiten ein Spiel, jeder ist fuer eine Haelfte zustaendig.',
      'Pfiff = Spielunterbrechung. Ohne Pfiff geht das Spiel weiter.',
      'Gruene Karte = Verwarnung (2 Min. Pause).',
      'Gelbe Karte = Zeitstrafe (5-10 Minuten).',
      'Rote Karte = Platzverweis fuer den Rest des Spiels.',
    ],
    images: [
      { src: '/images/hockey/referee-cards.jpg', alt: 'Schiedsrichter zeigt Karte', caption: 'Das Kartensystem im Detail', afterPoint: 2 },
    ],
  },
  {
    id: 'tactics', title: 'Taktik', emoji: '🧠', requiredLevel: 2,
    content: [
      'Kurzecke: Wird bei Foul im Kreis gegeben. Der Ball wird von der Grundlinie herausgespielt.',
      'Konter: Schneller Gegenstoss nach Ballgewinn.',
      'Pressing: Gegner unter Druck setzen, Ball frueh erobern.',
      'Ueberzahlspiel: Durch cleveres Passspiel einen freien Spieler finden.',
      'Defensiv-Block: Alle Spieler dicht vor dem eigenen Tor.',
    ],
    images: [
      { src: '/images/hockey/tactics-pressing.jpg', alt: 'Pressing im Hockey', caption: 'Frueher Ballgewinn durch Pressing', afterPoint: 2 },
      { src: '/images/hockey/tactics-counter.jpg', alt: 'Konterangriff', caption: 'Schneller Konter nach Ballgewinn', afterPoint: 1 },
    ],
  },
]
