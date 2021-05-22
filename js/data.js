/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var entryArray = [];
var entrynum = 0;

const $ul = document.querySelector('ul');
const $form = document.querySelector('#form');
const $img = document.querySelector('img');

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
  let LSEntryArray = localStorage.getItem('entryArray');
  if (LSEntryArray) {
    LSEntryArray = JSON.parse(LSEntryArray);
    var item;
    for (item of LSEntryArray) {
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

  var entry = {
    entryID: entrynum,
    title: $title,
    imgURL: $imgUrl,
    notes: $text,
    date: $date
  };
  entryArray.unshift(entry);
  // make DOM object for new entry and prepend to $ul
  const $li = entrySetup(entry);
  $ul.prepend($li);
  // incriment nextEntryId
  entrynum++;
  // save entryArray to localStorage
  var entryArrayStr = JSON.stringify(entryArray);
  localStorage.setItem('entryArray', entryArrayStr);
  // reset img src att & form input
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
