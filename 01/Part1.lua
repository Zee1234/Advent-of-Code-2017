function sumMatch(str)
  local list, sum = {}, 0
  for char in str:gmatch('%d') do
    list[#list+1] = tonumber(char)
  end
  for i, digit in ipairs(list) do
    local next = list[i+1]
    if next then
      sum = digit == next and (sum+digit) or (sum)
    else
      sum = digit == list[1] and (sum+digit) or (sum)
    end
  end

  return sum
end

local file = io.open('list.txt')
print(sumMatch(file:read('*all'):gsub('[^%d]','')))
file:close()