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
const $ul = document.querySelector('ul');
function entrySetup(entry) {
  // get ul; data-entry="ul"

  // make parent div w/ class="heebo"
  const $parentDiv = document.createElement('div');
  $parentDiv.setAttribute('class', 'heebo');

  // make div w/ class="row padding form-header sp-bw": span = textContent "code journal", span w/ class="thin-text" & texContent = entries
  const $divHeader = document.createElement('div');
  $divHeader.setAttribute('class', 'row padding form-header sp-bw');
  // create spans: span = textContent "code journal", span w/ class="thin-text" & texContent = entries
  const $spanCJ = document.createElement('span');
  const textSpanCJ = document.createTextNode('Code Journal');
  $spanCJ.appendChild(textSpanCJ);

  const $spanEntries = document.createElement('span');
  $spanEntries.setAttribute('class', 'thin-text');
  const textSpanEntries = document.createTextNode('Entries');
  $spanEntries.appendChild(textSpanEntries);
  // add spans to $divHeader
  $divHeader.appendChild($spanCJ);
  $divHeader.appendChild($spanEntries);

  // make div w/ class="row form center sp-bw": h1 w/ class="padding", textContent=Entries; button w/ class="input new-button button", textContent=NEW
  const $divEntries = document.createElement('div');
  $divEntries.setAttribute('class', 'row form center sp-bw');
  // make h1 w/ class="padding", textContent=Entries; button w/ class="input new-button button", textContent=NEW
  const $h1Entries = document.createElement('h1');
  $h1Entries.setAttribute('class', 'padding');
  const texth1Entries = document.createTextNode('Entries');
  $h1Entries.appendChild(texth1Entries);

  const $newButton = document.createElement('button');
  $newButton.setAttribute('class', 'input new-button button');
  const textNewButton = document.createTextNode('NEW');
  $newButton.appendChild(textNewButton);
  // add h1 and button to $divEntries
  $divEntries.appendChild($h1Entries);
  $divEntries.appendChild($newButton);

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
  $parentDiv.appendChild($divHeader);
  $parentDiv.appendChild($divEntries);
  $parentDiv.appendChild($divContent);

  // add all elements to li w/ class="center"
  const $newLi = document.createElement('li');

  $newLi.setAttribute('class', 'center');
  $newLi.appendChild($parentDiv);

  // add li to ul
  $ul.appendChild($newLi);

}
var entry = {
  entryID: 0,
  title: 'Test',
  imgURL: 'https://mindyourmind.ca/sites/default/files/images/blog/CrazyAlternatives.jpg',
  notes: 'Test Test',
  date: 4455668
};
entrySetup(entry);
