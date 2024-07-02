


const Gameboard=(()=>{

    let gameboard=["","","","","","","","",""];
    
    const renderGame=()=>{
        let boardHTML="";

        gameboard.forEach((square,index)=>{
            boardHTML+=`<div class="square" id="square-${index}">${square}</div>`

        });
        document.querySelector("#gameboard").innerHTML=boardHTML;
        let squares=document.querySelectorAll(".square");
        squares.forEach((square)=>{
            square.addEventListener("click",Game.handleclick);
        })

    };
    const updateGame=(index,value)=>{
        gameboard[index]=value;
        renderGame();
    };
    
    const getGameboard = ()=> gameboard;
    



return{renderGame,updateGame,getGameboard}

})();

const createPlayer=(name,mark)=>{
    return{name,mark}
}

const Game=(()=>{
    let players=[];
    let currentPlayerIndex;
    let gameOver;

    const start=()=>{
        players=[
            createPlayer(document.querySelector("#player1").value,"O"),
            createPlayer(document.querySelector("#player2").value,"X")
        ]
        currentPlayerIndex=0;
        gameOver=false;
        Gameboard.renderGame();

    }
    const handleclick=(event)=>{
        if (gameOver){
            return;
        }
        let index=parseInt(event.target.id.split("-")[1]);

        if (Gameboard.getGameboard()[index]==""){
            Gameboard.updateGame(index,players[currentPlayerIndex].mark);
            currentPlayerIndex=currentPlayerIndex===0?1:0;
        }

        if(checkWinner(Gameboard.getGameboard(),players[currentPlayerIndex].mark)){
            gameOver=true;
            alert(`player ${players[currentPlayerIndex].name} won!`)
        }
        else if (checkfortie(Gameboard.getGameboard())){
            gameOver=true;
            alert("its a tie!");
        }

        


    }
    const checkWinner=(board)=>{
        let winningCombinations=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for(let x = 0; x < winningCombinations.length; x++){
            let [a,b,c]=winningCombinations[x];
            if(board[a]&&board[a]===board[b]&&board[a]===board[c]){
               return true 
            }
        }
        return false
    }
    const checkfortie=(board)=>{
        return board.every(cell=>cell!=="");
    }

    const restart=()=>{
        for(let i = 0;i < 9;i++){
        Gameboard.updateGame(i,"");
        }
    }

    return{start,handleclick,restart}
    
})();

const startbutton= document.querySelector("#start-button");
const restartbutton= document.querySelector("#restart-button");

startbutton.addEventListener("click",()=>{
    Game.start()
});

restartbutton.addEventListener("click",()=>{
    Game.restart();
})
