import { useCallback, useEffect, useState } from "react";
import words from "../wordList.json";

function Home() {
  //? STATE-------------------------------------------------------------------------------
  const [wordToGuess, setWordToGuess] = useState<string[]>(() => {
    return words[Math.floor(Math.random() * words.length)].split("");
  });
  const [guessedLetter, setGuessedLetter] = useState<string[]>([]);
  const [winOrLose, setWinOrLose] = useState<"YOU LOSE" | "YOU WIN" | "">("");

  //? VARIABLE----------------------------------------------------------------------------
  const head = (
    <div
      key={1}
      className="absolute right-[-28px] md:right-[-32px] top-[21px] md:top-[3rem] w-[65px] md:w-[75px] h-[65px] md:h-[75px] rounded-full border-black border-[10px]"
    />
  );
  const body = (
    <div
      key={2}
      className="absolute right-[0px] top-[80px] md:top-[120px] w-[10px] h-[80px] md:h-[100px] bg-black "
    />
  );
  const leftArm = (
    <div
      key={3}
      className="absolute origin-bottom-left right-0 top-[45px] md:top-[70px] w-[10px] h-[75px] md:h-[100px] bg-black rotate-[315deg]"
    />
  );
  const rightArm = (
    <div
      key={4}
      className="absolute origin-bottom-right right-0 top-[45px] md:top-[70px] w-[10px] h-[75px] md:h-[100px] bg-black rotate-[45deg]"
    />
  );
  const leftLeg = (
    <div
      key={5}
      className="absolute right-[28px] md:right-[34px] top-[145px] md:top-[200px] w-[10px] h-[75px] md:h-[100px] bg-black rotate-[45deg] "
    />
  );
  const rightLeg = (
    <div
      key={6}
      className="absolute right-[-28px] md:right-[-34px] top-[145px] md:top-[200px] w-[10px] h-[75px] md:h-[100px] bg-black rotate-[135deg] "
    />
  );
  const bodyParts = [head, body, leftArm, rightArm, leftLeg, rightLeg];
  const incorrectLetters = guessedLetter.filter(
    (letter) => !wordToGuess.includes(letter)
  );
  const correctLetters = guessedLetter.filter((letter) =>
    wordToGuess.includes(letter)
  );

  //? FUNCTION----------------------------------------------------------------------------

  //? EVENT HANDLER-----------------------------------------------------------------------
  const keyboardClick = useCallback(
    (letter: string) => {
      if (winOrLose !== "") return;
      if (guessedLetter.includes(letter)) return;
      setGuessedLetter([...guessedLetter, letter]);
    },
    [guessedLetter, winOrLose]
  );
  const againBtnClick = () => {
    setWinOrLose("");
    setGuessedLetter([]);
    setWordToGuess(() => {
      return words[Math.floor(Math.random() * words.length)].split("");
    });
  };

  //? USE EFFECT--------------------------------------------------------------------------
  //* ADD HINT EVERYTIME WORDTOGUESS CHANGES
  useEffect(() => {
    const randomizeLetter =
      wordToGuess[Math.floor(Math.random() * wordToGuess.length)];
    const hintLetter = () => {
      if (wordToGuess.length <= 4) {
        return [wordToGuess[0]];
      } else if (wordToGuess.length <= 6) {
        return [wordToGuess[0], wordToGuess[wordToGuess.length - 1]];
      } else {
        return [
          wordToGuess[0],
          randomizeLetter,
          wordToGuess[wordToGuess.length - 1],
        ];
      }
    };
    setGuessedLetter(hintLetter());
    console.log(wordToGuess.join(""));
  }, [wordToGuess]);
  //* CHECK IF PLAYER WIN OR LOSE WHENEVER KEYBOARD CLICK
  useEffect(() => {
    if (wordToGuess.every((letter) => correctLetters.includes(letter))) {
      setWinOrLose("YOU WIN");
    } else if (incorrectLetters.length === 6) {
      setWinOrLose("YOU LOSE");
    }
  }, [correctLetters, incorrectLetters, wordToGuess]);
  //* KEYBOARD KEYPRESS AND CHECK WHETHER IT'S ALPHABET OR NOT
  useEffect(() => {
    const keyPress = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      keyboardClick(key);
    };
    document.addEventListener("keypress", keyPress);
    return () => {
      document.removeEventListener("keypress", keyPress);
    };
  }, [keyboardClick]);

  return (
    <>
      <main className="flex py-4 gap-2 min-h-screen flex-col justify-center items-center">
        <div className={` ${winOrLose === "" ? "hidden" : "grid"} mb-8 gap-2`}>
          <h1 className="text-5xl font-bold">{winOrLose}</h1>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={againBtnClick}
          >
            Again
          </button>
        </div>
        <article className="flex xl:px-8 xl:gap-16 w-full flex-col xl:flex-row xl:items-center xl:justify-between ">
          {/* HANGMAN DRAWING */}
          <section className="w-full xl:w-fit maxlg:mb-8">
            <div className="mx-auto w-fit relative">
              {bodyParts.slice(0, incorrectLetters.length)}
              <div className="absolute right-0 h-[30px] md:h-[50px] w-[10px] bg-black" />
              <div className="ms-[70px] md:ms-[120px] h-[10px] w-[110px] md:w-[200px] bg-black" />
              <div className="ms-[70px] md:ms-[120px] h-[300px] md:h-[400px] w-[10px] bg-black" />
              <div className="h-[10px] w-[150px] md:w-[250px] bg-black" />
            </div>
          </section>
          <section className=" ">
            {/* WORD TO GUESS */}
            <div className="flex px-4 md:px-12 xl:px-0 mb-8 gap-2 md:gap-10 w-full max-w-7xl justify-center uppercase font-bold">
              {wordToGuess.map((v, i) => {
                return (
                  <span
                    className={`flex-1 pb-2 w-6 text-center border-b-black border-b-8 ${
                      wordToGuess.length < 6
                        ? "text-6xl md:text-8xl"
                        : wordToGuess.length < 9
                        ? "text-4xl md:text-6xl"
                        : "text-3xl md:text-4xl"
                    }`}
                    key={i}
                  >
                    <span
                      className={`  ${
                        guessedLetter.includes(v) || winOrLose === "YOU LOSE"
                          ? "visible"
                          : "invisible"
                      }
                    ${
                      winOrLose === "YOU WIN"
                        ? "text-green-500"
                        : winOrLose === "YOU LOSE" && !guessedLetter.includes(v)
                        ? "text-red-500"
                        : ""
                    }
                    `}
                    >
                      {v}
                    </span>
                  </span>
                );
              })}
            </div>
            {/* KEYBOARD */}
            <div className="flex gap-1 w-full flex-col items-center ">
              {["qwertyuiop", "asdfghjkl", "zxcvbnm"].map((word) => {
                return (
                  <div key={word} className="flex gap-1  ">
                    {word.split("").map((letter) => {
                      return (
                        <button
                          className={`w-7 sm:w-9 md:w-16 lg:w-24 md:h-16 lg:h-24 p-2 md:text-lg lg:text-2xl font-semibold uppercase text-gray-800 rounded-lg border border-gray-500 
                          ${
                            incorrectLetters.includes(letter) &&
                            "bg-red-500 active:bg-red-500"
                          }
                          ${
                            correctLetters.includes(letter) &&
                            "bg-green-500 active:bg-green-500"
                          }`}
                          key={letter}
                          disabled={guessedLetter.includes(letter)}
                          onClick={() => keyboardClick(letter)}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

export default Home;
