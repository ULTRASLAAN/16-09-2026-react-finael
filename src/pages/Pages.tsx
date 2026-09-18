import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  Car, Star, Plus, Search, Ship, CheckCircle,
  CreditCard, ArrowRight, Anchor, ExternalLink, Filter
} from 'lucide-react'

// ----------------------------------------------------
// 1. VUE D'ENSEMBLE (Dashboard)
// ----------------------------------------------------
export function Dashboard() {
  const { user, vehicles, favorites, isFavorite, toggleFavorite } = useApp()

  // États pour la recherche et le filtrage par marque / pays
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')

  // Extrait la liste unique des marques et des pays disponibles
  const availableBrands = Array.from(new Set(vehicles.map(v => v.brand).filter(Boolean)))
  const availableCountries = Array.from(new Set(vehicles.map(v => v.origin || 'France').filter(Boolean)))

  // Filtrage des véhicules selon les critères renseignés
  const filteredVehicles = vehicles.filter(v => {
    const origin = v.origin || 'France'
    const fullText = `${v.brand} ${v.model} ${v.year} ${origin} ${v.price}`.toLowerCase()
    
    const matchesSearch = fullText.includes(searchTerm.toLowerCase())
    const matchesBrand = selectedBrand ? v.brand.toLowerCase() === selectedBrand.toLowerCase() : true
    const matchesCountry = selectedCountry ? origin.toLowerCase() === selectedCountry.toLowerCase() : true

    return matchesSearch && matchesBrand && matchesCountry
  })

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Vue d’ensemble</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0 0' }}>Bienvenue {user.name}. Recherchez des véhicules par marque ou provenance.</p>
        </div>
        <Link to="/ajouter" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: '#0066cc', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
          <Plus size={18} /> Nouveau dossier
        </Link>
      </div>

      {/* Cartes statistiques */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <span style={{ color: '#64748b', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>Total Véhicules</span>
          <strong style={{ fontSize: '2rem', color: '#0f172a' }}>{vehicles.length}</strong>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <span style={{ color: '#64748b', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>Favoris enregistrés</span>
          <strong style={{ fontSize: '2rem', color: '#eab308' }}>{favorites.length}</strong>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <span style={{ color: '#64748b', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>Résultats de recherche</span>
          <strong style={{ fontSize: '2rem', color: '#2563eb' }}>{filteredVehicles.length}</strong>
        </div>
      </div>

      {/* Barre de recherche et filtres par Marque et Pays */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} color="#0066cc" /> Recherche & Filtres
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          
          {/* Recherche textuelle globale */}
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Recherche globale..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
            />
          </div>

          {/* Filtre Marque (sans modèle) */}
          <div>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', background: '#fff' }}
            >
              <option value="">Toutes les marques</option>
              {availableBrands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Filtre Pays de provenance */}
          <div>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', background: '#fff' }}
            >
              <option value="">Tous les pays</option>
              {availableCountries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Liste des véhicules filtrés */}
      <div>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>
          Véhicules ({filteredVehicles.length})
        </h2>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
          {filteredVehicles.length === 0 ? (
            <p style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>Aucun véhicule ne correspond à vos critères de recherche.</p>
          ) : (
            filteredVehicles.map(v => {
              const ctLabel = String(v.technical_control ?? 'À vérifier')
              const isCtOk = ctLabel.toUpperCase().includes('OK')

              return (
                <div key={v.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Car size={24} color="#0066cc" />
                    <div>
                      <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.05rem' }}>{v.brand} {v.model}</strong>
                      <small style={{ color: '#64748b' }}>{v.year} — {v.mileage.toLocaleString()} km — Pays : <strong>{v.origin || 'France'}</strong></small>
                      <div style={{ marginTop: '6px', display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '0.75rem', color: '#475569' }}>
                        <span>VIN : <strong>{v.vin || 'Non renseigné'}</strong></span>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '999px',
                          background: isCtOk ? '#dcfce7' : '#fef3c7',
                          color: isCtOk ? '#166534' : '#92400e',
                          fontWeight: 600
                        }}>
                          CT : {ctLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <strong style={{ color: '#0f172a', fontSize: '1.1rem' }}>{v.price.toLocaleString()} €</strong>
                    <button onClick={() => toggleFavorite(v.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Star size={20} color={isFavorite(v.id) ? '#eab308' : '#cbd5e1'} fill={isFavorite(v.id) ? '#eab308' : 'none'} />
                    </button>
                    <Link to={`/vehicules/${v.id}`} style={{ padding: '6px 12px', background: '#f1f5f9', color: '#0f172a', borderRadius: '6px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500' }}>
                      Fiche
                    </Link>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// 2. MES VÉHICULES (Affiche uniquement les véhicules mis en favoris)
// ----------------------------------------------------
export function VehiclesPage() {
  const { vehicles, favorites, isFavorite, toggleFavorite } = useApp()
  const [search, setSearch] = useState('')

  // Récupération uniquement des véhicules mis en favoris
  const favoriteVehicles = vehicles.filter(v => favorites.includes(v.id))

  // Filtre supplémentaire sur la barre de recherche dans la page favoris
  const filteredFavorites = favoriteVehicles.filter(v =>
    `${v.brand} ${v.model} ${v.origin || ''}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Star size={26} color="#eab308" fill="#eab308" /> Mes Véhicules Favoris ({favoriteVehicles.length})
          </h1>
          <p style={{ color: '#64748b', marginTop: '4px' }}>Consultez vos véhicules enregistrés en favoris.</p>
        </div>
        <Link to="/ajouter" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: '#0066cc', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
          <Plus size={18} /> Ajouter un véhicule
        </Link>
      </div>

      {/* Barre de recherche dans les favoris */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Rechercher dans vos favoris..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
          />
        </div>
      </div>

      {/* Grille de véhicules favoris */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredFavorites.length === 0 ? (
          <div style={{ gridColumn: '1/-1', background: '#fff', border: '1px dashed #cbd5e1', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#64748b' }}>
            <Star size={32} color="#cbd5e1" style={{ marginBottom: '12px' }} />
            <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: '500' }}>Aucun véhicule dans vos favoris.</p>
            <small style={{ display: 'block', marginTop: '6px' }}>Ajoutez des véhicules en favoris depuis la "Vue d'ensemble" avec l'icône étoile ★.</small>
          </div>
        ) : (
          filteredFavorites.map(v => {
            const fav = isFavorite(v.id)
            return (
              <div key={v.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h2 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: '#0f172a' }}>{v.brand} {v.model}</h2>
                    <button
                      onClick={() => toggleFavorite(v.id)}
                      title="Retirer des favoris"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                    >
                      <Star size={22} color="#eab308" fill="#eab308" />
                    </button>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 16px 0' }}>
                    Année: {v.year} • {v.mileage.toLocaleString()} km
                  </p>
                  <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', color: '#475569', marginBottom: '16px' }}>
                    <strong>Provenance :</strong> {v.origin || 'France'}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#0066cc', marginBottom: '16px' }}>
                    {v.price.toLocaleString()} €
                  </div>
                  <Link
                    to={`/vehicules/${v.id}`}
                    style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#f1f5f9', color: '#0f172a', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}
                  >
                    Consulter le dossier
                  </Link>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

// ----------------------------------------------------
// 3. DETAIL VÉHICULE
// ----------------------------------------------------
export function VehicleDetail() {
  const { id } = useParams()
  const { vehicles, isFavorite, toggleFavorite } = useApp()
  const vehicle = vehicles.find(v => String(v.id) === String(id))

  if (!vehicle) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Véhicule introuvable</h2>
        <Link to="/vehicules" style={{ color: '#0066cc' }}>Retourner à la liste</Link>
      </div>
    )
  }

  const fav = isFavorite(vehicle.id)

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: 0 }}>{vehicle.brand} {vehicle.model}</h1>
          <button
            onClick={() => toggleFavorite(vehicle.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
          >
            <Star size={18} color={fav ? '#eab308' : '#cbd5e1'} fill={fav ? '#eab308' : 'none'} />
            {fav ? 'Dans vos favoris' : 'Ajouter aux favoris'}
          </button>
        </div>

        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0066cc', marginBottom: '24px' }}>
          {vehicle.price.toLocaleString()} €
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
          <div><strong>Marque :</strong> {vehicle.brand}</div>
          <div><strong>Modèle :</strong> {vehicle.model}</div>
          <div><strong>Année :</strong> {vehicle.year}</div>
          <div><strong>Kilométrage :</strong> {vehicle.mileage.toLocaleString()} km</div>
          <div><strong>Provenance :</strong> {vehicle.origin || 'France'}</div>
          <div><strong>Statut :</strong> <span style={{ color: '#16a34a', fontWeight: 'bold' }}>{vehicle.status}</span></div>
          <div><strong>VIN :</strong> {vehicle.vin || 'Non renseigné'}</div>
          <div>
            <strong>Contrôle technique :</strong>{' '}
            <span style={{
              display: 'inline-block',
              padding: '2px 8px',
              borderRadius: '999px',
              background: String(vehicle.technical_control ?? 'À vérifier').toUpperCase().includes('OK') ? '#dcfce7' : '#fef3c7',
              color: String(vehicle.technical_control ?? 'À vérifier').toUpperCase().includes('OK') ? '#166534' : '#92400e',
              fontWeight: 600
            }}>
              {vehicle.technical_control || 'À vérifier'}
            </span>
          </div>
        </div>

        {vehicle.notes && (
          <div style={{ marginBottom: '24px' }}>
            <h3>Notes & Commentaires :</h3>
            <p style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '6px', color: '#475569' }}>
              {vehicle.notes}
            </p>
          </div>
        )}

        {vehicle.link && (
          <a
            href={vehicle.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0066cc', textDecoration: 'none', fontWeight: '500' }}
          >
            Voir l’annonce originale <ExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
  )
}

// ----------------------------------------------------
// 4. IMPORTATION
// ----------------------------------------------------
export function Importation() {
  const [vehicleValue, setVehicleValue] = useState<number>(20000)
  const [selectedPort, setSelectedPort] = useState<string>('Fos-sur-Mer')
  const [isEU, setIsEU] = useState<boolean>(false)
  const [paid, setPaid] = useState<boolean>(false)

  const shippingCost = 2000
  const customsRate = isEU ? 0 : 0.10
  const vatRate = 0.20

  const customsDuty = (vehicleValue + shippingCost) * customsRate
  const vat = (vehicleValue + shippingCost + customsDuty) * vatRate
  const totalCost = vehicleValue + shippingCost + customsDuty + vat

  const FRENCH_PORTS = [
    { name: 'Fos-sur-Mer (Marseille)', city: 'Fos-sur-Mer', delay: '10 à 15 jours' },
    { name: 'Le Havre', city: 'Le Havre', delay: '8 à 12 jours' },
    { name: 'Marseille Port-de-Bouc', city: 'Marseille', delay: '10 à 14 jours' },
    { name: 'Brest Port', city: 'Brest', delay: '12 à 18 jours' },
    { name: 'Dunkerque Port', city: 'Dunkerque', delay: '7 à 10 jours' }
  ]

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setPaid(true)
  }

  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Ship size={28} color="#0066cc" /> Importation & Transit Maritime
        </h1>
        <p style={{ color: '#64748b' }}>
          Calculez les frais d'importation selon les réglementations françaises (Douane, TVA 20%, Fret Maritime).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h2 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '16px' }}>1. Détails du véhicule & Port</h2>

          <label style={{ display: 'block', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Prix d'achat du véhicule (€) :</span>
            <input
              type="number"
              value={vehicleValue}
              onChange={(e) => setVehicleValue(Number(e.target.value))}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Port d'arrivée en France :</span>
            <select
              value={selectedPort}
              onChange={(e) => setSelectedPort(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem', background: '#fff' }}
            >
              {FRENCH_PORTS.map(p => (
                <option key={p.name} value={p.city}>{p.name} ({p.delay})</option>
              ))}
            </select>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '16px' }}>
            <input
              type="checkbox"
              checked={isEU}
              onChange={(e) => setIsEU(e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span style={{ fontSize: '0.9rem' }}>Provenance UE (Exonéré de douanes)</span>
          </label>

          <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '8px', border: '1px solid #bfdbfe', fontSize: '0.85rem', color: '#1e40af' }}>
            <Anchor size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            Transport maritime par Bateau (Ro-Ro / Conteneur) : <strong>2 000 € inclus</strong>.
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '16px' }}>2. Calcul selon Réglementation FR</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span>Prix Véhicule :</span>
              <strong>{vehicleValue.toLocaleString()} €</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span>Fret Maritime (Bateau -&gt; {selectedPort}) :</span>
              <strong>2 000 €</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span>Frais de Douane FR ({isEU ? '0%' : '10%'}) :</span>
              <strong>{customsDuty.toLocaleString()} €</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span>TVA Française (20%) :</span>
              <strong>{vat.toLocaleString()} €</strong>
            </div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '2px solid #0f172a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Coût Total d'Importation :</span>
              <strong style={{ fontSize: '1.5rem', color: '#0066cc' }}>{totalCost.toLocaleString()} €</strong>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ fontSize: '1.3rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CreditCard size={22} color="#0066cc" /> Règlement du dossier d'Importation
        </h2>

        {paid ? (
          <div style={{ padding: '20px', background: '#dcfce7', border: '1px solid #86efac', borderRadius: '8px', color: '#15803d', textAlign: 'center' }}>
            <CheckCircle size={32} style={{ marginBottom: '8px' }} />
            <h3 style={{ margin: 0 }}>Paiement de l'importation confirmé !</h3>
            <p style={{ margin: '4px 0 0 0' }}>Votre transporteur prendra contact pour la livraison au port de {selectedPort}.</p>
          </div>
        ) : (
          <form onSubmit={handlePayment} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
            <label style={{ gridColumn: '1 / -1' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Nom sur la carte :</span>
              <input type="text" required placeholder="Camille Martin" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </label>
            <label style={{ gridColumn: '1 / -1' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Numéro de Carte Bancaire :</span>
              <input type="text" required placeholder="4970 **** **** ****" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </label>
            <label>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Date d'exp. :</span>
              <input type="text" required placeholder="MM/YY" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </label>
            <label>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>CVC :</span>
              <input type="text" required placeholder="123" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </label>

            <button
              type="submit"
              style={{ gridColumn: '1 / -1', padding: '14px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}
            >
              Valider et Payer l'Importation ({totalCost.toLocaleString()} €)
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// ----------------------------------------------------
// 5. NOUVEAU DOSSIER / AJOUTER UN VÉHICULE
// ----------------------------------------------------
export function AddVehicle() {
  const { addVehicle } = useApp()
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    origin: 'France',
    link: '',
    notes: ''
  })
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addVehicle({
      brand: formData.brand,
      model: formData.model,
      year: Number(formData.year),
      price: Number(formData.price),
      mileage: Number(formData.mileage),
      origin: formData.origin,
      link: formData.link,
      notes: formData.notes
    })
    setSuccess(true)
  }

  return (
    <div style={{ padding: '24px', maxWidth: '650px', margin: '0 auto' }}>
      <h1 style={{ margin: 0 }}>Nouveau Dossier Véhicule</h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>Renseignez les détails pour ajouter un véhicule à votre liste.</p>

      {success ? (
        <div style={{ background: '#dcfce7', border: '1px solid #86efac', padding: '20px', borderRadius: '8px', color: '#15803d', textAlign: 'center' }}>
          <CheckCircle size={32} style={{ marginBottom: '8px' }} />
          <h3>Véhicule ajouté avec succès !</h3>
          <p>Vous le retrouverez directement dans la Vue d'ensemble.</p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link to="/" style={{ padding: '8px 16px', background: '#15803d', color: '#fff', borderRadius: '6px', textDecoration: 'none' }}>
              Voir la Vue d'ensemble
            </Link>
            <button onClick={() => setSuccess(false)} style={{ padding: '8px 16px', background: '#fff', border: '1px solid #15803d', color: '#15803d', borderRadius: '6px', cursor: 'pointer' }}>
              Ajouter un autre
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <label>
              <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Marque *</strong>
              <input type="text" required placeholder="ex: BMW, Porsche..." value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </label>
            <label>
              <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Modèle *</strong>
              <input type="text" required placeholder="ex: Série 3, 911..." value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <label>
              <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Année *</strong>
              <input type="number" required value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value as any })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </label>
            <label>
              <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Prix (€) *</strong>
              <input type="number" required placeholder="25000" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </label>
            <label>
              <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Kilométrage *</strong>
              <input type="number" required placeholder="50000" value={formData.mileage} onChange={e => setFormData({ ...formData, mileage: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </label>
          </div>

          <label>
            <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Pays de provenance</strong>
            <select value={formData.origin} onChange={e => setFormData({ ...formData, origin: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}>
              <option value="France">France</option>
              <option value="Allemagne">Allemagne</option>
              <option value="Suisse">Suisse</option>
              <option value="Italie">Italie</option>
              <option value="Japon">Japon</option>
              <option value="États-Unis">États-Unis</option>
            </select>
          </label>

          <label>
            <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Lien de l’annonce (Optionnel)</strong>
            <input type="url" placeholder="https://..." value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </label>

          <label>
            <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Notes / Informations complémentaires</strong>
            <textarea rows={3} placeholder="Option, état de la carrosserie..." value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </label>

          <button type="submit" style={{ padding: '12px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}>
            Créer et sauvegarder le dossier
          </button>
        </form>
      )}
    </div>
  )
}

// ----------------------------------------------------
// 6. MON COMPTE
// ----------------------------------------------------
export function Profile() {
  const { user, updateUser } = useApp()
  const [formData, setFormData] = useState(user)
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUser(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Mon Compte</h1>
      {saved && <div style={{ padding: '12px', background: '#dcfce7', color: '#15803d', borderRadius: '6px', marginBottom: '16px' }}>✓ Modifications enregistrées !</div>}
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <label>
          <strong>Nom complet :</strong>
          <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        </label>
        <label>
          <strong>Email :</strong>
          <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        </label>
        <label>
          <strong>Téléphone :</strong>
          <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        </label>
        <button type="submit" style={{ padding: '12px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Sauvegarder</button>
      </form>
    </div>
  )
}

// ----------------------------------------------------
// 7. NOT FOUND
// ----------------------------------------------------
export function NotFound() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>404 - Page non trouvée</h1>
      <Link to="/" style={{ color: '#0066cc' }}>Retour à l'accueil</Link>
    </div>
  )
}