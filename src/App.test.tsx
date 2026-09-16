import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { AddVehicle, Dashboard, NotFound, VehiclesPage } from './pages/Pages'

function renderWithApp(ui: React.ReactNode, route = '/') {
  return render(<AppProvider><MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter></AppProvider>)
}

describe('AutoTrust', () => {
  it('affiche les dossiers locaux sur le tableau de bord', () => {
    renderWithApp(<Dashboard />)
    expect(screen.getByText('BMW Série 3 320d')).toBeInTheDocument()
    expect(screen.getByText('Dossiers suivis')).toBeInTheDocument()
  })

  it('affiche la collection des véhicules', () => {
    renderWithApp(<VehiclesPage />)
    expect(screen.getByText('Tous vos véhicules')).toBeInTheDocument()
    expect(screen.getByText('Toyota RAV4 Hybride')).toBeInTheDocument()
  })

  it('signale les champs requis du formulaire', () => {
    renderWithApp(<AddVehicle />)
    fireEvent.click(screen.getByRole('button', { name: /créer le dossier/i }))
    expect(screen.getByText('La marque est obligatoire')).toBeInTheDocument()
    expect(screen.getByText('Le modèle est obligatoire')).toBeInTheDocument()
    expect(screen.getByText('Saisissez un VIN valide')).toBeInTheDocument()
  })

  it('affiche une page 404 pour une route inconnue', () => {
    renderWithApp(<NotFound />, '/inconnu')
    expect(screen.getByText('Cette page n’existe pas.')).toBeInTheDocument()
  })
})
