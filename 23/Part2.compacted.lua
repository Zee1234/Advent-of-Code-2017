local a,b,c,d,e,f,g
a = 1
b = 109900
c = 126900
d = 0
e = 0
-- f = 0
g = 0
h = 0

local step

while true do
  step = false
  d = 2
  while (d-b) ~= 0 do
    e = 2
    while (e-b) ~= 0 do
      if (d * e - b) == 0 then
        step = true
      end
      e = e + 1
    end
    d = d + 1
  end
  if step then
    h = h + 1
  end
  if (b-c) ~= 0 then break; end
  b = b + 17
end