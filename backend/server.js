const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'autotrust_db',
  password: 'postgres', // <--- Mets ton mot de passe pgAdmin ici
  port: 5432,
});

// Route 1 : Récupérer la liste des véhicules
app.get('/api/vehicles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vehicles ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des véhicules' });
  }
});

// Route 2 : Récupérer l'historique kilométrique d'un véhicule
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
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'historique' });
  }
});

// Route 3 : Ajouter un véhicule
app.post('/api/vehicles', async (req, res) => {
  const { vin, make, model, year, price, country } = req.body;
  const brandValue = make || 'Inconnue'; // Utilise la marque saisie dans le formulaire

  try {
    const result = await pool.query(
      `INSERT INTO vehicles (vin, brand, model, year, price_eur, origin_country, destination_country, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, 'France', 1) RETURNING *`,
      [vin, brandValue, model, year, price, country]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur PostgreSQL :', err.message);
    res.status(500).json({ error: 'Erreur lors de l\'ajout du véhicule' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur API démarré sur http://localhost:${PORT}`);
});