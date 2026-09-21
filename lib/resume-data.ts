export const contact = {
  location: "Bangkok, Thailand",
  email: "wisitmoondet@gmail.com",
  phone: "+66 95 652 9419",
  website: "wisit.is-a.dev",
  github: "github.com/Wisitt",
  linkedin: "linkedin.com/in/wisit-m",
};

export const summary =
  "Backend-focused full-stack engineer building production financial-service platforms and enterprise telecom applications with secure third-party integrations, cloud infrastructure, and reliability-focused backend systems. Experienced in Node.js, NestJS, Angular, and TypeScript, with automated testing and multi-environment delivery. Currently exploring FinOps automation across AWS, Azure, and Microsoft 365.";

export const experiences = [
  { company: "Aware Technology Solutions", monogram: "A", role: "Full-Stack Developer", period: "Jul 2026 - Present", meta: "Bangkok, Thailand | Client: AIS - MyChannel Change Owner Portal", bullets: [
    "Develop and maintain Angular, TypeScript, RxJS, and SCSS features for enterprise mobile ownership-transfer workflows supporting residential and corporate customers.",
    "Integrate legacy promotion sources and implement account-aware catalog loading, dynamic package shelves, and package-eligibility filtering.",
    "Build and correct qualification and order-request mappings, including package identity and product-sequence handling for add/delete operations.",
    "Investigate cross-service issues using Kibana, request IDs, Bruno/Postman, and browser DevTools across DEV and PVT environments; collaborate with QA, backend, product, and downstream teams.",
    "Improve package-selection and qualification modules through Jest tests, behavior-preserving refactoring, SonarQube validation, and CI/CD verification.",
  ]},
  { company: "Nilecon (Thailand) Co., Ltd.", monogram: "N", role: "Full-Stack Developer", period: "May 2025 - Jul 2026", meta: "Bangkok, Thailand | Financial services platform", bullets: [
    "Designed and shipped backend APIs and services (Node.js, Express, NestJS, Drizzle ORM) with observability and production-grade error handling.",
    "Integrated secure third-party platforms (PAM, NDID, IFA/MF) with a centralized token proxy, automatic refresh, and resilient retry logic.",
    "Implemented Okta JWT authentication and role-based access control for admin and agent APIs.",
    "Built dashboard and reporting services (commission, tax, and team summaries); improved production reliability and reduced intermittent 5xx incidents by centralizing token refresh, validation, and logging flows.",
    "Created shared S3 file utilities (presigned uploads, normalize/preview helpers) reused across modules.",
    "Applied Zod schema validation with DB-safe patterns; participated in pentest remediation and authored token-refresh and environment-promotion runbooks.",
    "Acted as a client-facing solution consultant — translated business requirements into technical scope, priorities, and release plans with product and partner teams.",
    "Delivered production financial workflows across SIT, UAT, Staging, and Production environments.",
  ]},
  { company: "Freelance", monogram: "F", role: "Full-Stack Developer", period: "May 2024 - Apr 2025", meta: "Digital Service Management Platform | Four-person delivery team", bullets: [
    "Analyzed requirements and planned frontend architecture, REST API scope, and relational database design for core business workflows.",
    "Developed responsive interfaces with Next.js, React, TypeScript, Tailwind CSS, reusable components, forms, and end-to-end user-flow states.",
    "Built NestJS backend services with Prisma ORM and PostgreSQL for authentication, user management, transactions, real-time features, chat, and file uploads.",
    "Integrated authentication, WebSocket/WebRTC features, payment and wallet flows, object storage, and Jest tests; supported integration testing and UAT debugging.",
  ]},
  { company: "Uniga Infotech", monogram: "U", role: "Frontend Developer", period: "Mar 2023 - Apr 2024", meta: "Health Benefit Systems | Promoted from Intern to full-time Frontend Developer", bullets: [
    "Developed and maintained production-ready Angular applications for health-benefit consultant systems.",
    "Built reusable UI components with Angular, TypeScript, and SCSS; managed global application state with NgRx.",
    "Integrated REST APIs and optimized client-side data flow; authored Cypress end-to-end tests.",
    "Participated in code reviews and Agile/Scrum delivery; started as Frontend Developer Intern (Mar–Oct 2023) before joining full-time.",
  ]},
];

export const finops = [
  "Explored modeling enterprise multi-cloud spend across AWS, Microsoft Azure, and Microsoft 365; prototyped right-sizing, license rationalization, anomaly alerting, and chargeback patterns as practice exercises.",
  "Built a 4-week FinOps automation toolkit covering Terraform tag enforcement, AWS Lambda + EventBridge auto-shutdown, Infracost CI cost gates in GitHub Actions, pandas/boto3 chargeback reports, and a Grafana cost dashboard.",
  "Studied the FinOps Foundation framework (Inform, Optimize, Operate) and drafted an internal engagement playbook, SOP, and implementation checklist for FinOps adoption.",
];

export const skillGroups = [
  { title: "Backend", items: "Node.js, TypeScript, Express, NestJS, Drizzle ORM, Prisma, Python, REST APIs, WebSockets, WebRTC" },
  { title: "Frontend", items: "React, Next.js, Angular, Vite, SCSS, Tailwind CSS, MUI, Framer Motion, RxJS, NgRx" },
  { title: "Databases & Storage", items: "PostgreSQL, MySQL, Supabase, Firebase, Amazon S3, MongoDB, Azure Blob Storage" },
  { title: "Cloud & DevOps", items: "AWS (EC2, RDS, S3, Lambda, API Gateway, Secrets Manager, CloudWatch, IAM, EventBridge), Microsoft Azure, Microsoft 365, Docker, Vercel, GitHub Actions, GitLab CI/CD" },
  { title: "FinOps Toolkit (R&D)", items: "Terraform, Infracost, AWS Cost Explorer, AWS Compute Optimizer, AWS Budgets, AWS Cost Anomaly Detection, AWS Trusted Advisor, Azure Cost Management, boto3, pandas, Grafana, CloudWatch" },
  { title: "Security & Auth", items: "Okta, JWT, RBAC, Zod schema validation, OWASP / pentest remediation" },
  { title: "Testing & Tooling", items: "Cypress (E2E), Jest, Figma, Git, GitHub, Kibana, SonarQube, Bruno, Postman" },
  { title: "Methodologies", items: "Agile, Scrum, Code Review, SIT / UAT / Staging / Production delivery" },
];

export const education = [
  { school: "Rajamangala University of Technology Phra Nakhon", period: "Jul 2020 - Feb 2024", detail: "Bachelor of Science in Computer Science | GPA 3.54" },
  { school: "Nakhonsawan Vocational College", period: "May 2017 - Feb 2020", detail: "Vocational Certificate in Business Computer | GPA 3.33" },
];

export const languages = "Thai (Native) | English (Basic Working Proficiency) | Chinese (Beginner)";
