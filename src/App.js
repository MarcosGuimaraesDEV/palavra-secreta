import './App.css';

//react
import { useCallback,useEffect,useState } from 'react';

//importação das palavras
import {wordsList} from './data/words'

//componentes
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

//estágios do jogo
const stages = [
  {id:1, name: "start"},
  {id:2, name: "game"},
  {id:3, name: "end"}
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const words = useState(wordsList);

  return (
    <div className="App">
      {gameStage ==="start" && <StartScreen/>}
      {gameStage ==="game" && <Game/>}
      {gameStage ==="end" && <GameOver/>}
    </div>
  );
}

export default App;
