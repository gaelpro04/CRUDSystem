# Tools Inventory
 
A full-stack inventory management system for tracking tools and equipment across categories. Built with vanilla JavaScript, Node.js, and SQLite.

## Preview
 
![Tools Inventory Screenshot](frontend/logo_hexagono2.png)

## Features
 
- **Add, edit, and delete** inventory items in real time
- **Live search** — filters the table as you type, matching by name
- **Automatic stock state** — each item's status (`available`, `low stock`, `out of stock`) is calculated server-side based on its amount
- **Category support** — Electronics, Tools, Consumable, Mechanical, Security
- **Persistent storage** — all data stored in a SQLite database via a REST API

## Tech Stack
 
**Frontend**
- Vanilla JavaScript (no framework)
- HTML + CSS
- Event delegation for dynamic table interactions
**Backend**
- Node.js + Express
- SQLite via `better-sqlite3` (synchronous, file-based)
- REST API: `GET`, `POST`, `PUT`, `DELETE`

  ## Architecture
 
The `state` field (`available` / `low stock` / `out of stock`) is **calculated on the backend**, not trusted from the client. 
This keeps business logic server-side and ensures the database stays consistent regardless of what the frontend sends.
Each tool is represented as a class with a private `#calculateState` method that derives the state from the `amount` field 
the frontend never sets state directly.
