/** Command-line tool to generate Markov text. */

const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');


// This method makes use of the MarkovMachine class to generate 
// text

function generateText(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

// This function reads a file and generates text from it
function generateTextFromFile(path){
    fs.readFile(path, 'UTF8', function (err, data){

        if(err){
            console.log(`Cannot read ${path}: ${err}`);
            process.exit();
        }
        else{
            generateText(data);
        }
    })
}

// This function reads the contents of a url and generates text from it 
async function generateTextFromUrl(url){
try{
    let response = await axios.get(url);
    generateText(response.data); 
}
catch(err){
    console.log(`Cannot read ${url}: ${err}`);
    process.exit(1);
}
}

// Using arguments given in the cmnd line, we'll decide which function
// to use

let method = process.argv[2];
let path = process.argv[3];

if (method === 'file'){
    generateTextFromFile(path);
}
else if(method === 'url'){
    generateTextFromUrl(path);
}
else{
    console.log(`Error unknown method: ${method}`);
    process.exit(1);
}


