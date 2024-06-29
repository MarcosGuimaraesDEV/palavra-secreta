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

//Quantidade de tentativas
const guessedNumber = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord,setPickedWord] = useState("");
  const [pickedCategory,setPickedCategory] = useState("");
  const [letters,setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses,setGuesses] = useState(guessedNumber);
  const [score,setScore] = useState(0);

  const pickWordAndCategory = ()=>{
    //Pegar categoria aleatória
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random()*Object.keys(categories).length)];
    //Pegar palavra aleatória da categoria
    const word = words[category][Math.floor(Math.random()*words[category].length)];
    return {word,category};
  };

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
  };

  //verificar as letras digitadas
  const verifyLetter = (letter) =>{
    const lowerLetter = letter.toLowerCase();
    //Verificar se as letra já foi utilizada
    if(guessedLetters.includes(lowerLetter) || wrongLetters.includes(lowerLetter)){
      return;
    }
    //Colocar a letra certa ou diminui tentativa
    if(letters.includes(lowerLetter)){
      setGuessedLetters((actualGuessedLetters) =>[...actualGuessedLetters,lowerLetter]);
    }else{
      setWrongLetters((actualWrongLetters)=>[...actualWrongLetters,lowerLetter]);
      setGuesses((actualGuesses)=>actualGuesses -1);
    }
  };
  const clearLetterStates = ()=>{
    setGuessedLetters([]);
    setWrongLetters([])
  };

  // Monitorar as tentativas usando useEffect
  useEffect(()=>{
    if(guesses<=0){
      //resetar todos os estados das letras
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  },[guesses]);
  
  const retry = ()=>{
    setScore(0);
    setGuesses(guessedNumber);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage ==="start" && <StartScreen startGame={startGame}/>  }
      {gameStage ==="game" && <Game verifyLetter={verifyLetter}
       pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters}
       guessedLetters={guessedLetters} wrongLetters={wrongLetters}
       guesses={guesses} score={score}/>}
      {gameStage ==="end" && <GameOver retry={retry}/>}
    </div>
  );
};

export default App;
