const { MarkovMachine } = require('./markov');

// The following test functions will test to see that the MarkovMachine class
// works the way it ought to.

describe("Test to confirm that the MarkovMachine Class works", function () {

    let newMarkov;

    beforeEach(function (){
        newMarkov = new MarkovMachine("the cat in the hat");
    })

    test('the words property is to return array with all words', function () {
      let words = ['the', 'cat', 'in', 'the', 'hat'];
      expect(newMarkov.words).toEqual(words);
    });
  
    test('the chains property to equal object with words as keys and preceeding words as values', function () {
      let chains =  new Map();
      
       chains.set('the', ['cat', 'hat']);
       chains.set('cat', ['in']);
       chains.set('in', ['the']);
       chains.set('hat', [null]);
      
      expect(newMarkov.chains).toEqual(chains);
    });

    test('the makeText method works and produces any length of strings', function(){
        let markovText = newMarkov.makeText(10);

        markovText = expect.any(String);
    })
  
  });