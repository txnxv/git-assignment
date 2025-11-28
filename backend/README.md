# My Contact Hub Backend

This is a simple Node.js + Express backend for the contact book app, using SQLite for storage.

## Setup

1. Install dependencies:

```sh
cd backend
npm install
```

2. Start the backend server:

```sh
npm run dev
```

The server will run at http://localhost:4000

## API Endpoints

- `GET /api/contacts?q=search` — List or search contacts
- `POST /api/contacts` — Add a new contact
- `PUT /api/contacts/:id` — Edit a contact
- `DELETE /api/contacts/:id` — Delete a contact

## Notes

- CORS is enabled for local frontend development.
- The SQLite database file (`contacts.db`) will be created in the backend folder.
