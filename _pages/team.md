---
layout: page
title: Team
description: Welcome to our team page, where you can get to know the talented individuals behind the projects and the videos that shape our lab. 
permalink: /members/
excerpt: "Meet our team members here"
---

{% assign members_ordered = site.members | sort: 'year' | reverse %}
{% for member_type in site.data.settings.member_type %}

##  {{ member_type.name }}

  <section class="section authors animate">
    <div class="container">
      <div class="section__inner">
        <div class="row">
          {% for member in members_ordered %}
            {% if member.role == member_type.role %}
            {% assign post_count = site.posts | where:"author", member.username %}
            <div class="col col-4 col-w-6 col-t-12">
              <div class="authors__info">
                <a class="authors__image" href="{{ member.url | relative_url }}"><img src="{{ member.image | relative_url }}" alt="{{ member.name }}"></a>
                <div class="authors__meta">
                  <h2 class="authors__name"><a class="authors__link" href="{{ member.url | relative_url }}">{{ member.name }}</a></h2>
                  {% if post_count.size >= 1 %}
                  <span class="authors__posts__count">({{ post_count.size }})</span>
                  {% endif %}
                </div>
                {% if member.content %}
                <div class="authors__description">{{ member.thesis }}</div>
                {% endif %}
              </div>
            </div>
            {% endif %}
          {% endfor %}
        </div>
      </div>
    </div>
  </section>

{% endfor %}