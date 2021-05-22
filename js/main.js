/* global data */
/* exported data */

// 1: event listener to update photo url; target: photo url input event: input
const $photoUrlDiv = document.querySelector('#photourl').parentElement;
var $form = document.querySelector('#form');

$photoUrlDiv.addEventListener('input', function (e) {
  const $img = document.querySelector('img');
  e.preventDefault();
  const $newURL = event.target.value;
  $img.setAttribute('src', $newURL);
});

// add event listener to any <a> that turns entry-form to hidden
const $wholePageContainer = document.querySelector('#page-container');
const $aTags = document.querySelectorAll("a[data-view='nav-entries']");
const $newButtons = document.querySelectorAll('.new-button');
const $entryForm = document.querySelector("div[data-view='entry-form']");
const $entries = document.querySelector("div[data-view='entries']");
$wholePageContainer.addEventListener('click', function (event) {
  var $a;
  for ($a of $aTags) {
    if (event.target === $a) {
      $entryForm.setAttribute('class', 'hidden container center row');
      $entries.setAttribute('class', 'container center row');
    }
  }
});
// add event listener on any .new-button that turns entries to hidden
$wholePageContainer.addEventListener('click', function (event) {
  var $newBut;
  for ($newBut of $newButtons) {
    if (event.target === $newBut) {
      $entryForm.setAttribute('class', 'container center row');
      $entries.setAttribute('class', 'hidden container center row');
    }
  }
});

// event listener that view swithches when save button is clicked
// target: button[type='submit']

$form.addEventListener('submit', function (event) {
  $entryForm.setAttribute('class', 'hidden container center row');
  $entries.setAttribute('class', 'container center row');
});
