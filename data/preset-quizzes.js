// data/preset-quizzes.js
// Built-in quizzes. They are read-only in the app: users can preview, play, export
// or duplicate them, and edit the duplicate.
//
// IMPORTANT: the quiz below is TEMPORARY PLACEHOLDER CONTENT for development and testing.
// It will be replaced by the real questions later.
//
// To add another built-in quiz, add an object with the same shape to the list:
// { id: 'preset-…' (unique), title, language: 'cs' | 'en',
//   categories: [5 × { name, questions: [5 × { question, answer, note }] }] }
// The first question of each category is worth 100 points, the last 500.
// The easiest way to create one: build it in the app's editor, export it to a JSON file,
// and paste the "quiz" part of that file here.

window.PRESET_QUIZZES = [
  {
    id: 'preset-placeholder',
    title: 'Testovací kvíz (dočasný obsah)',
    language: 'cs',
    updatedAt: '2026-11-20T00:00:00.000Z',
    categories: [1, 2, 3, 4, 5].map(c => ({
      name: 'Kategorie ' + c,
      questions: [1, 2, 3, 4, 5].map(r => ({
        question: 'Testovací otázka ' + c + '.' + r + ' (kategorie ' + c + ', ' + r * 100 + ' bodů).\n' +
          'Skutečné otázky budou doplněny později.',
        answer: 'Testovací odpověď ' + c + '.' + r,
        note: r === 1 ? 'Ukázka vysvětlení, které se zobrazí spolu se správnou odpovědí.' : ''
      }))
    }))
  }
];
