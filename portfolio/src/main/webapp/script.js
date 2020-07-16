// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random quote to the page.
 */
function addRandomQuote() {
  // const variable cannot be reassigned. 
  const quote1 = "An earnest failure has meaning.";
  const quote2 = "Do what you can until you learn what you need. "
      + "If you’re going to try something, you may as well" 
      + " aim for the top.";
  const quote3 = "A leader must do more than lead.";
  const quote4 = "When in doubt, don't worry about what's right. "
      + "Your heard knows what's right, Choose the answer "
      + "that will be fun.";
  const quotes = [quote1, quote2, quote3, quote4];

  // Pick a random quotes.
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  // Add it to the page.
  const quoteContainer = document.getElementById('quotes-container');
  quoteContainer.innerText = quote;
}

// fetech 
function getMessageUsingArrowFunctions() {
  /**console.log(comment[0]);
    console.log(comment[1]);
    console.log(comment[2]); 

    // Expect: Hello, Worlrd, Love 
    commentEntry.appendChild(createListElement(comment[0]));
    commentEntry.appendChild(createListElement(comment[1]));
    commentEntry.appendChild(createListElement(comment[2]));
    //document.getElementById('comment-container').innerText = comment;
    */ 
  
  
  fetch('/data').then(response => response.json()).then((comment) => {
    const commentEntry = document.getElementById('comment-container');
    commentEntry.innerHTML = '';
    for (let i in comment){
        commentEntry.appendChild(createListElement(comment[i])); 
    }
  });
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}


