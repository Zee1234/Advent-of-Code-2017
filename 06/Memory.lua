local Memory = {}
Memory.__index = Memory
Memory._NAME_ = Memory
Memory.__add = function(a, b)
  if a._NAME_ == Memory then
    return a:push(b)
  else
    return b:prepend(a)
  end
end
Memory.__eq = function(a, b)
  if #a ~= #b then return false end
  for i, v in ipairs(a) do
    if b[i] ~= v then return false end
  end
  return true
end

Memory.new = function() 
  return setmetatable({}, Memory)
end

function Memory:push(value)
  local ret = self:copy()
  ret[#ret+1] = value
  return ret
end
function Memory:prepend(value)
  local ret = self:copy()
  return table.insert(ret, 1, value)
end
function Memory:copy()
  local ret = Memory.new()
  for i,v in ipairs(self) do
    ret[i] = v
  end
  return ret
end
function Memory:sort(...)
  local copy = self:copy()
  table.sort(copy, ...)
  return copy
end
function Memory:find(val)
  for i,v in ipairs(self) do
    if v == val then return i end
  end
end


return Memory