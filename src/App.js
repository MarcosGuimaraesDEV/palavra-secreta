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
  const [words] = useState(wordsList);

  const [pickedWord,setPickedWord] = useState("");
  const [pickedCategory,setPickedCategory] = useState("");
  const [letters,setLetters] = useState([]);

  const pickWordAndCategory = ()=>{
    //Pegar categoria aleatória
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random()*Object.keys(categories).length)];
    //Pegar palavra aleatória da categoria
    const word = words[category][Math.floor(Math.random()*words[category].length)];
    return {word,category};
  }

  //Inicia o jogo
  const startGame = () =>{
    const {word,category}= pickWordAndCategory();

    //cria o array de letras
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l)=>(l.toLowerCase()));

    //Setar os estados (states)

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }

  //verificar as letras digitadas
  const verifyLetter = () =>{
    setGameStage(stages[2].name);
  }

  return (
    <div className="App">
      {gameStage ==="start" && <StartScreen startGame={startGame}/>  }
      {gameStage ==="game" && <Game verifyLetter={verifyLetter}/>}
      {gameStage ==="end" && <GameOver/>}
    </div>
  );
}

export default App;
