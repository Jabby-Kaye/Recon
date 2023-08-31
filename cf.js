// Asking for player names and assign thier color
// a function that can change the color of a button
// function to find what a color ;
// a function to let us know what is the button row
// checkbutton
// check for a for input to check for connect Four


  var p1 = prompt('Please enter your name, Player 1, color: blue');
  var p1color = 'rgb(86, 151, 255)';

  var p2 = prompt('Please enter your name, Player 2, color: red');
  var p2color = 'rgb(237, 45, 73)';


var game_on = true;
var table = $('table tr');

function reportWin(rowNum, colNum) {
  console.log('You won the game at this row,col');
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex, colIndex,color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returnColor(rowIndex, colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// the check button function
function checkBottom(colIndex) {
    var colorReport = returnColor(5,colIndex);
    for (var row = 5; row > -1; row--) {
      colorReport = returnColor(row, colIndex);
      if (colorReport === 'rgb(128, 128, 128)') {
        return row
      }
    }
}

function colorMatchCheack(one,two,three,four) {
  return(one===two && one===three && one ===four && one!=='rgb(128, 128, 128)' && one !== undefined);
}


// hortizontal wincheck
  function hwc() {
    for (var row = 0; row < 6; row++) {
      for (var col = 0; col < 4; col++) {
        if (colorMatchCheack(returnColor(row,col), returnColor(row,col+1),returnColor(row,col+2), returnColor(row,col+3), returnColor(row,col+4))) {
          console.log('Hortizotal win')
          reportWin(row,col)
          return true;
        }else {
          continue;
        }
      }
    }
  }

// veticall win check
function vwc(){
  for (var col = 0; col < 7 ; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheack(returnColor(row,col), returnColor(row+1,col),returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('Vertical');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// diagonal wincheck
function dwc() {
   for (var col = 0; col < 5; col++) {
     for (var row = 0; row < 7; row++) {
       if (colorMatchCheack(returnColor(row,col), returnColor(row+1,col+1),returnColor(row+2,col+2), returnColor(row+3,col+3))) {
         console.log('diagonal win');
         reportWin(row,col);
         return true;
       }else if (colorMatchCheack(returnColor(row,col), returnColor(row-1,col+1),returnColor(row-2,col+2), returnColor(row-3,col+3))) {
         console.log('diagonal win');
         reportWin(row,col);
         return true;
       }else {
         continue;
       }
     }
   }
}

function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $('.go').fadeOut('fast')
      $('heading').fadeOut('fast')
      $('.obj').text("Winner: " + winningPlayer).css("fontSize", "30px");
      $('.pop').text("Winner: "+winningPlayer +' Refresh page to play again').show('fast')


    }
  }
}


// creating the game logic in the assigning on a Click

var currentPlayer = 1;
var currentName = p1;
var currentcolor = p1color;

$('.go').text(p1+ " your turn to play, pick a column")

$('tr button').on('click',function(){
  var col = $(this).closest('td').index();
  var avail = checkBottom(col);

  changeColor(avail,col,currentcolor)

  if (hwc() || vwc() || dwc()) {
    gameEnd(currentName);

  }

  currentPlayer = currentPlayer*-1
  if (currentPlayer === 1) {
    currentName = p1;
    $('.go').text(currentName+ ' :your turn to play')
    currentcolor = p1color;
  }else{
    currentName = p2;
    $('.go').text(currentName+ ' :your turn to play')
    currentcolor = p2color;
  }

})
