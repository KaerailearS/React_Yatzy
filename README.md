Took the base of the Tenzies app, started to work it into a Yatzy app. See where this one goes.

Rough explanation of the project;

Taking the Tenzies app built via Scrimba's "Learn React" course.
Cut down the array size from 10 to 5, kept the "hold die" logic intact.

Started adding in necessary parts to get a functional Yatzy app running.

Split off some functionality to additional components to make App.jsx a bit smaller, although I think there's still room for separation.

RollButton.jsx being one of the examples; very minimal component chucked into its own file, rather than kept inside App.jsx
Honestly unsure why I added the "DiceContainer.jsx" instead of just keeping them in a separate div and keeping to the "Die.jsx".
Scoreboard.jsx to hold all the logic for scores, displaying and calculating them.
calculateScore.js holds all the actual calculation logic for the categories, exported to relevant files.
calculateTotalScore.js holds the logic for calculating totals, upper, lower, bonus and grand total.

Went with "modular CSS" for the project, since it seemed easier to deploy and keep track of.

Ended up reworking multiple pieces of the puzzle multiple times, and may have left some leftover code / stupid naming conventions somewhere.

README still WIP, or something along those lines.

Acknowledgements;

Scrimba.com - Learn React course for the Tenzies base project (and most of my React knowledge)
Google.com - Google!
Chatgpt.com - Basically Google with a very wonky mind.