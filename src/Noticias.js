import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNoticias, setFilteredNoticias] = useState([]);

  useEffect(() => {
    const apiKey = "key4Ft3bPETfNsC3J";
    const apiUrl = "https://api.airtable.com/v0/app80PZBkfWF8gQdR/Noticias";

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((response) => {
        // Extrae los datos que necesitas de la respuesta
        const data = response.data.records.map((record) => ({
          id: record.id,
          fecha_publicacion: record.fields.fecha_publicacion,
          titular: record.fields.titular,
          contenido: record.fields.contenido,
          galeria: record.fields.galeria[0].thumbnails.large.url,
          autor: record.fields.autor,
          estado: record.fields.estado,
        }));

        // Inicializa las noticias filtradas con todas las noticias
        setFilteredNoticias(data);

        // Actualiza el estado del componente con los datos de Airtable
        setNoticias(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de Airtable:", error);
      });
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filtra las noticias basadas en el término de búsqueda
    const filtered = noticias.filter((noticia) => {
      return (
        noticia.titular.toLowerCase().includes(value.toLowerCase()) ||
        (noticia.contenido &&
          noticia.contenido.toLowerCase().includes(value.toLowerCase()))
      );
    });

    // Actualiza el estado de las noticias filtradas
    setFilteredNoticias(filtered);
  };

  return (
    <div className="container">
      <h1 className="text-center">Noticias</h1>
        <label for="buscador" className="form-label">Buscar Noticia:</label>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        id="buscador"
        className="form-control mb-3"
      />
      <div className="row">
        {filteredNoticias.map((noticia) => (
          <div
            key={noticia.id}
            className="card mb-2 me-2"
            style={{ width: "25rem", height: "40rem" }}
          >
            <img
              src={noticia.galeria}
              alt="Imagen de noticia"
              className="card-img-top"
              style={{
                maxWidth: "398px",
                minWidth: "300px",
                minHeight: "200px",
                maxHeight: "200px",
                objectFit: "cover",
              }}
            />
            <div className="card-body">
              <h5 className="card-title">{noticia.titular}</h5>
              <p>
                <strong>Fecha de publicación:</strong>{" "}
                {noticia.fecha_publicacion}
              </p>
              <p>{noticia.autor}</p>
              {noticia.contenido && (
                <p className="card-text">
                  {noticia.contenido.substring(0, 300)}
                </p>
              )}
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Noticias;
