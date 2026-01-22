export const sets = [
    {
        name: "Зима",
        id: "winter",
        audiomap: "audio.mp3",
        tiles: [
            {
                img: "gift.webp",
                audio: { from: 56, to: 58 },
            },
            {
                img: "snowman.webp",
                audio: { from: 49, to: 51 },
            },
            {
                img: "angel.webp",
                audio: { from: 10, to: 12 },
            },
            {
                img: "mittens.webp",
                audio: { from: 4, to: 5 },
            },
            {
                img: "gloves.webp",
                audio: { from: 94, to: 98 },
            }
        ],
    },
//  {
//      name: "Day with my sister (Beginner Russian Comprehensible Input)",
//      id: "sQP5Fd8EeiU",
//      tiles: [
//          { start: 89.8, end: 91.6 },
//          { start: 202, end: 203.5 },
//          { start: 326, end: 329 },
//          { start: 402.5, end: 403.9 },
//      ],
//  },
];

export function getSetById(id) {
    return sets.find(set => set.id = id);
}
