import React from 'react'

export default function Nav( {selected, title}) {
  return (
    <div>
        <li className={`text-lg font-bold ${selected && "selected"}`}>{title}</li>
                          
    </div>
  )
}
