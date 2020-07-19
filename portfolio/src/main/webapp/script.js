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

/**
 * fetch for comment section  
 */
function getMessageUsingArrowFunctions() {
  fetch('/data').then(response => response.json()).then((comment) => {
    const commentEntry = document.getElementById('comment-container');
    commentEntry.innerHTML = '';
    for (let i in comment){
      commentEntry.appendChild(createListElement(comment[i].name + " commented " + comment[i].message)); // name then message 
    }
  });
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}

/** Create a map */
function createMap() {
  // center at Taiwan presidential office building 
  const map = new google.maps.Map(
      document.getElementById('map'),
      {center: {lat: 25.040, lng: 121.512}, zoom: 12
      });
  
  // markers for my fav Taipei spots 
  // location#1 Elephant Mountain Hiking Trail
  const spotOne = new google.maps.Marker({
    position: {lat: 25.027, lng: 121.571},
    map: map,
    title: 'Elephant Mountain Hiking Trail'
  });
  // location#2 Ximen Station 
  const spotTwo = new google.maps.Marker({
    position: {lat: 25.042, lng: 121.508},
    map: map,
    title: 'Ximen Station'
  });
  // location#3 Gongguan Night Market
  const spotThree = new google.maps.Marker({
    position: {lat: 25.014, lng: 121.535},
    map: map,
    title: 'Gongguan Night Market'
  });

  // info windows for three locations 
  infoWindow('Elephant Mountain Hiking Trail', spotOne); 
  infoWindow('Ximen Station', spotTwo); 
  infoWindow('Gongguan Night Market', spotThree); 
}

/** Prints out locations' info window */
function infoWindow(contentInfo, location) {
  var spotInfo =
      new google.maps.InfoWindow({content: contentInfo});
  // set the text color to black
  // was originally light blue 
  document.getElementById("map").style.color = "black";
  spotInfo.open(map, location);
}





