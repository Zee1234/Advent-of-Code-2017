local file = io.open 'input.txt'
local input = file:read '*all'
file:close()


local commands = {}
for set in input:gmatch '([^,]+),?' do
  local numSwap1, numSwap2 = set:match 'x(%d+)/(%d+)'
  local nameSwap1, nameSwap2 = set:match 'p(%a+)/(%a+)'
  local shift = set:match 's(%d+)'
  if numSwap1 then
    table.insert(commands, {type = 'numSwap', pos1 = tonumber(numSwap1)+1, pos2 = tonumber(numSwap2)+1})
  elseif nameSwap1 then
    table.insert(commands, {type = 'nameSwap', char1 = nameSwap1, char2 = nameSwap2})
  elseif shift then
    table.insert(commands, {type = 'shift', pos = tonumber(shift)})
  end
end

return commands