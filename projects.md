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

<div>
  <h4> Filter by category: </h4>

  <select id="category-filter" onchange="filterProjects()">
    <option value="all">All</option>
    <option value="data science">Data Science</option>
    <option value="data engineer">Data Engineer</option>
    <option value="mlops">MLOPs</option>
    <option value="analyst">BI/Analyst</option>
    <option value="consulting">Consulting</option>
    <option value="others">Others</option>
  </select>
</div>

{% for project in site.projects %}
<div class="project-item" data-category="{{ project.category | join: ',' }}" onclick="toggleDescription('desc-{{ forloop.index }}')">
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