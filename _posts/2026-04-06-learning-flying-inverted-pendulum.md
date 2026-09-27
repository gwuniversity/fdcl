---
layout: post
title: 'Learning to Control a Flying Inverted Pendulum'
description: Using geometric control and real flight data to improve the transfer of reinforcement learning from simulation to hardware.
date: 2026-04-06 00:00:00 -0400
date_basis: "Latest dissertation chapter revision: ben-dissertation/tex/delta_act_rl.tex, local modification date."
author: Taeyoung
image: '/images/video-posters/inv_pend.jpg'
image_alt: 'A quadrotor balancing an upright pendulum during an indoor flight experiment.'
video: '/videos/inv_pend.mp4'
video_label: 'Quadrotor balancing a flying inverted pendulum'
image_caption: 'Indoor flight demonstration of a quadrotor balancing a flying inverted pendulum.'
tags: [Research]
toc: false
---

Balancing an inverted pendulum is difficult even on a stationary platform. Placing it on a flying quadrotor couples the pendulum’s motion to the aircraft’s translation and rotation, creating a demanding test of control and learning.

In his doctoral research, **Beomyeol (“Ben”) Yu** combines **geometric mechanics, control, and reinforcement learning** to address this challenge. The work extends his studies of modular and equivariant quadrotor control to a practical question: how can a controller trained in simulation adapt to the dynamics of a real aircraft?

### Learning the difference between simulation and flight

A simulator can vary masses, inertias, and other known parameters during training, but these variations do not necessarily capture unmodeled aerodynamics or actuator delays.

Ben’s approach uses flight data to learn a **delta action model** that compensates for discrepancies between simulated and measured dynamics. The workflow starts with a policy trained in simulation, collects physical flight trajectories, learns corrections to the simulator, and then fine-tunes the control policy in that updated environment before redeployment.

This separates learning the dynamics mismatch from improving the controller. Policy refinement takes place in simulation, reducing the need for exploratory learning on the physical aircraft.

### Mathematical structure meets experimental validation

The framework builds on a geometric description of the coupled quadrotor–pendulum system and a geometric tracking controller. Learning then helps account for effects that the nominal model misses.

The dissertation evaluates the method through simulation and indoor flight experiments, including circular trajectories with a flying inverted pendulum. The reported experiments show improved tracking after adaptation and further gains from iterative refinement using additional flight data.

### Dissertation and related research

B. Yu, *Geometric Deep Reinforcement Learning for Quadrotor UAV*, doctoral dissertation, The George Washington University, 2026. This feature focuses on the chapter on dynamics-level adaptation.

[Doctoral defense announcement]({{ '/news/ben-maneesh-defenses' | relative_url }}) · [Equivariant reinforcement learning]({{ '/equiv-rl' | relative_url }}) · [Modular reinforcement learning]({{ '/reinforcement-learning-quadrotor' | relative_url }})
