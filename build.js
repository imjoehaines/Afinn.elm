const fs = require('fs')
const chunk = require('chunk')
const afinn = require('afinn-165')

const elmSource = list =>
`module Afinn exposing (dict)

import Dict


dict : Dict.Dict String number
dict =
    Dict.fromList
        ([ ${list.map(
            list => list.join(',\n')
          ).join('] ++ [')}
        ])
`

const generateList = function (words) {
  const tuples = Object.keys(words).map(word => [`("${word}", ${words[word]})`])

  const chunked = chunk(tuples, 50)

  return chunked
}

fs.writeFileSync('src/Afinn.elm', elmSource(generateList(afinn)))
