
"use strict";

window.IEC_LESSONS = [
  {
    id: "toy-team-plus-3-starter",
    curriculum: "Oxford",
    level: "Kindergarten",
    book: "Toy Team Plus 3",
    program: "Oxford",
    unit: "Starter",
    title: "Hello!",
    focus: "Colors 11–20; characters; How are you?",
    duration: null,
    status: "planned",
    lessonPlan: null,
    powerpoint: null,
    kind: "starter"
  },
  {
    id: "toy-team-plus-3-1",
    curriculum: "Oxford",
    level: "Kindergarten",
    book: "Toy Team Plus 3",
    program: "Oxford",
    unit: 1,
    title: "Jobs",
    focus: "doctor, teacher, pilot, chef, dancer, firefighter; I'm a ...",
    duration: 90,
    status: "ready",
    lessonPlan: "iec-prebuilt-lesson-library.html",
    powerpoint: null,
    kind: "unit"
  },
  {
    id: "toy-team-plus-3-2",
    curriculum: "Oxford",
    level: "Kindergarten",
    book: "Toy Team Plus 3",
    program: "Oxford",
    unit: 2,
    title: "Actions",
    focus: "Action words and movement",
    duration: null,
    status: "planned",
    lessonPlan: null,
    powerpoint: null,
    kind: "unit"
  },
  {
    id: "toy-team-plus-3-review-1-2",
    curriculum: "Oxford",
    level: "Kindergarten",
    book: "Toy Team Plus 3",
    program: "Oxford",
    unit: "Review 1–2",
    title: "Story: What's the matter, Dino?",
    focus: "Craft: Medal",
    duration: null,
    status: "planned",
    lessonPlan: null,
    powerpoint: null,
    kind: "review"
  },
  {
    id: "toy-team-plus-3-3",
    curriculum: "Oxford",
    level: "Kindergarten",
    book: "Toy Team Plus 3",
    program: "Oxford",
    unit: 3,
    title: "Animals",
    focus: "Animal words and descriptions",
    duration: null,
    status: "planned",
    lessonPlan: null,
    powerpoint: null,
    kind: "unit"
  },
  {
    id: "toy-team-plus-3-4",
    curriculum: "Oxford",
    level: "Kindergarten",
    book: "Toy Team Plus 3",
    program: "Oxford",
    unit: 4,
    title: "Pirates",
    focus: "Pirate-themed language",
    duration: null,
    status: "planned",
    lessonPlan: null,
    powerpoint: null,
    kind: "unit"
  },
  {
    id: "toy-team-plus-3-review-3-4",
    curriculum: "Oxford",
    level: "Kindergarten",
    book: "Toy Team Plus 3",
    program: "Oxford",
    unit: "Review 3–4",
    title: "Story: Little Bear and the fox",
    focus: "Craft: Land and water flap book",
    duration: null,
    status: "planned",
    lessonPlan: null,
    powerpoint: null,
    kind: "review"
  },
  {
    id: "toy-team-plus-3-5",
    curriculum: "Oxford",
    level: "Kindergarten",
    book: "Toy Team Plus 3",
    program: "Oxford",
    unit: 5,
    title: "Food",
    focus: "Food vocabulary and preferences",
    duration: null,
    status: "planned",
    lessonPlan: null,
    powerpoint: null,
    kind: "unit"
  },
  {
    id: "toy-team-plus-3-6",
    curriculum: "Oxford",
    level: "Kindergarten",
    book: "Toy Team Plus 3",
    program: "Oxford",
    unit: 6,
    title: "Fairy tale",
    focus: "Fairy-tale characters and adjectives",
    duration: null,
    status: "planned",
    lessonPlan: null,
    powerpoint: null,
    kind: "unit"
  },
  {
    id: "toy-team-plus-3-review-5-6",
    curriculum: "Oxford",
    level: "Kindergarten",
    book: "Toy Team Plus 3",
    program: "Oxford",
    unit: "Review 5–6",
    title: "Story: Robot's dream",
    focus: "Craft: Table setting",
    duration: null,
    status: "planned",
    lessonPlan: null,
    powerpoint: null,
    kind: "review"
  },
  {
    id: "toy-team-plus-3-festivals",
    curriculum: "Oxford",
    level: "Kindergarten",
    book: "Toy Team Plus 3",
    program: "Oxford",
    unit: "Supplementary",
    title: "Festivals",
    focus: "Diwali; Lunar New Year; Earth Day",
    duration: null,
    status: "planned",
    lessonPlan: null,
    powerpoint: null,
    kind: "supplementary"
  },
  {
    id: "toy-team-plus-3-seasons",
    curriculum: "Oxford",
    level: "Kindergarten",
    book: "Toy Team Plus 3",
    program: "Oxford",
    unit: "Supplementary",
    title: "Seasons",
    focus: "Fall; Winter; Spring; Summer",
    duration: null,
    status: "planned",
    lessonPlan: null,
    powerpoint: null,
    kind: "supplementary"
  },
  ...[
    ["Starters", 1, "Greetings and Introductions"],
    ["Starters", 1, "Colors and Classroom Objects"],
    ["Movers", 1, "Everyday Activities"],
    ["Movers", 3, "Describing People"],
    ["Flyers", 1, "Describing Experiences"],
    ["KET", 1, "Everyday Communication"],
    ["PET", 1, "Expressing Opinions"]
  ].map(([program, unit, title], i) => ({
    id: `cambridge-demo-${i + 1}`,
    curriculum: "Cambridge",
    level: program,
    book: "",
    program,
    unit,
    title,
    focus: "Demonstration entry — no approved resources uploaded",
    duration: 45,
    status: "sample",
    lessonPlan: null,
    powerpoint: null,
    kind: "unit"
  })),
  {
    id: "ielts-demo-1",
    curriculum: "IELTS",
    level: "IELTS",
    book: "",
    program: "IELTS",
    unit: 1,
    title: "Speaking Foundations",
    focus: "Demonstration entry — no approved resources uploaded",
    duration: 60,
    status: "sample",
    lessonPlan: null,
    powerpoint: null,
    kind: "unit"
  }
];



// OIC ESL Years 1–9: register the existing HTML lessons without duplicating
// their contents. Upload the unchanged OIC_ESL folder beside portal.html.
// Each entry links to its corresponding file in the existing folder structure.
(() => {
  const books = {
    1: "Oxford Discover 1", 2: "Oxford Discover 2",
    3: "Oxford Discover 3", 4: "Oxford Discover 4",
    5: "Oxford Discover 5", 6: "Oxford Discover 6",
    7: "Oxford Discover Future", 8: "Oxford Discover Future",
    9: "Oxford Discover Future"
  };
  for (let year = 1; year <= 9; year++) {
    const folder = `OIC_ESL_Y${year}_Discover${year <= 6 ? year : "_Future"}_LP`;
    for (let week = 1; week <= 36; week++) {
      const start = Math.floor((week - 1) / 6) * 6 + 1;
      const end = start + 5;
      const range = `W${start}${year === 1 && start > 1 ? "_" : "-"}${end}`;
      for (let lesson = 1; lesson <= 5; lesson++) {
        const w = String(week).padStart(2, "0");
        const l = String(lesson).padStart(2, "0");
        window.IEC_LESSONS.push({
          id: `oic-y${year}-w${w}-l${l}`,
          curriculum: "Oxford",
          level: `Year ${year}`,
          book: books[year],
          program: "OIC ESL",
          unit: `Week ${w}`,
          title: `Lesson ${lesson}`,
          focus: `OIC ESL · Year ${year} · Week ${week} · Lesson ${lesson}`,
          duration: 90,
          status: "ready",
          lessonPlan: `OIC_ESL/${folder}/OIC_ESL_Y${year}_${range}_LP/week-${w}-lesson-${l}.html`,
          powerpoint: null,
          kind: "oic-lesson"
        });
      }
    }
  }
})();
