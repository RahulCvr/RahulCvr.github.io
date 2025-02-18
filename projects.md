---
layout: projects
title: Projects
permalink: /projects/
---

<!-- ## data science---


{% for project in site.projects %}
{% if project.category == 'data' %}
<div style="margin-bottom: 20px;">
  <h3>{{ project.name }}</h3>
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
  <div>
    <a href="/assets/consultingpngs/{{ forloop.index }}.png" class="lightbox_trigger">
      <img src="/assets/consultingpngs/{{ forloop.index }}.png" alt="{{ project.name }}" style="height:200px; width:auto;">
    </a>
  </div>
  <p>{{ project.description }}</p>
</div>
{% endif %}
{% endfor %} -->

## projects

{% for project in site.projects %}
<div class="project-item" onclick="toggleDescription('desc-{{ forloop.index }}')">
  <!-- <div class="project-icon">
    <img src="{{ project.icon }}" alt="{{ project.name }}">
  </div> -->
  <div class="project-details">
    <h3>{{ project.name }}</h3>
    <p class="project-short">{{ project.short_description }}</p>
  </div>
</div>

<div id="desc-{{ forloop.index }}" class="project-description">
  <p>{{ project.description }}</p>
  <div class="tags">
    {% for tag in project.tools %}
      <span class="tag">{{ tag }}</span>
    {% endfor %}
  </div>
</div>
{% endfor %}