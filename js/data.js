/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousData = localStorage.getItem('data');
// eslint-disable-next-line no-unused-vars
if (previousData != null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', function (event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});
