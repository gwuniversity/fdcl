---
layout: post
title: 'Relative Navigation Through Geometry: Estimating Motion Between Robots'
description: A geometric foundation for relative-state estimation, connecting invariant Kalman filtering to experiments with independently moving aerial and ground vehicles.
date: 2026-08-20 00:00:00 -0400
date_basis: "Revised journal manuscript: TAC25_IKF/TAC25_Bonnabel_edit.tex, local modification date."
author: Taeyoung
image: '/images/posts/relative-filter/experiment.jpg'
image_fit: contain
image_max_width: 640
image_alt: 'A quadrotor flying above an independently moving F1TENTH ground vehicle in the FDCL flight arena.'
image_caption: 'Relative navigation in the laboratory: a quadrotor estimates its attitude, velocity, and position relative to an independently moving ground vehicle. Both vehicles carry inertial sensors and motion-capture markers.'
thumbnail: '/images/posts/relative-filter/experiment.jpg'
thumbnail_alt: 'Aerial and ground vehicles used to evaluate invariant filtering for relative motion.'
tags: [Research]
toc: false
---

For a robot approaching another moving vehicle, the essential question is often **“Where am I relative to you?”** Estimating that relationship requires accounting for both vehicles’ motion, their rotating coordinate frames, and uncertain sensor measurements.

In **Invariant Kalman Filter for Relative Dynamics**, **Tejaswi K. C., Maneesha Wickramasuriya, Silvère Bonnabel, Axel Barrau, and Taeyoung Lee** develop a geometric framework for answering this question directly. The work connects mathematical conditions for relative motion to practical estimators, with numerical simulations and hardware experiments in the revised manuscript. The journal paper is **submitted to IEEE Transactions on Automatic Control**.

## When can relative motion be estimated directly?

One approach is to estimate each vehicle’s absolute state, then calculate their relative state. But this maintains two absolute descriptions even when only their relationship matters.

The paper asks when the relative state has its own closed equations of motion: equations that depend on the relative state and the two vehicles’ inputs, without requiring their individual absolute trajectories. This property is called **relative trajectory independence**.

Using **Lie groups**, which describe rotations and rigid-body motion while preserving their geometric constraints, the authors derive conditions for this property. For the class of systems studied, they show that the resulting relative dynamics also possess the structure needed for invariant filtering. This provides a systematic route from two physical systems to a reduced relative-state estimator.

## Why the geometry of the error matters

A conventional extended Kalman filter approximates nonlinear error dynamics around its current estimate. When that estimate is poor, the approximation can also be poor.

An invariant filter defines the estimation error through the geometry of the state space. Under the paper’s conditions, the deterministic error dynamics become independent of the estimated trajectory, and the error’s logarithmic coordinates satisfy an **exact linear differential equation**. The measurement frame also guides the choice of invariant correction, allowing a state-independent measurement Jacobian for the measurement models considered.

This is an exact structural result for the deterministic error. The noisy filter still uses a first-order covariance approximation and a Gaussian uncertainty model. The benefit is a principled propagation and correction structure, rather than an exact solution to every nonlinear estimation problem.

## Recovering from a large initial heading error

The numerical study considers two independently driven planar vehicles. Across **100 paired Monte Carlo runs**, a left-invariant relative Kalman filter (**LRKF**) and a conventional EKF receive the same inputs, measurements, and noise realizations.

With a **150° initial heading error**, the LRKF corrects its orientation and position more rapidly in the illustrated test. Both filters start at the correct relative position, but the incorrect heading causes their position estimates to drift before the measurements correct them.

<figure>
  <img src="{{ '/images/posts/relative-filter/planar-simulation.png' | relative_url }}" alt="Position and heading errors over 25 seconds: the invariant filter recovers faster than the conventional EKF from a 150-degree heading error." loading="lazy" width="1500" height="1050">
  <figcaption class="post__image__caption">Planar relative-localization simulation. Lines show mean errors over 100 runs; shaded regions show the minimum-to-maximum ranges, not confidence intervals. Blue: LRKF. Orange: conventional EKF.</figcaption>
</figure>

The broader parameter study shows that the advantage depends on initialization and measurement noise. For smaller initial heading errors, the preferred filter is not uniform across all tested conditions.

## From the equations to a flying robot

The hardware experiment pairs a manually driven **F1TENTH ground vehicle** with an autonomous **quadrotor**. Each carries an inertial measurement unit. Two filters run onboard the quadrotor using identical data: a bias-augmented LRKF and a bias-augmented quaternion EKF (**QEKF**).

Both propagate at **200 Hz** and receive relative-pose corrections at **5 Hz**. The pose measurements are derived from Vicon motion capture and deliberately corrupted with noise; the uncorrupted poses provide ground truth. This isolates the relative-estimation problem while using real vehicle motion and inertial sensing.

<figure>
  <img src="{{ '/images/posts/relative-filter/vehicle-trajectories.png' | relative_url }}" alt="Three-dimensional, top-view, and altitude plots of the ground vehicle and quadrotor during a 60-second hardware trial, colored by time." loading="lazy" width="1440" height="975">
  <figcaption class="post__image__caption">Trajectories from the third trial. The quadrotor climbs to approximately one meter and circles while the ground vehicle moves independently. Colors indicate time.</figcaption>
</figure>

The tests deliberately include a large initial velocity error and a mismatch between the injected pose noise and the filters’ assumed measurement uncertainty. Across **three 60-second trials**, the LRKF has lower root-mean-square errors in position, velocity, and attitude than the QEKF.

| Trial | LRKF position error | QEKF position error | LRKF attitude error | QEKF attitude error |
| --- | ---: | ---: | ---: | ---: |
| 1 | **5.8 cm** | 6.9 cm | **5.83°** | 6.86° |
| 2 | **7.1 cm** | 8.4 cm | **5.27°** | 6.20° |
| 3 | **13.7 cm** | 15.2 cm | **7.22°** | 8.03° |

These values are RMS error norms over each full trial, including the initial transient.

<figure>
  <img src="{{ '/images/posts/relative-filter/hardware-errors.png' | relative_url }}" alt="Relative position and attitude errors during the third hardware trial, comparing the bias-augmented invariant filter in blue with the quaternion EKF in orange." loading="lazy" width="1440" height="927">
  <figcaption class="post__image__caption">Position and attitude errors during trial 3 following the common initial velocity offset. Both implementations estimate gyroscope and accelerometer biases as well as the relative state.</figcaption>
</figure>

The experiments demonstrate real-time operation under practical sensing and communication conditions. The exact theoretical error structure applies to the underlying bias-free kinematics; it is not claimed for the additional bias states used in the hardware implementation.

## A foundation for cooperative navigation

The central contribution is a way to determine **when relative estimation can be simplified without discarding its geometry**. That foundation is relevant to cooperative localization, formation flight, rendezvous, and navigation relative to a moving platform.

The work complements FDCL’s [vision-based maritime flight research]({{ '/vision-based-maritime-flight' | relative_url }}): perception supplies relative observations, while geometric filtering combines those observations with motion information. Shipboard launch and recovery are future applications of this framework; the hardware validation reported here uses the indoor aerial–ground vehicle experiment.

## Paper

Tejaswi K. C., Maneesha Wickramasuriya, Silvère Bonnabel, Axel Barrau, and Taeyoung Lee, *Invariant Kalman Filter for Relative Dynamics*, IEEE Transactions on Automatic Control, **submitted**, 2026.

[Read the public preprint](https://arxiv.org/abs/2412.10519) · [Earlier IFAC conference paper](https://doi.org/10.1016/j.ifacol.2025.11.064)

The simulation and hardware results presented here are from the revised journal manuscript. The public arXiv version, last revised in November 2025, predates the hardware results described above.
