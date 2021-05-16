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
