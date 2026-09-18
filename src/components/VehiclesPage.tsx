import React, { useEffect, useState } from 'react';
import VehicleCard from '../components/VehicleCard'; // Ajuste le chemin '../' si besoin

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Remplace par ton URL d'API backend si elle est différente (ex: http://localhost:5000/api/vehicles)
    fetch('http://localhost:5000/api/vehicles')
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des véhicules");
        return res.json();
      })
      .then((data) => {
        setVehicles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-slate-600 font-medium">Chargement du catalogue AutoTrust...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-600">Erreur : {error}</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Catalogue AutoTrust</h1>
        <p className="text-sm text-slate-500">Gestion des véhicules, fiscalité import & vérification historique.</p>
      </div>

      {/* Grille responsive des cartes de véhicules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((car: any) => (
          <VehicleCard key={car.id || car.vin} vehicle={car} />
        ))}
      </div>
    </div>
  );
}