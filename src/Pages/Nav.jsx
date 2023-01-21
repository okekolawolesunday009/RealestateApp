import React from 'react'

export default function Nav({selected, title}) {
  // function pathMathRoute(route){
  //   if (route === location.pathname){
  //     return true
  //   }
  // }
  return (
    <div>
        <li className={`text-lg font-bold ${selected ?  "selected" : ""}`}>{title}</li>
                          
    </div>
  )
}
