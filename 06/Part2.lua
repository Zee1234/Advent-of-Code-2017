---- SAME AS FIRST PART

local Memory = require './Memory.lua'

local file = io.open 'input.txt'
local mem = Memory.new()
for num in file:read('*all'):gmatch('%d+') do
  mem = mem:push(tonumber(num))
end

-- table.forEach = function(self, func)
--   for i,v in ipairs(self) do
--     func(v, i, self)
--   end
-- end
local storage = setmetatable({}, {
  __index = table
})

local function detectDuplicate(state, store)
  local found
  local copy = state:copy()
  local function same(a,b)
    if #a ~= #b then return false end
    for i, v in ipairs(a) do
      if b[i] ~= v then return false end
    end
    return true
  end
  for _, v in ipairs(store) do
    if same(v, state) then return true end
  end
  return false
end

while not detectDuplicate(mem, storage) do
  storage:insert(mem:copy())
  local sorted = mem:sort()
  local max = sorted[#mem]
  local index = mem:find(max)
  local copy = mem:copy()
  copy[index] = 0
  local pool, position = max, index+1
  while pool > 0 do
    if position > #mem then position = 1 end
    copy[position] = copy[position] + 1
    position = position + 1
    pool = pool - 1
  end
  mem = copy
end

----- END OF SAME AS FIRST PART

local storage2 = setmetatable({}, {
  __index = table
})
storage2:insert(storage[#storage]:copy())
while not detectDuplicate(mem, storage2) do
  storage2:insert(mem:copy())
  local sorted = mem:sort()
  local max = sorted[#mem]
  local index = mem:find(max)
  local copy = mem:copy()
  copy[index] = 0
  local pool, position = max, index+1
  while pool > 0 do
    if position > #mem then position = 1 end
    copy[position] = copy[position] + 1
    position = position + 1
    pool = pool - 1
  end
  mem = copy
end

print(#storage2)