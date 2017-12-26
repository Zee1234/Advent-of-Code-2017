local count = 0

function isPrime(x)
  for i = 2, math.ceil(x^(1/2)) do
    if (x%i) == 0 then
      return false
    end
  end
  return true
end
for b = 109900, 126900, 17 do
  if not isPrime(b) then
    count = count + 1
  end
end
print(count)