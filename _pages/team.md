---
layout: page
title: Team
description: Meet the researchers and students connecting geometric foundations, computational methods, and experiments in robotics and aerospace engineering.
permalink: /members/
excerpt: Meet the FDCL team.
toc: false
---

<div class="team-directory">
  <nav class="team-nav" aria-label="Team sections">
    {% for member_type in site.data.settings.member_type %}
    <a href="#team-{{ member_type.role }}">{{ member_type.name }}</a>
    {% endfor %}
  </nav>
  {% for member_type in site.data.settings.member_type %}
  {% assign group = site.members | where: 'role', member_type.role %}
  {% if member_type.role == 'alumni' %}
    {% assign group = group | sort: 'end_year' | reverse %}
  {% else %}
    {% assign group = group | sort: 'name' %}
  {% endif %}
  {% if group.size > 0 %}
  <section class="team-section{% if member_type.role == 'alumni' %} team-section--alumni{% endif %}" id="team-{{ member_type.role }}">
    <h2>{{ member_type.name }}</h2>
    <div class="team-grid">
      {% for member in group %}
      <article class="team-card{% if member_type.role == 'professor' %} team-card--director{% endif %}">
        <a class="team-card__portrait" href="{{ member.url | relative_url }}" aria-hidden="true" tabindex="-1"><img class="no-lightense" src="{{ member.image | relative_url }}" alt="" loading="lazy" width="100" height="100"></a>
        <div class="team-card__content">
          <h3><a href="{{ member.url | relative_url }}">{{ member.name }}</a></h3>
          <p class="team-card__role">{{ member.role_title }}</p>
          {% if member.role == 'alumni' %}
            {% if member.degree %}<p class="team-card__dates">{{ member.degree }}</p>{% endif %}
            <p class="team-card__dates">Lab: {{ member.start_year }}–{{ member.end_year }}</p>
          {% elsif member.appointment_start_year %}
            <p class="team-card__dates">{{ member.appointment_start_year }}–present</p>
          {% elsif member.start_year %}
            <p class="team-card__dates">{{ member.start_year }}–present</p>
          {% endif %}
          <p class="team-card__research">{{ member.research_summary }}</p>
        </div>
      </article>
      {% endfor %}
    </div>
  </section>
  {% endif %}
  {% endfor %}
</div>
