export type SkillCluster = {
  name: string;
  items: string[];
};

export type ExperienceItem = {
  role: string;
  org: string;
  date: string;
  summary: string;
  bullets: string[];
  stack: string[];
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  thesis: string;
  status?: string;
  stack: string[];
  outcomes: { label: string; value: string }[];
  problem: string[];
  architecture: { layers: { name: string; nodes: { id: string; label: string; note: string }[] }[] };
  result: string[];
  glyph: "symptomscope" | "khatabox" | "intellimoney" | "supplychain" | "churnsight";
  links?: { live?: string; github?: string };
};

export const profile = {
  name: "Harkirat Singh",
  role: "Computer Engineering student at Thapar Institute of Engineering and Technology",
  location: "Patiala, India",
  email: "hkkirat25@gmail.com",
  phone: "+91 88476 54698",
  linkedin: "https://www.linkedin.com/in/harkiratse/",
  github: "https://github.com/harkirat2023",
  resumeLinks: [
    { label: "Universal résumé", href: "/assets/UNIVERSAL%20(1).pdf" },
    { label: "Analytics résumé", href: "/assets/Non-Technical-Harkirat.pdf" },
  ],
};

export const stats = [
  { value: "05", label: "projects" },
  { value: "180K+", label: "orders analysed" },
  { value: "27", label: "team members coordinated" },
  { value: "40%", label: "membership growth" },
];

export const siteCopy = {
  hero: {
    headline: ["I build systems", "from signals."],
    description: "I’m a computer engineering student working across full-stack software, applied AI, and analytics. I turn complex inputs into tools and insights people can use.",
    highlight: "From raw signals to useful tools.",
    collageTitle: "Make the\nsignal useful.",
  },
  featured: {
    index: "01",
    kicker: "featured build · health AI",
    title: "A clearer next step for health questions.",
    description: "SymptomScope AI brings symptom prediction, severity scoring, and retrieval-assisted health guidance into one experience.",
    action: "Explore SymptomScope",
  },
  sections: {
    about: { index: "02", kicker: "a little about me", title: "Curious about what sits beneath the surface." },
    capabilities: { index: "03", kicker: "the toolkit", title: "Tools for finding the useful signal." },
    experience: { index: "04", kicker: "experience", title: "Where I’ve put ideas to work." },
    work: { index: "05", kicker: "selected work", title: "A few things I’ve been building." },
    recognition: { index: "06", kicker: "learning · recognition", title: "Learning, one layer at a time." },
  },
  contact: {
    headline: "Have a good problem in mind?",
    description: "I’m interested in thoughtful conversations about full-stack engineering, applied AI, and analytics.",
  },
};

export const skills: SkillCluster[] = [
  { name: "Programming", items: ["Python", "Java", "JavaScript", "TypeScript", "SQL"] },
  { name: "Analytics", items: ["Pandas", "NumPy", "Excel", "Data cleaning", "Data validation", "Exploratory analysis", "Statistical analysis", "Data interpretation"] },
  { name: "Business intelligence", items: ["Power BI", "Tableau", "Data visualisation", "Dashboard development", "KPI analysis"] },
  { name: "AI & machine learning", items: ["LangChain", "Prompt engineering", "Vector databases", "RAG", "Tool calling", "XGBoost", "SHAP", "TF-IDF", "Logistic Regression"] },
  { name: "Web & systems", items: ["Next.js", "React", "FastAPI", "REST APIs", "WebSockets", "JWT", "OpenCV", "Object-oriented programming", "Data structures & algorithms", "DBMS", "Operating systems", "Computer networks"] },
  { name: "Data & tools", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Git", "GitHub", "GitHub Actions", "Docker", "Vercel", "Render"] },
  { name: "Professional", items: ["Analytical problem solving", "Communication", "Cross-functional collaboration", "Leadership", "Adaptability"] },
];

export const featuredSkills = ["Python", "TypeScript", "Next.js", "FastAPI", "OpenCV", "LangChain", "RAG", "Power BI", "SQL", "PostgreSQL", "MongoDB", "Docker"];

export const experience: ExperienceItem[] = [
  {
    role: "AI Intern",
    org: "XTRAGRAD Technologies Pvt. Ltd.",
    date: "Aug 1 – Aug 30, 2026",
    summary: "I spent one month building an online exam-proctoring system that detects abnormal activity.",
    bullets: [
      "I used OpenCV to analyse webcam and audio streams for faces, head movement, multiple people, and external devices.",
      "I built risk-scoring and violation tracking with progressive warnings, examiner monitoring, violation timelines, and session reports.",
    ],
    stack: ["Python", "OpenCV", "FastAPI", "MongoDB", "REST APIs", "JWT"],
  },
  {
    role: "Summer Project Intern",
    org: "Experiential Learning Centre, TIET",
    date: "Jun – Jul 2025",
    summary: "I worked on passive, continuous authentication for mobile banking using behavioural signals.",
    bullets: [
      "I implemented a Split Federated Learning design that processes activations locally and keeps raw sensor data on-device.",
      "I analysed accelerometer, gyroscope, keystroke, and touch-heatmap signals to study interaction patterns.",
    ],
    stack: ["Python", "Split Federated Learning", "Sensor data"],
  },
];

export const leadership = [
  {
    role: "Joint Secretary",
    org: "IETE Students Forum, TIET",
    date: "May 2025 – May 2026",
    description: "I coordinated a 27-member executive team across 10+ technical events and student initiatives for 450+ participants. Membership grew by 40%.",
  },
  {
    role: "Student Ambassador",
    org: "LetsUpgrade EdTech Pvt. Ltd.",
    date: "Aug 2024",
    description: "I supported outreach for skill-building workshops and used referral engagement data to improve campaign conversion by 20%.",
  },
];

export const projects: Project[] = [
  {
    slug: "symptomscope", index: "01", title: "SymptomScope AI",
    thesis: "I built a symptom checker that combines disease prediction, severity scoring, and AI-assisted recovery guidance.",
    stack: ["Next.js", "TypeScript", "Python", "FastAPI", "MongoDB", "Clerk", "LangChain", "ChromaDB", "Groq"],
    outcomes: [
      { value: "3 models", label: "Decision Tree · Random Forest · Naive Bayes" },
      { value: "RAG", label: "recovery plans and guidance" },
      { value: "Tool calling", label: "with context memory and approval-based actions" },
    ],
    problem: ["I built a symptom checker that predicts conditions and scores severity, then pairs those results with personalised recovery plans and medical guidance."],
    architecture: { layers: [
      { name: "Interface", nodes: [{ id: "next", label: "Next.js", note: "TypeScript application for the symptom checker." }] },
      { name: "Prediction & assistant", nodes: [{ id: "models", label: "Decision Tree · Random Forest · Naive Bayes", note: "Models used for disease prediction and severity scoring." }, { id: "rag", label: "Groq · LangChain RAG", note: "Generates structured recovery plans and medical guidance." }] },
      { name: "Knowledge", nodes: [{ id: "chroma", label: "ChromaDB · TF-IDF", note: "Medical knowledge base and embeddings described in the résumé." }] },
    ] },
    result: ["I developed a Groq AI agent with tool calling, context memory, and approval-based health actions.", "I built a RAG medical knowledge base using ChromaDB and TF-IDF embeddings."],
    links: { live: "https://symptom-scope-ai.vercel.app", github: "https://github.com/harkirat2023/Symptom-Scope-AI" },
    glyph: "symptomscope",
  },
  {
    slug: "khata-box", index: "02", title: "KhataBox",
    thesis: "I built a retail platform for inventory, point-of-sale billing, credit, orders, and multiple stores.",
    stack: ["Python", "TypeScript", "Next.js", "FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "Socket.IO", "JWT"],
    outcomes: [
      { value: "Inventory", label: "with QR scanning and low-stock alerts" },
      { value: "POS & Khata", label: "billing, credit, and receipts" },
      { value: "Live analytics", label: "sales, inventory, orders, and profit" },
    ],
    problem: ["KhataBox brings retail inventory, point-of-sale billing, credit records, orders, and multi-store management into one full-stack platform."],
    architecture: { layers: [
      { name: "Interface", nodes: [{ id: "next", label: "Next.js · Shadcn UI", note: "Retail dashboards and responsive interfaces." }] },
      { name: "Services", nodes: [{ id: "api", label: "FastAPI · JWT", note: "Backend services and authentication." }, { id: "socket", label: "Socket.IO", note: "Realtime inventory updates." }] },
      { name: "Data", nodes: [{ id: "postgres", label: "PostgreSQL · SQLAlchemy", note: "Relational database stack listed in the résumé." }, { id: "redis", label: "Redis", note: "Used with the retail platform." }] },
    ] },
    result: ["I added realtime stock tracking, QR scanning, low-stock alerts, automated receipts, and live analytics.", "I built dashboards for sales, inventory, orders, and profit analytics."],
    links: { live: "https://khataboxapp.vercel.app", github: "https://github.com/harkirat2023/KhataBox--Inventory-B2C-Retail-Management-Platform" },
    glyph: "khatabox",
  },
  {
    slug: "intellimoney", index: "03", title: "IntelliMoney",
    thesis: "I built an AI-powered financial platform for expense tracking, budgets, insights, and health scoring.",
    stack: ["Python", "TypeScript", "React", "FastAPI", "MongoDB", "LangChain", "Groq", "OpenCV"],
    outcomes: [
      { value: "TF-IDF", label: "expense categorisation" },
      { value: "Receipt OCR", label: "automated extraction" },
      { value: "AI Copilot", label: "tool calls with user-confirmed actions" },
    ],
    problem: ["IntelliMoney combines expense tracking and budgeting with automated categorisation, receipt extraction, and financial insights."],
    architecture: { layers: [
      { name: "Interface", nodes: [{ id: "react", label: "React · TypeScript", note: "Client interface for financial workflows." }] },
      { name: "AI & analysis", nodes: [{ id: "ocr", label: "OpenCV · receipt OCR", note: "Receipt text extraction described in the résumé." }, { id: "categoriser", label: "TF-IDF · Logistic Regression", note: "Automated expense categorisation." }, { id: "copilot", label: "LangChain · Groq", note: "AI Copilot with tool calling and user-confirmed actions." }] },
      { name: "Service & data", nodes: [{ id: "api", label: "FastAPI", note: "Backend API stack listed in the résumé." }, { id: "mongo", label: "MongoDB", note: "Database stack listed in the résumé." }] },
    ] },
    result: ["I built expense tracking, budgeting, financial insights, and financial health scoring.", "I used TF-IDF and Logistic Regression for expense categories, with OCR-based receipt extraction."],
    links: { live: "https://intellimoney.vercel.app", github: "https://github.com/harkirat2023/IntelliMoney-AI-Powered-Financial-Health-Scoring-Platform" },
    glyph: "intellimoney",
  },
  {
    slug: "supply-chain-otif", index: "04", title: "Supply Chain Control Tower",
    thesis: "I analysed delivery performance across regions and made the operational KPIs easier to inspect.",
    stack: ["Excel", "SQL", "Power BI", "Python"],
    outcomes: [
      { value: "180K+", label: "orders across 23 regions" },
      { value: "40.9%", label: "on-time delivery" },
      { value: "14%", label: "perfect order rate" },
    ],
    problem: ["I analysed order and delivery data to make bottlenecks, SLA breaches, and fulfilment gaps easier to inspect."],
    architecture: { layers: [
      { name: "Source", nodes: [{ id: "excel", label: "Excel data", note: "Order data used in the analysis." }, { id: "python", label: "Python", note: "Listed analysis technology." }] },
      { name: "Analysis", nodes: [{ id: "sql", label: "SQL · KPI model", note: "Structured delivery and fulfilment measures." }] },
      { name: "Dashboard", nodes: [{ id: "powerbi", label: "Power BI", note: "Interactive regional drill-downs, SLA heatmaps, and 36-month trends." }] },
    ] },
    result: ["I developed on-time delivery, OTIF, SLA breach, Perfect Order, and shipping-variance KPIs.", "The analysis showed 57.3% SLA breach and a 14% Perfect Order Rate."],
    glyph: "supplychain",
  },
  {
    slug: "churnsight", index: "05", title: "ChurnSight",
    thesis: "I’m building a churn forecasting workflow that pairs model outputs with SHAP explanations.",
    status: "In progress",
    stack: ["Python", "XGBoost", "SHAP", "Streamlit"],
    outcomes: [
      { value: "7,000+", label: "subscriber records" },
      { value: "XGBoost", label: "forecasting and simulation" },
      { value: "SHAP", label: "model explanations" },
    ],
    problem: ["I’m building a churn forecasting and simulation model to estimate subscriber churn probability and quantify lifetime value at risk."],
    architecture: { layers: [
      { name: "Input", nodes: [{ id: "subscribers", label: "Subscriber records", note: "The résumé describes a dataset of more than 7,000 subscriber records." }] },
      { name: "Model", nodes: [{ id: "xgb", label: "XGBoost", note: "Forecasting and simulation model for churn probability." }, { id: "shap", label: "SHAP", note: "Explainability used to identify business-readable drivers." }] },
      { name: "Interface", nodes: [{ id: "streamlit", label: "Streamlit", note: "Technology listed for the in-progress project." }] },
    ] },
    result: ["I’m applying SHAP-based explainability to translate model outputs into business-readable drivers.", "The project is still in progress."],
    glyph: "churnsight",
  },
];

export const certifications = [
  "TATA (Forage) — Data Visualisation: Empowering Business with Effective Insights",
  "BCG X (Forage) — Introduction to Data for Decision Makers",
  "TATA (Forage) — GenAI Powered Data Analytics",
];

export const education = {
  institution: "Thapar Institute of Engineering and Technology",
  degree: "B.E. Computer Engineering",
  years: "2023–2027",
  cgpa: "7.23 / 10",
  secondary: ["Class 12 · CBSE · 81.5% · 2023", "Class 10 · ICSE · 91.2% · 2021"],
};
