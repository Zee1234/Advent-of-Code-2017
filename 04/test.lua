function validatePassphrase(passphrase)
  if not passphrase:lower() == passphrase then return false, passphrase, "\n\tNot all lower case" end
  if not passphrase:match('^[ %a]*$') then return false, passphrase, "\n\tContains invalid character" end
  if not passphrase:match(' ') then return false, passphrase, "\n\tSingle words are not allowed" end
  for word in passphrase:gmatch('%S+') do
    local count = 0
    -- local match = passphrase:gmatch((' %s '):format(word))
    local match = passphrase:gmatch( ('[^%%a]?%s[^%%a]?'):format(word))
    while match() do count = count + 1 end
    -- if passphrase:find('^'..word) then count = count + 1 end
    -- if passphrase:find(word..'$') then count = count + 1 end
    if count > 1 then return false, passphrase, "\n\tDuplicate words" end
  end
  
  return true, passphrase
end

local i, j = 0, 0
for line in io.lines 'list.txt' do
  local res, string, err = validatePassphrase(line:gsub('\n', ''))
  if res then i = i + 1 end
  j = j + 1
end
print(i, j)