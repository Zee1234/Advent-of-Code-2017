local Vector = require 'Vector'

local function findMaxSize(cell)
  local x = math.ceil(math.sqrt( cell ))
  x = x%2==0 and x+1 or x
  return (x+1)/2
end

local function sideLength(boxCount)
  return 2*boxCount-1
end

local function upperLeftCorner(boxCount)
  return (2*boxCount-2)^2+1, Vector(-boxCount+1, boxCount-1)
end
local function lowerRightCorner(boxCount)
  return (2*boxCount-1)^2, Vector(boxCount-1, -boxCount+1)
end

local function findCoordinate(cell)
  local up, right = Vector(0,1), Vector(1,0)
  local down, left = -up, -right
  local boxCount = findMaxSize(cell)
  local side = sideLength(boxCount)
  local upLeft, upLeftPoint = upperLeftCorner(boxCount)
  local downRight, downRightPoint = lowerRightCorner(boxCount)

  local point -- will store our point
  if math.abs(upLeft-cell) < side then -- top or left side
    point = upLeftPoint
    if cell > upLeft then -- left
      for i = upLeft+1, cell, 1 do
        point = point + down
      end
    else  -- top
      for i = upLeft-1, cell, -1 do
        point = point + right
      end
    end
  elseif downRight-cell < side then --bottom
    point = downRightPoint
    for i = downRight-1, cell, -1 do
      point = point + left
    end
  else -- right
    point = downRightPoint + up
    local magic = (2*(boxCount-1)-1)^2+1
    for i = magic+1, cell, 1 do
      point = point + up
    end
  end

  return point
end

return findCoordinate