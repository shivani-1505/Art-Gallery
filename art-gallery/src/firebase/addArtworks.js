import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const artworks = [
  {
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    description: "One of the most famous paintings in the world, known for the subject's enigmatic smile.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    category: "Renaissance",
    year: "1503-1519",
    forsale: true,
    price: 2500,
    available: true
  },
  {
    title: "The Last Supper",
    artist: "Leonardo da Vinci",
    description: "A late 15th-century mural painting depicting the Last Supper of Jesus with his apostles.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/1200px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg",
    category: "Renaissance",
    year: "1495-1498",
    forsale: false,
    available: false
  },
  {
    title: "Starry Night",
    artist: "Vincent van Gogh",
    description: "Depicts the view from the east-facing window of his asylum room, just before sunrise, with a village below.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    category: "Post-Impressionism",
    year: "1889",
    forsale: true,
    price: 1200,
    available: true
  },
  {
    title: "Sunflowers",
    artist: "Vincent van Gogh",
    description: "A series of still life paintings depicting sunflowers in vases.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/800px-Vincent_Willem_van_Gogh_127.jpg",
    category: "Post-Impressionism",
    year: "1888",
    forsale: true,
    price: 980,
    available: true
  },
  {
    title: "Guernica",
    artist: "Pablo Picasso",
    description: "A powerful anti-war statement created in response to the bombing of Guernica during the Spanish Civil War.",
    image: "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg",
    category: "Cubism",
    year: "1937",
    forsale: false,
    available: false
  },
  {
    title: "The Weeping Woman",
    artist: "Pablo Picasso",
    description: "Part of a series of paintings related to Guernica, depicting a woman in distress.",
    image: "https://upload.wikimedia.org/wikipedia/en/1/14/Picasso_The_Weeping_Woman_Tate_identifier_T05010_10.jpg",
    category: "Cubism",
    year: "1937",
    forsale: true,
    price: 1500,
    available: true
  },
  {
    title: "Water Lilies",
    artist: "Claude Monet",
    description: "Part of a series of approximately 250 oil paintings depicting Monet's flower garden at his home in Giverny.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/1200px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
    category: "Impressionism",
    year: "1914-1926",
    forsale: true,
    price: 950,
    available: true
  },
  {
    title: "Impression, Sunrise",
    artist: "Claude Monet",
    description: "The painting that gave the Impressionist movement its name.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1200px-Monet_-_Impression%2C_Sunrise.jpg",
    category: "Impressionism",
    year: "1872",
    forsale: true,
    price: 1100,
    available: true
  },
  {
    title: "The Night Watch",
    artist: "Rembrandt van Rijn",
    description: "A group portrait of a militia company, known for its effective use of light and shadow.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/1200px-The_Night_Watch_-_HD.jpg",
    category: "Baroque",
    year: "1642",
    forsale: true,
    price: 1800,
    available: true
  },
  {
    title: "Self-Portrait",
    artist: "Rembrandt van Rijn",
    description: "One of many self-portraits that Rembrandt created throughout his career.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg/800px-Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg",
    category: "Baroque",
    year: "1659",
    forsale: true,
    price: 1600,
    available: true
  },
  {
    title: "David",
    artist: "Michelangelo",
    description: "A masterpiece of Renaissance sculpture, depicting the Biblical hero David.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Michelangelo%27s_David_2015.jpg/800px-Michelangelo%27s_David_2015.jpg",
    category: "Renaissance Sculpture",
    year: "1501-1504",
    forsale: false,
    available: false
  },
  {
    title: "The Creation of Adam",
    artist: "Michelangelo",
    description: "A fresco painting forming part of the Sistine Chapel ceiling, depicting God creating Adam.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1200px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
    category: "Renaissance",
    year: "1512",
    forsale: false,
    available: false
  }
];

async function addArtworks() {
  try {
    const artworksCollection = collection(db, "artworks");

    for (const artwork of artworks) {
      await addDoc(artworksCollection, artwork);
      console.log(`Added: ${artwork.title}`);
    }

    console.log("✅ Successfully added all artworks!");
  } catch (error) {
    console.error("❌ Error adding artworks: ", error);
  }
}

addArtworks();