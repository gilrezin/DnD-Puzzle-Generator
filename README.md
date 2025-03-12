# D&D Puzzle Generator
**Using generative AI, scan player sheets to create puzzle ideas that take advantage of your player characters' unique abilities, items, and movesets.**

*This was a project started during the 2025 CrimsonCode hackathon at Washington State University. Our initial goal was to create a D&D session planner - given player character information and the current progress of the story, generate NPCs, enemy, and puzzle ideas that are best utilized via the information given. However, during late-stage testing we found that the most engaging yet underperforming part of the program was the puzzle section. Following this, I've taken it upon myself to complete this project under the vision I desire.*

For a Dungeons and Dragons DM, while each session follows a general storyline, you need to be prepared for whatever scenario players may throw your way. I've personally spent many hours watching the professionals on Dimension 20 and am amazed by their ability to create engaging & fun storylines while also making the most of their characters' items, spells, and personality traits. It can be difficult to create a cohesive storyline with challenging puzzles that utilize player characters to their greatest extent. As a result, many D&D games resort to a hack-and-slash playstyle, in which players merely:
- move until an enemies is encountered
- attack the enemy until it dies
- repeat

The goal of this project is to mitigate that. **Using generative AI to scan player sheets, potential puzzle ideas are identified that take advantage of your player characters' unique abilities, items, and movesets.**

## How does it work?
<img src="https://github.com/user-attachments/assets/bb576ad7-ad2a-4b66-9e96-1b371cad398d" width="350">

At its core, this project is a web application with a backend that calls an LLM.
Node.js is used for the frontend, whereas Django is used for the backend.
We experimented with a number of LLMs, but found that DeepSeek gave the best responses out of the ones we tested. The LLM is called via Cloudflare's API.
