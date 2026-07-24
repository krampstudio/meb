import { writable, derived } from "svelte/store";

const en = {
  nav: {
    about: "About",
    crew: "The Crew",
    music: "Music",
    shows: "Shows",
    blackfriday: "Black Friday",
    contact: "Contact",
  },
  hero: {
    tagline: "Alt Punk Rock · France",
    scroll: "Scroll",
  },
  about: {
    title: "About",
    body: "M.e.B is a band from the East of France, born in 2023. We are a group of friends, with experiences in other bands, who love to play music together. Our style is a mix of punk rock, alternative rock, and diverse influences. Most of our songs are in French and talk about our lives, our experiences, our feelings, and what pisses us off.",
  },
  crew: {
    title: "The Crew",
    flipHint: "Tap for bio",
    flipBack: "Tap for photo",
    members: [
      { name: "Gui", instrument: "Bass", bio: "Holds down the low end with a pick and a scowl. Collects broken bass strings and claims every gig is the best one yet. Runs on black coffee and Ramones B-sides." },
      { name: "Pat", instrument: "Drums", bio: "Hits things in time and in anger. Loud, fast, and never late for soundcheck. Used to play in three bands at once; now gives the rest of us a headache instead." },
      { name: "Loulou", instrument: "Guitar / Vocals", bio: "Sings until the monitors die and shreds until the strings do. Writes most of the songs about things that annoy him, which is a lot. Owns too many fuzz pedals, all of them on." },
      { name: "Bert", instrument: "Guitar", bio: "Wall of sound, wall of amps. Never met a riff he couldn't make louder. The quiet one, on-stage at least, and the one who actually remembers the setlist." },
    ],
  },
  music: {
    title: "Music",
    cta: "Listen",
    comingSoon: "Coming soon",
    items: [
      { title: "Le Crabe", comingSoon: true, tag: "Single" },
    ],
  },
  shows: {
    title: "Shows",
    upcoming: "Upcoming",
    stayTuned: "Stay tuned — we're booking new dates.",
    past: "Past shows",
    date: "Date",
    venue: "Venue",
    city: "City",
    pastRows: [
      { date: "2025-05-24", venue: "Shaka Pub", city: "Chaource" },
    ],
  },
  blackfriday: {
    title: "Black Friday",
    tagline: "One of our songs. Coming when the timer hits zero.",
    dropsIn: "Drops in",
    days: "days",
    hrs: "hrs",
    min: "min",
    sec: "sec",
    itsToday: "It's Black Friday. Drop the song.",
    play: "Play sample",
    pause: "Pause",
    sampleSoon: "25s preview",
  },
  contact: {
    title: "Contact",
    follow: "Follow",
    booking: "Booking",
  },
  footer: "M.e.B © 2025",
};

const fr = {
  nav: {
    about: "À propos",
    crew: "La Crew",
    music: "Musique",
    shows: "Concerts",
    blackfriday: "Black Friday",
    contact: "Contact",
  },
  hero: {
    tagline: "Alt Punk Rock · France",
    scroll: "Défiler",
  },
  about: {
    title: "À propos",
    body: "M.e.B est un groupe de l'Est de la France, né en 2023. Nous sommes un groupe d'amis, avec des expériences dans d'autres formations, qui aiment jouer de la musique ensemble. Notre style est un mix de punk rock, alternative rock et influences diverses. La plupart de nos chansons sont en français et parlent de nos vies, de nos expériences, de nos sentiments et de ce qui nous fait chier.",
  },
  crew: {
    title: "La Crew",
    flipHint: "Cliquez pour la bio",
    flipBack: "Cliquez pour la photo",
    members: [
      { name: "Gui", instrument: "Basse", bio: "Tient la ligne grave avec un médiator et un rictus. Collectionne les cordes cassées et jure que chaque concert est le meilleur. Fonctionne au café noir et aux faces B des Ramones." },
      { name: "Pat", instrument: "Batterie", bio: "Frappe les choses en rythme et avec colère. Fort, rapide, jamais en retard au balance. Jouait dans trois groupes à la fois ; maintenant il nous file la migraine à nous." },
      { name: "Loulou", instrument: "Guitare / Chant", bio: "Chante jusqu'à ce que les retours lâchent et grille jusqu'à cuisser les cordes. Écrit la plupart des chansons sur ce qui l'énerve, donc beaucoup. Trop de pédales fuzz, toutes allumées." },
      { name: "Bert", instrument: "Guitare", bio: "Mur de son, mur d'amplis. N'a jamais croisé un riff qu'il ne puisse rendre plus fort. Le discret, sur scène du moins, et le seul qui retienne vraiment la setlist." },
    ],
  },
  music: {
    title: "Musique",
    cta: "Écouter",
    comingSoon: "Bientôt disponible",
    items: [
      { title: "Le Crabe", comingSoon: true, tag: "Single" },
    ],
  },
  shows: {
    title: "Concerts",
    upcoming: "À venir",
    stayTuned: "Restez connectés — on prépare de nouvelles dates.",
    past: "Concerts passés",
    date: "Date",
    venue: "Salle",
    city: "Ville",
    pastRows: [
      { date: "2025-05-24", venue: "Shaka Pub", city: "Chaource" },
    ],
  },
  blackfriday: {
    title: "Black Friday",
    dropsIn: "Sortie dans",
    days: "jours",
    hrs: "h",
    min: "min",
    sec: "s",
    itsToday: "C'est Black Friday. Larguez le morceau.",
    play: "Écouter l'extrait",
    pause: "Pause",
  },
  contact: {
    title: "Contact",
    follow: "Suivre",
    booking: "Booking",
  },
  footer: "M.e.B © 2025",
};

function detect() {
  if (typeof navigator === "undefined") return "en";
  const l = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  return l.startsWith("fr") ? "fr" : "en";
}

const initial = detect();

export const lang = writable(initial);
export const dict = derived(lang, ($lang) => ($lang === "fr" ? fr : en));

if (typeof document !== "undefined") {
  document.documentElement.lang = initial;
  lang.subscribe((v) => {
    document.documentElement.lang = v;
  });
}

export function toggleLang() {
  lang.update((v) => (v === "fr" ? "en" : "fr"));
}