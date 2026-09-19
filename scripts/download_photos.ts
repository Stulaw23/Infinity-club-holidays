import fs from 'fs';
import path from 'path';
import https from 'https';

const photos = [
  {
    name: 'contiki-european-discovery.jpg',
    url: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'costsaver-britain-ireland-delight.jpg',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'costsaver-italian-scene.jpg',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'contiki-thai-island-hopper-west.jpg',
    url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'contiki-thai-island-hopper-east.jpg',
    url: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'costsaver-european-accent.jpg',
    url: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'costsaver-jewels-of-italy.jpg',
    url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'trafalgar-imperial-europe.jpg',
    url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'trafalgar-best-of-turkey.jpg',
    url: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'trafalgar-best-of-the-danube.jpg',
    url: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'insight-vacations-easy-pace-italy.jpg',
    url: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'insight-vacations-highlights-of-poland.jpg',
    url: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1200&q=80'
  }
];

const destDir = path.join(process.cwd(), 'public', 'assets', 'specials', 'photos');

function download(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // follow redirect
        download(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const item of photos) {
    const dest = path.join(destDir, item.name);
    console.log(`Downloading ${item.name}...`);
    await download(item.url, dest);
    console.log(`Saved ${item.name} (${fs.statSync(dest).size} bytes)`);
  }
  console.log('All photos downloaded successfully!');
}

run().catch(console.error);
