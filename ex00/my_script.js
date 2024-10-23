
// Lista de habilidades sugeridas (puedes personalizarla)
const habilidadesSugeridas = [
  'Impulso', 'Pararrayos', 'Llamarada', 'Escudo de fuego',
  'Hidropulso', 'Terremoto', 'Rayo Solar', 'Hoja Aguda',
  // Agrega más habilidades según tus necesidades
];

// Obtener referencias a los selectores
const selectAnimal1 = document.getElementById('animal1');
const selectAnimal2 = document.getElementById('animal2');
const selectAbilities = document.getElementById('abilities');

// Función para obtener los Pokémon y agregarlos a los selectores
async function obtenerPokemon() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    const pokemonList = data.results;

    // Agregar los Pokémon a los selectores de animal1 y animal2
    pokemonList.forEach(pokemon => {
      const option = document.createElement('option');
      option.value = pokemon.name;
      option.textContent = pokemon.name;
      selectAnimal1.appendChild(option.cloneNode(true));
      selectAnimal2.appendChild(option.cloneNode(true));
    });

    // Cargar las habilidades sugeridas al cargar la página
    obtenerHabilidades();
  } catch (error) {
  }
}

// Función para obtener y mostrar las habilidades sugeridas
function obtenerHabilidades() {
  // Limpiar el selector de habilidades
  selectAbilities.innerHTML = '';

  // Agregar las habilidades sugeridas al selector
  habilidadesSugeridas.forEach(habilidad => {
    const option = document.createElement('option');
    option.value = habilidad;
    option.textContent = habilidad;
    selectAbilities.appendChild(option);
  });

  // Permitir la selección múltiple
  selectAbilities.multiple = true;
}

// Llamar a la función para obtener los Pokémon al cargar la página
obtenerPokemon();

// Agregar un evento para actualizar las habilidades al cambiar el Pokémon seleccionado
// (Opcional, si quieres que las habilidades dependan del Pokémon)
// selectAnimal1.addEventListener('change', () => {
//   // Lógica para actualizar las habilidades basadas en el Pokémon seleccionado
// });
// selectAnimal2.addEventListener('change', () => {
//   // Lógica para actualizar las habilidades basadas en el Pokémon seleccionado
// });

// ... (tu código existente)

pokemonForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // ... (tu código existente para obtener los valores de los selectores)

  try {
    const { nombre, descripcion } = await generarDescripcionPokemon(animal1, animal2, selectAbilities[0]);

    // Actualizamos el elemento existente
    document.getElementById('your-created-pokemon').textContent = `
      **Nombre:** ${nombre}
      **Habilidad:** ${selectAbilities[0]}
      **Descripción:** ${descripcion}
    `;
  } catch (error) {
    console.error('Error al generar la descripción:', error);
  }
});


// Llamar a la función para obtener los Pokémon al cargar la página
obtenerPokemon();