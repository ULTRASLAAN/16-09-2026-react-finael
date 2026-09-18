const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'autotrust_db',
  password: 'postgres',
  port: 5432,
});

function normalizeVehicle(vehicle) {
  return {
    id: vehicle.id,
    brand: vehicle.brand || vehicle.make || 'Inconnue',
    model: vehicle.model || 'Modèle inconnu',
    year: Number(vehicle.year ?? 0),
    price: Number(vehicle.price_eur ?? vehicle.price ?? 0),
    mileage: Number(vehicle.mileage ?? vehicle.mileage_km ?? 0),
    origin: vehicle.origin_country || vehicle.origin || vehicle.country || 'France',
    vin: vehicle.vin || vehicle.vin_number || vehicle.vinNumber || '',
    technical_control:
      vehicle.technical_control ||
      vehicle.technicalControl ||
      vehicle.control_technique ||
      'À vérifier',
    image:
      vehicle.image ||
      vehicle.image_url ||
      vehicle.photo_url ||
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80',
    status: vehicle.status || 'inconnu',
    notes: vehicle.notes || '',
    link: vehicle.link || ''
  };
}

app.get('/api/vehicles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vehicles ORDER BY id DESC');
    const vehicles = result.rows.map(normalizeVehicle);
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des véhicules' });
  }
});

app.get('/api/vehicles/:id/mileage', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM mileage_history WHERE vehicle_id = $1 ORDER BY reading_date ASC',
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération de l'historique" });
  }
});

app.post('/api/vehicles', async (req, res) => {
  const { vin, make, model, year, price, country, image } = req.body;
  const brandValue = make || 'Inconnue';

  try {
    const result = await pool.query(
      `INSERT INTO vehicles (vin, brand, model, year, price_eur, origin_country, destination_country, user_id, image)
       VALUES ($1, $2, $3, $4, $5, $6, 'France', 1, $7) RETURNING *`,
      [vin, brandValue, model, year, price, country, image || null]
    );
    res.status(201).json(normalizeVehicle(result.rows[0]));
  } catch (err) {
    console.error('Erreur PostgreSQL :', err.message);
    res.status(500).json({ error: "Erreur lors de l'ajout du véhicule" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur API démarré sur http://localhost:${PORT}`);
});