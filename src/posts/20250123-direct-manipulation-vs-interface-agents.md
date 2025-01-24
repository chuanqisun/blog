---
title: Direct Manipulation vs Interface Agents
date: 2025-01-23
keywords: ["design", "hci", "ai"]
---

Reading the 1997 [Direct Manipulation vs Interface Agents](https://dl.acm.org/doi/pdf/10.1145/267505.267514) debate transcript, I found the observations and arguments presented by [Ben Shneiderman](https://en.wikipedia.org/wiki/Ben_Shneiderman) and [Pattie Maes](https://en.wikipedia.org/wiki/Pattie_Maes) ever more relevant today as companies release agentic AI systems to the commercial software market.

Things that drew my attention:

> We call it an agent to emphasize the fact that agent software can act on your behalf while you are doing other things. - Pattie Maes

This is an important distinction between agents and chat assistants similar to ChatGPT. I would argue that the chat assistants are not true agents per Pattie Maes' definition because the user is twiddling their thumbs rather than doing other things while the agent is spitting out information that still requires human review or error correction. Human in the loop, when implemented poorly, is a bug, not a feature.
 
> Speaking commands is cognitively more demanding than pointing. Speech uses your short-term memory and working memory. By contrast, hand-eye coordination can be conducted in parallel with problem solving by another part of your brain and therefore does not degrade your performance as much as speaking. - Ben Shneiderman

I agree, and typed-in chat commands are even more cognitively expensive than verbal ones. I would often get [AI prompting fatigue](./20240201-ai-fatigue) after using chat UX for a while. Thinking about what to say/type and organizing words with the correct grammar is hard, and presumably much harder for non-native speakers. While AI allows the user to speak their native tongues, it doesn't fully absolve users of the language burden. On the other hand, language could be both the source and the projection of our reasoning process and may be an essential tool for thinking. In that regard, the tax we pay for working with language is as inevitable and necessary as the cognitive nature of the task itself. The important question is: are we wasting our thinking on setting up the system (i.e. prompt engineering) or are we using our thinking to actually understand and solve problems?

> A leading AI researcher commented to me that the 30 years of planning work in AI is essentially down the tubes because of lack of attention to the user interface. The designers deliver a system and the first thing that the users say is, “This is great but what we really want to do is change these parameters.” The designers say, “Well, you know, we didn’t put that in the interface.” - Ben Schneiderman

The agents on the market today are not general-purpose enough to free users from thinking in terms of parameters - the grounding knowledge and the tool/actions calls are all defined by the developer and unknown to the user. Philosophically, a truly general-purpose agent may be a [map as big as the city itself](https://en.wikipedia.org/wiki/On_Exactitude_in_Science), which is either unattainable, or useless due to lack of focus/specialization/abstraction. So Ben's observation will remain relevant as long as abstraction, the art of managing complexity by hiding things, remains the name of the game in computer programming.

