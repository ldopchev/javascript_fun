var singlePlay = true;

//
$('#buttongroup input:radio').click(function() {
    if ($(this).val() === 'computer') {
     	resetBoard();
     	singlePlay = true;
     	turn = 'x';
     	otherTurn = 'o';
    } else if ($(this).val() === 'player') {
      resetBoard();
      singlePlay = false;
      turn = 'x';
      otherTurn='o';
    } 
  });



//otherTurn used to check in the strategy
var turn = 'x';
var otherTurn = 'o';

//human has 1st turn
var computer = false;

var Cell = function(){    
    token = ""; 
    
};

var cells = [];


//check if a party won
var checkWin = function(token){
    //check horizontal
    
        if((cells[0].token===token)&&(cells[1].token===token)&&(cells[2].token===token) 
           || (cells[3].token===token)&&(cells[4].token===token)&&(cells[5].token===token)
            || (cells[6].token===token)&&(cells[7].token===token)&&(cells[8].token===token)){
           return true;
           }
       
    
    //check vertical
    if((cells[0].token===token)&&(cells[3].token===token)&&(cells[6].token===token) 
           || (cells[1].token===token)&&(cells[4].token===token)&&(cells[7].token===token)
            || (cells[2].token===token)&&(cells[5].token===token)&&(cells[8].token===token)){
           return true;
           }
    
    //check diagonals
    if((cells[0].token===token)&&(cells[4].token===token)&&(cells[8].token===token)){
        return true;
    }
    if((cells[2].token===token)&&(cells[4].token===token)&&(cells[6].token===token)){
        return true;
    }
    
    return false;
}



//check if squares are filled 
for(var i=1; i<=9; i++)(function(i){   
//    
 var currCell = new Cell();
 currCell.token="";    
 cells.push(currCell);
    
  document.getElementById("img" + i).onclick=function(){
    var source = document.getElementById("img" + i).src;       
       
       if(source.indexOf("blank.png") != -1){
           //alert("yes, it's blank");
           document.getElementById("img" + i).src=turn+".png";

           //write the token in the cell position
           cells[i-1].token = turn; 
				
            if(checkWin(turn)){
               alert("Player " + turn + " wins");
                resetBoard();
           }

           if(isFull()){
               alert("Game is over!");
               resetBoard();
           }

           //switch turn
           switchTurn();  

           //check if computer's turn               
           	if(computer){
                computerPlay();
            }
       }      
  };

})(i);



//switch turn
function switchTurn(){
    
        if(turn==="o"){
        		turn = "x";
        		otherTurn = 'o';
        }
        else{
            turn="o"
            otherTurn='x';
        }
    //check if single play(against computer) or multiplay
    if(singlePlay){    
    	computer = !computer;
    }
}

function resetBoard(){   
    for(var i=1; i<=9; i++){ 
       cells[i-1].token = "";
       document.getElementById("img" + i).src="blank.png" ;
    }    
}

//check if board is filled
function isFull(){
    for(var i = 0; i<9 ;i ++){
        if(cells[i].token ===""){
            return false;
        }
    }
    return true;
}	

function computerPlay(){
    //check unoccupied cells
    var unoccupied = []; 
           
    for(var i=0; i<9; i++){ 
         if(cells[i].token ==="" ){
             unoccupied.push(i+1);
             
         }   
         
       }     
       for(var i=0; i<unoccupied.length; i++){ 
       console.log(unoccupied[i])
       }
       	
    
 var flag = false;
    
    while(!flag){
    	
    	  //only one strategy implemented, win or prevent player from winning by filling in the 
    	  var pick = strategy(turn);
    	  console.log("pick " + pick);
    	  if((typeof pick ==='undefined') || (cells[pick-1].token !== "")){
    	  		pick = strategy(otherTurn);
    	  		console.log("pick " + pick);
    	  	}
    	  	
    	  	if((typeof pick ==='undefined') || (cells[pick-1].token !== "")){
    	  		var pick = Math.floor((Math.random() * 9) + 1);  
    	  	}
               
        
        
        
        for(var i=0; i<unoccupied.length; i++){ 
            if(pick === unoccupied[i]){
                
           document.getElementById("img" + unoccupied[i]).src=turn+".png";

           //write the token in the cell position
           cells[unoccupied[i]-1].token = turn; 
				
            if(checkWin(turn)){
               alert("Player " + turn + " wins");
                resetBoard();
           		}

           if(isFull()){
               alert("Game is over!");
               resetBoard();
           }

           //switch turn
           switchTurn();                 
                
                flag=true;
                return;
            }
        }
    }
    
}

var strategy = function(token){    
    
		if((cells[1].token===token)&&(cells[2].token===token) || 
			(cells[3].token===token)&&(cells[6].token===token)||
			(cells[4].token===token)&&(cells[8].token===token)) {
			return 1;
			}
			
		if((cells[0].token===token)&&(cells[2].token===token) ||
			(cells[4].token===token)&&(cells[7].token===token)) {
			return 2;
			}
			
		if((cells[0].token===token)&&(cells[1].token===token) ||
			(cells[5].token===token)&&(cells[8].token===token)||
			(cells[6].token===token)&&(cells[4].token===token)) {
			return 3;
			}
			
		if((cells[4].token===token)&&(cells[5].token===token) || 
			(cells[0].token===token)&&(cells[6].token===token)) {
			return 4;
			}
			   
		if((cells[3].token===token)&&(cells[5].token===token) ||
			(cells[1].token===token)&&(cells[7].token===token)||
			(cells[0].token===token)&&(cells[8].token===token)||
			(cells[6].token===token)&&(cells[2].token===token))
			 {
			return 5;
			}
			
		if((cells[4].token===token)&&(cells[3].token===token) || 
			(cells[2].token===token)&&(cells[8].token===token)) {
			return 6;
			}
			
		if((cells[0].token===token)&&(cells[3].token===token) ||
			(cells[2].token===token)&&(cells[4].token===token)||
			(cells[7].token===token)&&(cells[8].token===token)) {
			return 7;
			}
    
    if((cells[1].token===token)&&(cells[4].token===token) || 
			(cells[6].token===token)&&(cells[8].token===token)) {
			return 8;
			}
			
	if((cells[0].token===token)&&(cells[4].token===token) ||
			(cells[2].token===token)&&(cells[5].token===token)||
			(cells[7].token===token)&&(cells[6].token===token)) {
			return 9;
			}
	  
}



