import { SocketContext } from '@/providers/socket.provider'
import React, { useState, useEffect, useContext } from 'react'
import './landingpage.scss'

export const LandingPage = () => {
	const [createOrJoin, setCreateOrJoin] = useState<'create' | 'join'>('create')

	const context = useContext(SocketContext)

	const isCreateOrJoin = () => {
		if (window.location.pathname === '/') {
			setCreateOrJoin('create')
			console.log('création une partie')
		} else {
			// Checker si l'id de la room existe
			setCreateOrJoin('join')
			console.log('rejoindre une partie')
		}
	}

	useEffect(() => {
		isCreateOrJoin()
	}, [])

	return <div className="">{createOrJoin === 'create' ? context.create : context.join}</div>
}
