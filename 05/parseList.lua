local file = io.open('list.txt')
local string = file:read('*all')
local list = {}
for set in string:gmatch('[-%d]+') do
  list[#list+1] = tonumber(set)
end

return list