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
const $submit = document.querySelector('.button');
const $form = document.querySelector('#form');

$submit.addEventListener('click', function (e) {
  e.preventDefault();
  // put forms entries into new obj
  const $title = $form.elements.title.value;
  const $imgUrl = $img.getAttribute('src');
  const $text = $form.elements.notes.value;
  // console.log("imgUrl", $imgUrl)
  // console.log("title", $title)
  var entry = {
    entryID: entrynum,
    title: $title,
    imgURL: $imgUrl,
    notes: $text
  };
  entryArray.push(entry);
  // incriment nextEntryId
  entrynum++;
  // form submits
  $form.submit();
  // reset img src att & form inputs
});
// console.log(entryArray)
