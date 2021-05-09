/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // First we define a variable to hold new map of chains

    let chains = new Map();

    // Next we iterate through the words array 
    for(let i = 0; i < this.words.length; i++){
      // We look through each word, save it to a vraible and then save the 
      // word coming after it to a variable as well. If no words come after it
      // we set next word to null

      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      // Now we check to see if word is already in our map chains and handle it accordingly

      if(chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }
    // We then make chains a property of the current instance of the MarkovMachine class
    this.chains = chains;
  }

  // We then create a Class method which makes it possible to pick a random choice from an array
  // we do so by using the static keyword.

  static choice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // To begin we create a variable holding all keys in the this.chains map
    // then we select a key at random.

    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let output = [];

    // Now using the while loop, we create the markov chain until the number of words
    // specified is reached 

    while(output.length < numWords && key !== null){
      output.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return output.join(" ");

  }
}

module.exports ={
  MarkovMachine,
};
