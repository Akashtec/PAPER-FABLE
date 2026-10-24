# Paper Fable

**A little paper. A whole other world.**

Paper Fable is a tiny, interactive storybook. Choose a found object, the weather, and a companion; the page folds them into a gentle little fable.

It is deliberately small, self-contained, and offline-friendly.

## Try it

Open **[Paper Fable on GitHub](https://github.com/Akashtec/PAPER-FABLE)** and use the project files locally, or enable GitHub Pages to publish the static site.

### Run locally

No package manager, API key, build step, or server is needed.

1. Download or clone this repository.
2. Open \`index.html\` in a modern browser.
3. Choose the three story ingredients and select **Fold my fable**.
4. Copy the story or start again.

You can also use VS Code's Live Server extension if you prefer a local address.

## What it does

- Combines three small choices into a fable.
- Offers different story openings, atmospheric details, and endings.
- Lets readers copy a fable or reset the page.
- Works without accounts, external APIs, analytics, or a database.
- Adapts to mobile screens and respects reduced-motion preferences.
- Uses semantic HTML, keyboard-accessible controls, and text-safe DOM updates.

## Files

- \`index.html\` — accessible page structure and the illustrated paper.
- \`styles.css\` — responsive, paper-and-forest visual design.
- \`app.js\` — deterministic, local story generation and interactions.

## Design intent

This is not an AI text generator. It is a deliberately authored story toy: small, quick, predictable, and private by default. The limited combinations are part of its charm; every story is assembled locally from the included writing.

## Publish with GitHub Pages

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Choose the \`main\` branch and \`/(root)\` folder, then save.
4. After GitHub Pages publishes it, use the URL shown in Settings → Pages.

No secrets or environment variables are required.

## License

Unless a license is added to this repository, all rights are reserved by default. Add a license file if you want others to reuse, modify, or redistribute the project.