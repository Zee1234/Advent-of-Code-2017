local a,b,c,d,e,f,g,h = 1,0,0,0,0,0,0,0          --start
b = 99                                           --1
b = 9900                                         --5
b = 109900                                       --6
c = 109900                                       --7
c = 126900                                       --8


while true do                                    --32
  f = 1                                          --9
  d = 2                                          --10
  while true do                                  --24
    e = 2                                        --11
    while true do                                --20
      g = d                                      --12
      g = g * e                                  --13
      g = g - b                                  --14
      if g == 0 then                             --15
        f = 0                                    --16
      end
      e = e + 1                                  --17
      g = e                                      --18
      g = g - b                                  --19
      if g == 0 then break; end                  --20
    end
    d = d + 1                                    --21
    g = d                                        --22
    g = g - b                                    --23
    if g == 0 then break; end                    --24
  end
  if f == 0 then                                 --25
    h = h + 1                                    --26
  end
  g = b                                          --27
  g = g - c                                      --28
  if g == 0 then                                 --29
    break;                                       --30
  end
  b = b + 17                                     --31
end