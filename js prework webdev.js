/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
            for(const game of games) {

        // create a new div element, which will become the game card
                 const gameElement = document.createElement('div');
                    
        // add the class game-card to the list
                gameElement.classList.add('game-card');
 

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        //  <p>Pledged: $${game.pledged}</p>
       // <p>Goal: $${game.goal}</p>
       //     <p>Platform: ${game.platform}</p> 
      //  <p>Genre: ${game.genre}</p>
        gameElement.innerHTML = `
        <h2>${game.name}</h2>
        <p> ${game.description}</p>
     


        <p>Backers: ${game.backers}</p>
        <img src="${game.img}" alt="${game.name} Image" class="game-image" />
       

   
   
    `;


        // append the game to the games-container
                gamesContainer.appendChild(gameElement);
        }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((accumulator, game) => accumulator + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<p>Total Contributions: ${totalContributions.toLocaleString()}</p>`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// Calculate the total amount pledged using reduce
const totalPledged = GAMES_JSON.reduce((accumulator, game) => accumulator + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `<p>Total Raised: $${totalPledged.toLocaleString()}</p>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// Set inner HTML using template literal
gamesCard.innerHTML = `<p>Total Games: ${GAMES_JSON.length}</p>`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// Modified function to return the array of unfunded games
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
    return unfundedGames;
}

// Call the function and log the length of the array
const unfundedGames = filterUnfundedOnly();
console.log("Number of unfunded games:", unfundedGames.length);

// Complete the filterFundedOnly function
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
    return fundedGames;
}

// Call the function and log the length of the array
const fundedGames = filterFundedOnly();
console.log("Number of funded games:", fundedGames.length);

// Complete the showAllGames function
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// Call the function to show all games
showAllGames();

// Step 4: Event listeners for buttons
document.getElementById('unfundedBtn').addEventListener('click', filterUnfundedOnly);
document.getElementById('fundedBtn').addEventListener('click', filterFundedOnly);
document.getElementById('allGamesBtn').addEventListener('click', showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const unfundedGamesCount = GAMES_JSON
  .filter(game => game.pledged < game.goal)
  .reduce((sum, game) => sum + 1, 0);


// create a string that explains the number of unfunded games using the ternary operator
const message = `We have raised $${totalRaised} for ${GAMES_JSON.length} games. ${
    unfundedGamesCount > 0
      ? `Unfortunately, ${unfundedGamesCount} game${unfundedGamesCount > 1 ? 's are' : ' is'} still unfunded.`
      : 'Great news! All games are funded!'
  }`;

  const paragraphElement = document.createElement('p');
  paragraphElement.textContent = message;
  
// create a new DOM element containing the template string and append it to the description container
descriptionContainer.appendChild(paragraphElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */


const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...others] = sortedGames

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement('p');
firstGameElement.textContent = `${firstGame.name}: $${firstGame.pledged.toLocaleString()}`;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner-up item
const secondGameElement = document.createElement('p');
secondGameElement.textContent = `${secondGame.name}: $${secondGame.pledged.toLocaleString()}`;
secondGameContainer.appendChild(secondGameElement);

