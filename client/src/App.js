import React, { useEffect, useState } from "react";
import "./App.css";
import { getUsers, addUser, deleteUser } from "./api/users"; // keep your existing API utils

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [users, setUsers] = useState([]);

  async function load() {
    const data = await getUsers();
    setUsers(data || []);
  }
  useEffect(() => { load(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    await addUser({ name, email, role });
    setName(""); setEmail(""); setRole("User");
    load();
  }

  return (
    <>
      {/* Top bar */}
      <div className="nav">
        <div className="nav-inner">
          <div className="brand">
            <span className="brand-badge" />
            <span>User Management App</span>
          </div>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">Docs</a>
            <a href="#">About</a>
          </div>
        </div>
      </div>

      <div className="app">
        <h1 className="page-title">User Management App</h1>

        <div className="card">
          <h3 className="section-title">Add User</h3>

          <form className="form" onSubmit={handleAdd}>
            <div>
              <label className="label">Name</label>
              <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Jane Doe" />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="jane@company.com" />
            </div>
            <div>
              <label className="label">Role</label>
              <select className="select" value={role} onChange={e=>setRole(e.target.value)}>
                <option>User</option>
                <option>Admin</option>
                <option>Manager</option>
              </select>
            </div>
            <button className="btn btn-primary" type="submit">Add User</button>
          </form>

          <h3 className="section-title mt-20">User List</h3>
          <ul className="list">
            {users.map(u => (
              <li key={u.id} className="item">
                <div>
                  <div className="name">{u.name}</div>
                  <div className="meta">{u.email} • {u.role}</div>
                </div>
                <div className="actions">
                  <button className="btn btn-ghost" onClick={() => { /* TODO: edit */ }}>Edit</button>
                  <button className="btn btn-primary" onClick={async () => { await deleteUser(u.id); load(); }}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
            {users.length === 0 && <li className="item center">No users yet</li>}
          </ul>
        </div>
      </div>
    </>
  );
}
