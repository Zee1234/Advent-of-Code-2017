function tabArray(line)
  local array = {}
  for num in line:gmatch('%d+') do
    array[#array+1] = tonumber(num)
  end
  return array
end

function extremeDiff(list)
  local big, small = list[1], list[1]
  for _, num in ipairs(list) do
    if big < num then
      big = num
    elseif small > num then
      small = num
    end
  end

  return big - small
end

local sum = 0
for line in io.lines 'input.txt' do
  sum = sum + extremeDiff(tabArray(line))
end
print(sum)