# Validation — 27 October 2026

- TypeScript and Vite production build: passed.
- `npm test`: four packaging tests passed (relative assets exist; deployed résumé matches public PDF; original portrait/favicon ship; metadata and structured data survive).
- Real browser download: clicked the Hero Download Resume control. The downloaded PDF, supplied original, and built PDF all had SHA-256 `AFE562567D2BA3206E8EFA32143545DB3BC9B9C2463B594B2980E61247A73FA9` (69,597 bytes).
- View Resume controls: correct same-origin PDF URL, `_blank` target, and safe rel attributes verified. PDF endpoint returns HTTP 200 with `application/pdf`. The in-app browser hands PDF viewing to its native handler; PDF reader UI was not inspected.
- Light/dark switch and saved preference across reload: verified in browser.
- Mobile menu: opens, closes after a section selection, closes on Escape, and restores focus to its toggle on Escape.
- Active Projects navigation: verified after reaching its anchor. All internal hash targets exist.
- Layout width checks: 320, 375, 390, 600, 768, 820, 1024, 1100, and 1440 CSS pixels; no horizontal document overflow.
- Desktop and phone layouts: visually inspected in the browser. These are viewport checks, not physical Android/iPhone device tests.
- Browser console: no warnings or errors reported during the interaction checks.
- Original `src/data.ts`, portrait, dependency declarations, and lockfile: retained. No invented project links or personal credentials added.
- Project GitHub repositories, all three live demos, GitHub profile, two TruScholar routes, and the Drive credential route: HTTP 200. These checks establish reachability, not the full functionality or authenticity of third-party content.
- LinkedIn: automated request returned HTTP 999 (automation access blocked); the supplied URL is retained and needs a normal browser check.
- Contact email links were checked without sending messages.
- Reduced motion: explicit CSS override disables animations, transitions, and smooth scrolling; Reveal and portrait honor Motion's user preference. A physical device/OS reduced-motion toggle was not exercised.
- No external hosting deployment performed. The output is a static build ready for manual Vercel, Netlify, or GitHub Pages deployment.

The PDF is not fetched until the visitor selects a résumé control. The portrait is prioritized, fonts are served locally, and project illustrations require no extra image downloads.

## Email controls — 30 October 2026

Say hello, the contact Email row, and the hero Email icon open the shared native dialog. Gmail compose and mailto destinations were verified without sending messages. The copy action resolves and shows success feedback; the OS clipboard content was not independently confirmed. Escape closes the dialog and restores trigger focus. The dialog fits 320px and 390px viewports without horizontal content overflow. Production build passes.

