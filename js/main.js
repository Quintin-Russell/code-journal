/* global data */
/* exported data */

const $ul = document.querySelector('ul');
const $form = document.querySelector('#form');
const $img = document.querySelector('img');
// eslint-disable-next-line no-undef
const entryArray = previousData.entries;

// function creating DOM objs from journal entries
function entrySetup(entry) {
  // get ul; data-entry="ul"

  // make parent div w/ class="heebo"
  const $parentDiv = document.createElement('div');
  $parentDiv.setAttribute('class', 'heebo');

  // make div w/ class="center form row"
  const $divContent = document.createElement('div');
  $divContent.setAttribute('class', 'center form row');

  // make div w/ class="center column-half": img w/ class="img" + src=entry.imgURL
  const $imgContainer = document.createElement('div');
  $imgContainer.setAttribute('class', 'center column-half');

  // add img w/ class="img" + src=entry.imgURL to $imgContainer
  const $entryImg = document.createElement('img');
  $entryImg.setAttribute('src', entry.imgURL);
  $entryImg.setAttribute('alt', 'user-img');
  $entryImg.setAttribute('class', 'img');
  $imgContainer.appendChild($entryImg);
  // add div to $divCOntent
  $divContent.appendChild($imgContainer);

  // add section w/ class="column-half heebo": h2 textContent = entry.title & div w/ textContent= entry.notes
  const $sectionContent = document.createElement('section');
  $sectionContent.setAttribute('class', 'column-half heebo');
  // create and add h2 textContent = entry.title & div w/ textContent= entry.notes
  const $h2SectionContent = document.createElement('h2');
  const texth2SC = document.createTextNode(entry.title);
  $h2SectionContent.appendChild(texth2SC);
  $sectionContent.appendChild($h2SectionContent);

  const $pNotes = document.createElement('p');
  const textPNotes = document.createTextNode(entry.notes);
  $pNotes.appendChild(textPNotes);
  $sectionContent.appendChild($pNotes);

  // add $sectionCOntent to $divCOntent
  $divContent.appendChild($sectionContent);

  // add elements ($divHeader,$divEntries,$divContent) to parent div

  $parentDiv.appendChild($divContent);

  // add all elements to li w/ class="center"
  const $newLi = document.createElement('li');

  $newLi.setAttribute('class', 'center');
  $newLi.appendChild($parentDiv);
  return $newLi;
}

// get entry array from local storage --> run thru entrySetup
document.addEventListener('DOMContentLoaded', function (event) {
  if (entryArray.length > 0) {
    var item;
    for (item of entryArray) {
      const $li = entrySetup(item);
      $ul.appendChild($li);
    }
  } else {
    const $liNoEntry = document.createElement('li');
    $liNoEntry.setAttribute('id', 'no-entry');
    // create div w/ id= no-entry class= "heebo row center", p w/ text content = no entries have been recorded
    const $divNoEntry = document.createElement('div');
    $divNoEntry.setAttribute('class', 'row center heebo');

    const $pNoEntry = document.createElement('p');
    const textPNoEntry = document.createTextNode('No entries have been recorded');
    $pNoEntry.appendChild(textPNoEntry);

    $divNoEntry.appendChild($pNoEntry);
    $liNoEntry.appendChild($divNoEntry);
    // add to ul as li
    $ul.appendChild($liNoEntry);
  }
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  // delete no-entries li
  if (document.querySelector('#no-entry')) {
    const $liNoEntry = document.querySelector('#no-entry');
    $liNoEntry.remove();
  }

  // put forms entries into new obj
  const $title = $form.elements.title.value;
  const $imgUrl = $img.getAttribute('src');
  const $text = $form.elements.notes.value;
  const $date = Date.now();
  let entrynum = data.nextEntryId;

  var entry = {
    entryID: entrynum,
    title: $title,
    imgURL: $imgUrl,
    notes: $text,
    date: $date
  };
  const entryArray = data.entries;
  entryArray.unshift(entry);
  // make DOM object for new entry and prepend to $ul
  const $li = entrySetup(entry);
  $ul.prepend($li);
  // incriment nextEntryId
  entrynum++;
  data.nextEntryId = entrynum;
  // reset img src att & form input
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

const $photoUrlDiv = document.querySelector('#photourl').parentElement;
// const $form = document.querySelector('#form');

// 1: event listener to update photo url; target: photo url input event: inpu
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
