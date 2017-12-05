function sumMatch(str)
  local list, sum = {}, 0
  for char in str:gmatch('%d') do
    list[#list+1] = tonumber(char)
  end
  local length, dist = #list, #list/2
  for i, digit in ipairs(list) do
    local pos = ((i+dist) % length)
    pos = pos == 0 and length or pos
    local other = list[pos]
    if other then
      sum = digit == other and (sum+digit) or (sum)
    else
      sum = digit == list[1] and (sum+digit) or (sum)
    end
  end

  return sum
end

-- print(sumMatch '1212')
-- print(sumMatch '1221')
-- print(sumMatch '123425')
-- print(sumMatch '123123')
-- print(sumMatch '12131415')
local file = io.open('list.txt')
print(sumMatch(file:read('*all'):gsub('[^%d]','')))
file:close()