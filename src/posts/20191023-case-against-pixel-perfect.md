---
title: A Case Against “Pixel Perfect” Design
date: 2019-10-23
keywords: ["design"]
---

![Under bright sun light, kids gather in the front yard of the single story building made of bright red clay](https://miro.medium.com/v2/resize:fit:1000/1*SDGJrRbvlHlbSGCoGBDaFg.jpeg)

_Aranya Low Cost Housing by the 2018 Pritzker Architecture Prize Laureate_ Balkrishna Doshi. P*hoto courtesy of VSF*

> _“That dropdown select is so ugly!”  
> “Why does this text input look different in each browser?”  
> “That fuzzy blue focus ring is unacceptable!”_

I can’t remember how many times I’ve heard designers lamenting the ugliness of browser default styles. Similar complaints have been made towards the default scrollbar, the default radio button and checkbox, the default date picker, the default progress indicator, or anything that doesn’t look the same as it appears on the designer’s MacBook running the latest version of Google Chrome.

What happens next may also sound familiar to you: a dozen dependencies were `npm install`\-ed, several hundred kilobytes, if not megabytes of JavaScript and CSS libraries were pushed to the user, twenty-something bugs were discovered, some of which fixed (after many sleepless nights and a pile of empty Red Bull cans), some of which logged as `//TODO`, or `//HACK` and got buried in the backlog forever. And yet more bugs are to be found, only later by our real users.

Three months later. Another redesign. The same drill. Rinse and repeat.

Let me be clear. I’m not a lazy front-end developer who lacks the necessary skills to pull off high-quality cross-browser features in a short period of time. I am a proponent of designers who hold themselves responsible for achieving self-expression, visual consistency, and brand identity through every detail in the user interface. I also believe that a good UX engineer should never compromise a user’s experience for the convenience and ergonomics of his/her own. I aspire to be one of those uncompromising engineers myself.

But I am still writing this article today because I feel the push for the “pixel perfect” design has largely overlooked many of its practical, social, and ethical implications.

## Material honesty in web design

A woodworker works along the grain of the wood to prevent splinter. A butcher slices across to the muscle fiber to improve tenderness. A sailor trims the sail to balance the lift and drag from the wind. When we respect the material, the material pays us back in convenience, safety, and efficiency.

In my opinion, the synergy between the material and the designer is epitomized in the works of The Pritzker Architecture Prize Laureates. [Balkrishna Doshi (2018 Laureate)](https://www.pritzkerprize.com/laureates/balkrishna-doshi), [Alejandro Aravena (2016)](https://www.pritzkerprize.com/laureates/2016), and [Shigeru Ban (2014)](https://www.pritzkerprize.com/laureates/2014) were all cited for their authentic celebrations of vernacular artistic language and deep respect for traditions and local culture, all through the honest use of local materials, some as simple and basic as clay, bamboo, and paper.

![Indian villagers gather in front of three buildings made of paper logs](https://miro.medium.com/v2/resize:fit:700/1*xVyI7YigSlBDMwCfuctC9Q.jpeg)

Paper Log House 2001 Bhuj, India Photo by Kartikeya Shodhan

Good web design requires the same understanding of and respect for the materials. And that material is the browser, along with its semantic HTML, default styles, and standard behaviors. But the wide use of design software such as Figma, Sketch, and AdobeXD has trivialized the nuances of such material into “canvases” or “artboards” of pre-defined sizes. The convenient styling and manipulation of pixels and objects have disguised the hierarchy of the DOM, the constraints of the device, and the personal preferences and browser setting from real users. Dishonest tools encourage dishonest design. Dishonest design leads to dishonest implementation. We force a link to look like a button. We replace a native scrollbar with a sleek looking `div`. We nest one click target inside another. We use `absolute` and `z-index` to position a dropdown select with beautiful drop shadows.

We are working against the grain of the wood.

## The side effects

As we push for that “pixel perfect” design, we, as human-centered designers, argue that it’s all for the benefit of users. A sleek and consistent looking UI often leads to better usability, but there are many side effects that our scorecards won’t tell.

### Features that didn’t get built

For every “pixel perfect” feature we’ve demanded, we are trading off the time that could have been used for building other functionalities and fixing bugs. A responsible and skillful designer should understand the true cost of his/her design through the lens of engineering. Demanding “pixel perfect” design at the cost of investments with higher ROI shows our disrespect for the clients’ budget and time, which ultimately hurts the professional integrity of the design discipline.

### Users who can’t afford the latest iPhone

In the process of achieving the “pixel perfect” design across multiple browsers vendors and legacy versions, we’ve pushed our engineers to install countless libraries to generate, override, fix, and polyfill the visual effects we want. This leads to bloated CSS downloads and JavaScript parsing on a user’s device. The resulting user experience is, ironically, even more inconsistent — the product looks and works great for users with the latest browser, a powerful CPU, and high network bandwidth. But the product may be completely broken for those who run it in non-mainstream browsers on an old Android phone with intermittent 3G connectivity. By pushing for “pixel perfect” design, we’ve pushed out ordinary people who are not on the [Wealthy Western Web](https://www.smashingmagazine.com/2017/03/world-wide-web-not-wealthy-western-web-part-1/).

### Developers who didn’t get the job

As we load more and more tools and libraries into our product, we raise the barrier to enter the web development profession higher and higher. What was once achievable in HTML and CSS now requires complex webpack setup, deep framework knowledge, and advanced JavaScript coding skills. Our “pixel perfect” design leads to over-engineering, which in turn causes the [job requirement inflation](https://rachelandrew.co.uk/archives/2019/01/30/html-css-and-our-vanishing-industry-entry-points/). In the end, a diverse group of people who don’t have a computer science background are left out from ever becoming part of our community.

## Final thoughts

I invite schools and companies to embrace practicality in the education and hiring process:

1.  Design schools should help students learn the material they design for, through coding classes and end-to-end projects, where the material is the web, the browser, and the multitude of devices with unpredictable customization and preferences. The material should not be canvases or artboards created in design software and beautifully framed for Dribbble shots.
2.  Companies should measure the success of designers through practical value delivered to users within the constraints of a client’s budget, time, and technology availability. Portfolio reviews should allow designers to show real products and talk about how their designs were actually built, used, whether they were altered, and if so, why.

### Good design is practical design

Architects push beyond the limits of structural engineering in sculptures, but not in public utility or low-income housing projects. Just as much as I respect architects who conduct bold experiments, I deeply respect designers who shape the future of the web by proposing new standards and crafting demos under experimental flags. Flexbox, CSS Grid, Variable fonts, CSS Houdini, and WebGL are all fruits of this kind of exploration — we should not stop advancing on those frontiers. But when our design is constrained by our clients’ budget and time, will affect a large number of real people, and could have a massive social and ethical impact, we should treat it as a service for the public and operate under practical, economical, and ethical principles.

![People walking with potted plants on top of their heads, down a corridor exposed to sunlight and surrounded by trees](https://miro.medium.com/v2/resize:fit:700/1*ZEIvdBG0r5HNYkd3HGRjpw.jpeg)

Human-centered design means nothing without the people who actually use it. Indian Institute of Management Bangalore. Bangalore, India. Photo courtesy of VSF

> _“Good design is as little design as possible”._
>
> _— Dieter Rams’ ten principles for good design_

In the context of web design, Dieter Rams’ principle is not only a resounding criticism against mindless trends and meaningless decorations. It is a humanist reminder to put material honesty and social responsibility above the pursuit of the “pixel perfect” design.
