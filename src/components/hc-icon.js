import * as React from 'react'

function HomeConnectIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 105 105"
      className="inline h-6 w-6"
    >
      <linearGradient
        id="prefix__a"
        gradientUnits="userSpaceOnUse"
        x1={85.405}
        y1={20.595}
        x2={27.744}
        y2={78.256}
        gradientTransform="matrix(1 0 0 -1 0 106)"
      >
        <stop offset={0} stopColor="#5dc6ff" />
        <stop offset={1} stopColor="#375de6" />
      </linearGradient>
      <path
        d="M82.5 70.4c3.1-5.2 4.9-11.4 4.9-17.9 0-19.3-15.7-35-35-35s-35 15.7-35 35 15.7 35 35 35c6.5 0 12.7-1.8 17.9-4.9l13.4 3.3c1.3.3 2.4-.8 2.1-2.1l-3.3-13.4zm-15.8-5.3c0 1-.8 1.7-1.7 1.7H41c-1 0-1.7-.8-1.7-1.7V44c0-.5.2-1 .6-1.3l12-10.4c.6-.6 1.6-.6 2.3 0l12 10.4c.4.3.6.8.6 1.3v21.1z"
        fill="url(#prefix__a)"
      />
    </svg>
  )
}

export {HomeConnectIcon}
