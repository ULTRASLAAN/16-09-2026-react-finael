import { Profiler, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate, BrowserRouter, Route, Routes } from 'react-router-dom'
import { Bell, CarFront, ChevronDown, FileCheck2, Gauge, Globe2, Home, LogOut, Menu, Settings, ShieldCheck, X } from 'lucide-react'
import { AppProvider } from './context/AppContext'
import { AddVehicle, Dashboard, Importation, NotFound, VehicleDetail, VehiclesPage } from './pages/Pages'
import './App.css'

function Layout() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const links = [{ to: '/', label: 'Vue d’ensemble', icon: Home }, { to: '/vehicules', label: 'Mes véhicules', icon: CarFront }, { to: '/importation', label: 'Importation', icon: Globe2 }]
  return <div className="app-shell"><aside className={`sidebar ${open ? 'open' : ''}`}><div className="brand"><span className="brand-mark"><ShieldCheck size={19} /></span><span>Auto<span>Trust</span></span><button className="close-sidebar" onClick={() => setOpen(false)}><X size={18} /></button></div><div className="workspace-switch"><span className="avatar small">CM</span><div><strong>Camille Martin</strong><small>Espace acheteur</small></div><ChevronDown size={15} /></div><nav>{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}><Icon size={18} />{label}</NavLink>)}</nav><div className="nav-label">VOTRE ESPACE</div><nav><NavLink to="/ajouter" onClick={() => setOpen(false)}><FileCheck2 size={18} />Nouveau dossier</NavLink><button className="nav-button"><Gauge size={18} />Rapports<span className="soon">Bientôt</span></button></nav><div className="sidebar-bottom"><button className="nav-button"><Settings size={18} />Paramètres</button><button className="nav-button"><LogOut size={18} />Déconnexion</button><div className="sidebar-note"><span className="online-dot" />Données locales activées</div></div></aside><div className="main-area"><header className="topbar"><button className="mobile-menu" onClick={() => setOpen(true)}><Menu size={21} /></button><div className="breadcrumb">Espace personnel <span>/</span> <strong>{location.pathname === '/' ? 'Vue d’ensemble' : 'AutoTrust'}</strong></div><div className="top-actions"><button className="icon-button notification"><Bell size={18} /><i /></button><div className="profile" onClick={() => navigate('/')}><span className="avatar">CM</span><div><strong>Camille Martin</strong><small>Particulier</small></div><ChevronDown size={15} /></div></div></header><Outlet /></div></div>
}

export default function App() { return <AppProvider><BrowserRouter><Profiler id="autotrust-app" onRender={() => undefined}><Routes><Route element={<Layout />}><Route path="/" element={<Dashboard />} /><Route path="/vehicules" element={<VehiclesPage />} /><Route path="/vehicules/:id" element={<VehicleDetail />} /><Route path="/ajouter" element={<AddVehicle />} /><Route path="/importation" element={<Importation />} /><Route path="*" element={<NotFound />} /></Route></Routes></Profiler></BrowserRouter></AppProvider> }
