


// TEXT-TO-SPEECH
// automatically pick platform

const say = require('say');

var read_leftext = "Have you ever wanted to travel the world and meet new people, but felt like you couldn't because you're visually impaired?\
Then this is the perfect chance for you! We'll pair you up with a fully sighted person of a similar age, same travel destination\
and matching availability, and look up the cheapest flight for you! The person you're matched with will be a volunteer willing to\
describe the sights to you and support you if needed! So, think no more and sign up now!";

// var read_rightext = "Are you bored of travelling with your friends? Do you feel like giving back to the community? Join this program and volunteer\
// to help out the visually impaired people who don't get the chance to travel as much as you! You'll be paired to someone with the\
// same travel destination as you and a similar age so you can bond. We'll pick the cheapest flight according to your specifications.\
// Sign up and change someone's life for the better!";

// Fire a callback once the text has completed being spoken
say.speak(read_leftext, 'Alex', 1.0, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Text has been spoken.');
});



