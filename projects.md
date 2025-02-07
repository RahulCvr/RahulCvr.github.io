---
layout: default
title: Projects
permalink: /projects/
---

## data science---


{% for project in site.projects %}
{% if project.category == 'data' %}
<div style="margin-bottom: 20px;">
  <h3>{{ project.name }}</h3>
  <!-- Attempt to load PNG or JPG -->
  <div>
    <a href="/assets/datapngs/{{ forloop.index }}.png" class="lightbox_trigger">
      <img src="/assets/datapngs/{{ forloop.index }}.png" alt="{{ project.name }}" style="height:200px; width:auto;">
    </a>
    <a href="{{project.url}}"> link </a>
  </div>
  <p>{{ project.description }}</p>
</div>
{% endif %}
{% endfor %}



## consulting---


{% for project in site.projects %}
{% if project.category == 'consulting' %}
<div style="margin-bottom: 20px;">
  <h3>{{ project.name }}</h3>
  <!-- Attempt to load PNG or JPG -->
  <div>
    <a href="/assets/consultingpngs/{{ forloop.index }}.png" class="lightbox_trigger">
      <img src="/assets/consultingpngs/{{ forloop.index }}.png" alt="{{ project.name }}" style="height:200px; width:auto;">
    </a>
  </div>
  <p>{{ project.description }}</p>
</div>
{% endif %}
{% endfor %}