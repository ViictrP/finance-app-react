import { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth/AuthContext'

const HomePage = () => {
  const { user } = useAuth()
  return (
    <div className="pb-12">
      <h1>Olá {user?.username}</h1>
    </div>
  )
}

export default HomePage
