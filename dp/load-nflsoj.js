function displayData(data) {
  var table = document.getElementById('dp');
  table.innerHTML = data;
  table.style.fontSize = '11px';
};
$.ajax({
  url: '/dp/contests.txt',
  type: 'GET',
  success: function(data) {
    displayData(data)
  }
});