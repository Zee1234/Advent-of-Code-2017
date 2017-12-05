local modf, floor = math.modf, math.floor

function tabArray(line)
  local array = {}
  for num in line:gmatch('%d+') do
    array[#array+1] = tonumber(num)
  end
  return array
end

function divisorCheck(a, b)
  local big, small
  if a > b then
    big = a
    small = b
  else
    big = b
    small = a
  end

  local rem = big%small
  if rem == 0 then
    return floor(big/small)
  else
    return false
  end
end

function divisibilityFinder(list)
  local value
  for first = 1, #list do
    for second = first+1, #list do
      value = divisorCheck(list[first], list[second])
      if value then break; end
    end
    if value then break; end
  end
  return value
end

local sum = 0
for line in io.lines 'input.txt' do
  sum = sum + divisibilityFinder(tabArray(line))
end
print(sum)