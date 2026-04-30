---
layout: post
title: Data-driven Controls of a Flapping Wing UAV
description: This post is about my PhD thesis on the dynamical modeling, stability analysis, optimal controls, and data-driven control policies for a flapping wing unmanned aerial vehicle, inspired by Monarch butterflies.
date: 2025-01-20 17:00:00
author: tejaswi
image: 'images/posts/tejaswi/fwuav_cover.png'
tags: [Research]
toc: true
---

<!-- With a wingspan of approximately 4 cm, it stands out as one of the larger butterfly species in the region.  -->
The Monarch butterfly, native to North America, is renowned for its distinctive characteristics. 
Each year, millions of Monarchs embark on an incredible migration journey from North America to Mexico, covering a staggering distance of up to 4000 km. 
Flapping wing aerial vehicles can offer significant advantages in energy efficiency and agility compared to conventional fixed or rotary wing types, whose lift-to-drag ratio deteriorates rapidly as their size is reduced. 
<!-- One notable application is the development of Marsbees designed for the low-density atmosphere of Mars, where high efficiency is essential. -->

> Consequently, the flapping wing mechanism has been envisioned as a critical component for micro autonomous drones of the next generation. 

<div class="gallery-box">
  <div class="gallery gallery-column-3">
    <img src="{{ "/images/posts/tejaswi/fwuav_npr_monarch.png" | relative_url }}" loading="lazy" style="width: 350px; overflow: hidden" >
    <img src="{{ "/images/posts/tejaswi/fwuav_NASA_marsbee.png" | relative_url }}" loading="lazy" style="width: 350px; overflow: hidden" >
  </div>
  <!-- <em>Caption</em> -->
</div>

<!-- ### Challenges in control systems for FWUAVs -->

While numerous bioinspired robots have been developed, advancements in control systems for FWUAVs lag behind those for more traditional unmanned aerial vehicles like quadrotors. 
This disparity is due to the complexity of modeling and controlling flapping-wing dynamics. 
Most existing models focus on high-frequency flapping of small wings, neglecting the intricate coupling between wing motion and body dynamics - key features of butterfly flight.

## Geometric dynamic model and control

<p align="center">
  <img src="{{ "/images/posts/tejaswi/fwuav_flapping_cycle.png" | relative_url }}" loading="lazy" style="width: 700px; overflow: hidden" />
</p>

Inspired by the Monarch butterfly's flight, a novel dynamic model has been developed to account for the effects of low-frequency wing flapping and abdomen undulation. 
This provides an elegant, **global formulation** of the dynamics, avoiding complexities and singularities associated with local coordinates.
Next, an optimal periodic motion that minimizes the energy variations was constructed, and a feedback control system was proposed to asymptotically stabilize it according to the Floquet stability theory <sup>1</sup>.

## Constrained imitation learning from optimal trajectories

<p align="center">
  <img src="{{ "/images/posts/tejaswi/state_error_comp.png" | relative_url }}" loading="lazy" style="width: 500px; overflow: hidden" />
</p>

For the global motion of FWUAV which includes both translation and rotation of the body (6DOF), a periodic optimal controller was utilized after identifying specific wing kinematics parameters and their physical relationship to aerodynamics. 
To further improve computational efficiency, imitation learning was uniquely tailored to transform a set of optimal trajectories into **data-driven feedback control**. 
Compared with conventional methods, constrained imitation learning (<span style="color: blue;">COIL</span>) eliminates the need to generate additional optimal trajectories on-line, while simultaneously improving stability properties <sup>2</sup>.

## Modular control scheme using visual-inertial data

Finally, a vision-based control scheme was proposed to avoid estimating the state of the flapping wing aerial vehicle in real time. 
A deep neural pose estimator, based on a Siamese network, extracts robust features for better performance compared to traditional keypoint-based methods <sup>3</sup>.
Instead of training a monolithic network, we proposed a *modular construction* where a pose estimation network and a control network are concatenated, which were trained alternatingly to achieve the complex tasks of end-to-end perception and control efficiently. 
To improve convergence when combined with the controller, an alternating learning algorithm (<span style="color: blue;">ALICE</span>) was presented to iteratively refine the individual neural networks so that ultimately the vehicle can be guided to perform given maneuvers.

<div class="gallery-box">
  <div class="gallery gallery-column-3">
    <img src="{{ "/images/posts/tejaswi/fwuav_sensorimotor_control.png" | relative_url }}" loading="lazy" style="width: 350px; overflow: hidden" >
    <img src="{{ "/images/posts/tejaswi/fwuav_best_comparison.png" | relative_url }}" loading="lazy" style="width: 350px; overflow: hidden" >
  </div>
  <!-- <em>Caption</em> -->
</div>

{: .note }
This [framework establishes the first nonlinear control system that stabilizes the coupled 6DOF longitudinal and lateral dynamics of FWUAVs](https://scholarspace.library.gwu.edu/etd/gq67js07z) without relying on the common assumptions of averaging or linearization. Possible future directions:
* Including flexibility of wings and fluid-structure interactions for improved modeling
* Learning-based aerodynamic models that balance accuracy with computational efficiency, further advancing FWUAV control systems.

<sup>1</sup> : Tejaswi, K.C., Kang, C.K. and Lee, T., 2021, May. [Dynamics and control of a flapping wing uav with abdomen undulation inspired by monarch butterfly](https://doi.org/10.23919/acc50511.2021.9483293). In 2021 American control conference (ACC) (pp. 66-71). IEEE.

<sup>2</sup> : Tejaswi, K.C. and Lee, T., 2022. [Constrained Imitation Learning for a Flapping Wing Unmanned Aerial Vehicle](https://doi.org/10.1109/lra.2022.3194682). IEEE Robotics and Automation Letters, 7(4), pp.10534-10541.

<sup>3</sup> : Tejaswi, K.C., Lee, T. and Kang, C.K., 2024. [Deep Neural Pose Estimation for a Flapping Wing Unmanned Aerial Vehicle with Visual-Inertial Sensor Fusion](https://doi.org/10.2514/6.2024-0948). In AIAA SCITECH 2024 Forum (p. 0948).

<!-- <ol>
<li>Kodihalli Chandrappa, Tejaswi, "Data-Driven Controls of a Flapping Wing Unmanned Aerial Vehicle Inspired by Monarch Butterfly," The George Washington University, 2024.</li><br> 
</ol> -->