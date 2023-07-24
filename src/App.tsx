import { useState } from "react";
import words from "./wordList.json";
import HangmanWord from "./components/HangmanWord";
import HangmanDrawing from "./components/HangmanDrawing";
import Keyboard from "./components/Keyboard";

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });
  const [guessedLetter, setGuessedLetter] = useState<string[]>([]);

  console.log(wordToGuess);
  return (
    <>
      <div className="flex gap-2 items-center flex-col">
        <div className="bg-sky-500">
          <h1>Lose/Win</h1>
        </div>
        <HangmanDrawing></HangmanDrawing>
        <HangmanWord></HangmanWord>
        <Keyboard></Keyboard>
      </div>
    </>
  );
}

export default App;
