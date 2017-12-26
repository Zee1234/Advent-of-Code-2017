local a,b,c,d,e,f,g,h


local count = 0
for b = 109900, 126900, 17 do
  local step = false
  for d = 2, b do
    for e = 2, b do
      if (d * e - b) == 0 then
        step = true
      end
    end
  end
  if step then
    count = count + 1
  end
end