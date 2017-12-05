local insert = table.insert

local Vector = {}

local function newVector(a, ...)
  local ret = {}
  if type(a) == 'table' then
    for i,v in ipairs(a) do
      ret[i] = v
    end
  else
    ret[1] = a
    for i,v in ipairs{...} do
      ret[i+1] = v
    end
  end

  return setmetatable({
    _array = ret,
    _dimension = #ret
  }, Vector)
end

Vector.new = newVector

setmetatable(Vector, {
  __call = function(_, ...)
    return Vector.new(...)
  end
})
Vector.__name = Vector

Vector.instanceOf = function(obj)
  return obj.__name and obj.__name == Vector and Vector or nil
end

function Vector:sameDimension(other)
  assert(Vector.instanceOf(self), 'Argument 1 to `sameDimension` is not a vector')
  assert(Vector.instanceOf(other), 'Argument 2 to `sameDimension` is not a vector')
  return #self == #other
end






Vector.__index = function(vector, key)
  if type(key) == 'number' then
    return vector._array[key]
  else
    return Vector[key]
  end
end

Vector.__len = function(vector)
  return vector._dimension
end

Vector.__pairs = function(vector)
  return pairs(vector._array)
end

Vector.__ipairs = function(vector)
  return ipairs(vector._array)
end

Vector.__tostring = function(vector)
  return ('Vector <%s>'):format(table.concat(vector._array, ', '))
end

Vector.__newindex = function(vector, key, value)
  if type(key) == 'number' and key > 0 and key <= #vector then
    vector._array[key] = value
  end
end



Vector.__unm = function(vector)
  local arr = {}
  for i, v in ipairs(vector) do
    arr[i] = -v
  end
  return Vector(arr)
end

Vector.__add = function(a, b)
  assert(Vector.instanceOf(a), 'Value 1 in Vector addition is not a vector')
  assert(Vector.instanceOf(b), 'Value 2 in Vector addition is not a vector')
  assert(#a == #b, 'Vectors must be of the same dimension to add together')
  local arr = {}
  for i = 1, #a do
    arr[i] = a[i]+b[i]
  end
  return Vector(arr)
end

Vector.__sub = function(a, b)
  assert(Vector.instanceOf(a), 'Value 1 in Vector subtraction is not a vector')
  assert(Vector.instanceOf(b), 'Value 2 in Vector subtraction is not a vector')
  assert(#a == #b, 'Vectors must be of the same dimension to add together')
  local arr = {}
  for i = 1, #a do
    arr[i] = a[i]-b[i]
  end
  return Vector(arr)
end

Vector.__mul = function(scalar, vector)
  assert(type(scalar) == 'number', 'Scalar in Vector scaling is not a number')
  assert(Vector.instanceOf(vector), 'Vector in Vector scaling is not a vector')
  local arr = {}
  for i = 1, #vector do
    arr[i] = scalar * vector[i]
  end
  return Vector(arr)
end



Vector.__eq = function(a, b)
  assert(Vector.instanceOf(a), 'Value 1 in Vector equality is not a vector')
  assert(Vector.instanceOf(b), 'Value 2 in Vector equality is not a vector')
  if not a:sameDimension(b) then return false end
  for i = 1, #a do
    if a[i] ~= b[i] then return false end
  end
  return true
end



return Vector