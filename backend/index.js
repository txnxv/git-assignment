import express from 'express';
import cors from 'cors';
import dbPromise, { initDb } from './db.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Initialize DB
initDb();

// Get all contacts or search
app.get('/api/contacts', async (req, res) => {
  const db = await dbPromise;
  const { q } = req.query;
  let contacts;
  if (q) {
    const query = `%${q}%`;
    contacts = await db.all(
      `SELECT * FROM contacts WHERE 
        first_name LIKE ? OR 
        last_name LIKE ? OR 
        phone LIKE ? OR 
        email LIKE ? OR 
        address LIKE ?
        ORDER BY created_at DESC`,
      query, query, query, query, query
    );
  } else {
    contacts = await db.all('SELECT * FROM contacts ORDER BY created_at DESC');
  }
  res.json(contacts);
});

// Add a new contact
app.post('/api/contacts', async (req, res) => {
  const db = await dbPromise;
  const { first_name, last_name, phone, email, address } = req.body;
  try {
    const result = await db.run(
      `INSERT INTO contacts (first_name, last_name, phone, email, address) VALUES (?, ?, ?, ?, ?)`,
      first_name, last_name, phone, email, address
    );
    const contact = await db.get('SELECT * FROM contacts WHERE contact_id = ?', result.lastID);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Edit a contact
app.put('/api/contacts/:id', async (req, res) => {
  const db = await dbPromise;
  const { id } = req.params;
  const { first_name, last_name, phone, email, address } = req.body;
  try {
    await db.run(
      `UPDATE contacts SET first_name = ?, last_name = ?, phone = ?, email = ?, address = ? WHERE contact_id = ?`,
      first_name, last_name, phone, email, address, id
    );
    const contact = await db.get('SELECT * FROM contacts WHERE contact_id = ?', id);
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a contact
app.delete('/api/contacts/:id', async (req, res) => {
  const db = await dbPromise;
  const { id } = req.params;
  try {
    await db.run('DELETE FROM contacts WHERE contact_id = ?', id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
