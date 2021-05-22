/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

// let previousData = localStorage.getItem('data');
// previousData = JSON.parse(previousData);

window.addEventListener('beforeunload', function (event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});
