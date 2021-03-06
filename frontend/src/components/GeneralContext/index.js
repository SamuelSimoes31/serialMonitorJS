import React, { createContext, useState, useEffect, useContext} from "react";
import io from 'socket.io-client'

const GeneralContext = createContext()

const socket = io('http://localhost:8080')
socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'))

export default function GeneralContextProvider({children}){
  const [portIsOpen,setPortIsOpen] = useState(null)

  useEffect( () => {
    socket.on('serialResponse',({status, message}) => {
      setPortIsOpen(status)
      if(message) alert(message)
    })
  },[])

  return (
    <GeneralContext.Provider
      value={{
        socket,
        portIsOpen,
        setPortIsOpen
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

export function useGeneralContext() {
  const context = useContext(GeneralContext)
  if (!context) throw new Error("useGeneralContext must be used within a GeneralContext");
  const {socket, portIsOpen} = context
  return {socket, portIsOpen}
}