const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 5, 6],
];
const checkForWinner = (gameState) => {
  if (gameState.length < 5) return `No winner yet`;
  let pO = gameState.filter((item) => {
    if (item.player == 0) return item;
  });
  pO = pO.map((item) => item.id);

  let pX = gameState.filter((item) => {
    if (item.player == 1) return item;
  });
  pX = pX.map((item) => item.id);

  if (pO != null && pX != null) {
    var winO = win.filter((item) => {
      return isSuperSet(new Set(pO), new Set(item));
    });
    var winX = win.filter((item) => {
      return isSuperSet(new Set(pX), new Set(item));
    });
  }

  if (winO.length > 0) return `Player O`;
  else if (winX.length > 0) return `Player X`;
  return "No winner yet";
};
const isSuperSet = (set, subset) => {
  for (let elem of subset) {
    if (!set.has(elem)) return false;
  }
  return true;
};

const Square = ({ takeTurn, id }) => {
  const [filled, setFilled] = React.useState(false);
  const [tik, setTik] = React.useState(2);
  const mark = ["O", "X", "+"];

  return (
    <button
      onClick={(e) => {
        setTik(takeTurn(id));
        setFilled(true);
        console.log(`Square: ${id} filled by player ${tik}`);
      }}
    >
      <h1>{mark[tik]}</h1>
    </button>
  );
};

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [gameState, setGameState] = React.useState([]);

  let status = `${checkForWinner(gameState)}`;
  console.log(`${status}`);

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2);
    return player;
  };

  const renderSquare = (i) => {
    return <Square takeTurn={takeTurn} id={i}></Square>;
  };

  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h1>{status}</h1>
      </div>
    </div>
  );
};
const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
};
ReactDOM.render(<Board />, document.querySelector("#root"));
