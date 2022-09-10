import { join } from '@/features/Game/join/join'
import React, { Children, createContext } from 'react'
import { io, Socket } from 'socket.io-client'
import { create } from '../features/Game/create/create'

interface Props {
	client: string
	children: JSX.Element
}

export const SocketContext = createContext<any>({})

export const SocketProvider = (props: Props) => {
	const socket = io(props.client)
	return (
		<SocketContext.Provider
			value={{ socketConnection: socket, create: create(socket), join: join(socket) }}
		>
			{props.children}
		</SocketContext.Provider>
	)
}
