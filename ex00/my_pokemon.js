
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: 'AIzaSyAyKPCfEAn1-9HEuAhLdUjcmc9fkWA-ZOs',
});
const openai = new OpenAIApi(configuration);

async function generarDescripcionPokemon(pokemon1, pokemon2, habilidad) {
  const prompt = `Create a detailed description of a new Pokemon. It's a fusion of ${pokemon1} and ${pokemon2}. Its primary ability is ${habilidad}. Describe its appearance, type, abilities, and any unique characteristics. The description should be around 169 words and written in English. Also, provide a unique name for the new Pokemon.`;

  try {
	console.log('Llamando a la API con los siguientes parámetros:');
	console.log('Pokémon 1:', pokemon1);
	console.log('Pokémon 2:', pokemon2);
	console.log('Habilidad:', habilidad);
  
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 400,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

	console.log('Respuesta de la API:', completion.data.choices[0].text);

    // Extraemos la información del resultado
    const descripcionCompleta = completion.data.choices[0].text.trim();
    const [nombre, ...restoDescripcion] = descripcionCompleta.split('.'); // Suponiendo que el nombre está al principio y seguido de un punto

    return {
      nombre,
      descripcion: restoDescripcion.join('.'),
    };
  } catch (error) {
    console.error('Error al generar la descripción:', error);
    return {
      nombre: 'Error',
      descripcion: 'Hubo un error al generar la descripción del Pokémon.',
    };
  }
}

