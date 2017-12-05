local list = require 'parseList'

position = 1
steps = 0
while position <= #list and position > 0 do
  local current = list[position]
  list[position] = list[position] + 1
  position = position + current
  steps = steps + 1
end
print(steps)