import React from "react";
import { useState } from "react";
import style from "./navBar.module.css";
import { Link } from "react-router-dom";

export default function NavBar(onSearch) {
  const [query, setQuery] = useState("");
  function handleChange(event) {
    const value = event.target.value;
    setQuery(value);
  }
  return (
    <nav className={style.containerNav}>
      <div className={style.navItems}>
        <Link to="/landing">Inicio</Link>
        <Link to="/jobs">Trabajos</Link>
      </div>

      <div className={style.searchContainer}>
        <input
          placeholder="Buscar trabajos..."
          type="search"
          value={query}
          onChange={handleChange}
          className={style.searchInput}
        />

        <button className={style.searchButton} onClick={() => onSearch(query)}>
          Buscar
        </button>
      </div>
    </nav>
  );
}
