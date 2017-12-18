console.log([...Array(9)].map((_,v)=>v+1).map( n => {
  return (
    `  [/NL${n}/]\n    [`+
    [...Array(9)].map((_,v)=>v+1).map( x => `v${x}NLv${x}${n}+NLv`).join('')+
    ']\n    [\\/+\\/\\/]'+
    `\n  [${n}/]`)
}).join('\n'))