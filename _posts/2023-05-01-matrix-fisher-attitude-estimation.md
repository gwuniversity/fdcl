---
layout: post
title: 'Matrix Fisher Distributions: Uncertainty and Estimation on SO(3)'
description: A geometric probability framework for uncertain rotations, correlated sensor biases, and navigation with large attitude errors.
date: 2023-05-01 00:00:00 -0400
date_basis: "May 2023 American Control Conference publication, the latest work covered in this overview; the first day represents the publication month."
author: Taeyoung
image: '/images/posts/matrix-fisher/distribution-anisotropic.png'
image_fit: contain
image_max_width: 380
image_alt: 'Marginal densities of three body-fixed axes on a sphere, showing unequal directional uncertainty in a matrix Fisher distribution.'
image_caption: 'An anisotropic matrix Fisher distribution, visualized through the marginal directions of the three body-fixed axes. Figure from Lee (2018). The sphere shows axis-direction marginals of a distribution on SO(3).'
thumbnail: '/images/posts/matrix-fisher/distribution-anisotropic.png'
thumbnail_alt: 'Directional uncertainty represented by a matrix Fisher distribution on SO(3).'
tags: [Research]
toc: false
---

A robot may know which way is up while remaining uncertain about its heading. A spacecraft may begin with a poor attitude estimate, and a drifting gyroscope can couple errors in orientation with errors in sensor bias. These situations require more than a single best estimate: they require a probability model that represents what is known, what is uncertain, and how those uncertainties interact.

FDCL's research uses the **matrix Fisher distribution on SO(3)** to describe uncertain rotations directly. A connected series of studies develops Bayesian attitude estimation, uncertainty propagation, mixtures, smoothing, and the **matrix Fisher–Gaussian distribution** for rotations correlated with quantities such as sensor biases, velocity, and position.

## Probability on the space of rotations

SO(3) is the space of three-dimensional rotation matrices. A Gaussian distribution in local attitude coordinates can work well when uncertainty is small, but broad uncertainty may extend beyond the region where that local description is useful.

The matrix Fisher distribution assigns probability directly to valid rotations. Its density has the compact form

$$
p(R)=\frac{1}{c(F)}\exp\!\left(\operatorname{tr}(F^{T}R)\right).
$$

Here, R ∈ SO(3) is a rotation, the matrix parameter **F** describes orientation and concentration, and **c(F)** normalizes the density. Setting F to zero gives the uniform distribution, representing complete attitude uncertainty. Other choices describe concentrated or directionally unequal uncertainty without introducing a local attitude chart.

The three figures below illustrate this flexibility. Each sphere combines the marginal distributions of the three body-fixed axis directions; it is a visualization of a distribution on SO(3), whose points are complete orientations.

<div class="gallery-box">
  <div class="gallery gallery-column-3">
    <img src="{{ '/images/posts/matrix-fisher/distribution-broad.png' | relative_url }}" alt="Broad axis-direction marginals for the matrix Fisher parameter F equals 5 I." loading="lazy" width="900" height="898">
    <img src="{{ '/images/posts/matrix-fisher/distribution-concentrated.png' | relative_url }}" alt="More concentrated axis-direction marginals for F equals 20 I." loading="lazy" width="900" height="898">
    <img src="{{ '/images/posts/matrix-fisher/distribution-anisotropic.png' | relative_url }}" alt="Unequal directional uncertainty for F equals diag(25, 5, 1)." loading="lazy" width="900" height="898">
  </div>
  <em>Left to right: F = 5I, F = 20I, and F = diag(25, 5, 1). Increasing concentration narrows the axis-direction distributions; unequal parameters produce different spreads in different directions. Original figures from Lee (2018) [3].</em>
</div>

## From a distribution to a Bayesian estimator

The 2016 unscented-estimation paper and the 2018 journal study develop intrinsic Bayesian estimators using matrix Fisher distributions [1, 3]. They connect the distribution's moments and geometric interpretation to the two recurring tasks of filtering: propagating uncertainty through rotational motion and incorporating new measurements.

The framework includes first-order and unscented propagation methods. Under the measurement models developed in the papers, Bayesian updates retain a useful matrix Fisher form. Propagation through noisy nonlinear dynamics still involves approximations; using a global probability model does not make every filtering step exact.

Two complementary studies address practical computation. The 2018 approximate-distribution paper develops numerically stable normalization and approximations for highly concentrated and nearly uniform distributions [4]. The 2021 work with Weixin Wang derives an iterative formulation for central moments of arbitrary order [7], providing additional statistical tools for working with rotational uncertainty.

## Beyond one component: mixtures and smoothing

A single distribution is not always sufficient when several distinct orientations remain plausible. The 2017 work with Shankar Kulumani studies **mixtures of matrix Fisher distributions**, allowing multiple components to describe more general attitude uncertainty [2].

The 2021 smoothing study addresses a different question: how should an earlier attitude estimate change after later measurements become available? It uses measurements across an observation interval to estimate a continuous attitude trajectory and develops stochastic interpolation on SO(3) [8]. This is useful when reconstructing past motion, where information arriving after a particular instant can improve the estimate at that instant.

## Correlated attitude and sensor-bias uncertainty

Gyroscope bias changes how an attitude estimate drifts, so attitude and bias errors are correlated. Keeping a rotation distribution and an independent bias distribution would discard that relationship.

Weixin Wang and Taeyoung Lee introduced the **matrix Fisher–Gaussian (MFG) distribution** in the 2020 conference paper and developed it further in the 2022 journal article [6, 9]. It is defined on SO(3) × ℝⁿ. Its attitude marginal is matrix Fisher, while the Euclidean variables conditioned on attitude are Gaussian, with a conditional mean that depends on the rotation. This construction captures angular–linear correlations while retaining a global description of attitude uncertainty.

The work derives statistical properties, parameter-estimation methods, and uncertainty-propagation schemes, then constructs Bayesian estimators for attitude and time-varying gyroscope bias. Numerical studies examine challenging initial errors and compare the resulting estimators with multiplicative extended and unscented Kalman filters.

## What can one measured direction reveal?

An instantaneous direction measurement constrains only two rotational degrees of freedom. Determining what can be learned over time requires considering the motion, measurement model, and uncertainty propagation together.

The 2019 spacecraft study uses a magnetometer and gyroscope to estimate attitude as the spacecraft travels through Earth's changing magnetic field [5]. The 2022 extension uses MFG to estimate attitude and gyro bias jointly [10]. Both studies evaluate their methods in numerical simulations.

The separate 2022 observability paper with Weixin Wang and Kanishke Gamagedara examines repeated measurements of a single fixed reference direction [11]. It identifies conditions under which the stochastic dynamics and measurement configuration make attitude observable. These results depend on the physical sensing and motion models, including the frames in which the measurements are supplied; a change of notation alone does not create information.

The study also includes a hand-moved instrumented platform, with motion capture supplying ground truth and selected frame-resolved measurements. Filters are evaluated offboard using the collected data. This experiment tests the observability analysis rather than claiming that any single-vector sensor always determines full attitude.

## Navigation with a large initial heading error

The 2023 INS–GNSS study extends MFG filtering to inertial navigation with position measurements [12]. Attitude, position, velocity, and sensor biases are coupled, so a poor orientation estimate can corrupt the integration of acceleration and subsequently the inferred position.

In the paper's simulations, the vehicle begins either near the correct attitude or with a **180-degree heading error**. Across 100 runs for each initialization, the MFG and error-state EKF methods perform similarly for small initial errors, while the MFG filters recover more effectively in the large-error case. Attitude is corrected through its correlation with position; it is not measured directly in this simulation.

This illustrates the purpose of the broader research program: represent rotational uncertainty and its correlations faithfully enough that sensor fusion remains useful when initialization is poor or measurements leave some directions weakly constrained.

## A geometric foundation for uncertainty and estimation

The contribution is a connected set of probability models, statistical tools, and inference methods for rotational systems. It spans mathematical properties of distributions, computational propagation and updates, observability analysis, and navigation applications.

This work complements FDCL's [invariant Kalman filtering research]({{ '/invariant-kalman-filter-relative-dynamics' | relative_url }}), which exploits the structure of estimation-error dynamics, and [Brownian motion on manifolds]({{ '/brownian-motion-on-manifolds' | relative_url }}), which examines the geometric foundations of stochastic motion.

## References

1. T. Lee, “Global unscented attitude estimation via the matrix Fisher distributions on SO(3),” *Proceedings of the American Control Conference*, pp. 4942–4947, 2016. [Preprint](https://arxiv.org/abs/1602.03511).
2. S. Kulumani and T. Lee, “Bayesian attitude estimation on SO(3) with matrix Fisher mixtures,” *Proceedings of the AIAA/AAS Spaceflight Mechanics Meeting*, AAS 17-324, 2017.
3. T. Lee, “Bayesian attitude estimation with the matrix Fisher distribution on SO(3),” *IEEE Transactions on Automatic Control*, 63(10), pp. 3377–3392, 2018. [Paper](https://doi.org/10.1109/TAC.2018.2797162) · [Preprint](https://arxiv.org/abs/1710.03746).
4. T. Lee, “Bayesian attitude estimation with approximate matrix Fisher distributions on SO(3),” *Proceedings of the IEEE Conference on Decision and Control*, pp. 5319–5325, 2018.
5. T. Lee, “Spacecraft attitude estimation with a single magnetometer using matrix Fisher distributions on SO(3),” *Proceedings of the AIAA Guidance, Navigation and Control Conference*, AIAA 2019-1173, 2019.
6. W. Wang and T. Lee, “Matrix Fisher–Gaussian distribution on SO(3) × ℝⁿ for attitude estimation with a gyro bias,” *Proceedings of the American Control Conference*, pp. 4429–4434, 2020.
7. W. Wang and T. Lee, “Higher-order central moments of matrix Fisher distribution on SO(3),” *Statistics & Probability Letters*, 169, article 108983, 2021. [Paper](https://doi.org/10.1016/j.spl.2020.108983).
8. T. Lee, “Stochastic attitude smoothing and interpolation on SO(3) with matrix Fisher distributions,” *Proceedings of the American Control Conference*, pp. 1161–1167, 2021.
9. W. Wang and T. Lee, “Matrix Fisher–Gaussian distribution on SO(3) × ℝⁿ and Bayesian attitude estimation,” *IEEE Transactions on Automatic Control*, 67(5), pp. 2175–2191, 2022. [Paper](https://doi.org/10.1109/TAC.2021.3073323) · [Preprint](https://arxiv.org/abs/2003.02180).
10. W. Wang and T. Lee, “Spacecraft attitude and gyro-bias estimation with a single magnetometer on SO(3) × ℝⁿ,” *Proceedings of the AIAA Scitech Forum*, AIAA 2022-0616, 2022.
11. W. Wang, K. Gamagedara, and T. Lee, “On the observability of attitude with single direction measurements,” *IEEE Transactions on Automatic Control*, 67(9), pp. 4986–4993, 2022. [Paper](https://doi.org/10.1109/TAC.2022.3179214).
12. W. Wang and T. Lee, “INS–GNSS navigation for large attitude uncertainties with the matrix Fisher–Gaussian distribution,” *Proceedings of the American Control Conference*, pp. 4858–4863, 2023.
