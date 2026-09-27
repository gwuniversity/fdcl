---
layout: post
title: 'Tracking Uncertainty Through Impacts and Changing Dynamics'
description: Geometric uncertainty propagation on a torus, extended to dimension-changing resets through merging and splitting particles.
date: 2026-09-17 00:00:00 -0400
date_basis: "Latest CDC manuscript revision: CDC26.2/CDC26.tex, local modification date."
author: Taeyoung
image: '/images/posts/hybrid-estimation/torus-reset-geometry.png'
thumbnail: '/images/posts/hybrid-estimation/torus-density.png'
thumbnail_alt: 'Probability density on a torus with a red guard circle and blue reset circle.'
image_fit: contain
image_max_width: 560
image_alt: 'A torus with black drift trajectories, a red guard circle, and a blue reset circle.'
image_caption: 'Hybrid dynamics on a torus: black curves show drift trajectories, the red circle is the guard, and the blue circle is the reset image. Brownian perturbations add uncertainty to the continuous motion.'
tags: [Research]
toc: false
---

Hybrid systems combine continuous motion with sudden changes. A state may flow along a curved surface until it reaches an event boundary and jumps elsewhere. In more general systems, an event can even change the number of variables needed to describe the state.

FDCL’s research asks how to **propagate an entire probability distribution through both continuous motion and discrete resets**. The progression is illustrated here in two steps: uncertainty evolving on a torus, followed by merging and splitting particles that change the dimension of the state space.

## Uncertainty propagation on a curved state space

**Tejaswi K. C., William A. Clark, and Taeyoung Lee** develop a [transfer-operator framework for stochastic hybrid systems on manifolds](https://arxiv.org/abs/2604.18706). The Koopman operator describes how observables evolve; its dual, the Frobenius–Perron operator, describes how probability distributions evolve.

This leads to a geometric Fokker–Planck equation that combines drift, diffusion, and reset-induced probability transfer. A central requirement is **conservation of probability**: the probability leaving a guard must reappear at its reset image.

## Numerical example: flow, diffusion, and reset on a torus

A torus is a two-dimensional curved surface embedded in three-dimensional space. In this example, a deterministic drift carries the state around the surface while Brownian perturbations spread its uncertainty.

When the state reaches the **red guard circle**, it jumps to the **blue reset circle**, with a half-turn shift in its phase around the torus’s smaller circular cross-section. The state remains on the same two-dimensional surface, but its location changes abruptly.

<figure>
  <div class="post__video">
    <video class="post__local-video" controls playsinline preload="none" poster="{{ '/images/posts/hybrid-estimation/torus-density.png' | relative_url }}" aria-label="Probability density evolving on a torus through continuous flow, diffusion, and discrete resets">
      <source src="{{ '/videos/hybrid-torus-density.mp4' | relative_url }}" type="video/mp4">
      <a href="{{ '/videos/hybrid-torus-density.mp4' | relative_url }}">Watch the torus simulation</a>
    </video>
  </div>
  <figcaption class="post__image__caption">Numerical density evolution on the torus over simulation time 0–3, shown in slowed playback. Brighter colors indicate higher probability density. Probability reaching the red guard is transferred to the blue reset circle. Frames are from the transfer-operator study.</figcaption>
</figure>

The initial distribution forms two bands. As they move, one reaches the guard and resets while diffusion spreads the density. Continued transport, twisting, and resets produce a band connecting the guard and its reset image. The paper checks the finite-volume solution against Monte Carlo simulations and verifies conservation of total probability.

## Extending the framework to dimension-varying resets

The torus example preserves the dimension of the state space. Merging and splitting introduce an additional challenge: probability must pass between spaces of **different dimensions**.

In their [CDC 2026 paper](https://arxiv.org/abs/2604.06708), **Tejaswi K. C. and Taeyoung Lee** describe this transfer using the *pushforward* of outgoing probability flux through the reset map. This records where probability goes without requiring an invertible map or equal-dimensional state spaces.

When dimension decreases, contributions from multiple source configurations must be combined. When dimension increases, incoming probability can initially occupy only a lower-dimensional subset of the new state space. The formulation accommodates both ordinary densities and concentrated probability sources.

<figure>
  <img src="{{ '/images/posts/hybrid-estimation/merging-splitting-cycle.png' | relative_url }}" alt="Schematic of two particles merging into one and splitting to repeat the cycle." loading="lazy">
  <figcaption class="post__image__caption">Merging and splitting change the number of coordinates needed to describe the system, extending the fixed-dimensional torus example.</figcaption>
</figure>

## Numerical example: merging and splitting particles

The example considers particles moving in a square under drift and diffusion. In **Mode 1**, two planar particles require four position coordinates. When they approach within a prescribed distance, they merge at their midpoint. In **Mode 2**, the merged particle requires only two coordinates. Reaching the right boundary triggers a split into two separated particles inside the square, restarting the cycle.

The simulation therefore transfers probability repeatedly between **four-dimensional and two-dimensional state spaces**. A finite-volume scheme evolves the distributions while transferring outgoing flux into the receiving mode.

<figure>
  <div class="post__video">
    <video class="post__local-video" controls playsinline preload="none" poster="{{ '/images/posts/hybrid-estimation/merging-splitting-density.png' | relative_url }}" aria-label="Numerical probability evolution for merging and splitting particles">
      <source src="{{ '/videos/hybrid-merging-splitting.mp4' | relative_url }}" type="video/mp4">
      <a href="{{ '/videos/hybrid-merging-splitting.mp4' | relative_url }}">Watch the numerical simulation</a>
    </video>
  </div>
  <figcaption class="post__image__caption">Numerical illustration of the merging–splitting system, covering simulation time 0–5. Left: a visualization using the pointwise maximum of the two particles’ marginal densities in Mode 1. Right: the merged-particle density in Mode 2. The left panel is a projection-based display, not the full four-dimensional joint density. Playback is slowed for viewing.</figcaption>
</figure>

## Checking conservation across dimension changes

The mode probabilities oscillate as particles merge, travel to the boundary, and split. Their sum stays at one to the displayed precision, demonstrating conservation of total probability in this numerical example.

<figure>
  <img src="{{ '/images/posts/hybrid-estimation/probability-mass-history.png' | relative_url }}" alt="Mode 1 and Mode 2 probabilities oscillate while their total remains at one over simulation time 0 to 5." loading="lazy" width="1125" height="675">
  <figcaption class="post__image__caption">Probability in Mode 1 (blue), Mode 2 (orange), and both modes combined (dashed green). Here, “mass” means probability mass, not physical particle mass.</figcaption>
</figure>

Together, the torus and merging–splitting examples show how geometric analysis connects continuous stochastic motion, discrete resets, and changes in state dimension within a probability-conserving description.

## Related publications

1. Tejaswi K. C., William A. Clark, and Taeyoung Lee, [*Transfer operators for stochastic hybrid systems on manifolds with guard-induced resets*](https://arxiv.org/abs/2604.18706), IEEE Transactions on Automatic Control, 2026, **submitted**. This work develops the manifold-based operator formulation, the torus example, and a numerical scheme that preserves total probability.

2. Tejaswi K. C. and Taeyoung Lee, [*Uncertainty propagation in stochastic hybrid systems with dimension-varying resets*](https://arxiv.org/abs/2604.06708), Proceedings of the IEEE Conference on Decision and Control, 2026, **accepted**. This paper develops the probability-transfer formulation for dimension-changing resets; the planar merging–splitting simulation above illustrates its extension to four- and two-dimensional state spaces.
