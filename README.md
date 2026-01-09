# ✨ GitCard - Your GitHub Profile at a Glance

GitCard is a sleek, interactive web application that generates a beautiful, shareable card summarizing your GitHub profile. It's built with modern web technologies and features fluid animations to present your stats in an engaging way ;)

**FOLLOW DEVLOGS AT**: [https://veigatec.rf.gd/project/gitcard/](https://veigatec.rf.gd/project/gitcard/)

---

## 🚀https://veigatec.rf.gd/project/gitcard/

![GitCard Logo](/docs/gitcard-logo.png)
_GitCard Logo_

---

## Devlopment Progress

### Day 1:

Day 1 is all about designing, the wireframes. 

![GitCard Wireframe Design](/docs/gitcard-wireframe.png)
_GitCard Wireframe Design_

### Day 2:

Day 2 has been bringing the logic to life. I created a simple util, Github.ts,
that fetches data from Github API. Then it calculates stars, repos and all what is required for this app.

![GitCard Logic](/docs/gitcard-logic.png)
_GitCard Logic_

### Day 3:

Day 3 has been about the visuals. I used lucide for icons and framer-motion for animations.
This is where now the application starts breathing, the existenceness ;)

Below are four cards or `cheshire137` (Sarah Vessels):

<table>
  <tr>
    <td align="center">
      <img src="/docs/cheshire137-profile.png" alt="Gitcard - cheshire137 profile" width="100%">
      <br />
      <em>Gitcard - cheshire137 profile</em>
    </td>
    <td align="center">
      <img src="/docs/cheshire137-the-tech.png" alt="Gitcard - cheshire137 the tech" width="100%">
      <br />
      <em>Gitcard - cheshire137 the tech</em>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/docs/cheshire137-the-grind.png" alt="Gitcard - cheshire137 the grind" width="100%">
      <br />
      <em>Gitcard - cheshire137 the grind</em>
    </td>
    <td align="center">
      <img src="/docs/cheshire137-hall-of-fame.png" alt="Gitcard - cheshire137 hall of fame" width="100%">
      <br />
      <em>Gitcard - cheshire137 hall of fame</em>
    </td>
  </tr>
</table>

---

## 🚀 Features

* **Dynamic Profile Data:** Fetches your GitHub profile information in real-time.
* **Repo Insights:** Calculates and displays your most used languages and your most starred repository.
* **Interactive View:** A multi-pane card with smooth, custom slide animations to navigate between different stats.
* **Modern UI:** A clean, visually appealing design built with Tailwind CSS.

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (v16 App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

* [Node.js](https://nodejs.org/) (v20 or later recommended)
* npm, yarn, or your favorite package manager

### Installation & Setup

1. **Clone the repository:**

```bash
    git clone https://github.com/Valent-p/gitcard.git
    cd gitcard
```

2. **Install dependencies:**

```bash
    npm install
```

3. **Run the development server:**

```bash
    npm run dev
```

4. **Open the application:**
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result. 

---

### A Note on API Rate Limits

This project uses the public GitHub API to fetch profile data. Unauthenticated requests are subject to a rate limit of 60 requests per hour per IP address. For personal use and development, this is generally sufficient.
