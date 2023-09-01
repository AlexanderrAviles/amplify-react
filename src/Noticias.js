import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Noticias() {
  const [noticias, setNoticias] = useState([]);

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
        console.log(response.data.records);
        const data = response.data.records.map((record) => ({
          id: record.id,
          fecha_publicacion: record.fields.fecha_publicacion,
          titular: record.fields.titular,
          contenido: record.fields.contenido,
          galeria: record.fields.galeria[0].thumbnails.large.url,
          autor: record.fields.autor,
          estado: record.fields.estado,
        }));

        // Actualiza el estado del componente con los datos de Airtable
        setNoticias(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de Airtable:", error);
      });
  }, []);

  return (
    <div className="container">
      <h1 class="text-center">Noticias</h1>
      <div class="row">
        {noticias.map((noticia) => (
          <div key={noticia.id} class="card mb-2 me-2" style={{width: 25 + 'rem', height: 40+'rem'}}>
              <img
                src={noticia.galeria}
                alt="Imagen de noticia" class="card-img-top"
                style={{ maxWidth: '398px', maxHeight: '200px', objectFit: 'cover' }}

              />
              <div class="card-body">
              <h5  class="card-title">{noticia.titular}</h5>
              <p><strong>Fecha de publicación:</strong> {noticia.fecha_publicacion}</p>
              <p >{noticia.autor}</p>
              {noticia.contenido && (
              <p class="card-text">
                {noticia.contenido.substring(0, 300)}
              </p>
            )}
            </div>
            <br></br>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Noticias;
