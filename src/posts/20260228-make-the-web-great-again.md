---
title: Make The Web Great Again
date: 2026-02-28
keywords: ["engineering", "ai"]
---

AI has finally cross️ed the threshold for writing WebAssembly. Not just understanding and explaining it, but implementing new algorithms and optimizing for performance.

In two days, I published:
- [Fast Theta](https://github.com/chuanqisun/fast-theta), cosine similarity 3× the state of art
- [Eigen DB](https://github.com/chuanqisun/eigen-db), vector search 6-10× the baseline

Both libraries are written in _raw assembly_ and runs in your browser:

The performance boost is no surprise - compiled WASM is supposed to be faster than interpreted JS. I'm both amused and concerned that no one seems to have built these before given how useful they are to LLM related systems. It feels as if the Web ecosystem is being hollowed out by Python because Python is the default language for AI but people stopped caring about anything else that is not strongly associated with AI.

So here is a reminder: not everyone has the right Docker setup to wrangle a Python environment, but everyone has a browser that can run JavaScript, WebAssembly, and Web GPU shader code.

The Web becomes especially attractive as local agents enable more interactive end-user programming. You can paint with [p5.js](https://p5js.org/), diagram with [Mermaid](https://mermaid.js.org/), make music with [Strudel](https://strudel.cc/), track head/hand/eye with [MediaPipe](https://github.com/google-ai-edge/mediapipe)...

_All inside the browser!_

The browser is the universal game engine for making playful, useful, and artful things. Builders in the Web ecosystem, this is your opportunity to solve hard problems with new tools. Let's make the Web great again!

Ready to step up your game? Go read and practice:

- [WebAssembly (WASM) toolchain](https://webassembly.org/)
- [Web Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
- [Atomics API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics)
- [Origin Private File System (OPFS)](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system)
- [Performance Engineering](https://www.youtube.com/watch?v=o7h_sYMk_oc&list=PLUl4u3cNGP63VIBQVWguXxZZi0566y7Wf)