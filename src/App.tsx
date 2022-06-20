import React, { useState, useEffect } from "react";
import "./App.css";
import MemoryCard from "./components/MemoryCard";

type Color = {
  _id: number;
  color: string;
  isClicked: boolean;
};

const App = () => {
  const [colors, setColors] = useState<string[]>(randomizeColors());
  const [gameboard, setGameboard] = useState<Color[]>([]);
  const [clickedColors, setClickedColors] = useState<Color[]>([]);
  const [pairs, setPairs] = useState<number>(colors.length);

  useEffect(() => {
    shuffleColors([...colors, ...colors]);
  }, []);

  useEffect(() => {
    if (clickedColors.length >= 2) {
      if (clickedColors[0].color == clickedColors[1].color) {
        setPairs(pairs - 1);
        setClickedColors([]);
      } else {
        setTimeout(() => {
          gameboard.map((color: Color) => {
            if (color.isClicked) {
              color.isClicked = !color.isClicked;
            }
          });
          setPairs(colors.length);
          setClickedColors([]);
        }, 1000);
      }
    }
  }, [clickedColors]);

  function randomizeColors() {
    const array = [];
    let color = "#";

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        color += Math.floor(Math.random() * 10);
      }
      array.push(color);
      color = "#";
    }

    return array;
  }

  const shuffleColors = (array: string[]) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    array.map((item: string, index) => {
      setGameboard((prev) => [
        ...prev,
        { _id: index, color: item, isClicked: false },
      ]);
    });
  };

  const addColor = (colorIndex: number) => {
    if (!gameboard[colorIndex].isClicked) {
      gameboard[colorIndex].isClicked = !gameboard[colorIndex].isClicked;
      setClickedColors((prev) => [...prev, gameboard[colorIndex]]);
    }
  };

  const gameReset = () => {
    setGameboard([]);
    setColors(randomizeColors());
    setClickedColors([]);
    setPairs(colors.length);
    shuffleColors([...colors, ...colors]);
  };

  return (
    <div className="App">
      <header className="GameHeader">
        <h1>{pairs ? `Pairs: ${pairs}` : "You won!"}</h1>
        <button className="GameResetButton" onClick={gameReset}>
          + New colors
        </button>
      </header>
      <div className="Gameboard">
        {gameboard.map((colorItem: Color) => {
          return (
            <MemoryCard
              key={colorItem._id}
              colorItem={colorItem}
              onClick={addColor}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
