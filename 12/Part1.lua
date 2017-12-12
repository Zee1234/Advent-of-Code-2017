local tree = {}

for line in io.lines 'input.txt' do
  local base, family = line:match '(%d+) <%-> ([%d, ]+)'
  tree[tonumber(base)] = {routes = {}}
  for number in family:gmatch '(%d+)' do
    table.insert(tree[tonumber(base)].routes, tonumber(number))
  end
end

local checked = {}
function check(digit)
  if checked[digit] then return end
  checked[digit] = true
  for _, v in ipairs(tree[digit].routes) do
    check(v)
  end
end

check(0)

local count = 0
for _ in pairs(checked) do
  count = count + 1
end
print(count)