---
layout: post
title: 'Variational Integrators: Preserving Geometry in Simulation'
description: From rotating bodies and elastic tethers to optimization and stochastic impacts, discrete mechanics turns physical structure into reliable numerical methods.
date: 2024-06-01 00:00:00 -0400
date_basis: "June 2024 IFAC Workshop publication, the latest work covered in this overview; the first day represents the publication month recorded in the bibliography."
author: Taeyoung
image: '/images/posts/variational-integrators/full-body-trajectories.png'
image_fit: contain
image_max_width: 560
image_alt: 'Coupled orbital and rotational motion of two rigid dumbbell bodies under mutual gravity, with red and blue trajectories and body snapshots.'
image_caption: 'Full two-body dynamics: orbital motion and rotation interact under mutual gravity. Original numerical trajectories from Lee, Leok, and McClamroch (2007).'
thumbnail: '/images/posts/variational-integrators/full-body-trajectories.png'
thumbnail_alt: 'Red and blue trajectories of two interacting rigid dumbbell bodies.'
tags: [Research]
toc: false
---

A simulation can look plausible while gradually changing the physics it is meant to represent. A computed rotation matrix may drift away from being a valid rotation, or a conservative system may gain energy through numerical error. Over many time steps, such errors can distort the behavior used to understand a mechanism, plan a maneuver, or evaluate a controller.

**Computational geometric mechanics builds physical structure into the numerical method.** Taeyoung Lee's work on variational integrators, developed with Melvin Leok, N. Harris McClamroch, and later collaborators, combines discrete mechanics with the geometry of rotations, directions, and coupled mechanical systems. The selected papers below trace this research from rigid-body integration in 2005 to stochastic mechanical impacts in 2024.

## Deriving the time step from mechanics

In Lagrangian mechanics, the equations of motion follow from a variational principle applied to the action—the time integral of kinetic energy minus potential energy. A **variational integrator** begins by approximating that action over discrete time intervals, then derives the update equations from the discrete principle.

This gives the numerical evolution its own mechanical structure. For an appropriate conservative model, a variational integrator preserves the symplectic structure of phase space and the momentum quantities associated with symmetries of the discrete model. These properties help it reproduce the qualitative behavior of the system over long simulations.

For rotations, a **Lie group variational integrator** also respects the configuration space. A rigid body's orientation lies on SO(3), and each update composes rotations rather than treating all nine matrix entries as independent coordinates. The 2005 attitude-dynamics paper applies this approach to a three-dimensional pendulum [1]. The formulation avoids attitude-coordinate singularities and keeps the update on the rotation group, subject to numerical roundoff.

## Why preserving both geometry and mechanics matters

Preserving a valid rotation and preserving the structure of mechanical evolution are complementary requirements. A method can satisfy one while missing the other.

The two 2007 full-body studies develop continuous and discrete models for rigid bodies interacting through mutual gravity [2, 3]. Unlike point-mass orbital models, these models include the coupling between translation and rotation. The numerical example uses two rigid dumbbells, each consisting of two masses connected by a rigid rod.

<figure>
  <div class="post__video" style="max-width: 480px; margin-inline: auto;">
    <video class="post__local-video" controls playsinline preload="none" poster="{{ '/images/posts/variational-integrators/full-body-video.png' | relative_url }}" aria-label="Numerical animation of two rigid dumbbell bodies interacting under mutual gravity">
      <source src="{{ '/videos/full-body-dynamics.mp4' | relative_url }}" type="video/mp4">
      <a href="{{ '/videos/full-body-dynamics.mp4' | relative_url }}">Watch the full two-body dynamics simulation</a>
    </video>
  </div>
  <figcaption class="post__image__caption">Coupled orbital and attitude motion of two rigid dumbbell bodies (0:55). Numerical visualization accompanying the full-body research [2, 3].</figcaption>
</figure>

The orbital-mechanics paper compares four second-order schemes: an explicit Runge–Kutta method, a symplectic Runge–Kutta method, a Lie group method, and a Lie group variational integrator [3]. For this example, combining symplecticity with the rotation-group structure produces small energy fluctuations, while the other implementations show greater drift.

![Computed total energy over time for four second-order numerical methods, with the Lie group variational integrator showing small bounded fluctuations.]({{ '/images/posts/variational-integrators/energy-comparison.png' | relative_url }})
{: style="display: block; width: 100%; max-width: 480px; margin-inline: auto;" }
*Original comparison from Lee, Leok, and McClamroch (2007) [3]. RK: explicit Runge–Kutta; SRK: symplectic Runge–Kutta; LGM: Lie group method; LGVI: Lie group variational integrator. This plot compares the specific implementations and step size used in the paper.*

For standard fixed-step variational integrators, favorable energy behavior generally means **small, bounded energy error under suitable assumptions**, not exact conservation of the original energy at every step. Nor does structure preservation remove the need to choose an appropriate time step or resolve the system's fastest important motion.

## Beyond rotations: directions and interacting bodies

Many mechanical variables are directions rather than complete orientations. A pendulum link, a magnetic dipole, or a point constrained to a spherical surface naturally lies on the two-sphere, S².

The 2009 paper on **Lagrangian mechanics and variational integrators on two-spheres** develops global equations and discrete updates for products of these spaces [5]. Its numerical examples include coupled spherical pendula, elastic-rod bending, magnetic dipoles, and molecular motion constrained to a sphere. The formulation respects unit-length geometry without introducing a separate angle chart for each direction.

A related 2009 study considers rigid bodies connected by ball joints in an ideal incompressible, irrotational fluid [6]. Its geometric model and integrator capture coupled three-dimensional motion, providing a simplified setting for studying mechanisms of fish-like locomotion. Together, these studies show how the approach extends from one rotating object to systems with many interacting components.

## Elastic strings, reeling mechanisms, and spacecraft

A flexible tether can stretch and support traveling waves while the attached body rotates. Deployment or retrieval changes how much string is free to move. Modeling only the endpoint positions can miss these interactions.

The 2011 elastic-string study combines a finite-element representation of the string with rigid-body motion and a reeling mechanism [7]. The equations and time-stepping method are derived within a common variational framework. Numerical cases examine fixed-length motion, deployment, and retrieval, exposing the coupling between elastic waves, body rotation, and reeling.

The 2014 tethered-spacecraft paper extends this approach to **two rigid spacecraft connected by an elastic tether in orbit** [8]. It includes tether deformation, spacecraft rotation, orbital motion, and a reeling mechanism. The resulting simulations also provide a way to assess when simpler tether models omit important dynamics.

<figure>
  <div class="post__video" style="max-width: 480px; margin-inline: auto;">
    <video class="post__local-video" controls playsinline preload="none" poster="{{ '/images/posts/variational-integrators/tethered-spacecraft.png' | relative_url }}" aria-label="Numerical animation of coupled spacecraft and elastic tether dynamics">
      <source src="{{ '/videos/tethered-spacecraft.mp4' | relative_url }}" type="video/mp4">
      <a href="{{ '/videos/tethered-spacecraft.mp4' | relative_url }}">Watch the tethered-spacecraft simulation</a>
    </video>
  </div>
  <figcaption class="post__image__caption">Tethered-spacecraft dynamics (0:33). This numerical example illustrates coupled body and tether motion within the modeling framework of [8].</figcaption>
</figure>

Spacecraft mechanisms introduce further coupling. The 2014 work with Frederick Leve derives a model and Lie group variational integrator for spacecraft with reaction wheels, including **wheel imbalance and general mass distributions** [9]. This brings actuator dynamics into the mechanical model instead of assuming ideal balanced wheels.

## From simulation to optimization

A numerical integrator also defines the dynamics seen by a trajectory optimizer. If that discrete model loses essential geometry, the resulting control calculation can inherit the same distortion.

The 2008 computational geometric optimal-control paper uses Lie group variational integrators as the dynamics constraints in discrete optimization problems for rigid bodies [4]. This connects the simulation model and control calculation through the same discrete mechanics. The approach also underlies the geometric mission-design perspective described in [Low-Thrust Space Missions]({{ '/low-thrust-mission-design' | relative_url }}).

The 2020 work with Harsh Sharma, Mayuresh Patil, and Craig Woolsey uses a complementary connection: an optimization algorithm can itself be interpreted as a dynamical system [11]. Discretizing that system geometrically produces accelerated optimization schemes on SO(3), with numerical examples including spherical shape matching.

## Adaptive time steps and stochastic impacts

Later work extends the framework when the numerical method must accommodate additional structure.

The 2019 study with Harsh Sharma treats **time as a dynamical variable** [10]. Applying the variational principle in this extended setting determines the time step together with the mechanical state. The resulting attitude integrator preserves a discrete energy, up to the accuracy of the nonlinear solve, while retaining the geometric properties of the extended formulation. Its pendulum examples demonstrate improved energy behavior, with an additional equation to solve at each step.

The 2024 study with Tejaswi K. C. addresses **random forcing and impacts** [12]. A stochastic variational principle accounts for both continuous motion and discrete collision events, and its discretization produces stochastic variational impact integrators. Numerical tests use a pendulum colliding with a wall.

Here, preserving the relevant physics does not mean keeping energy constant: the random forcing changes the expected energy. The paper compares simulated mean energy against the analytical evolution, using ensembles of 10,000 trajectories. This connects geometric integration to the lab's broader work on [uncertainty in hybrid systems]({{ '/uncertainty-hybrid-systems' | relative_url }}).

Across these applications, the aim is consistent: **make the numerical model respect the structure that gives the physical system its behavior**. Variational integrators provide a foundation for studying long-time dynamics and for building estimation, optimization, and control methods on a faithful discrete model.

## Selected publications

1. T. Lee, M. Leok, and N. H. McClamroch, “A Lie group variational integrator for the attitude dynamics of a rigid body with application to the 3D pendulum,” *Proceedings of the IEEE Conference on Control Applications*, pp. 962–967, 2005.
2. T. Lee, M. Leok, and N. H. McClamroch, “Lie group variational integrators for the full body problem,” *Computer Methods in Applied Mechanics and Engineering*, 196, pp. 2907–2924, 2007. [Paper](https://doi.org/10.1016/j.cma.2007.01.017) · [Preprint](https://arxiv.org/abs/math/0508365).
3. T. Lee, M. Leok, and N. H. McClamroch, “Lie group variational integrators for the full body problem in orbital mechanics,” *Celestial Mechanics and Dynamical Astronomy*, 98(2), pp. 121–144, 2007. [Paper](https://doi.org/10.1007/s10569-007-9073-x).
4. T. Lee, M. Leok, and N. H. McClamroch, “Computational geometric optimal control of rigid bodies,” *Communications in Information and Systems*, 8(4), pp. 445–472, 2008.
5. T. Lee, M. Leok, and N. H. McClamroch, “Lagrangian mechanics and variational integrators on two-spheres,” *International Journal for Numerical Methods in Engineering*, 79(9), pp. 1147–1174, 2009. [Paper](https://doi.org/10.1002/nme.2603).
6. T. Lee, M. Leok, and N. H. McClamroch, “Dynamics of connected rigid bodies in a perfect fluid,” *Proceedings of the American Control Conference*, pp. 408–413, 2009.
7. T. Lee, M. Leok, and N. H. McClamroch, “Computational dynamics of a 3D elastic string pendulum attached to a rigid body and an inertially fixed reel mechanism,” *Nonlinear Dynamics*, 64(1–2), pp. 97–115, 2011. [Paper](https://doi.org/10.1007/s11071-010-9849-5) · [Preprint](https://arxiv.org/abs/0909.2083).
8. T. Lee, M. Leok, and N. H. McClamroch, “High-fidelity numerical simulation of complex dynamics of tethered spacecraft,” *Acta Astronautica*, 99(1), pp. 215–230, 2014. [Paper](https://doi.org/10.1016/j.actaastro.2014.02.021).
9. T. Lee and F. Leve, “Lagrangian mechanics and Lie group variational integrators for spacecraft with imbalanced reaction wheels,” *Proceedings of the American Control Conference*, pp. 3122–3127, 2014.
10. H. Sharma and T. Lee, “Energy-preserving, adaptive time-step Lie group variational integrators for the attitude dynamics of a rigid body,” *Proceedings of the American Control Conference*, pp. 5487–5492, 2019.
11. H. Sharma, T. Lee, M. Patil, and C. Woolsey, “Symplectic accelerated optimization on SO(3) with Lie group variational integrators,” *Proceedings of the American Control Conference*, pp. 2826–2831, 2020.
12. Tejaswi K. C. and T. Lee, “Variational integrators for stochastic mechanical hybrid systems,” *Proceedings of the IFAC Workshop on Lagrangian and Hamiltonian Methods for Nonlinear Controls*, *IFAC-PapersOnLine*, 58(6), pp. 149–154, 2024. [Paper](https://doi.org/10.1016/j.ifacol.2024.08.272).
