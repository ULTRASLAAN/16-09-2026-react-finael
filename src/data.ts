export type VehicleStatus = 'verified' | 'review' | 'incomplete'

export type DocumentItem = {
  name: string
  status: 'verified' | 'missing' | 'review'
  detail: string
}

export type Vehicle = {
  id: string
  make: string
  model: string
  year: number
  country: string
  price: number
  mileage: number
  image: string
  status: VehicleStatus
  completion: number
  vin: string
  accidentNote?: string
  documents: DocumentItem[]
  history: { year: number; mileage: number }[]
}

export const vehicles: Vehicle[] = [
  {
    id: 'bmw-3-2020', make: 'BMW', model: 'Série 3 320d', year: 2020, country: 'Allemagne', price: 18000, mileage: 142300,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80', status: 'review', completion: 82, vin: 'WBA8E1C50LA000241', accidentNote: 'Accident déclaré en 2022. Vérification recommandée.',
    documents: [{ name: 'Certificat d’immatriculation', status: 'verified', detail: 'Source officielle · 12 juin 2025' }, { name: 'Contrôle technique', status: 'verified', detail: 'Validé · 15 avril 2025' }, { name: 'Historique entretien', status: 'verified', detail: '8 factures retrouvées' }, { name: 'Historique accidents', status: 'review', detail: '1 événement à examiner' }],
    history: [{ year: 2019, mileage: 45000 }, { year: 2020, mileage: 61000 }, { year: 2021, mileage: 78000 }, { year: 2022, mileage: 94000 }, { year: 2023, mileage: 113000 }, { year: 2024, mileage: 128000 }, { year: 2025, mileage: 142300 }],
  },
  {
    id: 'audi-a4-2021', make: 'Audi', model: 'A4 Avant 40 TDI', year: 2021, country: 'Belgique', price: 22900, mileage: 98400,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80', status: 'verified', completion: 96, vin: 'WAUZZZF45MA019842',
    documents: [{ name: 'Certificat d’immatriculation', status: 'verified', detail: 'Source officielle · 03 août 2025' }, { name: 'Contrôle technique', status: 'verified', detail: 'Validé · 20 mai 2025' }, { name: 'Historique entretien', status: 'verified', detail: '12 factures retrouvées' }, { name: 'Historique accidents', status: 'verified', detail: 'Aucun événement signalé' }],
    history: [{ year: 2021, mileage: 18000 }, { year: 2022, mileage: 39000 }, { year: 2023, mileage: 61000 }, { year: 2024, mileage: 81000 }, { year: 2025, mileage: 98400 }],
  },
  {
    id: 'toyota-rav4-2022', make: 'Toyota', model: 'RAV4 Hybride', year: 2022, country: 'Espagne', price: 26700, mileage: 67300,
    image: 'https://images.unsplash.com/photo-1568844293986-8c8e9f5b9a7b?auto=format&fit=crop&w=900&q=80', status: 'incomplete', completion: 68, vin: 'JTMAB3FV70D004812',
    documents: [{ name: 'Certificat d’immatriculation', status: 'verified', detail: 'Source officielle · 28 juillet 2025' }, { name: 'Contrôle technique', status: 'missing', detail: 'Document non fourni' }, { name: 'Historique entretien', status: 'verified', detail: '5 factures retrouvées' }, { name: 'Historique accidents', status: 'missing', detail: 'Information indisponible' }],
    history: [{ year: 2022, mileage: 12000 }, { year: 2023, mileage: 29000 }, { year: 2024, mileage: 48000 }, { year: 2025, mileage: 67300 }],
  },
]

export const countries = ['Allemagne', 'Belgique', 'Espagne', 'Italie', 'Japon', 'États-Unis']
