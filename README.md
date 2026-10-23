
# IEC Teacher Portal

### Centralized Lesson Plans & PowerPoint Resources

![Version](https://img.shields.io/badge/version-1.0.0-812D45)
![HTML5](https://img.shields.io/badge/HTML5-supported-142747)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-812D45)
![GitHub Pages](https://img.shields.io/badge/hosting-GitHub%20Pages-142747)
![Status](https://img.shields.io/badge/status-development-orange)

---

## Overview

**IEC Teacher Portal** is a web-based instructional resource library designed to support teachers at IEC International Education City, Quang Ngai, Vietnam.

The portal provides a centralized location for accessing standardized ASU-format lesson plans and classroom-ready PowerPoint presentations.

Its primary purpose is to reduce teacher preparation time, improve access to instructional resources, and promote consistent, high-quality classroom instruction.

The platform is designed with a clean, modern interface using HTML5, CSS3, and JavaScript.

**Current release:** Version 1.0.0 — Development Prototype

---

## Mission

**Less Preparation. More Teaching.**

IEC Teacher Portal aims to provide teachers with the instructional resources necessary to deliver engaging, structured, and effective lessons.

The portal emphasizes:

- Consistent instructional delivery
- Reduced lesson preparation time
- Clear learning objectives
- Effective instructional scaffolding
- Student-centered learning
- Classroom interaction
- Formative assessment
- Continuous instructional improvement

---

## Core Resources

The portal focuses exclusively on two instructional resources.

### 1. ASU-Format Lesson Plans

Each lesson includes a standardized lesson plan based on the ASU lesson-planning format adopted for the project.

Lesson plans may include:

- Lesson information and duration
- Learning objectives
- Expected learning outcomes
- Required materials
- Warm-up and engagement
- Teacher modeling
- Instructional scaffolding
- Guided practice
- Independent practice
- Differentiation
- Formative assessment
- Lesson closure
- Teacher reflection

The final structure will follow the approved ASU template.

Supported document formats:

- PDF
- Microsoft Word (DOCX)

### 2. PowerPoint Presentations

Each lesson is accompanied by a classroom-ready PowerPoint presentation.

Presentations are designed to guide teachers through the instructional sequence.

Integrated teaching techniques include:

**Scaffolding**
- Visual prompts
- Vocabulary support
- Teacher modeling
- Sentence frames
- Guided examples
- Gradual release of responsibility

**Instruction Checking Questions (ICQs)**
- Clear task instructions
- Understanding checks before activities
- Pair-work and group-work guidance
- Task completion expectations

**Concept Checking Questions (CCQs)**
- Vocabulary comprehension
- Grammar concept checks
- Meaning verification
- Contextual understanding

**Student Engagement**
- Icebreakers
- Warm-up activities
- Interactive questions
- Guided discussions
- Collaborative learning
- Independent activities

**Assessment**
- Knowledge checks
- Formative assessment
- Exit tickets
- Learning objective verification

Presentations are designed to reduce the need for teachers to create instructional slides independently.

Primary presentation format:

- Microsoft PowerPoint (PPTX)

---

## Supported Programs

The portal is designed to accommodate the following instructional programs.

### Cambridge English

- Pre-A1 Starters
- A1 Movers
- A2 Flyers
- A2 Key (KET)
- B1 Preliminary (PET)

### IELTS

- IELTS Foundation
- IELTS Level 1
- IELTS Level 2
- IELTS Level 3

### Oxford International Curriculum

- Kindergarten
- Primary Grades 1–5
- Secondary Grades 6–9

Program categories will be populated as lesson resources are developed, reviewed, and approved.

The portal does not distribute textbooks or publisher-owned instructional materials without authorization.

---

## Website Features

### Teacher Resource Dashboard

A centralized dashboard allows teachers to locate available lesson resources.

### Search and Filtering

Teachers can search and filter resources by:

- Program
- Level
- Unit
- Lesson number
- Lesson title

### Lesson Resource Cards

Each lesson contains two primary resources:

1. ASU Lesson Plan
2. PowerPoint Presentation

### Resource Availability

Lessons without uploaded materials display an unavailable or coming-soon status.

### Responsive Interface

The website is designed for:

- Desktop computers
- Laptops
- Tablets
- Mobile devices

### IEC Visual Identity

The portal uses a consistent visual design.

Primary colors:

- Navy Blue: `#142747`
- Maroon: `#812D45`
- White: `#FFFFFF`

---

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | HTML5 |
| Styling | CSS3 |
| Interactivity | JavaScript ES6 |
| Resource Catalog | JavaScript Data Objects |
| Version Control | GitHub |
| Prototype Hosting | GitHub Pages |
| Deployment | GitHub Actions |
| Production Authentication | Planned |
| Protected File Storage | Planned |

The initial version uses a lightweight static architecture without a database or backend server.

---

## Repository Structure

```text
iec-teacher-portal/
│
├── README.md
├── index.html
├── login.html
├── portal.html
│
├── assets/
│   ├── css/
│   │   └── styles.css
│   │
│   └── js/
│       ├── data.js
│       └── app.js
│
├── resources/
│   ├── lesson-plans/
│   └── presentations/
│
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## Lesson Organization

Each lesson is identified by:

- Program
- Unit number
- Lesson number
- Lesson title
- Lesson duration
- Lesson plan file
- PowerPoint file

Example:

**Program:** A1 Movers

**Unit:** 3

**Lesson:** 2

**Lesson Title:** Describing People

**Resources:**
- ASU Lesson Plan
- PowerPoint Presentation

Example filenames:

```text
movers-u03-l02.pdf
movers-u03-l02.pptx
```

Lesson titles and numbering must be verified against the approved instructional sequence before publication.

---

## Local Development

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/iec-teacher-portal.git
```

Enter the project directory:

```bash
cd iec-teacher-portal
```

Start a local development server:

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000
```

No Node.js installation or build process is required for the initial static version.

---

## GitHub Pages Deployment

The project supports automatic deployment using GitHub Actions.

Deployment steps:

1. Create the GitHub repository.
2. Upload the project files.
3. Open repository Settings.
4. Select Pages.
5. Under Build and deployment, choose GitHub Actions.
6. Push changes to the main branch.
7. Allow the deployment workflow to complete.

Example website address:

```text
https://YOUR-USERNAME.github.io/iec-teacher-portal/
```

Replace `YOUR-USERNAME` with the repository owner's GitHub username or organization.

A custom domain may be configured in a future release.

---

## Security and Access

### Development Version

The GitHub Pages prototype is publicly accessible.

The prototype login page does not provide real authentication.

No confidential IEC materials, student records, private teacher information, credentials, or restricted instructional files should be published in the GitHub Pages deployment.

### Production Version

The intended production portal will provide:

- Authenticated teacher accounts
- Authorized resource access
- Protected document downloads
- Secure file storage
- HTTPS
- Administrative resource management

Authentication must be enforced by a trusted backend or identity provider.

Client-side JavaScript restrictions alone are not sufficient to secure private resources.

---

## Resource Standards

Each published lesson should meet the following requirements:

- Use the approved ASU lesson-plan format.
- Include clear learning objectives.
- Align the lesson plan and presentation.
- Include appropriate instructional scaffolding.
- Include ICQs where task instructions require checking.
- Include CCQs where meaning or concepts require checking.
- Provide opportunities for guided practice.
- Include student participation.
- Include appropriate formative assessment.
- Be reviewed before publication.

Lesson resources should be appropriate for the target student level and instructional context.

---

## Development Roadmap

### Version 1.0 — Foundation

- [ ] Responsive website homepage
- [ ] Teacher resource dashboard
- [ ] Program filtering
- [ ] Unit filtering
- [ ] Lesson search
- [ ] ASU lesson-plan links
- [ ] PowerPoint resource links
- [ ] Resource availability indicators
- [ ] GitHub Pages deployment

### Version 1.1 — Resource Expansion

- [ ] Add approved lesson plans
- [ ] Add corresponding PowerPoint presentations
- [ ] Expand supported program categories
- [ ] Improve resource navigation
- [ ] Add lesson resource version labels

### Version 2.0 — Secure Teacher Portal

- [ ] Teacher authentication
- [ ] Protected file storage
- [ ] Role-based access
- [ ] Administrative resource publishing
- [ ] Resource revision history
- [ ] Resource approval workflow

Future features are proposals and are not included in the initial static prototype.

---

## Educational Philosophy

The portal supports an instructional approach built around:

**Model → Guide → Practice → Assess**

Teachers should provide clear examples, scaffold learning appropriately, verify understanding, encourage active student participation, and assess achievement of lesson objectives.

Instructional presentations are intended to support professional teaching practice rather than replace teacher judgment or responsiveness to student needs.

---

## Copyright and Resource Use

Original portal source code and instructional resources may be subject to separate ownership and licensing arrangements.

Third-party textbook content, illustrations, publisher presentations, and other copyrighted materials must not be redistributed without appropriate authorization.

IEC branding and institutional materials should be used only with appropriate approval.

---

## Project Status

**Version:** 1.0.0

**Stage:** Initial Development

**Hosting:** GitHub Pages

**Primary Audience:** IEC Teaching Staff

**Project Focus:** ASU Lesson Plans and Classroom PowerPoint Presentations

---

## Project Attribution

IEC Teacher Portal

Developed as an instructional resource initiative to support teachers and promote consistent classroom practice at IEC International Education City, Quang Ngai.

Institutional adoption, ownership, and branding are subject to IEC approval.

---

**IEC Teacher Portal**

*Less Preparation. More Teaching.*
