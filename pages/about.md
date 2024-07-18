---
layout: page
title: About
permalink: /about/
weight: 4
---

# **About Me**

Hi! I am **{{ site.author.name }}**,<br>
possibly a human, or maybe a corgi!  Either way there are really neat things I am up to!
<ul style="line-height: 1.8;">
  <li>I'm a 22 y/o grad student at Univeristy of Illinois, Urbana-Champaign</li>
  <li> By day, you might find me in class, analysing business case studies and turning numbers into narratives - practicing for those future billable hours, one spreadsheet at a time!</li>
  <li> By evening, I love to go out for a walk or play squash </li>
  <li> Lately I've been working on some cool projects and research involving machine learning and LLMs, which I plan to share here (and on my Github: <a href="github.com/rahulcvr" >rahulcvr</a> ) </li>
</ul>

<div class="row">
{% include about/skills.html title="Programming Skills" source=site.data.programming-skills %}
{% include about/skills.html title="Other Skills" source=site.data.other-skills %}
</div>

<div class="row">
{% include about/timeline.html %}
</div>
