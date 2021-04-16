import * as React from 'react'

function Oven({programActive, operationState}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-2/3 mx-auto my-3"
      viewBox="0 0 100.155 100"
    >
      <text
        x="53.657"
        y="11.094"
        fontWeight="400"
        fontSize="10.583"
        fontFamily="sans-serif"
        strokeWidth=".265"
        transform="translate(0 -.155)"
      />
      <path
        d="M2.726.5h94.858c1.147 0 2.071.924 2.071 2.071V97.43a2.067 2.067 0 01-2.071 2.071H2.726a2.067 2.067 0 01-2.07-2.071V2.57C.655 1.424 1.578.5 2.725.5z"
        fill="#2ca089"
        fillRule="evenodd"
        stroke="#000"
        paintOrder="markers fill stroke"
      />
      <path
        d="M99.5 20.345v77.312c0 .935-.924 1.688-2.071 1.688H2.57C1.424 99.345.5 98.592.5 97.657V20.345z"
        fill="#ac9393"
        fillRule="evenodd"
        stroke="#000"
        paintOrder="markers fill stroke"
      />
      {/* Internal oven light */}
      <path
        className={programActive ? 'oven-lightOn' : ''}
        d="M12.153 30.345h75.694c.916 0 1.653.55 1.653 1.234V88.11c0 .684-.737 1.235-1.653 1.235H12.153c-.916 0-1.653-.55-1.653-1.235V31.58c0-.685.737-1.235 1.653-1.235z"
        fill={programActive ? '#ffe680' : '#483e37'}
        fillRule="evenodd"
        stroke="#000"
        paintOrder="markers fill stroke"
      />
      <path
        d="M16.944 41.713h66.112c.8 0 1.444.037 1.444.084v3.832c0 .047-.644.084-1.444.084H16.944c-.8 0-1.444-.037-1.444-.084v-3.832c0-.047.644-.084 1.444-.084z"
        fill="#ac9393"
        fillRule="evenodd"
        stroke="#000"
        paintOrder="markers fill stroke"
      />
      <path
        d="M20.563 38.345h2.874c.035 0 .063.028.063.063v2.874a.063.063 0 01-.063.063h-2.874a.063.063 0 01-.063-.063v-2.874c0-.035.028-.063.063-.063zM76.563 38.345h2.874c.035 0 .063.028.063.063v2.874a.063.063 0 01-.063.063h-2.874a.063.063 0 01-.063-.063v-2.874c0-.035.028-.063.063-.063z"
        fillRule="evenodd"
        stroke="#000"
        paintOrder="markers fill stroke"
      />
      <path
        d="M13.5 8.345a3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3 3 3 0 013 3zM27.5 8.345a3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3 3 3 0 013 3zM92.5 8.345a3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3 3 3 0 013 3zM78.5 8.345a3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3 3 3 0 013 3z"
        fill="#216778"
        fillRule="evenodd"
        stroke="#000"
        paintOrder="markers fill stroke"
      />
      <path
        d="M36.107 4.095h27.786c.336 0 .607.107.607.24v11.02c0 .132-.27.24-.607.24H36.107c-.336 0-.607-.107-.607-.24V4.334c0-.133.27-.24.607-.24z"
        fill="#afdde9"
        fillRule="evenodd"
        stroke="#000"
        paintOrder="markers fill stroke"
      />
      {programActive && operationState !== 'Completed' ? (
        <path
          className="path"
          d="M38.397 60.973s5.592 1.327.625 8.774c-7.534 11.296 1.36 10.207 1.36 10.207M48.397 60.973s5.592 1.327.625 8.774c-7.534 11.296 1.36 10.207 1.36 10.207M58.397 60.973s5.592 1.327.625 8.774c-7.534 11.296 1.36 10.207 1.36 10.207"
          fill="none"
          stroke="#000"
          strokeWidth="2"
        />
      ) : null}
    </svg>
  )
}

export {Oven}
