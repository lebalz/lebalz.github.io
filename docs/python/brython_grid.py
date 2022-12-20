from browser import document, html
from browser import timer
import math
CANVAS_OUTPUT = True

def setup(width: int, height: int):
    canvas = document[CANVAS_ID]
    parent = canvas.parent
    parent.replaceChildren()

    canv = document.createElement('canvas')
    canv.style.display = 'block'
    canv.id = CANVAS_ID;
    canv.attrs['height'] = height
    canv.attrs['width'] = width
    canv.style.width = f'{width}px'
    canv.style.height = f'{height}px'
    parent.appendChild(canv)

class Rectangle():
    col: int
    row: int
    ctx = None
    scale: int = 10
    def __init__(self, col: int, row: int, scale: int = 10):
        self.col = col
        self.row = row
        self.scale = scale
        canvas = document[CANVAS_ID]
        self.ctx = canvas.getContext('2d')
        self.color = 'black'
    
    @property
    def color(self):
        return self._color

    @color.setter
    def color(self, color: str):
        self._color = color
        self.draw()

    def draw(self):
        self.ctx.lineWidth = 0
        self.ctx.fillStyle = self.color
        self.ctx.fillRect(self.col * self.scale, self.row * self.scale, self.scale, self.scale)

    def __repr__(self):
        return f'{self.color[:5].ljust(5, " ")}'

class RectLine():
    line = []
    scale: int = 10
    def __init__(self, row, cols, scale: int = 10):
        self.scale = scale
        self.line = [Rectangle(col, row, scale) for col in range(cols)]
    
    def __getitem__(self, key):
        return self.line[key]

    def __setitem__(self, key, value):
        self.line[key].color = value

    def __repr__(self):
        return ', '.join([f'{r}' for r in self.line])

class Grid():
    lines = []
    def __init__(self, cols, rows, scale: int = 10):
        self.lines = [RectLine(row, cols, scale) for row in range(rows)]

    @property
    def grid(self):
        return [l.line for l in self.lines]

    def __getitem__(self, key):
        return self.lines[key]

    def __setitem__(self, key, value):
        self.lines[key] = value
        
    def __repr__(self):
        rep = ''
        for line in self.lines:
            rep += f'{line}'
            rep += '\n'
        return rep

SIZE = 100
setup(1000, 1000)
grid = Grid(SIZE, SIZE, 1000 / SIZE)
cnt = 0
flip = 0
anim_id = None
d0 = 0
def play(dt = 0):
    global cnt
    global flip
    global anim_id
    global d0
    
    if d0 == 0:
        d0 = dt
    if dt - d0 > 100:
        d0 = dt
        flip = (flip + 1) % 2
        for i in range(SIZE):
            flip = (flip + 1) % 2
            for j in range(SIZE):
                if (j + flip) % 2 == 0:
                    grid[i][j].color = 'white'
                else:
                    grid[i][j].color = 'black'
    anim_id = timer.request_animation_frame(play)

play()

def cancel_anim():
    timer.cancel_animation_frame(anim_id)

timer.set_timeout(cancel_anim, 5000)
