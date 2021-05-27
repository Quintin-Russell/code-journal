/* global data */
/* exported data */

const $ul = document.querySelector('ul');
const $form = document.querySelector('#form');
const $img = document.querySelector('img');
const $wholePageContainer = document.querySelector('#page-container');
const $aTags = document.querySelectorAll("a[data-view='nav-entries']");
const $newButtons = document.querySelectorAll('.new-button');
const $entryForm = document.querySelector("div[data-view='entry-form']");
const $entries = document.querySelector("div[data-view='entries']");
const $photoUrlDiv = document.querySelector('#photourl').parentElement;

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
  // create and add (div w/ h2 textContent = entry.title & <i class= "pen">) & div w/ textContent= entry.notes
  const $divJournalEdit = document.createElement('div');
  $divJournalEdit.setAttribute('class', 'row center sp-bw no-wrap');

  const $h2SectionContent = document.createElement('h2');
  $h2SectionContent.setAttribute('class', 'column-half');
  const texth2SC = document.createTextNode(entry.title);
  $h2SectionContent.appendChild(texth2SC);
  $divJournalEdit.appendChild($h2SectionContent);

  const Aedit = document.createElement('a');
  Aedit.setAttribute('class', 'edit-a');
  const iEdit = document.createElement('i');
  iEdit.setAttribute('class', 'fa fa-pen fa-2x edit-icon');
  Aedit.appendChild(iEdit);
  $divJournalEdit.appendChild(Aedit);

  $sectionContent.appendChild($divJournalEdit);

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
  $newLi.setAttribute('data-entry-id', entry.entryID);
  $newLi.setAttribute('class', 'center');
  $newLi.appendChild($parentDiv);
  return $newLi;
}

function showNewForm() {
  $entryForm.setAttribute('class', 'container center row');
  $entries.setAttribute('class', 'hidden container center row');
}

function showEntries() {
  $entryForm.setAttribute('class', 'hidden container center row');
  $entries.setAttribute('class', 'container center row');
}
// get entry array from local storage --> run thru entrySetup
document.addEventListener('DOMContentLoaded', function (event) {
  if (data.entries.length > 0) {
    var item;
    for (item of data.entries) {
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
  let entrynum = data.nextEntryId;
  // if data.editing != null --> access entryArray and data.entries entryID and update title, imgURL and notes
  // --> reset data.editing to null
  if (data.editing != null) {
    const editObj = data.editing;
    editObj.title = $form.elements.title.value;
    editObj.imgURL = $imgUrl;
    editObj.notes = $text;
    // eslint-disable-next-line prefer-const
    let entryNum = data.editing.entryID;
    let item;
    for (item of data.entries) {
      if (item.entryID === entryNum) {
        item = editObj;
        break;
      }
    }
    const $liList = document.querySelectorAll('li');
    for (item of $liList) {
      let liId = item.getAttribute('data-entry-id');
      liId = parseInt(liId);
      if (liId === editObj.entryID) {
        const $newLi = entrySetup(editObj);
        $ul.insertBefore($newLi, item);
        $ul.removeChild(item);
        break;
      }
    }
    data.editing = null;
  } else {
    const entry = {
      entryID: entrynum,
      title: $title,
      imgURL: $imgUrl,
      notes: $text
    };
    data.entries.unshift(entry);
    const $newLi = entrySetup(entry);
    $ul.prepend($newLi);
    // incriment nextEntryId
    entrynum++;
    data.nextEntryId = entrynum;
  }
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

// 1: event listener to update photo url; target: photo url input event: inpu
$photoUrlDiv.addEventListener('input', function (e) {
  const $img = document.querySelector('img');
  e.preventDefault();
  const $newURL = event.target.value;
  $img.setAttribute('src', $newURL);
});

// add event listener to any <a> that turns entry-form to hidden
$wholePageContainer.addEventListener('click', function (event) {
  var $a;
  for ($a of $aTags) {
    if (event.target === $a) {
      showEntries();
    }
  }
});
// add event listener on any .new-button that turns entries to hidden
$wholePageContainer.addEventListener('click', function (event) {
  var $newBut;
  for ($newBut of $newButtons) {
    if (event.target === $newBut) {
      showNewForm();
    }
  }
});

// event listener that view swithches when save button is clicked
// target: button[type='submit']

$form.addEventListener('submit', function (event) {
  showEntries();
});

// event listener on $ul: event= click, function: shows id of entry if edit <a> clicked
$ul.addEventListener('click', function (event) {
  // select for all <i> icons
  const $iList = document.querySelectorAll('i');
  let i;
  for (i of $iList) {
    if (i === event.target) {
      showNewForm();
      const $targetLi = event.target.closest('li');
      let entryNum = $targetLi.getAttribute('data-entry-id');
      entryNum = parseInt(entryNum);
      // search thru entriesArray for obj w/ entryID=entryNum and set = to data.editing
      for (let i = 0; i < data.entries.length; i++) {
        if (data.entries[i].entryID === entryNum) {
          const editObj = data.entries[i];
          data.editing = editObj;
          break;
        }
      }
      // add the ___.value to the entry form
      const editObj = data.editing;
      // select form objs
      const $imgUrl = document.querySelector('#photourl');
      const $title = $form.elements.title;
      const $text = $form.elements.notes;
      // select values from editObj
      const objtitle = editObj.title;
      const objimgUrl = editObj.imgURL;
      const objtext = editObj.notes;
      // set form ctrls to obj values
      $title.value = objtitle;
      $imgUrl.value = objimgUrl;
      $img.setAttribute('src', objimgUrl);
      $text.value = objtext;
    }
  }
});
