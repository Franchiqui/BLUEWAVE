const POCKETBASE_URL = 'https://pocketbase-zeus.fly.dev';
const COLLECTION_ID = 'pbc_1998862360';

async function fetchImages() {
  try {
    const response = await fetch(`${POCKETBASE_URL}/api/collections/${COLLECTION_ID}/records?expand=field&fields=id,titulo,field`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    console.log('Imágenes en PocketBase:\n');
    console.log('export const IMAGES = {');

    for (const record of data.items) {
      const filename = record.field;
      const titulo = record.titulo || record.id;

      if (filename) {
        const url = `${POCKETBASE_URL}/api/files/${COLLECTION_ID}/${record.id}/${filename}`;
        console.log(`  ${titulo}: pbImageUrl('${url}'),`);
      } else {
        console.log(`  ${titulo}: null, // Sin imagen`);
      }
    }

    console.log('};');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchImages();
