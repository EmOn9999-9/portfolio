/* =========================================================
   PORTFOLIO DATA — edit this file only.
   Everything on the site is rendered from this object.
   Empty lists hide their section automatically.
   ========================================================= */
const PORTFOLIO = {
  profile: {
    name: "Emon Devkota",
    shortName: "ED",                       // shown in the navbar logo
    roles: ["Full-Stack Developer"],       // add more to make the hero cycle through them
    tagline: "I build websites and apps, from the database to the screen.",
    bio: [
      "I'm a CSIT student at Lumbini ICT Campus who loves building websites and mobile apps. I work mostly on the logic side: backends with PHP and Laravel, and cross-platform apps with Flutter.",
      "My goal is to become a full-time full-stack developer. I'm looking for an internship in Nepal where I can learn from a real team and ship real products. I'm based in Chitwan and happy to move to Kathmandu for the right opportunity."
    ],
    location: "Chitwan, Nepal",
    timezone: "Asia/Kathmandu",            // used by the live clock in the navbar
    email: "emondev9997000@gmail.com",
    photo: "assets/me.jpg",                // leave empty for a placeholder
    photoPosition: "center 80%",          // which part of the photo stays visible when cropped
    resume: "",                            // e.g. "assets/resume.pdf" — empty hides the Download CV button
    availability: "Open to internships in Nepal",   // empty hides the badge
    stats: [                               // suffix is optional, e.g. "+"
      { label: "Years coding", value: 3, suffix: "+" },
      { label: "CSIT semester", value: 6 },
      { label: "Languages", value: 5 },
      { label: "GitHub repos", value: 5 }
    ]
  },

  socials: [
    { name: "GitHub",    url: "https://github.com/EmOn9999-9" },
    { name: "Instagram", url: "https://www.instagram.com/e_devkota/" },
    { name: "X",         url: "https://x.com/Emonn2418" },
    { name: "Email",     url: "mailto:emondev9997000@gmail.com" }
    // add LinkedIn here later: { name: "LinkedIn", url: "https://linkedin.com/in/..." }
  ],

  // "level" (0–100) is optional; without it a skill shows as a simple tag
  skills: [
    { group: "Languages", items: [
      { name: "C" }, { name: "C++" }, { name: "PHP" }, { name: "JavaScript" }, { name: "Dart" }
    ]},
    { group: "Web", items: [
      { name: "HTML" }, { name: "CSS" }, { name: "JavaScript" }, { name: "Laravel" }
    ]},
    { group: "Mobile & Backend", items: [
      { name: "Flutter" }, { name: "Dart" }, { name: "Serverpod" }, { name: "PostgreSQL" }
    ]},
    { group: "Tools", items: [
      { name: "Git" }, { name: "GitHub" }, { name: "GitHub Actions" }, { name: "Firebase" }
    ]}
  ],

  // Scrolling ticker of technologies
  marquee: ["Flutter", "Dart", "Laravel", "PHP", "Serverpod", "PostgreSQL", "JavaScript", "HTML", "CSS", "C", "C++", "Firebase", "Git"],

  services: [
    { title: "Web Applications", desc: "Full-stack web apps with Laravel and PHP, from database design to working pages." },
    { title: "Mobile Apps", desc: "Cross-platform Android and iOS apps built with Flutter and Dart." },
    { title: "Backend & APIs", desc: "Server logic, authentication and REST APIs that frontends and apps can rely on." },
    { title: "Problem Solving", desc: "Strong foundations in C and C++, data structures and algorithms." }
  ],

  // Filters are built from the categories used below.
  projects: [
    {
      title: "Sahara",
      category: "App",
      year: 2026,
      featured: true,
      image: "",                           // e.g. "assets/projects/sahara.png"
      summary: "An elderly care app for families in Nepal, connecting families, doctors and home caregivers in one place. In active development.",
      details: "Sahara brings together everyone who looks after an older person. Families book care and are matched with a doctor and a free time slot automatically, request home caregivers, follow each visit live, and keep medicines, emergency contacts and reports in one place. Doctors manage appointments and write versioned consultation records; caregivers check in and out of home visits and write reports; and the Sahara team runs everything from a web admin panel with analytics, an emergency monitor and an audit log. Privacy is built into the server: role-based access checked on every request, audited reads of medical data, private file storage, and notifications that never reveal medical details. One Flutter codebase runs on iOS, Android and the web.",
      tech: ["Flutter", "Dart", "Serverpod", "PostgreSQL", "Firebase", "GitHub Actions"],
      live: "",
      github: "",                          // private for now — add the link when it's public
      private: true
    }
    // Add the hackathon project here once it's finished.
  ],

  experience: [],                          // empty = Experience section hidden

  education: [
    // "grade" is optional
    { title: "Bachelor in CSIT (6th semester)", place: "Lumbini ICT Campus, Gaindakot, Nawalpur", period: "2080 BS — Present" },
    { title: "+2 in Computer Science (SLC)", place: "Ankuram Academy", grade: "GPA 3.23", period: "2080 BS" },
    { title: "Secondary Education (SEE)", place: "Ekata Shishu Niketan", grade: "GPA 3.95", period: "2078 BS" }
  ],

  github: {
    username: "EmOn9999-9",                // your GitHub username — stats load live
    repoCount: 6                           // how many recent repos to show
  },

  contact: {
    formspreeId: ""                        // optional: e.g. "xyzabcd" from formspree.io; empty = opens email app
  }
};
