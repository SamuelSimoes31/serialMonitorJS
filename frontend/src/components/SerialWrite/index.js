import React, {useState, useEffect} from 'react';
import {useGeneralContext} from '../GeneralContext';
import ByteBox from '../ByteBox';

import './styles.css'

export default function SerialRead() {
  const { socket, portIsOpen } = useGeneralContext()
  const [writeMessage,setWriteMessage] = useState()

  const [byteMode,setByteMode] = useState(true)

  function handleSend(){
    socket.emit('writeSerial',writeMessage)
  }

  return(
    <div className="container">
      {
        byteMode ?
        (
          <div className="byte-mode-container">
            <ByteBox />
            <ByteBox />
            <ByteBox />
            <ByteBox />
            <ByteBox />
            <ByteBox />
            <ByteBox />
          </div>
        ) : (
          <textarea
          rows={5}
          cols={80}
          value={writeMessage}
          onChange={e => setWriteMessage(e.target.value)}
          disabled={ portIsOpen ?'':'disabled'}
          />
        )
      }
      <span>
        <button onClick={() => { setByteMode(!byteMode)}}>
          {byteMode?"Switch to ASCII mode":"Switch to byte mode"}
        </button>
        <button onClick={handleSend}>SEND</button>
      </span>
    </div>
  )
}