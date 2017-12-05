local findCoordinate = require 'findCoordinate'

cell = 361527

local coordinate = findCoordinate(cell)
print(coordinate)
local steps = math.abs( coordinate[1] )+math.abs( coordinate[2] )
print(steps)