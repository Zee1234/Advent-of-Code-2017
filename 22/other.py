s = """..######.###...######...#
.##..##.#....#..##.#....#
.##.#....###..##.###.#.#.
#.#.###.#####.###.##.##.#
.###.#.#.###.####..##.###
..####.##..#.#.#####...##
....##.###..#.#..#...####
.#.##.##.#..##...##.###..
.######..#..#.#####....##
###.##.###.########...###
.#.#.#..#.##.#..###...#..
.#.##.#.####.#.#.....###.
##..###.###..##...#.##.##
##.#.##..#...##...#...###
##..#..###.#..##.#.#.#.#.
.##.#####..##....#.#.#..#
..#.######.##...#..#.##..
#.##...#.#....###.#.##.#.
.#..#.#.#..#.####..#.####
.##...##....##..#.#.###..
..##.#.#.##..##.#.#....#.
###.###.######.#.########
..#.####.#.#.##..####...#
#.##..#.#.####...#..#..##
###.###.#..##..#.###....#"""
t = s.split('\n')
t = filter(lambda x: x != "",t)

index = 0
dirs = [(-1,0),(0,1),(1,0),(0,-1)]
startx = 12
starty = 12
infectedd = dict()
print len(t)

maze = [[0]* len(t) for i in xrange(len(t))]
for i in xrange(len(t)):
    for j in xrange(len(t)):
        if t[i][j] == ".":
            infectedd[(i,j)] = "c"
        else:
            infectedd[(i,j)] = "i"


count = 0
for i in xrange(10000000):
    if (startx,starty) not in infectedd:
        infectedd[(startx,starty)] = "c"
    if infectedd[(startx,starty)] == "c":
        index = (index-1)%4   
        infectedd[(startx,starty)] = "w"
    elif infectedd[(startx,starty)] == "w":
        count +=1
        infectedd[(startx,starty)] = "i"
    elif infectedd[(startx,starty)] == "i":
        index = (index+1)%4   
        infectedd[(startx,starty)] = "f"
    elif infectedd[(startx,starty)] == "f":
        index = (index-2)%4   
        infectedd[(startx,starty)] = "c"

    #commented out part 1 
    """
    if (startx,starty) not in infectedd:
        infectedd[(startx,starty)] = "."
    if infectedd[(startx,starty)] == "#":
        index = (index+1)%4
    else:
        index = (index-1)%4
    if infectedd[(startx,starty)] == ".":
        infectedd[(startx,starty)] = "#"
        count +=1
    else:
        infectedd[(startx,starty)] = "."
    """
    startx += dirs[index][0]
    starty += dirs[index][1]
print count