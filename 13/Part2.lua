local start = os.clock()
local tonumber, io = tonumber, io


local nodes, max = {}, 0
for line in io.lines 'input.txt' do
  local a,b = line:match '(%d+): (%d+)'
  local depth = tonumber(a)
  nodes[depth] = tonumber(b)
  max = depth > max and depth or max
end
local delay = -2

while true do
  local skip = false
  delay = delay + 2
  for i = 0, max do
    if nodes[i] and (i+delay)%(2*nodes[i]-2) == 0 then
      skip = true
      break
    end
  end
  if not skip then break end
end

print(delay, os.clock()-start)