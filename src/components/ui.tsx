import { memo } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowUpRight, Check, FileText, Heart, MoreHorizontal } from 'lucide-react'
import type { ReactNode } from 'react'
import type { DocumentItem, Vehicle } from '../data'
import { useApp } from '../context/AppContext'

export function StatusBadge({ status }: { status: Vehicle['status'] }) {
  const labels = { verified: 'Vérifié', review: 'À vérifier', incomplete: 'Incomplet' }
  return <span className={`status-badge ${status}`}><span className="status-dot" />{labels[status]}</span>
}

export function ProgressRing({ value }: { value: number }) {
  return <div className="progress-ring" style={{ '--progress': `${value * 3.6}deg` } as React.CSSProperties}><strong>{value}%</strong><small>complet</small></div>
}

export function StatCard({ label, value, detail, icon, tone = 'neutral' }: { label: string; value: string; detail: string; icon: ReactNode; tone?: string }) {
  return <article className={`stat-card ${tone}`}><div className="stat-icon">{icon}</div><div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></article>
}

export const VehicleCard = memo(function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const { state, dispatch } = useApp()
  const isFavorite = state.favorites.includes(vehicle.id)
  return <article className="vehicle-card">
    <div className="vehicle-image"><img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} /><button className={`icon-button ${isFavorite ? 'liked' : ''}`} aria-label="Ajouter aux favoris" onClick={() => dispatch({ type: 'toggle_favorite', id: vehicle.id })}><Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} /></button><span className="country-tag">{vehicle.country}</span></div>
    <div className="vehicle-card-body"><div className="card-topline"><span>{vehicle.year} · {vehicle.mileage.toLocaleString('fr-FR')} km</span><StatusBadge status={vehicle.status} /></div><h3>{vehicle.make} {vehicle.model}</h3><div className="vehicle-price">{vehicle.price.toLocaleString('fr-FR')} € <small>hors import</small></div><div className="vehicle-card-footer"><span>Dossier {vehicle.completion}% vérifié</span><Link to={`/vehicules/${vehicle.id}`} aria-label={`Voir ${vehicle.make} ${vehicle.model}`}><ArrowUpRight size={18} /></Link></div></div>
  </article>
})

export function DocumentRow({ document }: { document: DocumentItem }) {
  return <div className="document-row"><span className={`document-icon ${document.status}`}><FileText size={17} /></span><div><strong>{document.name}</strong><small>{document.detail}</small></div><span className={`document-status ${document.status}`}>{document.status === 'verified' ? <><Check size={14} /> Vérifié</> : document.status === 'review' ? <><AlertTriangle size={14} /> À examiner</> : 'Manquant'}</span></div>
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return <div className="section-heading"> <div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2></div>{action}</div>
}

export function EmptyState({ children }: { children: ReactNode }) { return <div className="empty-state"><MoreHorizontal size={24} />{children}</div> }
