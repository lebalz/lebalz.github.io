---
title: Maze
---

# A simple generator of perfect mazes

```py
from random import choice

DIM_X = 31
DIM_Y = 21
field = []
for x in range(0, DIM_Y):
    row = []
    for y in range(0, DIM_X):
        row.append(1)
    field.append(row)

    
pos = [1, 1]

positions = [pos]
pos_pointer = 0
finished = False

field[pos[0]][pos[1]] = 0
while not finished:
    options = [1, 2, 3, 4]
    success = False
    while len(options) > 0 and not success:
        direction = choice(options)
        if direction == 1:
            if pos[1] - 2 > 0 and field[pos[0]][pos[1] - 2] == 1:
                 field[pos[0]][pos[1] - 1] = 0
                 pos = [pos[0], pos[1] - 2]
                 success = True
            else:
                options.remove(1)
        elif direction == 2:
            if pos[0] + 2 < DIM_Y and field[pos[0] + 2][pos[1]] == 1:
                 field[pos[0] + 1][pos[1]] = 0
                 pos = [pos[0] + 2, pos[1]]
                 success = True
            else:
                options.remove(2)
        elif direction == 3:
            if pos[1] + 2 < DIM_X and field[pos[0]][pos[1] + 2] == 1:
                 field[pos[0]][pos[1] + 1] = 0
                 pos = [pos[0], pos[1] + 2]
                 success = True
            else:
                options.remove(3)
        elif direction == 4:
            if pos[0] - 2 > 0 and field[pos[0] - 2][pos[1]] == 1:
                 field[pos[0] - 1][pos[1]] = 0
                 pos = [pos[0] - 2, pos[1]]
                 success = True
            else:
                options.remove(4)
    if success:
        positions.append(pos)
        field[pos[0]][pos[1]] = 0
        pos_pointer = len(positions) - 1
    elif pos_pointer > 0:
        pos_pointer = pos_pointer - 1
        pos = positions[pos_pointer]
    else:
        finished = True
        print('Done')
    
for i in field:
    for j in i:
        if j == 1:
            print(' x ', end='')
        else:
            print(' . ', end='')
    print('')
```
