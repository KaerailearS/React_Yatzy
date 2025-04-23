# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



Challenges;
/**
* Challenge 1: Start a brand new React app!
* - Create a separate App component
* - Import and render the App component here
* - In the App component, render a <main> element
* - Style everything to look like the slide
*/

/**
* Challenge 2:
* 
* - Create a Die component that takes a `value` prop. Should
*   render a button with that value displayed.
* - Render 10 instances of the Die component (manually)
*      - Provide a number between 1-6 for the value on each
*        for now
* - Style the <main> and <Die> components 
*   to look like they do in the slide
*      - Hints: Create a container to hold the 10 instances
*        of the Die component, and use CSS Grid to lay them
*        out evenly in 2 rows of 5 columns
*      - Use flexbox on main to center the dice container
*        in the center of the page
*/

/**
* Challenge 3:
* 
* Write a function (generateAllNewDice) that returns an array 
* of 10 random numbers between 1-6 inclusive.
* 
* Log the array of numbers to the console for now
*/

/**
* Challenge 4:
* 
* Create state to hold our array of numbers. (Initialize
* the state by calling our `generateAllNewDice` function so it 
* loads all new dice as soon as the app loads)
* 
* Map over the state numbers array to generate our array
* of Die components and render those in place of our
* manually-written 10 Die elements.
*/

/**
* Challenge 5: Create a `Roll Dice` button that will re-roll
* all 10 dice
* 
* Clicking the button should generate a new array of numbers
* and set the `dice` state to that new array (thus re-rendering
* the array to the page)
*/

/**
* Challenge 6: Update the array of numbers in state to be
* an array of objects instead. Each object should look like:
* { value: <random number>, isHeld: false }
* 
* Making this change will break parts of our code, so make
* sure to update things so we're back to a working state
*/

Challenge 7 forgot to copypaste;
Assign isHeld property to the buttons, and add different(light green) background color to held dice

/**
* Challenge 8: Create a function `hold` that takes
* `id` as a parameter. For now, just have the function
* console.log(id).
* 
* Then, figure out how to pass that function down to each
* instance of the Die component so when each one is clicked,
* it logs its own unique ID property. (Hint: there's more
* than one way to make that work, so just choose whichever
* you want)
*/
