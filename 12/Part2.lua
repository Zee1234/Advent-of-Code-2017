local tree = {}

for line in io.lines 'input.txt' do
  local base, family = line:match '(%d+) <%-> ([%d, ]+)'
  tree[tonumber(base)] = {routes = {}}
  for number in family:gmatch '(%d+)' do
    table.insert(tree[tonumber(base)].routes, tonumber(number))
  end
end

local checked = {}
function check(digit, container)
  if container[digit] then return end
  container[digit] = true
  for _, v in ipairs(tree[digit].routes) do
    check(v, container)
  end
end

function length(container)
  local count = 0
  for _ in pairs(container) do
    count = count + 1
  end
  return count
end

function same(a, b)
  if length(a) ~= length(b) then return false end
  for k, v in pairs(a) do
    if b[k] ~= v then return false end
  end
  return true
end

for parent, data in pairs(tree) do
  checked[parent] = {}
  check(parent, checked[parent])
  tree[parent].groupLength = length(checked[parent])
  tree[parent].group = checked[parent]
end

local shallowTree = {}
for k,v in pairs(tree) do shallowTree[k] = v end

for k, def in pairs(shallowTree) do
  local group, length  = def.group, def.groupLength
  for key, other in pairs(shallowTree) do
    if key ~= k then
      if same(def.group, other.group) then
        shallowTree[key] = nil
      end
    end
  end
end

print(length(shallowTree))