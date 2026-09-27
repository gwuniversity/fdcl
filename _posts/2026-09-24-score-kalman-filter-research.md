---
layout: post
title: 'The Score Kalman Filter: Non-Gaussian Estimation Through Linear Algebra'
description: Connecting score matching with probability theory to estimate nonlinear systems beyond Gaussian approximations.
date: 2026-09-24 00:00:00 -0400
date_basis: "NeurIPS Spotlight announcement recorded in the lab news item."
author: Taeyoung
image: '/images/news/score-kalman-density.png'
image_fit: contain
image_alt: 'Monte Carlo reference density and score-matching reconstructions of curved uncertainty.'
image_caption: 'Higher-order score matching captures curved uncertainty missed by a Gaussian approximation. Figure from The Score Kalman Filter.'
thumbnail: '/images/news/score-kalman-oscillators.png'
thumbnail_alt: 'State estimates from the Score Kalman Filter and baseline methods in a coupled-oscillator experiment.'
tags: [Research]
toc: false
---

A robot must estimate its state from imperfect measurements. In nonlinear systems, the resulting uncertainty can curve, stretch, or split into multiple likely states. Representing all of these possibilities with a Gaussian distribution can discard information that matters for estimation.

The **Score Kalman Filter (SKF)** connects score matching, a method used in machine learning, with mathematical identities from probability theory. Developed by **Kaito Iwasaki, Anthony Bloch, Taeyoung Lee, and Maani Ghaffari**, it reflects FDCL’s focus on **rigorous mathematical foundations for AI and autonomous systems**.

### From probability distributions to linear systems

Moment-based filters summarize uncertainty through quantities such as means, variances, and higher-order moments. Reconstructing a probability distribution from these summaries can require expensive normalization integrals.

SKF avoids those integrals by fitting the *score*—the gradient of a distribution’s log density—and using **Stein’s identity** to relate that score to statistical moments. For the representation developed in the paper, density fitting, prediction, and measurement updates are carried out through linear algebra. The classical information-form Kalman filter is recovered as a special case.

### What the experiments show

On the paper’s synthetic coupled-oscillator benchmarks, SKF was demonstrated through **20 state dimensions**, with lower root-mean-square estimation error than the tested extended, unscented, and ensemble Kalman filters and particle-filter baselines. These results demonstrate the approach on controlled nonlinear examples; evaluation on physical robotic systems remains a further step.

The paper was selected for a **NeurIPS 2026 Spotlight presentation**. [Read the recognition announcement]({{ '/news/score-kalman-filter' | relative_url }}).

### Paper

K. Iwasaki, A. Bloch, T. Lee, and M. Ghaffari, *The Score Kalman Filter*, NeurIPS 2026, accepted, Spotlight.

[Read the paper](https://arxiv.org/abs/2605.16644) · [Download the PDF](https://arxiv.org/pdf/2605.16644)
