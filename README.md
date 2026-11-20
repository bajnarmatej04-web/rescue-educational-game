# Rescue

Rescue is a bilingual (Czech / English) educational quiz game in the style of the Czech TV quiz *Riskuj!* (similar to *Jeopardy!*). A facilitator runs a team competition on a projector or large screen: teams take turns choosing questions from a 5 × 5 board, and the app keeps the score.

It is made for schools, workshops and educational events. The first focus is environmental education, but you can create quizzes on any topic in the built-in editor.

> **Quiz content:** the built-in quiz "Testovací kvíz (dočasný obsah)" is **temporary placeholder content** for testing. The real questions will be added later.

## Quick start

1. Download the project (on GitHub: **Code → Download ZIP**) and unzip it.
2. Double-click **`index.html`**. It opens in your web browser.

That is all. There is nothing to install, no server and no internet connection needed. A current version of Chrome, Edge, Firefox or Safari is recommended.

## How to use it

### Playing a game

1. **New game** in the main menu.
2. Choose a quiz, the number of teams (2–8) and their names. Empty names become "Team 1", "Team 2" and so on.
3. **Start game.** The playing order of the teams is drawn randomly **once** and stays the same for the whole game.
4. The team on turn picks a question. Click its value on the board.
5. Read the question, then click **Show answer**.
6. Click **Correct** (adds the points) or **Incorrect** (subtracts the points). The next team in the order is then on turn.
   - Opened a question by mistake? **Back to board** closes it without any change.
7. The game ends automatically after all 25 questions, or earlier with **End game**. The results screen shows the ranking, the difference to the winner, and a tie if several teams share first place.

Other controls during the game:

- **Fullscreen** hides everything except the game. Press Esc or the button again to leave it.
- **Correcting a score:** click a team's score in the right-hand panel. This does not change whose turn it is.
- **Menu** leaves the game; it stays saved and can be continued from the menu.
- **CS / EN** in the top right switches the interface language at any time, also during a game.

### Creating and editing quizzes

Open **Quizzes** in the main menu.

- **New quiz:** fill in the title, the 5 category names, and a question and correct answer for each of the 25 fields. The explanation is optional and is shown together with the answer.
- Points are given by position: the first question in a category is worth 100, the last 500. Use the ↑ ↓ buttons to move a question (its value changes with its position) and "Move left / right" to reorder categories.
- You can save an unfinished quiz at any time. It can be played once every required field is filled in. **Show missing fields** highlights what is still empty.
- **Preview** shows all questions and answers on one page (do not show it to the players).
- **Duplicate** makes an editable copy. Built-in quizzes cannot be changed directly, so duplicate them first.
- **Delete** asks for confirmation. A game that is already running is not affected, because each game keeps its own copy of the quiz.

### Export and import (backups and sharing)

- **Export** saves one quiz as a `.json` file, e.g. `rescue-climate-and-energy.json`.
- **Import from file** loads such a file as a new quiz. Files that are not Rescue quizzes, are damaged, or were made by a newer version are refused with an explanation.

Use export to keep backups and to move quizzes to another computer or browser.

## Where data is stored and what that means

Rescue saves everything in the browser's **localStorage**, a small storage area inside the browser on this computer:

| What | When it is saved |
| --- | --- |
| Your quizzes | When you click **Save** in the editor (and on duplicate, import, delete) |
| The current game | Automatically after every change: opening a question, showing the answer, scoring, score corrections |
| Interface language | When you switch it |

After a page refresh, closing the browser or a crash, Rescue offers to **continue the unfinished game** exactly where it stopped: same scores, same team order, same played questions, even the open question.

**Limitations of localStorage:**

- Data exists only **in this browser on this computer**. Another browser or computer does not see it. Use export/import to move quizzes.
- **Clearing browsing data** (cookies and site data) deletes your quizzes and the saved game. Export important quizzes.
- **Private / incognito windows** forget everything when closed.
- Some browsers or school computers **block storage**. Rescue then shows a warning; you can still play, but nothing is kept after closing the page.
- Space is limited to about 5 MB, which is enough for hundreds of quizzes.
- Only **one** unfinished game is saved at a time. Avoid running the same game in two browser tabs; they would overwrite each other.

## Technology

- Plain **HTML, CSS and JavaScript**. No frameworks, no libraries, no build step, no backend.
- The scripts are ordinary `<script>` files (not JavaScript modules), so the app works when opened directly from a folder. JavaScript modules would require running a local web server, which is an unnecessary obstacle for teachers.
- System fonts only, so nothing is downloaded and the app works offline.

## Project structure

```
index.html            the only page; contains an empty <section> for each screen
tests.html            automatic tests of the game rules – open it in a browser
css/
  base.css            colours, fonts, buttons, form fields, dialogs, main menu
  game.css            setup, game board, question view, team panel, results
  editor.css          quiz list, editor and preview
js/
  quiz.js             the quiz data format: checking, copying, export/import
  game.js             the game rules: turn order, scoring, end of game, ranking
  storage.js          everything that reads or writes localStorage
  i18n.js             translations: t('key') returns the text in the current language
  ui-common.js        shared helpers: building elements, dialogs, notifications, files
  ui-game.js          the setup, game and results screens
  ui-editor.js        the quiz list, editor and preview screens
  app.js              start-up, main menu, language switch, switching screens
lang/
  cs.js, en.js        all interface texts (Czech is the default)
data/
  preset-quizzes.js   built-in quizzes (currently a placeholder)
docs/
  architecture.md     how the parts work together, for future development
```

The most important rule of the code: **game rules (`game.js`) never draw anything, and screens (`ui-*.js`) never calculate scores.** Every change to a game goes through one path: change the state → save it → redraw the screen.

More detail is in [docs/architecture.md](docs/architecture.md).

## Testing

Open **`tests.html`** in a browser. It runs 39 automatic checks of the game rules, the quiz format, export/import and the translations. Every line should be green.

## Adding another interface language

1. Copy `lang/en.js` to a new file, e.g. `lang/de.js`.
2. Change `window.TRANSLATIONS.en` to `window.TRANSLATIONS.de`, set `name`, and translate the texts on the right side (keep the keys on the left and the `{placeholders}` unchanged).
3. Add `<script src="lang/de.js"></script>` next to the other language files in `index.html`.

The language switch shows the new language automatically. `tests.html` checks that it has the same keys as Czech if you add it there as well.

## License

MIT, see [LICENSE](LICENSE).
