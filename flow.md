# Project: Battleship

## Course Objective:

Introduce Test-driven Development and incorporate it into workflow

## Requirements:

1. Create `Ship` factory
1. Create `Gameboard` factory
1. Create `Player` factory

## Flow

### model

- Create ship factory function

  - Props: name, length, hitNumber, coordinates, orientation, and isShipSunk

  - Methods:

    - hit = increases the number of hits to ship
    - sinkShip = if hitNumber is equal to length, make isShipSunk true

- Create Gameboard factory

  - Props: gridSize(default 10), boardState, owner

  - Methods:

    - `placeShip` places ships at specific coordinates

      - check if entire ship can fit in that space

    - `createBoard` creates grid of squares with each square containing coordinates

      - `boardState` is an array which contains objects / nodes for each square

      ```
      let j = 1

      for (i < gridSize ; i++)

          let square = createSquare(column = i; row = j)

          j <= gridSize ?
      ```

    - `receiveAttack (row, col)`

      - if square contains a ship, hit() ship
      - fill() square

    - `fill (row, col)` makes square.filled = true

- Create Player factory

  - Props: name, isPlaying(Boolean), ownBoardState, ships, isWinner

  - Methods:
    - `makeMove (row, col)` places a mark on a set of coordinates
    - `generateMove` for computer
      - if Player === computer then generateMove()

- Create Square factory

  - Props: row, col, coordinates, isFilled, hasShip, ship

### controller

- Main game loop

game init - new Player() with empty board state -

### view
