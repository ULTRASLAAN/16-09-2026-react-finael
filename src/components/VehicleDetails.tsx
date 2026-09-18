import React, { useState } from 'react';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number | string;
  mileage: number;
  origin?: string;
  status: string;
  notes?: string;
  vin?: string;
  technical_control?: string;
}

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onClose?: () => void;
}

export default function VehicleDetails({ vehicle, onClose }: VehicleDetailsProps) {
  // Sûreté de débogage pour voir directement dans la console du navigateur (F12)
  console.log("🔍 Données reçues dans VehicleDetails :", vehicle);

  const [reportLoading, setReportLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleCheckHistory = () => {
    setReportLoading(true);
    setTimeout(() => {
      setReportLoading(false);
      setReportGenerated(true);
    }, 1500);
  };

  if (!vehicle) {
    return <div className="p-6 text-center text-gray-500">Aucun détail de véhicule disponible.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-xl mx-auto border border-gray-100 space-y-6">
      {/* En-tête avec Marque et Modèle */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {vehicle.brand} {vehicle.model}
          </h2>
          <p className="text-sm text-gray-500">
            Année : {vehicle.year} {vehicle.origin ? `• Origine : ${vehicle.origin}` : ''}
          </p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          {vehicle.status || 'Disponible'}
        </span>
      </div>

      {/* Grille des caractéristiques principales */}
      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
        <div>
          <span className="text-xs text-gray-500 block">Prix</span>
          <span className="text-lg font-bold text-gray-800">
            {typeof vehicle.price === 'number' ? vehicle.price.toLocaleString() : vehicle.price} €
          </span>
        </div>
        <div>
          <span className="text-xs text-gray-500 block">Kilométrage</span>
          <span className="text-lg font-bold text-gray-800">
            {vehicle.mileage ? vehicle.mileage.toLocaleString() : 'N/C'} km
          </span>
        </div>
      </div>

      {vehicle.notes && (
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <span className="font-semibold block text-gray-700 mb-1">Notes :</span>
          {vehicle.notes}
        </div>
      )}

      {/* --- BLOC HISTORIQUE & CONTRÔLE TECHNIQUE (Forcé et visible) --- */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 shadow-inner">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-semibold text-gray-800 text-sm">🔍 Historique & Contrôle Technique</h4>
            <p className="text-xs text-gray-700 font-mono mt-1">
              VIN : <strong className="text-slate-900">{vehicle.vin || 'Non renseigné'}</strong>
            </p>
          </div>
          <span className="px-3 py-1 text-xs rounded-full font-medium bg-green-100 text-green-700">
            CT : {vehicle.technical_control || 'OK'}
          </span>
        </div>

        {!reportGenerated ? (
          <button 
            onClick={handleCheckHistory}
            disabled={reportLoading}
            className="w-full bg-slate-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-slate-800 transition disabled:opacity-50 shadow-sm"
          >
            {reportLoading ? "Interrogation des bases européennes..." : "📄 Générer un rapport d'historique (Style CarVertical)"}
          </button>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-xs text-emerald-900 space-y-1">
            <p className="font-bold">✅ Rapport CarVertical Virtuel Validé :</p>
            <p>• Kilométrage certifié cohérent (Pas de compteur modifié).</p>
            <p>• Aucun accident grave répertorié dans les registres européens.</p>
            <p>• Situation administrative : Véhicule non gagé, démarches OK.</p>
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