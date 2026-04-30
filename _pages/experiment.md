---
layout: page
title: Experiment
description: Abstract formulation of geometric control on a manifold has been applied to exiting real-world flight experiments.
permalink: /experiment/
toc: false
---

We have developed flight hardware and software in-house, instead of adopting the common open platforms like ardupilot or pixhawk. This allows us to implement any guidance, control, and estimation algorithm that we develop for test and validation. 

![]({{site.baseurl}}/images/quad_payload.png#wide)
*Indoor flight experiment*


Our facilities include
* 12 VICON Valkyrie motion capture cameras in a netted indoor space of 40 ft by 20 ft 
* Outdoor netted space of 20 ft by 20 ft
* Flight hardware based on NVidia Jetson and Orin computing module
* RTK GPS-based localization
* Flight software written in C++, python, and ROS
* GPU server powered by two NVidia A100 80G and one NVidia A100 40G

Selected flight software packages are shared as open-source software library at our [github](https://github.com/fdcl-gwu). Especially, the follwoing repositories have been popular:

* Geometric control of UAV [(<tt>https://github.com/fdcl-gwu/uav_geometric_control</tt>)](https://github.com/fdcl-gwu/uav_geometric_control)
* Python-Gazebo simulation of UAV [(<tt>https://github.com/fdcl-gwu/uav_simulator</tt>)](https://github.com/fdcl-gwu/uav_simulator)

***

### Videos

<!-- Add youtube_id and caption at setting_yml to be displayed here -->
<div class="gallery-box">
  <div class="gallery gallery-column-2"> 
    {% for experiment in site.data.settings.experiment %}
      <div style="width: 350px; height: 240px; margin-right:10px">
        <iframe src="https://www.youtube.com/embed/{{experiment.youtube_id}}" loading="lazy" frameborder="0" allowfullscreen></iframe>
        <div align="center">{{experiment.caption}}</div>
      </div>
    {% endfor %}
  </div>
</div>

