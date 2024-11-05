---
layout: default
title: Projects
permalink: /projects/
---



## projects---

[Illinois gym app]


{% for project in site.projects %}
<div style="margin-bottom: 20px;">
  <img src="{{ project.image }}" alt="{{ project.name }}" style="width:200px; height:auto;">
  <h3>{{ project.name }}</h3>
  <p>{{ project.description }}</p>
</div>
{% endfor %}

