local time = os.clock()
local band = bit32 and bit32.band or bit.band
local divisor = 2147483647
local factors = {
  A = 16807,
  B = 48271,
}
local start = {
  A = 679,
  B = 771
}

local current, count = start, 0

for i=1, 5000000 do
  repeat
    current.A = (current.A*factors.A)%divisor
  until((current.A%4)==0)
  repeat
    current.B = (current.B*factors.B)%divisor
  until((current.B%8)==0)

  if (band(current.A,0xFFFF) == band(current.B,0xFFFF)) then count = count + 1 end
end

print(count)
print(os.clock()-time)