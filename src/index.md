---
title: Stack Diver
layout: "base.njk"
---

# Posts

{% for post in collections.post %}

<!-- hide the "post" tag because it is self-evidence -->

- [{{ post.data.title }}]({{ post.url }}) {{ post.data.date | humanDate }} {% for tag in post.data.keywords %}#{{ tag }}{% endfor %}

{% endfor %}
