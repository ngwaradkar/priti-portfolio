/**
 * Every fact on this site comes from Priti_Waradkar_Resume.pdf.
 * Edit here and the whole site follows. Don't add anything the resume doesn't support.
 */

export const profile = {
  fullName: 'Priti Waradkar',
  name: 'Priti Waradkar',
  first: 'Priti',
  email: 'pritidandvate97@gmail.com',
  location: 'Pune, Maharashtra',
  timezone: 'Asia/Kolkata',
  links: {
    linkedin: 'https://www.linkedin.com/in/priti-dandvate',
  },
  resume: '/assets/Priti_Waradkar_Resume.pdf',
  /** Rotating hero designations — each one is backed by the resume. */
  roles: ['Senior QA Engineer', 'Test Automation', 'API Testing', 'QA Mentor'],
  availability: 'Open to opportunities',
  openTo: 'India and international locations',
};

export const stats = [
  { value: 5, decimals: 0, suffix: '+', label: 'Years in QA' },
  { value: 3, decimals: 0, suffix: '', label: 'Companies, all as Senior QA Engineer' },
  { value: 5, decimals: 0, suffix: '', label: 'Selected projects' },
  { value: 3, decimals: 0, suffix: '', label: 'Product surfaces: web, mobile, wearable' },
];

export type SkillCategory = { id: string; index: string; title: string; blurb: string; skills: string[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'automation',
    index: '01',
    title: 'Automation',
    blurb: 'Selenium WebDriver with Java, TestNG and Maven, plus Appium and BDD with Cucumber.',
    skills: ['Selenium WebDriver', 'Java', 'Appium', 'TestNG', 'Cucumber (BDD)', 'Maven'],
  },
  {
    id: 'api',
    index: '02',
    title: 'API & Database',
    blurb: 'APIs tested and automated, with SQL used to check the data behind them.',
    skills: ['Postman', 'REST Assured', 'API Testing', 'SQL', 'Database Testing'],
  },
  {
    id: 'testing',
    index: '03',
    title: 'Testing',
    blurb: 'Manual and automated testing across the full range of a release cycle.',
    skills: ['Manual Testing', 'Web Testing', 'Mobile Testing', 'Functional Testing', 'Regression Testing', 'System Testing', 'Integration Testing', 'UI Testing', 'End-to-End Testing'],
  },
  {
    id: 'devices',
    index: '04',
    title: 'Mobile & Devices',
    blurb: 'Hands-on with the hardware that products actually run on.',
    skills: ['Android Applications', 'Tablets', 'Wearable Devices'],
  },
  {
    id: 'delivery',
    index: '05',
    title: 'Delivery & Defects',
    blurb: 'Agile delivery, test runs in CI, and defects tracked through to closure.',
    skills: ['Jenkins', 'JIRA', 'Azure DevOps', 'Agile / Scrum', 'Defect Management'],
  },
  {
    id: 'planning',
    index: '06',
    title: 'Planning & AI',
    blurb: 'Test planning and ownership, with ChatGPT and Gemini used to draft scenarios and scripts.',
    skills: ['Test Planning', 'Test Case Design', 'QA Ownership', 'Mentoring', 'ChatGPT', 'Gemini'],
  },
];

export const competencies = [
  'QA Automation',
  'Manual Testing',
  'Web Testing',
  'Mobile Testing',
  'API Testing',
  'API Automation',
  'Functional Testing',
  'Regression Testing',
  'System Testing',
  'Integration Testing',
  'UI Testing',
  'End-to-End Testing',
  'Database Testing',
  'Test Planning',
  'Test Case Design',
  'Defect Management',
  'Agile / Scrum',
  'CI/CD Test Execution',
  'QA Ownership',
  'Mentoring',
];

export type Project = {
  id: string;
  index: string;
  title: string;
  kind: string;
  summary: string;
  /** What the résumé says was covered on this project. */
  scope: string[];
  /** Skills (named as in skillCategories) that the résumé ties to this project. */
  uses: string[];
  motif: 'matrix' | 'report' | 'defect' | 'api' | 'db';
};

export const projects: Project[] = [
  {
    id: 'mbark',
    index: '01',
    title: 'mBark',
    kind: 'Multi-client applications',
    summary: 'QA ownership across a multi-client product, spanning web, mobile, API and automation testing.',
    scope: ['QA ownership', 'Web testing', 'Mobile testing', 'API testing', 'Automation testing'],
    uses: ['QA Ownership', 'Web Testing', 'Mobile Testing', 'API Testing'],
    motif: 'matrix',
  },
  {
    id: 'yodda-enableplus',
    index: '02',
    title: 'Yodda EnablePlus',
    kind: 'Usability & quality reporting',
    summary: 'Application usability validation, with quality reporting and defect tracking.',
    scope: ['Usability validation', 'Quality reporting', 'Defect tracking'],
    uses: ['Defect Management'],
    motif: 'report',
  },
  {
    id: 'surgicloud-inventory',
    index: '03',
    title: 'Surgicloud Inventory',
    kind: 'Web & application testing',
    summary: 'Web and application testing with UI/UX validation, and defects managed in JIRA.',
    scope: ['Web testing', 'Application testing', 'UI/UX validation', 'JIRA defect management'],
    uses: ['Web Testing', 'JIRA', 'UI Testing', 'Defect Management'],
    motif: 'defect',
  },
  {
    id: 'promentor',
    index: '04',
    title: 'Promentor',
    kind: 'Manual & API testing',
    summary: 'End-to-end manual and API testing, backed by test documentation and bug reporting.',
    scope: ['End-to-end manual testing', 'API testing', 'Test documentation', 'Bug reporting'],
    uses: ['Manual Testing', 'API Testing', 'End-to-End Testing'],
    motif: 'api',
  },
  {
    id: 'academy',
    index: '05',
    title: 'Academy',
    kind: 'Database & regression testing',
    summary: 'SQL database testing, regression testing and usability validation.',
    scope: ['SQL database testing', 'Regression testing', 'Usability validation'],
    uses: ['SQL', 'Database Testing', 'Regression Testing'],
    motif: 'db',
  },
];

export type TimelineItem = { period: string; title: string; org: string; points: string[] };

export const timeline: TimelineItem[] = [
  {
    period: 'Jul 2024 — Present',
    title: 'Senior QA Engineer',
    org: 'SKO Systems',
    points: [
      'Designs, automates and runs web and mobile test cases with Selenium, Appium, TestNG and Cucumber for functional and regression validation.',
      'Tests Android applications and tablets manually and with automation, validating behaviour across supported devices.',
      'Tests APIs with Postman and REST Assured and checks backend data with SQL queries for application and database consistency.',
      'Reports and tracks defects in Azure DevOps, working with developers through investigation, retesting and closure.',
      'Takes part in sprint planning, Scrum meetings and retrospectives; mentors automation engineers and gives product-knowledge training.',
      'Uses ChatGPT to draft test scenarios, edge cases and API validation logic.',
    ],
  },
  {
    period: 'Jun 2023 — Jul 2024',
    title: 'Senior QA Engineer',
    org: 'Yodda Elder Care Technologies Pvt. Ltd.',
    points: [
      'Led test planning and execution across multiple projects, coordinating QA activities for application delivery.',
      'Built and maintained Selenium automation frameworks in Java, TestNG and Maven for repeatable regression testing.',
      'Set up and maintained Jenkins pipelines so regression suites ran as part of the delivery workflow.',
      'Ran API testing and automation with Postman and REST Assured, alongside wearable-device testing.',
      'Documented results and prepared QA reports, presenting quality findings and open issues to stakeholders.',
    ],
  },
  {
    period: 'Oct 2020 — May 2023',
    title: 'Senior QA Engineer',
    org: 'ITWorks Infotech Pvt. Ltd.',
    points: [
      'Executed functional, regression and system testing for web and mobile applications.',
      'Designed test plans, test cases and automation scripts for structured validation.',
      'Performed UI, integration and SQL database testing to verify behaviour and data consistency.',
      'Worked with cross-functional teams on requirement analysis and defect investigation.',
      'Logged and tracked defects in JIRA, coordinating retesting and closure with developers.',
    ],
  },
];

export type Education = { degree: string; school: string; place?: string; period: string };

export const education: Education[] = [
  { degree: 'Master of Computer Applications (MCA)', school: 'Pratibha Institute of Business Management', period: 'Aug 2017 — Apr 2020' },
  { degree: 'Bachelor of Computer Applications (BCA)', school: 'Dyanvardhini College', place: 'Chikhali, Pune', period: 'Jul 2014 — Apr 2017' },
];

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

/** Which projects the résumé ties to a given skill — used by the Expertise section. */
export function projectsUsing(skill: string): string[] {
  return projects.filter((p) => p.uses.includes(skill)).map((p) => p.title);
}
