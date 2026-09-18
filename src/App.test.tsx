import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
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

  it('normalise le VIN et le contrôle technique quand l’API renvoie des champs alternatifs', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: 1,
          brand: 'BMW',
          model: 'Série 3',
          year: 2021,
          price_eur: 25000,
          mileage: 65000,
          origin_country: 'Allemagne',
          vin_number: 'WBA12345678901234',
          technicalControl: 'OK'
        }
      ]
    }))

    function VehicleInspector() {
      const { vehicles } = useApp()
      return <div>{vehicles[0]?.vin} / {vehicles[0]?.technical_control}</div>
    }

    renderWithApp(<VehicleInspector />)

    await waitFor(() => {
      expect(screen.getByText('WBA12345678901234 / OK')).toBeInTheDocument()
    })

    vi.unstubAllGlobals()
  })

  it('affiche le VIN et le contrôle technique sur le tableau de bord', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: 1,
          brand: 'BMW',
          model: 'Série 3 320d',
          year: 2021,
          price_eur: 25000,
          mileage: 65000,
          origin_country: 'Allemagne',
          vin_number: 'WBA12345678901234',
          technicalControl: 'OK'
        }
      ]
    }))

    renderWithApp(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText(/VIN/i)).toBeInTheDocument()
      expect(screen.getByText(/WBA12345678901234/i)).toBeInTheDocument()
      expect(screen.getByText(/CT : OK/i)).toBeInTheDocument()
    })

    vi.unstubAllGlobals()
  })

  it('affiche une page 404 pour une route inconnue', () => {
    renderWithApp(<NotFound />, '/inconnu')
    expect(screen.getByText('Cette page n’existe pas.')).toBeInTheDocument()
  })
})
