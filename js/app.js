//funkcja generowania szablonu
function generateTemplate(name, data, basicElement) {
    var template = document.getElementById(name).innerHTML;
    var element = document.createElement(basicElement || 'div');
  
    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);
  
    return element;
  }
 
//komunikacja z api
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '3773',
  'X-Auth-Token': 'f34b84cb3fb62dcfb4bb0bd5a30558cb'  
};

//funkcja odpytania serwera o zasób tablic
fetch(baseUrl + '/board', { headers: myHeaders })
  .then(function(resp) {
    return resp.json();
  })
  .then(function(resp) {
    setupColumns(resp.columns);
  });

//tworzenie kolumn oraz kart
  function setupColumns(columns) {
    columns.forEach(function (column) {
          var col = new Column(column.id, column.name);
      board.addColumn(col);
      setupCards(col, column.cards);
    });
  }

  function setupCards(col, cards) {
	cards.forEach(function (card) {
    var cardObj = new Card(card.id, card.name);
  	col.addCard(cardObj);
	});
}