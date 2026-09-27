---
layout: post
title: 'Brownian Motion on Curved Spaces: The Geometry Behind Randomness'
description: Connecting differential geometry and stochastic analysis to model uncertainty in rotations, constrained motion, and manifold-based AI.
date: 2026-06-23 00:00:00 -0400
date_basis: "Revised journal manuscript: TAC25_BM/TAC25_BM.tex, local modification date."
author: Taeyoung
image: '/images/posts/brownian-motion/rotation-paths.png'
image_fit: contain
image_max_width: 420
image_alt: 'Red, green, and blue trajectories tracing the three axes of a randomly rotating frame on the unit sphere.'
image_caption: 'Brownian motion on the rotation group SO(3). The three colors trace the columns of a rotation matrix on the unit sphere; together, they describe a randomly evolving orientation. Figure from the manuscript.'
thumbnail: '/images/posts/brownian-motion/rotation-paths.png'
thumbnail_alt: 'Colored sample paths illustrating Brownian motion of three-dimensional rotations.'
tags: [Research]
toc: false
---

A UAV’s orientation is a rotation, a pointing direction lies on a sphere, and a constrained mechanism moves on a curved configuration space. In each case, uncertainty must respect the geometry of the possible states. Simply adding independent noise to every coordinate can move a state off its constraint or produce the wrong diffusion.

In **Geometric Interpretation of Brownian Motion on Riemannian Manifolds**, **Taeyoung Lee and Gregory S. Chirikjian** explain how to construct random motion consistently across these spaces. The work brings intrinsic geometry, embedded surfaces, and Lie groups into one framework, making the geometric meaning of stochastic equations explicit.

## Why random motion needs a geometric correction

In ordinary Euclidean space, Brownian motion is built from independent Gaussian increments. On a curved space, the directions in which motion is allowed change from point to point. Noise applied along those directions can therefore require a systematic correction—a **geometric drift**—to produce the intended diffusion.

The paper starts from a common defining principle: Brownian motion has a generator equal to one-half of the **Laplace–Beltrami operator**, the curved-space counterpart of the Laplacian. This connects random sample paths to heat diffusion on the manifold. Noise is introduced along an orthonormal frame, and the drift is derived to satisfy that generator condition.

## One principle, three geometric viewpoints

The framework explains the corrections in three complementary ways:

- **Intrinsic manifolds:** covariant derivatives describe how the local frame changes along the surface.
- **Embedded manifolds:** the mean curvature vector explains the drift in the ambient Itô equation.
- **Lie groups:** the group structure gives an algebraic expression for the intrinsic drift. This term vanishes for unimodular groups, including SO(3), although an ambient Itô equation can still contain a curvature correction.

Both **Itô and Stratonovich formulations** are developed. The contribution is a unified derivation and interpretation of Brownian motion, with explicit connections between these descriptions.

## Sample paths across different spaces

<figure>
  <img src="{{ '/images/posts/brownian-motion/sample-paths.png' | relative_url }}" alt="Four numerical examples: Brownian paths on a torus, a sphere, the rotation group SO(3), and the affine group of scaling and translation." loading="lazy" width="950" height="850">
  <figcaption class="post__image__caption">Numerical sample paths from the manuscript. Opacity indicates the progression of time. The sphere and rotation examples use Euler–Maruyama integration with projection onto the manifold. In the SO(3) panel, each color represents one column of the rotation matrix.</figcaption>
</figure>

The **torus** illustrates the role of the metric: the usual surface metric and a left-invariant group metric lead to different Brownian motions on the same underlying space. The **sphere** makes curvature-induced drift concrete, while **SO(3)** connects the theory directly to attitude uncertainty. The **affine group**, describing positive scaling and translation, provides a non-unimodular example in which the intrinsic group drift is nonzero.

## An additional numerical check for rotations

Beyond the manuscript’s sample-path figures, the accompanying simulation materials include a Monte Carlo check of the mean rotation matrix. For the normalization used in the SO(3) example, the theory predicts **E[R(t)] = e<sup>−t</sup>R(0)**.

Starting from the identity, the logarithm of the Frobenius norm of this mean should decrease along a straight line with slope −1. The numerical result follows that prediction closely, with finite-sample deviations becoming more visible at later times. This is an average of rotation matrices in the ambient matrix space; the average need not itself be a rotation.

<figure>
  <img src="{{ '/images/posts/brownian-motion/rotation-mean.png' | relative_url }}" alt="Logarithm of the norm of the mean rotation matrix versus time, showing close agreement between a Monte Carlo estimate and the theoretical line of slope minus one." loading="lazy" width="1200" height="927">
  <figcaption class="post__image__caption">Additional numerical result from the accompanying simulation materials: the solid curve is the Monte Carlo estimate and the dashed line is the theoretical prediction. The supplied Itô simulation uses 10,000 trajectories over simulation time 0–4.</figcaption>
</figure>

## Foundations for control, estimation, and AI

Geometrically consistent noise models support stochastic control, attitude estimation, and diffusion-based generative models on manifolds. This work clarifies the mathematical foundations these methods rely on: how to define diffusion that respects a state space’s metric, curvature, and symmetry.

It complements FDCL’s research on [uncertainty propagation in hybrid systems]({{ '/uncertainty-hybrid-systems' | relative_url }}), where continuous stochastic motion is combined with discrete resets and changes in state dimension.

## Paper

Taeyoung Lee and Gregory S. Chirikjian, *Geometric Interpretation of Brownian Motion on Riemannian Manifolds*, IEEE Transactions on Automatic Control, **submitted**. The arXiv preprint was posted in October 2025.

[Read the paper](https://arxiv.org/abs/2510.19991) · [Download the PDF](https://arxiv.org/pdf/2510.19991)
