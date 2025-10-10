---
title: Stack Diver
layout: "base.njk"
---

# About me

I am a Media Arts & Sciences researcher at the MIT Media Lab. My writings are made possible by visionaries who believe in the power of words as well as the technology and art they inspire. You are invited to join me as a sponsor for my work, a collaborator, or a host for my talks and presentations. Please reach out via [LinkedIn](https://www.linkedin.com/in/chuanqi-sun).

# Recent posts

{% for post in collections.post limit: 100 reversed %}

<!-- hide the "post" tag because it is self-evidence -->

- [{{ post.data.title }}]({{ post.url }}) {{ post.data.date | humanDate }} {% for tag in post.data.keywords %} #{{ tag }}{% endfor %}

{% endfor %}
