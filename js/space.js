// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const inputBuscar = document.getElementById('inputBuscar');
    const btnBuscar = document.getElementById('btnBuscar');
    const contenedor = document.getElementById('contenedor');
  
    // Función para realizar la búsqueda en la API de NASA
    async function buscarImagenes(query) {
      const url = `https://images-api.nasa.gov/search?q=${query}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        mostrarResultados(data.collection.items);
      } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
        contenedor.innerHTML = '<p>Error al cargar los resultados. Intenta nuevamente.</p>';
      }
    }
  
    // Función para mostrar los resultados en el HTML
    function mostrarResultados(items) {
      contenedor.innerHTML = ''; // Limpiar resultados anteriores
  
      if (items.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
      }
  
      items.forEach(item => {
        const { title, description, date_created } = item.data[0];
        const imageUrl = item.links ? item.links[0].href : 'https://via.placeholder.com/150';
  
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.style.maxWidth = '540px';
  
        card.innerHTML = `
          <div class="card-group">
              <div class="card">
                <img src="${imageUrl}" class="img-fluid rounded-start" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description || 'Sin descripción disponible.'}</p>
                    <p class="card-text"><small class="text-muted">${new Date(date_created).toLocaleDateString()}</small></p>
                </div>
                </div>
          </div>
        `;
        contenedor.appendChild(card);
      });
    }
  
    // Event listener para el botón de búsqueda
    btnBuscar.addEventListener('click', () => {
      const query = inputBuscar.value.trim();
      if (query) {
        buscarImagenes(query);
      } else {
        contenedor.innerHTML = '<p>Por favor, ingresa un término de búsqueda.</p>';
      }
    });
  });
  