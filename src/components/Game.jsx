import './Game.css'
const Game = ({verifyLetter})=>{
    return(
        <div>
            <h1>Iniciou</h1>
            <button onClick={verifyLetter}>fim de Jogo</button>

        </div>
    );
}

export default Game;