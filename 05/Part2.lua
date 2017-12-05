local list = require 'parseList'
--local list = {0, 3, 0, 1, -3}
local abs = math.abs

local position = 1
local previous = 0
local steps = 0
while position <= #list and position > 0 do
  local current = list[position]
  list[position] = current >= 3 and list[position] - 1 or list[position] + 1
  position = position + current
  steps = steps + 1
end
p(steps)