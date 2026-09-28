---
layout: post
title: 'Fourier Analysis on SO(3): Global Uncertainty Propagation'
description: Noncommutative harmonic analysis connects the geometry of rotations with computational methods for evolving non-Gaussian probability distributions.
date: 2022-06-01 00:00:00 -0400
date_basis: "June 2022 publication month recorded in the bibliography for the SIAM Journal on Applied Dynamical Systems paper, the latest work covered here; the first day represents the month."
author: Taeyoung
image: '/images/posts/fourier-so3/attitude-density.png'
image_fit: contain
image_max_width: 420
image_alt: 'Colored body-axis direction densities on a sphere for a rigid-body pendulum near a gray collision wall.'
image_caption: 'Attitude uncertainty during a pendulum–wall collision simulation. Red, green, and blue show the marginal densities of the three body-axis directions, rather than a single density on the sphere. From the numerical example in Wang and Lee (2022).'
thumbnail: '/images/posts/fourier-so3/attitude-density.png'
thumbnail_alt: 'Global attitude uncertainty visualized through colored body-axis direction densities.'
tags: [Research]
toc: false
---

A spacecraft or robot may have several plausible orientations after a long interval without measurements. Nonlinear motion can stretch and distort its uncertainty, while a collision can split the distribution into distinct possibilities. A mean orientation and covariance may then omit information that matters for estimation and planning.

**FDCL develops global uncertainty propagation methods using noncommutative harmonic analysis on Lie groups, including Fourier transforms on SO(3).** This research connects the mathematics of rotations, probability evolution, and numerical computation to represent distributions beyond a local Gaussian approximation.

## Fourier analysis for rotations

Ordinary Fourier analysis represents a periodic signal as a sum of oscillatory modes. The same idea extends to functions on a Lie group, including probability densities on the rotation group SO(3).

Rotations are **noncommutative**: rotating about one axis and then another generally gives a different result when the order is reversed. Their Fourier analysis therefore uses matrix-valued representations of the group. At each degree, the spectrum contains a matrix of coefficients; together, these coefficients describe how the density varies over the space of orientations.

The Peter–Weyl theorem supplies a complete basis for square-integrable functions on a compact Lie group. Truncating this expansion gives a finite representation that can resolve broad, asymmetric, or multimodal distributions as the bandwidth increases. Because the basis is defined on SO(3), the density need not be confined to a single attitude-coordinate chart.

SO(3) describes a **complete orientation**, including rotation about a body's own axis. It is different from the two-sphere, which describes one direction. The spherical plots in this article visualize direction marginals of an attitude distribution; they do not replace the full distribution on SO(3).

## From mechanical motion to probability evolution

The 2008 work with Melvin Leok and N. Harris McClamroch combines harmonic analysis with **Lie group variational integrators** to propagate uncertainty through rigid-body attitude dynamics [1]. In this setting, randomness enters through the initial state, without process noise. The numerical flow respects both the rotation group and the symplectic structure of the underlying Hamiltonian mechanics, while harmonic analysis reconstructs the evolving global density.

The 2013 and 2015 studies address noisy attitude kinematics through the **Fokker–Planck equation**, which describes the evolution of a probability density under drift and diffusion [2, 3]. Expanding the density in an SO(3) Fourier basis turns the propagation problem into equations for spectral coefficients. These studies connect non-Gaussian uncertainty propagation to stochastic motion planning, with the 2013 paper also developing global Bayesian attitude estimation.

The computational idea is to represent the density spectrally, evolve its coefficients using the dynamics, and reconstruct the resulting distribution. Measurement likelihoods can then enter through Bayes' rule. This retains information about the shape of uncertainty that can be lost when propagation and measurement updates are restricted to a mean and covariance.

## Continuous motion and sudden resets

A hybrid system combines continuous evolution with discrete events, such as impacts or changes of operating mode. The 2020 work with Weixin Wang develops spectral Bayesian estimation for general stochastic hybrid systems, illustrated by bouncing-ball and vehicle examples [4]. The 2022 study extends the uncertainty-propagation framework to compact Lie groups [6].

For these systems, the probability evolution has two distinct parts: a differential operator for continuous motion and an integral operator for jumps. The method alternates between them using operator splitting. Harmonic analysis handles the continuous evolution, and numerical quadrature handles the redistribution of probability caused by resets.

<figure>
  <div class="post__video" style="max-width: 420px; margin-inline: auto;">
    <video class="post__local-video" controls playsinline preload="none" poster="{{ '/images/posts/fourier-so3/attitude-density.png' | relative_url }}" aria-label="Animation of body-axis direction densities for a rigid-body pendulum colliding with a wall">
      <source src="{{ '/videos/fourier-so3-attitude.mp4' | relative_url }}" type="video/mp4">
      <a href="{{ '/videos/fourier-so3-attitude.mp4' | relative_url }}">Watch the attitude-density animation</a>
    </video>
  </div>
  <figcaption class="post__image__caption">Evolution of the three body-axis direction marginals during repeated pendulum–wall collisions [6]. The gray plane represents the wall. Full original animation (0:32).</figcaption>
</figure>

## A collision can split uncertainty

The three-dimensional pendulum example shows why the full density matters. During an impact, some possible states have already rebounded while others are still approaching the wall. The angular-velocity distribution separates into distinct regions corresponding to these possibilities. As motion continues, damping and repeated collisions dissipate energy and reshape the uncertainty.

<figure>
  <div class="post__video" style="max-width: 720px; margin-inline: auto;">
    <video class="post__local-video" controls playsinline preload="none" poster="{{ '/images/posts/fourier-so3/collision-marginals.png' | relative_url }}" aria-label="Side-by-side animation of pendulum direction uncertainty and angular-velocity probability density during collisions">
      <source src="{{ '/videos/fourier-so3-collision.mp4' | relative_url }}" type="video/mp4">
      <a href="{{ '/videos/fourier-so3-collision.mp4' | relative_url }}">Watch the direction and angular-velocity animation</a>
    </video>
  </div>
  <figcaption class="post__image__caption">Left: the marginal density of the third body-axis direction, viewed from below. Right: the joint density of the two angular-velocity components in this model. Collisions split and redistribute the angular-velocity density [6]. Full original animation (0:32).</figcaption>
</figure>

The paper compares the propagated statistics with a Monte Carlo simulation using one million samples. Its collision model uses a state-dependent jump rate, allowing a gradual transition near the wall. For computation, the angular-velocity domain is represented by a bounded periodic domain alongside SO(3); the full Euclidean velocity space is not itself compact.

Spectral resolution is a practical tradeoff: sharper features require more modes and greater computational cost. The method provides a systematic global representation, with accuracy determined by bandwidth, time discretization, and the numerical treatment of resets.

## Real harmonic analysis and reusable software

The 2022 paper on **real harmonic analysis on SO(3)** develops explicit real-valued representations, derivatives, sampling relations, and Clebsch–Gordan coefficients [5]. These tools support computation directly in a real harmonic basis and provide building blocks for applications beyond uncertainty propagation, including spherical shape matching.

The accompanying [FFTSO3 software](https://github.com/fdcl-gwu/FFTSO3) implements fast Fourier transforms on SO(3), connecting the mathematical formulation to reusable computation.

Together, these studies establish a research direction linking **Lie group geometry, global probability representations, and stochastic dynamics**. It complements the lab's compact parametric models based on the [matrix Fisher distribution]({{ '/matrix-fisher-attitude-estimation' | relative_url }}) and its broader work on [uncertainty in hybrid systems]({{ '/uncertainty-hybrid-systems' | relative_url }}).

## Selected publications

1. T. Lee, M. Leok, and N. H. McClamroch, “Global symplectic uncertainty propagation on SO(3),” *Proceedings of the IEEE Conference on Decision and Control*, 2008. [Preprint](https://arxiv.org/abs/0803.1515).
2. T. Lee, “Stochastic optimal motion planning and global estimation for the attitude kinematics on SO(3),” *Proceedings of the IEEE Conference on Decision and Control*, pp. 588–593, 2013.
3. T. Lee, “Stochastic optimal motion planning for the attitude kinematics of a rigid body with non-Gaussian uncertainties,” *ASME Journal of Dynamic Systems, Measurement, and Control*, 137(3), 034502, 2015. [Paper](https://doi.org/10.1115/1.4027950).
4. W. Wang and T. Lee, “Spectral Bayesian estimation for general stochastic hybrid systems,” *Automatica*, 117, 108989, 2020. [Paper](https://doi.org/10.1016/j.automatica.2020.108989).
5. T. Lee, “Real harmonic analysis on the special orthogonal group,” *International Journal of Analysis and Applications*, 20, article 21, 2022. [Paper](https://doi.org/10.28924/2291-8639-20-2022-21) · [Preprint](https://arxiv.org/abs/1809.10533).
6. W. Wang and T. Lee, “Uncertainty propagation for general stochastic hybrid systems on compact Lie groups,” *SIAM Journal on Applied Dynamical Systems*, 21(3), pp. 2215–2240, 2022. [Paper](https://doi.org/10.1137/21M144147X) · [Preprint](https://arxiv.org/abs/2203.02548).
