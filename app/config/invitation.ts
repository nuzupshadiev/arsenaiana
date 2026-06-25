/** Edit paths after adding photos to public/photos/ */
export const INVITATION = {
  couple: ["Арсен", "Аяна"] as const,
  coupleGenitive: "Арсен & Аянaнын",
  title: "Үйлөнүү үлпөт той",
  hosts: ["Маширап", "Айнура"] as const,

  date: "2026-07-17T17:00:00+06:00",
  day: 17,
  month: "Июль",
  monthNum: "07",
  weekday: "Жума",
  year: 2026,
  time: "17:00",

  venue: "«Баястан» рестораны",
  city: "Ош шаары",
  address: "ул. Навруз, 53",
  mapUrl: "https://2gis.kg/bishkek/firm/70000001040720819",
  taxiUrl: "https://2gis.kg/osh/firm/70000001040720819",

  invitationText:
    "үйлөнүү үлпөт тоюна келип, биздин кубанычыбызга ортоктош болуп, той кечесинин кадырлуу коногу болуп кетүүгө чакырабыз. Бул өзгөчө күнү сиздер менен бирге өткөрүү биз үчүн чоң бакыт.",

  dressCode:
    "Мырзалар үчүн — классикалык костюм, айымдар үчүн — жарашыктуу көйнөк же жарашыктуу костюм.",

  music: "/music/our-song.mp3",

  photos: {
    cover: "/photos/cover.jpg",
    /** Set to e.g. "/photos/2.jpg" for a second photo, or null */
    second: null as string | null,
  },

  timeline: [
    {
      time: "17:00",
      title: "Коноктордун чогулуусу",
      desc: "Жайгашып, жакындар менен учурашуу.",
    },
    {
      time: "17:30",
      title: "Салтанаттын башталышы",
      desc: "Ак бата, каалоо-тилектер жана эстен кеткис учур.",
    },
    {
      time: "19:00",
      title: "Дасторкон",
      desc: "Музыка, бий жана эстен кеткис кеч.",
    },
    { time: "21:00", title: "Торт", desc: "Торт кесүү жана куттуктоолор." },
  ],
} as const;

export const EVENT_DATE = new Date(INVITATION.date);

export const CALENDAR_WEEKS = [
  ["", "", 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, "", ""],
] as const;
