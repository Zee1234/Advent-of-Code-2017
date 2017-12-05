local findCoordinate = require 'findCoordinate'


local function sumNeighbors(coordinate, matrix)
  local x, y = coordinate[1], coordinate[2]
  local sum = 0
  for i=x-1, x+1 do
    if matrix[i] then
      for j=y-1, y+1 do
        repeat
          if i == x and j == y then break; end
          local val = matrix[i][j]
          sum = val and sum+val or sum
        until true
      end
    end
  end
  return sum
end


local store = {
  [0] = {
    [0] = 1
  }
} -- default state, as the first cell is 1
local found = false
local size = 361527
cell = 2 -- skip cell 1
while not found do
  local coord = findCoordinate(cell)
  local val = sumNeighbors(coord, store)
  local x, y = coord[1], coord[2]
  store[x] = store[x] or {}
  store[x][y] = val
  cell = cell + 1
  if val > size then found = {val, coord} end
end

print(found[1],found[2])