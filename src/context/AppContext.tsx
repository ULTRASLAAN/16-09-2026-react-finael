import { createContext, useContext, useMemo, useReducer, type Dispatch, type ReactNode } from 'react'
import { vehicles as initialVehicles, type Vehicle } from '../data'

type State = { vehicles: Vehicle[]; favorites: string[] }
type Action = { type: 'toggle_favorite'; id: string } | { type: 'add_vehicle'; vehicle: Vehicle }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'toggle_favorite':
      return state.favorites.includes(action.id)
        ? { ...state, favorites: state.favorites.filter((id) => id !== action.id) }
        : { ...state, favorites: [...state.favorites, action.id] }
    case 'add_vehicle':
      return { ...state, vehicles: [action.vehicle, ...state.vehicles] }
  }
}

const AppContext = createContext<{ state: State; dispatch: Dispatch<Action> } | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { vehicles: initialVehicles, favorites: ['audi-a4-2021'] })
  const value = useMemo(() => ({ state, dispatch }), [state])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const value = useContext(AppContext)
  if (!value) throw new Error('useApp doit être utilisé dans AppProvider')
  return value
}
