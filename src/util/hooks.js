import * as React from 'react'
import {IoMdArrowDropdown} from 'react-icons/io'

function useDropdown(header, options) {
  const [menuActive, setMenuActive] = React.useState(false)
  const [selected, setSelected] = React.useState(options[0])

  const closeMenu = () => {
    setMenuActive(false)
  }

  React.useEffect(() => {
    if (menuActive) document.addEventListener('click', closeMenu)

    return () => document.removeEventListener('click', closeMenu)
  }, [menuActive])

  const Dropdown = () => (
    <div className="relative">
      <button type="button" onClick={() => setMenuActive(true)}>
        <span className="hover:text-yellow-400">
          {header}
          <IoMdArrowDropdown className="inline" />
        </span>
      </button>
      {menuActive
        ? options.map(option => (
            <button
              type="button"
              key={option}
              onClick={() => setSelected(option)}
              className={`block w-full p-1${
                option === selected ? ' text-yellow-300' : ''
              }`}
            >
              {option}
            </button>
          ))
        : null}
    </div>
  )

  return [selected, Dropdown, setSelected]
}

export {useDropdown}
