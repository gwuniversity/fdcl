---
layout: news
title: 'The Score Kalman Filter Selected for NeurIPS 2026 Spotlight'
description: NeurIPS Spotlight recognition highlights FDCL’s research connecting rigorous mathematical analysis with AI.
date: 2026-09-24
author: Taeyoung
image: '/images/news/score-kalman-density.png'
image_fit: contain
image_alt: 'A Monte Carlo reference distribution compared with Gaussian and higher-order score-matching reconstructions.'
image_caption: 'Higher-order score matching captures curved uncertainty that a Gaussian approximation misses. Figure from The Score Kalman Filter.'
thumbnail: '/images/news/score-kalman-oscillators.png'
thumbnail_alt: 'Score Kalman Filter and baseline estimates compared with ground truth in a coupled-oscillator experiment.'
tags: [News]
toc: false
---

**The Score Kalman Filter has been selected for a Spotlight presentation at NeurIPS 2026—one of 292 Spotlight papers among 30,709 submissions (approximately 0.95%).**

The Conference on Neural Information Processing Systems ([NeurIPS](https://neurips.cc/)) is a flagship international conference in **artificial intelligence and machine learning**, bringing together researchers advancing the mathematical foundations and applications of AI.

The paper is a collaboration between **Kaito Iwasaki, Anthony Bloch, Taeyoung Lee, and Maani Ghaffari**, bringing together researchers at the University of Michigan and The George Washington University.

This work reflects **FDCL’s focus on connecting rigorous mathematical analysis with AI**. By linking probability and estimation theory with score matching, the paper illustrates how mathematical structure can guide new computational methods for robotics and autonomous systems.

Estimating a system’s state from noisy measurements is central to robotics and control. For nonlinear systems, uncertainty can take curved or multimodal shapes that Gaussian approximations cannot fully represent.

The **Score Kalman Filter (SKF)** combines score matching with Stein’s identity to represent and update this uncertainty without evaluating costly normalization integrals. Its core computations use linear algebra, and the classical information-form Kalman filter is recovered as a special case.

On the paper’s synthetic coupled-oscillator benchmarks, SKF was demonstrated through **20 state dimensions** and achieved lower root-mean-square estimation error than the tested extended, unscented, and ensemble Kalman filters and particle-filter baselines.

[Read the paper on arXiv](https://arxiv.org/abs/2605.16644) · [Download the PDF](https://arxiv.org/pdf/2605.16644)

Congratulations to Kaito and the entire team on this recognition!
