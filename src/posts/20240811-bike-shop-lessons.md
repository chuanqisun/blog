---
title: Lessons from A Bike Shop
date: 2024-08-11
keywords: ["cycling"]
---

A year ago, I started building bikes for [REI](https://www.rei.com/). My friends and family were doubtful how long I would last. They saw it as a job for teenagers, not a career for a software engineer. They might be right in that younger people can benefit from a transitional job like this while they study towards a college degree and ultimately move onto something more lucrative and purposeful. I am not in that camp. I had always enjoyed spending long hours working on my own bikes. I saw it as a form of therapy, where I can finally tune out the constant murmur of the software problems in my head.

Ironically, the bike shop has taught me more about software than any of my previous jobs. Here are some lessons I learned:

## Slow is smooth, smooth is fast

During my first few weeks of training, the master mechanic emphasized on proper form and flow. It was not about moving quickly. It was about moving intentionally. Instead of working hard, it's better to work smart. The mechanical advantage gained from proper body position and tool placement can save you from a broken back at the end of the day. I learned that the hard way.

I believe the underlying principle is about generating **cognitive surplus**, which can in turn be used for mastering higher skills, a mental framework used by [Christian Hagel](https://substack.com/@uxletters) when he talked about improving mountain biking skills.

I remember when I praticed the piano as a kid, the teacher would put me on a slower tempo and progressively increase the speed as I demonstrated proficiency at the lower speed. I needed the cognitive surplus to step up to the next level. Similar principle applies to rowing a boat. I tried using high stroke rate to gain power but quickly found myself with a back inury. When I observed the more experienced rowers, they are able to output the same amount of power at almost any stroke rate, because their form is more efficient. And to build that form, slow and smooth is the way to go.

When I first learned VIM, I was too eager to be productive, so I skipped a lot of basics and relied heavily on `hjkl` movements. Year later, I got a chance to slow down and relearn the basics. Now I'm moving much faster with few key strokes. The additional cognitive surplus from mastering the basics is now allowing me to learn more advanced features of VIM.

## Step back to go forward

One day I was trying to align a handlebar perfectly straight. It was a struggle. I was about to ask for a [laser tool](https://bikerumor.com/review-perfectly-aligned-handlebars-tune-spurtreu/) just before the master mechanic came over and asked me to step back. "You can't see the problem if you look too closely", he said. I tried. The issue became very obvious, so did the solution.

Another time, I was installing an thru-axel into a fork that is known to easily strip the threads if you are not careful. I timidly turned the axel little by little, not knowing whether the threads were properly engaged, I worry that the next turn could be the one ending the life of the expensive axel. The master mechanic took over the wrench and his next move shocked me - he turned the wrench backward while pushing into it, until he felt a click, then he effortlessly threaded the axel in. That haptic feedback was the clear signal of proper thread engagement.

Being a detail-oriented person, I gravitate towards the minutia of every problem. Stepping back means to re-evaluate the situation at a higher altitude, so I can identify the root cause of a bug, to understand an issues in context. Sometimes all I need is to find an alternative solution to the same jobs-to-be-done. Backing all the way out requires fighting the sunk cost fallacy. It takes courage to revert a big git commit. It requires strong communication skills to terminate stagnating project without hurting the people who put countless hours behind it. Just like backing a truck, to know you have to back it out is one thing, to execute it gracefully is another.

## Design for service

Certain bikes are designed to make the mechanic's life miserable. They use properiatary parts connected by hard to open and difficult to reach contraptions. They are impossible to service without the right tools and years of experience. You know what I'm talking about if you've ever tried internally routed a dropper post cable through a frame with a reverse bending geometry. It requires the complete removal of the bottom bracket.

I get it. A bike needs to prioritize the rider's experience above the mechanic's. We have the same [priority of constituencies](https://www.w3.org/TR/design-principles/#priority-of-constituencies) for the web

> User needs come before the needs of web page authors, which come before the needs of user agent implementors, which come before the needs of specification writers, which come before theoretical purity.

But the lens of priority constituencies is only useful if bike riders and mechanics as two separate groups with conflicting interest. That is not the case.

1. A miserable mechanic means slower and more expensive bike repairs. What is good for the mechanic is also good for the rider.
2. Given that some riders want to service their own bikes, and they _must_ service their own bikes when they are on the trail with no bike shop in sight, a bike that is easy to service is definitely good for the rider.

Maybe there is gatekeepine, intentional or not, in the bike industry where bike manufacturers is relying on bike shops and tool manufacturers to serve the user, while the shops and tool makers are relying on non-serviceable designs to keep their business profitable. In this environment, the user would lose agency in servicing their own bikes. Regulators can't step in because no harm is done. In fact, most people don't care that much about servicing their own bikes. They just want to ride.

I've seen similar trends in software (and hardware) design. The more technology we pack into a product, the most difficult it is for users to understand, let alone service it. Most users don't care about the "implementation details" of the software. The just want to get things done. I think while that might be a profitable way in building products, it will lead to an ever-growing gap among developers, users, and maintainers, and ultimately alienating people from technology.

I love how the open-source community has always seen every user as the equals of the developers and maintainers. I also love how businesses like [iFixit](https://www.ifixit.com/) and [Framework](https://frame.work/) have joined hands in challenging the imcumbents to make more serviceable of products. I hope to see the equivalent movements in the bike industry.

## Finding peace

Working as a bike mechanic can be stressful when you have promised a customer the bike will be ready for pick-up by 5pm tomorrow and suddenly you found out the parts you are suppose to install have a compatibility issue. You must order replacements from a third party that does not answer your phone and their web ordering system is down for maintenance.

This sounds familiar to developers facing a tight deadline as a bug surfaced in a dependency with no maintainer in sight. But unlike software engineering where most problems have clear solutions based on logic and reason - and even if no logic or reason can help, there is always some workaround or a smart hack as a stop gap - a bike is a fragile puzzle with a life of its own. No amount of Googling or browsing Stack Overflow will help you remove rusted bolts, chase stripped threads, or straighten bent derailleurs on components that even the most experienced mechanic has never seen in their life. Think of it as the worst legacy code base you've seen, but unlike coding, you cannot undo, revert, or rollback. If you lose a piece of hardware or break a component, it might be the last one available. You just ruined a customer's heirloom bike.

To find peace amidst chaos, I see my job through the Stoic circles of control, influence, and concern. I can control what tools I use and how I use them, to the extent my training and experience allows. I can influence my coworkers and customers to make sound decisions that makes my job easier, to the extent they are willing to listen. As for the rest, bad things can happen: a wheel that resists truing, a fork with manufacturing defect, a customer who is never satisfied. I've made my blunders, damaging and losing stuff, and have carried the weight of their financial, emotional, and moral consequences. Some lasted even to this day. I try to accept them as part of the job and move onto what's next. It brings down my ego to accept that I make mistakes, I don't know everything, nothing is perfect, and others can see things differently.

The bike shop is a microcosm of life, where making progress requires making mistakes. While we cannot fix everything we've broken, the least we can do is to forgive ourselves and each other for our mistakes. That's how we can keep the wheel of life spinning.
