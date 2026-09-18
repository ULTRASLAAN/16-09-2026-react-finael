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
  vin?: string
  technical_control?: string
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

function normalizeVehicle(vehicle: any): Vehicle {
  const normalizedVin = vehicle.vin ?? vehicle.vin_number ?? vehicle.vinNumber ?? ''
  const normalizedTechnical =
    vehicle.technical_control ??
    vehicle.technicalControl ??
    vehicle.control_technique ??
    'À vérifier'

  return {
    id: vehicle.id,
    brand: vehicle.brand ?? vehicle.make ?? 'Inconnue',
    model: vehicle.model ?? 'Modèle inconnu',
    year: Number(vehicle.year ?? 0),
    price: Number(vehicle.price ?? vehicle.price_eur ?? 0),
    mileage: Number(vehicle.mileage ?? vehicle.mileage_km ?? 0),
    origin: vehicle.origin ?? vehicle.origin_country ?? vehicle.country ?? 'France',
    link: vehicle.link,
    notes: vehicle.notes,
    status: vehicle.status,
    vin: normalizedVin,
    technical_control: normalizedTechnical
  }
}

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
        const normalizedVehicles = Array.isArray(data) ? data.map(normalizeVehicle) : []
        console.log('Véhicules chargés depuis la BDD :', normalizedVehicles)
        setVehicles(normalizedVehicles)
      })
      .catch(err => console.error('Erreur de chargement des véhicules :', err))
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