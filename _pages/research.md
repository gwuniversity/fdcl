---
layout: page
title: Research
description: A geometric approach to dynamics, learning, and autonomy.
permalink: /research/
toc: false
---

We develop mathematical and computational foundations for understanding, controlling, and learning the motion of complex systems. Our research integrates differential geometry and applied mathematics with dynamics, control, estimation, optimization, and artificial intelligence. Applications in robotics and aerospace engineering connect this foundational work to computational studies and experimental validation, including autonomous UAV flight.

Geometry provides a common language across these problems. Orientations and constrained configurations evolve on curved spaces; symmetries reveal equivalent motions; and mechanical structure governs how systems exchange energy and momentum. By incorporating these properties into controllers, probability models, learning algorithms, and numerical methods, we seek stability guarantees, faithful uncertainty representations, efficient learning, and reliable simulation.

<div class="research-cat">
  <img src="{{ '/images/cat2.png' | relative_url }}" alt="Falling cat reorienting itself in midair" width="2498" height="540">
</div>

**An intuitive example: the falling cat.** A falling cat can reorient itself even when it begins with zero angular momentum. Coordinated changes in its shape produce an overall change in orientation while conserving angular momentum. This illustrates how geometry helps explain—and design—motion that is difficult to understand from forces and torques alone.

<nav class="research-topics__nav" aria-label="Research areas">
  <a href="#geometric-control">Geometric Control and Optimization</a>
  <a href="#geometric-deep-learning">Geometric Deep Learning and AI</a>
  <a href="#uncertainty-propagation-and-estimation">Uncertainty Propagation and Estimation</a>
  <a href="#robotic-perception-and-autonomous-systems">Robotic Perception and Autonomous Systems</a>
  <a href="#computational-geometric-mechanics">Computational Geometric Mechanics</a>
</nav>

## Geometric Control and Optimization
{: #geometric-control .research-topic__heading }

<span id="computational-geometric-optimal-control"></span>
Large rotations, coupled payload motion, and limited propulsion challenge controllers and planners built around small deviations from a nominal state. We develop control and optimization methods directly on the geometric spaces where these systems evolve, accounting for both nonlinear dynamics and topological restrictions on stabilization. Our work spans rigid-body attitude control, agile quadrotor flight, cooperative aerial transportation, flapping-wing vehicles, and low-thrust space missions. These methods connect stability analysis and trajectory optimization to demanding maneuvers and physical experiments.

{% include research-topic-cards.html slugs="geometric-attitude-control,geometric-quadrotor-aerial-transportation,low-thrust-mission-design,flapping-wing-uav-control" %}

## Geometric Deep Learning and AI
{: #geometric-deep-learning .research-topic__heading }

Learning to control a physical system becomes more efficient when algorithms account for its symmetries and dynamical structure. We develop equivariant and modular reinforcement learning methods that recognize equivalent motions, exploit relationships among subsystems, and combine learned policies with geometric controllers. Applications include quadrotor flight and balancing a flying inverted pendulum. By connecting mathematical structure with learning and flight data, we seek to reduce training demands and improve the transfer of policies from simulation to hardware.

{% include research-topic-cards.html slugs="equiv-rl,reinforcement-learning-quadrotor,learning-flying-inverted-pendulum" %}

## Uncertainty Propagation and Estimation
{: #uncertainty-propagation-and-estimation .research-topic__heading }

Uncertainty can spread across a curved state space, develop multiple distinct possibilities, or change abruptly during an impact. We develop geometric probability models and estimation methods that capture these effects beyond conventional local or Gaussian approximations. Our approaches include **noncommutative harmonic analysis on Lie groups and Fourier transforms on SO(3)**, matrix Fisher distributions, invariant filtering, and score-based estimation. Research on Brownian motion and hybrid systems provides foundations for tracking uncertainty through continuous motion, discrete resets, and changes in state dimension.

{% include research-topic-cards.html slugs="score-kalman-filter-research,fourier-uncertainty-so3,matrix-fisher-attitude-estimation,uncertainty-hybrid-systems,invariant-kalman-filter-relative-dynamics,brownian-motion-on-manifolds" %}

## Robotic Perception and Autonomous Systems
{: #robotic-perception-and-autonomous-systems .research-topic__heading }

Autonomous robots must infer their own motion and understand environments that are changing around them. We combine learned visual and LiDAR representations with geometric estimation and persistent 3D mapping to track moving objects, revise scene interpretations, and navigate relative to moving platforms. Applications range from dynamic scene understanding to ship-relative UAV navigation. Laboratory and shipboard experiments help evaluate how these methods handle incomplete observations, changing viewpoints, and real sensing conditions.

{% include research-topic-cards.html slugs="revisable-robot-maps,vision-based-maritime-flight,pointnet" %}

## Computational Geometric Mechanics
{: #computational-geometric-mechanics .research-topic__heading }

Long simulations can accumulate numerical errors that distort a system’s physical behavior. We develop **variational integrators and other geometric numerical methods** by building the structure of mechanics into the discrete equations. For appropriate models, these methods preserve rotation constraints, symplectic structure, and momentum, while providing favorable long-term energy behavior. Applications include interacting rigid bodies, tethered spacecraft, flexible structures, and stochastic impacts. This work supplies a computational foundation for simulation, trajectory optimization, and uncertainty propagation.

{% include research-topic-cards.html slugs="variational-integrators" %}

## Acknowledgments
{: .research-topic__heading }

Our research has been supported by AFOSR, AFRL, NASA, NAVAIR, NRL, NSF, and ONR.
