const lines=`..######.###...######...#
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
###.###.#..##..#.###....#`.split('\n');

const dirs = 'NESW';
const dv = {
    'N': [0, -1],
    'E': [1, 0],
    'S': [0, 1],
    'W': [-1, 0],
};

function forward(dir, pos) {
    const d = dv[dirs[dir]];
    return pos.map((x, i) => x + d[i]);
}

function part1() {
    const state = new Map();
    lines
        .forEach((r, i) => r.split('')
        .forEach((l, j) => {
            if (l === '#') state.set(`${j},${i}`, 'I');
        }));
    const size = Math.floor(lines.length / 2);
    let pos = [size, size];
    let dir = 0;
    let infections = 0;

    for (let i = 0; i < 10000; i++){
        const k = pos.join(',');
        const s = state.get(k);
        if (!s) {
            dir = (dir + 3) % 4;
            state.set(k, 'I');
            infections += 1;
        } else {
            dir = (dir + 1) % 4;
            state.delete(k);
        }
        pos = forward(dir, pos);
    }

    return infections;
}

function part2() {
    const state = new Map();
    lines
        .forEach((r, i) => r.split('')
        .forEach((l, j) => {
            if (l === '#') state.set(`${j},${i}`, 'I');
        }));
    const size = Math.floor(lines.length / 2);
    let pos = [size, size];
    let dir = 0;
    let infections = 0;

    for (let i = 0; i < 10000000; i++){
        const k = pos.join(',');
        const s = state.get(k);
        if (!s) {
            dir = (dir + 3) % 4;
            state.set(k, 'W');
        } else if (s === 'I') {
            dir = (dir + 1) % 4;
            state.set(k, 'F');
        } else if (s === 'W') {
            state.set(k, 'I');
            infections += 1;
        } else {
            dir = (dir + 2) % 4;
            state.delete(k);
        }
        pos = forward(dir, pos);
    }

    return infections;
}

console.log('part 1:', part1());
console.log('part 2:', part2());