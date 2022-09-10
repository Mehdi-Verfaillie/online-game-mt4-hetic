import React, { Children, createContext } from 'react'
import { io } from 'socket.io-client'

interface Props {
	client: string
	children: JSX.Element
}

export const SocketContexts = createContext(io())

export const SocketProvider = (props: Props) => {
	const socket = io(props.client)
	return <SocketContexts.Provider value={socket}>{props.children}</SocketContexts.Provider>
}
