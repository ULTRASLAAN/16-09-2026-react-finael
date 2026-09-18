import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Vehicle {
  id: number | string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  origin?: string
  link?: string
  notes?: string
  status?: string
}

export interface User {
  name: string
  email: string
  phone: string
}

interface AppContextType {
  vehicles: Vehicle[]
  favorites: (number | string)[]
  user: User
  toggleFavorite: (id: number | string) => void
  isFavorite: (id: number | string) => boolean
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void
  updateUser: (newUser: User) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [favorites, setFavorites] = useState<(number | string)[]>([])
  const [user, setUser] = useState<User>({
    name: 'Camille Martin',
    email: 'camille@example.com',
    phone: '06 12 34 56 78'
  })

  useEffect(() => {
    fetch('http://localhost:5000/api/vehicles')
      .then(res => res.json())
      .then(data => {
        console.log("Véhicules chargés depuis la BDD :", data)
        setVehicles(data)
      })
      .catch(err => console.error("Erreur de chargement des véhicules :", err))
  }, [])

  const toggleFavorite = (id: number | string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    )
  }

  const isFavorite = (id: number | string) => {
    return favorites.includes(id)
  }

  const addVehicle = (newVehicleData: Omit<Vehicle, 'id'>) => {
    const newVehicle: Vehicle = {
      ...newVehicleData,
      id: Date.now()
    }
    setVehicles(prev => [newVehicle, ...prev])
  }

  const updateUser = (newUser: User) => {
    setUser(newUser)
  }

  return (
    <AppContext.Provider
      value={{
        vehicles,
        favorites,
        user,
        toggleFavorite,
        isFavorite,
        addVehicle,
        updateUser
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp doit être utilisé à l'intérieur d'un AppProvider")
  }
  return context
}