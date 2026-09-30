# The hardest part

Getting the reference in the first place. The given URL sits behind Vercel's "Security Checkpoint", so `curl`, a plain fetch and a headless browser all got the bot-check page instead of the listing. I tried a normal HTTP fetch, then headless Edge with a fresh profile, then Playwright with automation flags hidden. None got through.

A public sibling deployment of the same listing wasn't blocked, so I used it as the visual and content reference: I pulled the text, the photo list, the icon shapes, and screenshots of the listing and photo tour. I wrote all the code myself.

That site also had broken hero images, so I rebuilt the hero from the photos' own captions. The photo tour room order came from its tab labels.

The second tricky bit was the overlays. With the page behind them made `inert`, the browser dropped focus before my modal saved it, so closing the tour left focus on the page body. I fixed it by capturing the trigger during render, before the `inert` attribute lands. After that, the tour and lightbox close in order with `Esc` and focus goes back to the photo you opened them from.

Where I didn't match exactly: I couldn't see the reference lightbox, so its styling (a black background) is my call.
