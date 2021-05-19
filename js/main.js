/* global data */
/* exported data */

var entryArray = [];
var entrynum = 0;
// 1: event listener to update photo url; target: photo url input event: input
const $photoUrlDiv = document.querySelector('#photourl').parentElement;
const $img = document.querySelector('img');

$photoUrlDiv.addEventListener('input', function (e) {
  e.preventDefault();
  const $newURL = event.target.value;
  $img.setAttribute('src', $newURL);
});

// 2: event listener to 'submit' button; target: submit button, type: click
const $form = document.querySelector('#form');
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  // put forms entries into new obj
  const $title = $form.elements.title.value;
  const $imgUrl = $img.getAttribute('src');
  const $text = $form.elements.notes.value;
  const $date = Date.now();

  var entry = {
    entryID: entrynum,
    title: $title,
    imgURL: $imgUrl,
    notes: $text,
    date: $date
  };
  entryArray.unshift(entry);
  // incriment nextEntryId
  entrynum++;
  // save entryArray to localStorage
  var entryArrayStr = JSON.stringify(entryArray);
  localStorage.setItem('entryArray', entryArrayStr);
  // reset img src att & form input
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

// function creating DOM objs from journal entries
// const $ul = document.querySelector("ul")
// console.log($ul)
function entrySetup(entry) {
  // get ul; data-entry="ul"

  // make parent div w/ class="heebo"
  const $parentDiv = document.createElement('div');
  $parentDiv.setAttribute('class', 'heebo');
  // console.log("$parentDiv", $parentDiv)
  // make div w/ class="row padding form-header sp-bw": span = textContent "code journal", span w/ class="thin-text" & texContent = entries
  // let $divHeader
  // make div w/ class="row form center sp-bw": h1 w/ class="padding", textContent=Entries; button w/ class="input new-button button", textContent=NEW

  // make div w/ class="center form row"
  // add div w/ class="center column-half": img w/ class="img" + src=entry.imgURL
  // add section w/ class="column-half heebo": h2 textContent = entry.title & div w/ textContent= entry.notes

  // add elements to parent div

  // add all elements to li w/ class="center"

  // add li to ul
}

// test for entrySetup
const entry = {
  entryID: 0,
  title: 'My Ex-GF',
  imgURL: 'data:image/jpeg;base64,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',
  notes: 'she was crazy',
  date: 94389
};
entrySetup(entry);
