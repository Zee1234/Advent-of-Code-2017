local part2 = true

local inspect = require "inspect"

local rules = {nil,{},{}}

for line in io.lines("./input_day21") do
    local iter = line:gmatch("[#%./]+")
    local a,b = iter(),iter()
    local r = (#a==5) and rules[2] or rules[3]
    r[a] = b
end

local image = {
    {'.','#','.'},
    {'.','.','#'},
    {'#','#','#'}
}

local function flipV(t)
    local t2 = {}
    for i=#t,1,-1 do
        table.insert(t2,t[i])
    end
    return t2
end

local function flipH(t)
    local t2 = {}
    for _,v in ipairs(t) do
        table.insert(t2,flipV(v))
    end
    return t2
end

local function rotate(t)
    if #t == 2 then
        return {
            {t[2][1],t[1][1]},
            {t[2][2],t[1][2]}
        }
    elseif #t == 3 then
        return {
            {t[3][1],t[2][1],t[1][1]},
            {t[3][2],t[2][2],t[1][2]},
            {t[3][3],t[2][3],t[1][3]}
        }
    end
end

local function fmt(t)
    local s = ""
    for _,v in ipairs(t) do
        for _,v2 in ipairs(v) do
            s = s .. v2
        end
        s = s .. '/'
    end
    return s:sub(1,#s-1)
end

local function sub(t,x1,y1,x2,y2)
    local dbg = (x1==1 and y1==3 and x2==2 and y2==4)
    local t2 = {}
    for y=y1,y2 do
        local row = {}
        table.insert(t2,row)
        for x=x1,x2 do
            table.insert(row,t[y][x])
        end
    end
    return t2
end

local function joinH(...)
    local t = {}
    for i=1,#select(1,...) do
        table.insert(t,{})
        for _,t1 in ipairs{...} do
            for _,v in ipairs(t1[i]) do
                table.insert(t[i],v)
            end
        end
    end
    return t
end

local function joinV(...)
    local t = {}
    for _,t1 in ipairs{...} do
        for _,v in ipairs(t1) do
            table.insert(t,v)
        end
    end
    return t
end

local function eval(s)
    local t = {}
    for row in s:gmatch("[^/]+") do
        local r = {}
        table.insert(t,r)
        for i=1,#row do
            table.insert(r,row:sub(i,i))
        end
    end
    return t
end

local function findMatch(t)
    local r = (#t==2) and rules[2] or rules[3]
    for i=1,4 do
        local a = r[fmt(t)]
               or r[fmt(flipV(t))]
               or r[fmt(flipH(t))]
               or r[fmt(flipH(flipV(t)))]
        if a then
            return eval(a)
        end
        t = rotate(t)
    end
    error "not found"
end

local function split(t)
    local t2 = {}
    local size = (#t%2==0) and 2 or 3
    for y=1,#t,size do
        local row = {}
        table.insert(t2,row)
        for x=1,#t,size do
            local subimg = sub(t,x,y,x+size-1,y+size-1)
            table.insert(row,subimg)
        end
    end
    return t2
end

local function unsplit(t)
    local t2 = {}
    for _,row in ipairs(t) do
        table.insert(t2,joinH(table.unpack(row)))
    end
    return joinV(table.unpack(t2))
end

local function iprint(a)
    print(inspect(a))
end
local function fprint(a)
    print(fmt(a))
end
local function xprint(a)
    for _,row in ipairs(a) do
        for _,v in ipairs(row) do
            io.write(v)
        end
        print()
    end
end

for i=1,(part2 and 18 or 5) do
    local splitImage = split(image)
    for y,row in ipairs(splitImage) do
        for x,cell in ipairs(row) do
            splitImage[y][x] = findMatch(cell)
        end
    end
    image = unsplit(splitImage)
end

local foo = 0
for _,row in ipairs(image) do
    for _,v in ipairs(row) do
        if v == '#' then
            foo = foo + 1
        end
    end
end
print(foo)