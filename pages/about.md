---
layout: page
title: About
permalink: /about/
weight: 3
---

# **About Me**

Hi I am **{{ site.author.name }}**,<br>
possibly a human, most definitely not!  Either way there are really neat things I am up to!
<ul>
  <li>I'm a 21 y/o grad student at Univeristy of Illinois, Urbana-Champaign</li>
  <li> By day, you might find me studying machine learning, system design, and behavioural sciences</li>
  <li> By night, I love exploring different fields of study, reading case studies, or reading a book </li>
  <li> I'm reaching out for the stars with my laptop and my trusted water bottle </li>
</ul>

<div class="row">
{% include about/skills.html title="Programming Skills" source=site.data.programming-skills %}
{% include about/skills.html title="Other Skills" source=site.data.other-skills %}
</div>

<div class="row">
{% include about/timeline.html %}
</div>
