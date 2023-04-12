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
        if tuple((row_dest, col_dest)) in possible_moves:
            self.is_moved = True
            return True
        return False


class Rock(Piece):
    def __init__(self, color, symbol):
        self.is_moved = False
        super().__init__(color, symbol)

    def check_move(self, row_dest: int, col_dest: int, row: int, col: int, *args, **kwargs) -> bool:
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
        if tuple((row_dest, col_dest)) in possible_moves:
            return True
        return False


class Bishop(Piece):
    pass


class Queen(Piece):
    pass


class King(Piece):
    pass


class Knight(Piece):
    pass


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
    player = "white"
    while running:
        while True:
            piece = list(map(int, input(
                f"{player.capitalize()} to move. Which piece do you want to move: ").strip().lower().split(" ")))
            row, col = piece
            piece_to_move = board[row][col]
            if piece_to_move.color != player:
                print(f"It's {player.lower()}'s turn")
            else:
                destination = list(map(int, input(
                    "Where do you want to move it: ").strip().lower().split(" ")))
                row_dest, col_dest = destination
                if piece_to_move.check_move(row_dest, col_dest, row, col) and player == piece_to_move.color:
                    board[row_dest][col_dest] = piece_to_move
                    board[row][col] = " "
                    player = "black" if player == "white" else "white"
                    break
        # running = False
        print_board()
