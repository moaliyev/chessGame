# import colorama
# from colorama import Fore
# print(Fore.WHITE + "White text")
# print(Fore.BLACK + "White text")

global board, pk, ROW, COL

ROW = 8
COL = 8


class Piece:
    """
    Initialize a Piece class for all chess pieces to inherit from
    """

    def __init__(self, color: str, symbol: str, *args, **kwargs):
        """Initialize the piece with its attributes

        Args:
            color (str): the color of the piece
            symbol (str): the symbol of it which appears in the screen
        """
        self.color = color
        self.symbol = symbol

    def __str__(self):
        # Return the symbol of it to print on the screen
        return self.symbol

    def get_possible_moves(self, row: int, col: int, *args, **kwargs) -> set:
        possible_moves = set()
        return possible_moves

    def check_move(self, row_dest: int, col_dest: int, row: int, col: int, *args, **kwargs) -> bool:
        if tuple((row_dest, col_dest)) in self.get_possible_moves(row, col):
            return True
        return False


class Pawn(Piece):
    def __init__(self, color: str, symbol: str, *args, **kwargs):
        """Initialize the pawn with its attributes

        Args:
            color (str): the color of the pawn
            symbol (str): the symbol of it which appears in the screen
        """

        # We need to know whether a pawn has already been moved or not. As it can move 2 pieces foward when it has not already been moved
        self.is_moved = False

        # As pawns can only go forward, we need to establish the direction regarding its color.
        self.direction = 1 if color == "black" else -1
        super().__init__(color, symbol)

    def get_possible_moves(self, row: int, col: int, *args, **kwargs) -> set:
        possible_moves = set()
        if board[row + self.direction][col] == " ":
            possible_moves.add(tuple((row + self.direction, col)))
            if not self.is_moved and board[row + 2 * self.direction][col] == " ":
                possible_moves.add(tuple((row + 2 * self.direction, col)))
        try:
            if board[row + self.direction][col + self.direction].color != self.color:
                possible_moves.add(
                    tuple((row + self.direction, col + self.direction)))
        except:
            pass
        try:
            if board[row + self.direction][col - self.direction].color != self.color:
                possible_moves.add(
                    tuple((row + self.direction, col - self.direction)))
        except:
            pass
        print(possible_moves)
        return possible_moves

    def check_move(self, row_dest: int, col_dest: int, row: int, col: int, *args, **kwargs) -> bool:
        """Check whether a move is possible or not

        Args:
            row_dest (int): row where the player wants to move this piece to
            col_dest (int): column where the player wants to move this piece to
            row (int): current row of the piece
            col (int): current column of the piece

        Returns:
            bool: return true if a move is possible, false if it's not
        """
        if tuple((row_dest, col_dest)) in self.get_possible_moves(row, col):
            self.is_moved = True
            return True
        return False


class Rock(Piece):
    def __init__(self, color, symbol, *args, **kwargs):
        self.is_moved = False
        super().__init__(color, symbol, *args, **kwargs)

    def get_possible_moves(self, row: int, col: int, *args, **kwargs) -> set:
        possible_moves = set()
        for i in range(row + 1, ROW):
            if board[i][col] == " ":
                possible_moves.add(tuple((i, col)))
            elif board[i][col].color != self.color:
                possible_moves.add(tuple((i, col)))
                break
            else:
                break
        for i in range(row - 1, 0, -1):
            if board[i][col] == " ":
                possible_moves.add(tuple((i, col)))
            elif board[i][col].color != self.color:
                possible_moves.add(tuple((i, col)))
                break
            else:
                break
        for i in range(col - 1, -1, -1):
            if board[row][i] == " ":
                possible_moves.add(tuple((row, i)))
            elif board[row][i].color != self.color:
                possible_moves.add(tuple((row, i)))
                break
            else:
                break
        for i in range(col + 1, COL):
            if board[row][i] == " ":
                possible_moves.add(tuple((row, i)))
            elif board[row][i].color != self.color:
                possible_moves.add(tuple((row, i)))
                break
            else:
                break
        print(possible_moves)
        return possible_moves

    def check_move(self, row_dest: int, col_dest: int, row: int, col: int, *args, **kwargs) -> bool:
        if tuple((row_dest, col_dest)) in self.get_possible_moves(row, col):
            return True
        return False


class Bishop(Piece):
    def __init__(self, color: str, symbol: str, *args, **kwargs):
        super().__init__(color, symbol, *args, **kwargs)

    def get_possible_moves(self, row: int, col: int) -> set:
        possible_moves = set()
        for i, j in zip(range(row + 1, ROW), range(col + 1, COL)):
            if board[i][j] == " ":
                possible_moves.add(tuple((i, j)))
            elif board[i][j].color != self.color:
                possible_moves.add(tuple((i, j)))
                break
            else:
                break
        for i, j in zip(range(row + 1, ROW), range(col - 1, -1, -1)):
            if board[i][j] == " ":
                possible_moves.add(tuple((i, j)))
            elif board[i][j].color != self.color:
                possible_moves.add(tuple((i, j)))
                break
            else:
                break
        for i, j in zip(range(row - 1, -1, -1), range(col + 1, COL)):
            if board[i][j] == " ":
                possible_moves.add(tuple((i, j)))
            elif board[i][j].color != self.color:
                possible_moves.add(tuple((i, j)))
                break
            else:
                break
        for i, j in zip(range(row - 1, -1, -1), range(col - 1, -1, -1)):
            if board[i][j] == " ":
                possible_moves.add(tuple((i, j)))
            elif board[i][j].color != self.color:
                possible_moves.add(tuple((i, j)))
                break
            else:
                break
        print(possible_moves)
        return possible_moves


class Knight(Piece):
    def __init__(self, color: str, symbol: str, *args, **kwargs):
        super().__init__(color, symbol, *args, **kwargs)

    def get_possible_moves(self, row: int, col: int, *args, **kwargs) -> set:
        possible_moves = set()
        if (row + 2) < 8 and (col - 1) > -1 and (board[row+2][col-1] == " " or board[row+2][col-1].color != self.color):
            possible_moves.add(tuple((row+2, col-1)))
        if (row + 2) < 8 and (col + 1) < 8 and (board[row+2][col+1] == " " or board[row+2][col+1].color != self.color):
            possible_moves.add(tuple((row+2, col+1)))
        if (row - 2) > -1 and (col + 1) < 8 and (board[row-2][col+1] == " " or board[row-2][col+1].color != self.color):
            possible_moves.add(tuple((row-2, col+1)))
        if (row - 2) > -1 and (col - 1) > -1 and (board[row-2][col-1] == " " or board[row-2][col-1].color != self.color):
            possible_moves.add(tuple((row-2, col-1)))
        if (row + 1) < 8 and (col + 2) < 8 and (board[row+1][col+2] == " " or board[row+1][col+2].color != self.color):
            possible_moves.add(tuple((row+1, col+2)))
        if (row - 1) > -1 and (col + 2) < 8 and (board[row-1][col+2] == " " or board[row-1][col+2].color != self.color):
            possible_moves.add(tuple((row-1, col+2)))
        if (row + 1) < 8 and (col - 2) > -1 and (board[row+1][col-2] == " " or board[row+1][col-2].color != self.color):
            possible_moves.add(tuple((row+1, col-2)))
        if (row - 1) > -1 and (col - 2) > -1 and (board[row-1][col-2] == " " or board[row-1][col-2].color != self.color):
            possible_moves.add(tuple((row-1, col-2)))
        print(possible_moves)
        return possible_moves


class Queen(Piece):
    def __init__(self, color: str, symbol: str, *args, **kwargs):
        super().__init__(color, symbol, *args, **kwargs)

    def get_possible_moves(self, row: int, col: int, *args, **kwargs) -> set:
        possible_moves = set()
        for i, j in zip(range(row + 1, ROW), range(col + 1, COL)):
            if board[i][j] == " ":
                possible_moves.add(tuple((i, j)))
            elif board[i][j].color != self.color:
                possible_moves.add(tuple((i, j)))
                break
            else:
                break
        for i, j in zip(range(row + 1, ROW), range(col - 1, -1, -1)):
            if board[i][j] == " ":
                possible_moves.add(tuple((i, j)))
            elif board[i][j].color != self.color:
                possible_moves.add(tuple((i, j)))
                break
            else:
                break
        for i, j in zip(range(row - 1, -1, -1), range(col + 1, COL)):
            if board[i][j] == " ":
                possible_moves.add(tuple((i, j)))
            elif board[i][j].color != self.color:
                possible_moves.add(tuple((i, j)))
                break
            else:
                break
        for i, j in zip(range(row - 1, -1, -1), range(col - 1, -1, -1)):
            if board[i][j] == " ":
                possible_moves.add(tuple((i, j)))
            elif board[i][j].color != self.color:
                possible_moves.add(tuple((i, j)))
                break
            else:
                break
        for i in range(row + 1, ROW):
            if board[i][col] == " ":
                possible_moves.add(tuple((i, col)))
            elif board[i][col].color != self.color:
                possible_moves.add(tuple((i, col)))
                break
            else:
                break
        for i in range(row - 1, 0, -1):
            if board[i][col] == " ":
                possible_moves.add(tuple((i, col)))
            elif board[i][col].color != self.color:
                possible_moves.add(tuple((i, col)))
                break
            else:
                break
        for i in range(col - 1, -1, -1):
            if board[row][i] == " ":
                possible_moves.add(tuple((row, i)))
            elif board[row][i].color != self.color:
                possible_moves.add(tuple((row, i)))
                break
            else:
                break
        for i in range(col + 1, COL):
            if board[row][i] == " ":
                possible_moves.add(tuple((row, i)))
            elif board[row][i].color != self.color:
                possible_moves.add(tuple((row, i)))
                break
            else:
                break
        print(possible_moves)
        return possible_moves


class King(Piece):
    def __init__(self, color: str, symbol: str, *args, **kwargs):
        super().__init__(color, symbol, *args, **kwargs)

    def get_possible_moves(self, row: int, col: int, *args, **kwargs) -> set:
        possible_moves = set()
        if (row + 1) < 8:
            if board[row+1][col] == " " or board[row+1][col].color != self.color:
                possible_moves.add(tuple((row+1, col)))
            if (col + 1) < 8 and (board[row+1][col+1] == " " or board[row+1][col+1].color != self.color):
                possible_moves.add(tuple((row+1, col+1)))
            if (col - 1) > -1 and (board[row+1][col-1] == " " or board[row+1][col-1].color != self.color):
                possible_moves.add(tuple((row+1, col-1)))
        if (row - 1) < 8:
            if board[row-1][col] == " " or board[row-1][col].color != self.color:
                possible_moves.add(tuple((row-1, col)))
            if (col + 1) < 8 and (board[row-1][col+1] == " " or board[row-1][col+1].color != self.color):
                possible_moves.add(tuple((row-1, col+1)))
            if (col - 1) > -1 and (board[row-1][col-1] == " " or board[row-1][col-1].color != self.color):
                possible_moves.add(tuple((row-1, col-1)))
        if (col + 1) < 8 and (board[row][col+1] == " " or board[row][col+1].color != self.color):
            possible_moves.add(tuple((row, col+1)))
        if (col - 1) > 0 and (board[row][col-1] == " " or board[row][col-1].color != self.color):
            possible_moves.add(tuple((row, col-1)))

        print(possible_moves)
        return possible_moves


board = [
    [Rock("black", "R"), Knight("black", "Kn"), Bishop("black", "B"), Queen("black", "Q"), King(
        "black", "K"), Bishop("black", "B"), Knight("black", "Kn"), Rock("black", "R")],
    [Pawn("black", "P"), Pawn("black", "P"), Pawn("black", "P"), Pawn("black", "P"), Pawn(
        "black", "P"), Pawn("black", "P"), Pawn("black", "P"), Pawn("black", "P")],
    [" ", " ", " ", " ", " ", " ", " ", " ", ],
    [" ", " ", " ", " ", " ", " ", " ", " ", ],
    [" ", " ", " ", " ", " ", " ", " ", " ", ],
    [" ", " ", " ", " ", " ", " ", " ", " ", ],
    [Pawn("white", "P"), Pawn("white", "P"), Pawn("white", "P"), Pawn("white", "P"), Pawn("white", "P"),
     Pawn("white", "P"), Pawn("white", "P"), Pawn("white", "P")],
    [Rock("white", "R"), Knight("white", "Kn"), Bishop("white", "B"), Queen("white", "Q"), King("white", "K"),
     Bishop("white", "B"), Knight("white", "Kn"), Rock("white", "R")]
]


def print_board():
    for row in board:
        for column in row:
            print(column, end=" | ")
        print()
        for i in range(len(board)):
            print("__ ", end=" ")
        print()


print_board()

if __name__ == "__main__":
    running: bool = True
    player: str = "white"
    while running:
        while True:
            piece: list = list(map(int, input(
                f"{player.capitalize()} to move. Which piece do you want to move: ").strip().lower().split(" ")))
            row, col = piece
            piece_to_move = board[row][col]
            if piece_to_move == " ":
                print("Invalid input")
            elif piece_to_move.color != player:
                print(f"It's {player.lower()}'s turn")
            else:
                destination: list = list(map(int, input(
                    "Where do you want to move it: ").strip().lower().split(" ")))
                row_dest, col_dest = destination
                if piece_to_move.check_move(row_dest, col_dest, row, col) and player == piece_to_move.color:
                    board[row_dest][col_dest] = piece_to_move
                    board[row][col] = " "
                    player = "black" if player == "white" else "white"
                    break
                else:
                    print("Invalid input")
        # running = False
        print_board()
