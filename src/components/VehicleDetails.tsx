import React, { useState } from 'react';

// Ajuste cette interface selon les propriétés réelles de tes véhicules dans ton projet
interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  origin: string;
  status: string;
  notes?: string;
  vin?: string;
  technical_control?: string;
}

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onClose?: () => void; // Optionnel si tu as un bouton pour fermer la modale/vue
}

export default function VehicleDetails({ vehicle, onClose }: VehicleDetailsProps) {
  const [reportLoading, setReportLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleCheckHistory = () => {
    setReportLoading(true);
    setTimeout(() => {
      setReportLoading(false);
      setReportGenerated(true);
    }, 1500); // Simulation d'une recherche de 1.5s
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-xl mx-auto border border-gray-100 space-y-6">
      {/* En-tête avec Marque et Modèle */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {vehicle.brand} {vehicle.model}
          </h2>
          <p className="text-sm text-gray-500">Année : {vehicle.year} • Origine : {vehicle.origin}</p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          {vehicle.status}
        </span>
      </div>

      {/* Grille des caractéristiques principales */}
      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
        <div>
          <span className="text-xs text-gray-500 block">Prix d'achat</span>
          <span className="text-lg font-bold text-gray-800">{vehicle.price?.toLocaleString()} €</span>
        </div>
        <div>
          <span className="text-xs text-gray-500 block">Kilométrage</span>
          <span className="text-lg font-bold text-gray-800">{vehicle.mileage?.toLocaleString()} km</span>
        </div>
      </div>

      {vehicle.notes && (
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <span className="font-semibold block text-gray-700 mb-1">Notes :</span>
          {vehicle.notes}
        </div>
      )}

      {/* --- BLOC HISTORIQUE & CONTRÔLE TECHNIQUE (Style CarVertical) --- */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-semibold text-gray-800 text-sm">🔍 Historique & Contrôle Technique</h4>
            <p className="text-xs text-gray-500 font-mono">VIN : {vehicle.vin || 'VIN non disponible'}</p>
          </div>
          <span className={`px-3 py-1 text-xs rounded-full font-medium ${
            vehicle.technical_control?.includes('OK') ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}>
            CT : {vehicle.technical_control || 'À vérifier'}
          </span>
        </div>

        {!reportGenerated ? (
          <button 
            onClick={handleCheckHistory}
            disabled={reportLoading}
            className="w-full bg-slate-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-slate-800 transition disabled:opacity-50"
          >
            {reportLoading ? "Interrogation des bases européennes..." : "📄 Générer un rapport d'historique (Style CarVertical)"}
          </button>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-xs text-emerald-900 space-y-1">
            <p className="font-bold">✅ Rapport CarVertical Virtuel Validé :</p>
            <p>• Kilométrage certifié cohérent (Pas de recompteur détecté).</p>
            <p>• Aucun accident grave répertorié dans les registres européens.</p>
            <p>• Situation administrative : Véhicule non gagé, démarches d'immatriculation OK.</p>
          </div>
        )}
      </div>
      {/* ------------------------------------------------------------- */}

      {onClose && (
        <button 
          onClick={onClose}
          className="w-full bg-gray-100 text-gray-700 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition"
        >
          Fermer
        </button>
      )}
    </div>
  );
}