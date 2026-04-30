---
layout: page
title: Research
description: We investigate how differential geometry can be utilized in control systems engineering and machine learning.
permalink: /research/
toc: true
---

Our research focuses on how differential geometry can be utilized across various topics in dynamical systems theory and control systems engineering, including computational mechanics, optimization, estimation, control, and machine learning, with primary applications in aerospace engineering and robotics.

We assert that by embracing the geometric structure of dynamical systems, we can construct more efficient, robust, and elegant control strategies for modern, complex systems.


![Woman]({{site.baseurl}}/images/cat2.png#wide)
*Falling cat problem: When a cat falls, it appears to “rotate” in mid-air to reorient itself and land on its feet, even if it starts from rest with no initial angular momentum. How does the cat achieve this without violating the conservation of angular momentum, which states that the total angular momentum of a system remains constant in the absence of external torques?*


***

### Geometric Deep Learning

Geometric deep learning refers to a class of machine learning methods that generalize deep learning to data structured in non-Euclidean domains, such as graphs, manifolds, and other geometric spaces. These approaches leverage the underlying geometry of the problem to improve learning efficiency and generalization.

In particular, we have shown that symmetry and equivariance properties of dynamical systems can be exploited to significantly improve the data efficiency of deep reinforcement learning for unmanned aerial vehicles.

<div class="gallery-box">
  <div class="gallery gallery-column-2"> 
    <div style="width: 700px; height: 380px"> <iframe src="https://www.youtube.com/embed/-NQ6oRsdWgI" loading="lazy" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
<em>Modular reinforcement learning of a quadrotor UAV</em>
</div>

{% include section-recommended-in-research.html %}

***

### Geometric Control

Control systems formulated in local coordinates of a configuration manifold often suffer from singularities, ambiguities, and increased complexity when representing aggressive or large-scale maneuvers.

By explicitly leveraging geometric properties of nonlinear manifolds in Lyapunov-based stability analysis, we construct intrinsic control laws that are globally defined and avoid coordinate singularities, while ensuring rigorous stability guarantees.

<div class="gallery-box">
  <div class="gallery gallery-column-2"> 
    <div style="width: 350px; height: 210px; margin-right:10px"><iframe src="https://www.youtube.com/embed/nOWErfdzZLU" loading="lazy" frameborder="0" allowfullscreen></iframe></div>
    <div style="width: 350px; height: 210px"><iframe src="https://www.youtube.com/embed/tMmmaVAm5D0" loading="lazy" frameborder="0" allowfullscreen></iframe></div>
  </div>
  <em>Geometric control of aerial vehicles</em>
</div>

***

### Uncertainty Propagation and Estimation

We develop intrinsic representations of probability distributions on manifolds, moving beyond Gaussian approximations in local coordinates that are commonly used in engineering practice.

In particular, we have constructed the *matrix Fisher–Gaussian distribution* on the product space of the special orthogonal group and Euclidean space, as well as approaches based on *non-commutative harmonic analysis*. These methods enable accurate uncertainty propagation and Bayesian estimation while respecting the underlying geometry of the state space.

<div class="gallery-box">
  <div class="gallery gallery-column-3">
    <img src="{{ "/images/uprop.png" | relative_url }}" loading="lazy" style="width: 380px; overflow: hidden" >
    <img src="{{ "/images/NSF14_Diff_1_CSph.png" | relative_url }}" loading="lazy" style="width: 150px; overflow: hidden" >
    <img src="{{ "/images/NSF14_Diff_5_CSph.png" | relative_url }}" loading="lazy" style="width: 150px; overflow: hidden" >
  </div>
  <em>Spectral uncertainty propagation</em>
</div>

***

### Computational Geometric Optimal Control

This formalism enables efficient computation of optimal maneuvers for complex dynamical systems by leveraging principles from computational geometric mechanics.

We have shown that discretizing optimal control problems using geometric integrators significantly improves numerical efficiency and preserves key structural properties. Furthermore, we have developed accelerated optimization methods on manifolds by discretizing Bregman Lagrangian mechanics.

<div class="gallery-box">
  <div class="gallery gallery-column-3">
    <img src="{{ "/images/opt_ast.jpg" | relative_url }}" loading="lazy" style="width: 170px; overflow: hidden" >
    <img src="{{ "/images/opt_L2.png" | relative_url }}" loading="lazy" style="width: 170px; overflow: hidden" >
    <img src="{{ "/images/opt_vis.pdf" | relative_url }}" loading="lazy" style="width: 360px; overflow: hidden" >
  </div>
  <em>Asteroid exploration; Earth-to-Moon transfer; vision-based localization</em>
</div>

***

### Computational Geometric Mechanics

We develop geometric numerical integrators on manifolds that preserve the intrinsic structure of dynamical systems, such as symplecticity, momentum, and energy behavior.

These structure-preserving properties are critical for ensuring long-term stability, accuracy, and physical fidelity in numerical simulations of complex systems.

<div class="gallery-box">
  <div class="gallery gallery-column-3">
    <img src="{{ "/images/1999kw4small.jpg" | relative_url }}" loading="lazy" style="width: 260px; overflow: hidden" >
    <img src="{{ "/images/3drod.jpg" | relative_url }}" loading="lazy" style="width: 200px; overflow: hidden" >
    <img src="{{ "/images/3dmd.jpg" | relative_url }}" loading="lazy" style="width: 170px; overflow: hidden" >
  </div>
  <em>Structure-preserving numerical integration for binary asteroids, rod dynamics, and molecular systems</em>
</div>

***

### Acknowledgments

Our research has been supported by AFOSR, AFRL, NASA, NAVAIR, NRL, NSF, and ONR.
