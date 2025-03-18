import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const artists = [
  {
    name: "Leonardo da Vinci",
    lifetime: "1452-1519",
    description: "Italian Renaissance polymath known for the Mona Lisa and The Last Supper.",
    biography: "Leonardo da Vinci was an Italian Renaissance polymath, excelling in painting, engineering, anatomy, and architecture. He is widely recognized for his masterful artworks, including the 'Mona Lisa' and 'The Last Supper', which demonstrate his unparalleled understanding of perspective and human expression. His notebooks contain groundbreaking studies on human anatomy, flight, and mechanical innovations. His ability to blend science with art set him apart as one of the most influential figures in history.",
    imageUrl: "/images/artists/da_vinci.png",
    famousArtworks: [
      { title: "Mona Lisa", imageUrl: "/images/artworks/mona_lisa.png" },
      { title: "The Last Supper", imageUrl: "/images/artworks/last_supper.png" },
      { title: "Vitruvian Man", imageUrl: "/images/artworks/vitruvian_man.png" }
    ]
  },
  {
    name: "Vincent van Gogh",
    lifetime: "1853-1890",
    description: "Post-Impressionist painter known for expressive color and bold brushwork.",
    biography: "Vincent van Gogh was a Dutch Post-Impressionist painter whose expressive use of color and emotional depth reshaped modern art. Despite struggling with mental illness, he created over 2,000 artworks, including 'Starry Night' and 'Sunflowers'. His thick impasto brushwork and vibrant palette influenced the Expressionist movement. Though unrecognized in his lifetime, his works now rank among the most valuable in the world.",
    imageUrl: "/images/artists/van_gogh.png",
    famousArtworks: [
      { title: "Starry Night", imageUrl: "/images/artworks/starry_night.jpg" },
      { title: "Sunflowers", imageUrl: "/images/artworks/sunflowers.jpg" },
      { title: "Café Terrace at Night", imageUrl: "/images/artworks/cafe_terrace.jpg" }
    ]
  },
  {
    name: "Pablo Picasso",
    lifetime: "1881-1973",
    description: "Spanish painter and sculptor, co-founder of Cubism.",
    biography: "Pablo Picasso was a Spanish painter, sculptor, and one of the most influential artists of the 20th century. He co-founded the Cubist movement, revolutionizing traditional artistic perspectives. His Blue and Rose Periods displayed emotional depth, while 'Guernica' became a powerful anti-war symbol. Picasso's ability to innovate across styles—from realism to abstraction—secured his place in art history.",
    imageUrl: "/images/artists/picasso.png",
    famousArtworks: [
      { title: "Guernica", imageUrl: "/images/artworks/guernica.jpg" },
      { title: "The Weeping Woman", imageUrl: "/images/artworks/weeping_woman.jpg" },
      { title: "Les Demoiselles d'Avignon", imageUrl: "/images/artworks/demoiselles.jpg" }
    ]
  },
  {
    name: "Claude Monet",
    lifetime: "1840-1926",
    description: "French Impressionist painter best known for Water Lilies series.",
    biography: "Claude Monet was a French Impressionist painter who pioneered the use of light and color to capture fleeting moments. His 'Water Lilies' and 'Impression, Sunrise' paintings defined the Impressionist movement, favoring loose brushstrokes and vibrant hues over traditional realism. Monet's studies of natural landscapes influenced countless artists, shaping modern artistic expression.",
    imageUrl: "/images/artists/monet.png",
    famousArtworks: [
      { title: "Water Lilies", imageUrl: "/images/artworks/water_lilies.jpg" },
      { title: "Impression, Sunrise", imageUrl: "/images/artworks/impression_sunrise.jpg" },
      { title: "Woman with a Parasol", imageUrl: "/images/artworks/woman_parasol.jpg" }
    ]
  },
  {
    name: "Rembrandt van Rijn",
    lifetime: "1606-1669",
    description: "Dutch Baroque artist, master of light and shadow.",
    biography: "Rembrandt was a Dutch Baroque painter renowned for his mastery of chiaroscuro (light and shadow). His dramatic compositions, such as 'The Night Watch', showcased an unparalleled ability to depict human expression and movement. His self-portraits provide deep insight into his personal life, struggles, and artistic evolution, making him one of the greatest portraitists in history.",
    imageUrl: "/images/artists/rembrandt.png",
    famousArtworks: [
      { title: "The Night Watch", imageUrl: "/images/artworks/night_watch.jpg" },
      { title: "Self-Portrait", imageUrl: "/images/artworks/self_portrait.jpg" },
      { title: "The Jewish Bride", imageUrl: "/images/artworks/jewish_bride.jpg" }
    ]
  },
  {
    name: "Michelangelo",
    lifetime: "1475-1564",
    description: "Renaissance sculptor, painter, and architect known for the Sistine Chapel ceiling.",
    biography: "Michelangelo was an Italian Renaissance artist, best known for his sculptural masterpieces 'David' and 'Pieta'. His paintings on the Sistine Chapel ceiling, including 'The Creation of Adam', are regarded as some of the greatest works of Western art. His architectural designs, including the dome of St. Peter’s Basilica, further cemented his legacy as a master of multiple disciplines.",
    imageUrl: "/images/artists/michelangelo.png",
    famousArtworks: [
      { title: "David", imageUrl: "/images/artworks/david.jpg" },
      { title: "The Creation of Adam", imageUrl: "/images/artworks/creation_adam.jpg" },
      { title: "Pieta", imageUrl: "/images/artworks/pieta.jpg" }
    ]
  }
];

async function addArtists() {
  try {
    const artistCollection = collection(db, "artists");

    for (const artist of artists) {
      await addDoc(artistCollection, artist);
      console.log(`Added: ${artist.name}`);
    }

    console.log("✅ Successfully added all artists!");
  } catch (error) {
    console.error("❌ Error adding artists: ", error);
  }
}

addArtists();
