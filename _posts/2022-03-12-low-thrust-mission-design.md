---
layout: post
title: 'Low-Thrust Space Missions: Geometry, Reachability, and Optimization'
description: From low-thrust transfers to autonomous asteroid exploration, geometry connects mission design, shape reconstruction, and optimal guidance.
date: 2022-03-12 00:00:00 -0500
date_basis: "March 12, 2022 release of the shape-reconstruction and optimal-guidance preprint, the latest publication covered in this overview."
author: Taeyoung
image: '/images/posts/low-thrust-missions/castalia-transfer.png'
image_fit: contain
image_max_width: 480
image_alt: 'Computed transfer between periodic orbits around asteroid Castalia, with intermediate trajectories departing from the equatorial plane.'
image_caption: 'Numerical low-thrust transfer around asteroid 4769 Castalia. Successive reachability calculations connect a nearby orbit to a more distant one. Original figure from Kulumani and Lee (2016).'
thumbnail: '/images/posts/low-thrust-missions/castalia-transfer.png'
thumbnail_alt: 'Low-thrust transfer trajectories around asteroid Castalia.'
tags: [Research]
toc: false
---

A small continuous thrust can change a spacecraft's orbit substantially when applied over a long time. Electric propulsion makes efficient use of propellant, but its limited thrust creates a demanding trajectory-design problem: the spacecraft must build up its maneuver gradually while gravity continually changes its motion. Near the Moon or an irregular asteroid, a useful trajectory can be difficult to find by guessing a thrust history and asking an optimizer to improve it.

FDCL's research with **Shankar Kulumani** develops a systematic alternative: **compute where the spacecraft can reach, then use that information to construct a transfer**. The work combines the geometry of natural orbital motion with bounded control inputs, optimal control, and structure-preserving numerical integration. Three papers develop this approach for the Earth–Moon system and for operations around asteroid 4769 Castalia [1–3]. Later work connects spacecraft guidance to learning the asteroid's shape, extending the mission-design perspective from reaching an orbit to exploring an uncertain surface [4].

## Working with natural orbital motion

In the Earth–Moon system, a spacecraft feels the gravity of both bodies. The resulting dynamics contain periodic orbits and families of trajectories that approach or depart them, known as stable and unstable **invariant manifolds**. These structures can guide transfers with little or no thrust along portions of the route.

Natural motion alone does not connect every desired pair of orbits, and waiting for a useful connection can take a long time. Low thrust expands the available choices: it allows the spacecraft to depart from an unforced trajectory and reach states that would otherwise be inaccessible from the chosen starting condition.

The central design question becomes: **with a specified thrust limit and time horizon, which states can the spacecraft reach?** A reachable set describes those possibilities. In the papers, numerical optimal-control calculations approximate its boundary, providing candidate trajectories as well as their associated control histories.

## Turning trajectory search into a geometric problem

The 2015 conference study and its 2019 journal development use **Poincaré sections** to organize the search [1, 3]. A section records a trajectory when it crosses a selected surface. Instead of comparing entire paths through phase space, the method compares their crossing states on a lower-dimensional representation.

The transfer-design process has three main steps:

1. Compute an approximation to the reachable set on the section under the thrust constraint.
2. Select a reachable state that reduces a distance measure to the target orbit or its stable manifold. Repeat the calculation when one stage is insufficient.
3. Solve a final constrained transfer problem to match the required terminal state, rather than relying only on an apparent intersection in the reduced representation.

This gives the optimizer a physically informed starting point. It also makes the effects of the thrust bound and transfer duration easier to examine as part of mission design.

The Earth–Moon formulation uses a **variational integrator**, derived from a discrete variational principle, to represent the dynamics in the optimal-control calculation. Preserving the underlying geometric structure helps capture the accumulated effects of small control inputs over long trajectories. It does not imply that energy remains constant during powered flight: thrust deliberately changes the spacecraft's motion and energy.

## Earth–Moon transfer examples

The 2019 journal paper demonstrates two transfers in the planar circular restricted three-body model [3]. One connects a periodic orbit near the Earth–Moon L₁ point to an orbit around the Moon. For the illustrated case, the controlled transfer takes approximately **1.4 nondimensional time units**, compared with approximately **3.1** for the invariant-manifold route used as a comparison. This is a result for that numerical example, rather than a general speed advantage for every low-thrust mission.

The second example begins in a geostationary orbit. Eight stages of reachability analysis guide the spacecraft toward the stable manifold of an L₁ periodic orbit. After joining that manifold, the spacecraft coasts toward the target under the natural dynamics.

![Computed transfer from a geostationary orbit to an Earth–Moon L₁ periodic orbit, combining powered stages and a coast along a stable manifold.]({{ '/images/posts/low-thrust-missions/earth-moon-transfer.png' | relative_url }})
{: style="display: block; width: 100%; max-width: 480px; margin-inline: auto;" }
*Geostationary-to-L₁ numerical transfer from Kulumani and Lee (2019) [3]. Black and red trajectories show the powered transfer stages; blue shows the subsequent coast along the stable manifold, whose family of trajectories is shown in green. Axes use nondimensional coordinates in the rotating Earth–Moon frame.*

## Maneuvering around an irregular asteroid

The 2016 Castalia paper extends the reachability approach to a different environment [2]. An asteroid's irregular shape and rotation create dynamics that a simple spherical gravity model cannot fully represent. The study uses a **polyhedral gravity model** to account for Castalia's shape and formulates spacecraft motion in the asteroid's rotating frame.

The numerical example transfers between two periodic orbits near the equatorial plane. It assumes a maximum acceleration of **0.1 mm/s²**, equivalent to **100 mN for a 1,000 kg spacecraft**. Four successive reachability stages are followed by a final transfer that satisfies the target-state and control-magnitude constraints.

Although the initial and target orbits are near the equatorial plane, the computed transfer makes substantial excursions out of that plane, as shown in the opening figure. This illustrates why allowing the search to explore the full spatial dynamics can reveal useful paths that a strictly planar design would exclude. Such transfers are relevant to changing observation altitudes during asteroid mapping and reconnaissance.

## What the optimization establishes

The main contribution is a **systematic method for finding feasible transfers under bounded thrust**. Optimal-control subproblems generate the reachable-set boundary and the final connection, but the assembled multistage transfer is **not guaranteed to minimize total fuel or energy**. The 2019 paper explicitly identifies this limitation.

These are computational mission-design studies. The Earth–Moon examples use a planar model and idealized thrust assumptions; the paper notes that its selected acceleration levels require further study at smaller values. Both the Earth–Moon and Castalia formulations omit spacecraft mass loss from propellant expenditure. The results therefore provide a foundation for preliminary trajectory design, with propulsion details and additional environmental effects to be incorporated for a specific mission.

## From transfer design to autonomous exploration

Once a spacecraft reaches an asteroid, it must decide where to observe and how to approach a surface whose shape is not yet known accurately. Shape matters both for identifying terrain and for modeling the irregular gravitational field. The 2022 study by Kulumani and Lee combines **Bayesian shape reconstruction, optimal guidance, and geometric control** to address this problem [4].

Simulated range measurements incrementally update an initial surface model. A guidance objective balances shape uncertainty, travel distance, and control effort to select the next observation region. The controller then coordinates the spacecraft's position and orientation to collect measurements. This makes exploration an active process: the evolving uncertainty helps determine where the spacecraft moves next.

<figure>
  <div class="post__video">
    <video class="post__local-video" controls playsinline preload="none" poster="{{ '/images/posts/low-thrust-missions/castalia-exploration.jpg' | relative_url }}" aria-label="Simulated spacecraft exploration and shape reconstruction around Castalia">
      <source src="{{ '/videos/castalia-exploration.mp4' | relative_url }}" type="video/mp4">
      <a href="{{ '/videos/castalia-exploration.mp4' | relative_url }}">Watch the Castalia exploration simulation</a>
    </video>
  </div>
  <figcaption class="post__image__caption">Castalia exploration and shape reconstruction (4:10). The red marker represents the spacecraft as it moves around the asteroid while the surface estimate is updated. This is a numerical visualization of the exploration research described in [4].</figcaption>
</figure>

### Refining the surface near a landing site

A uniformly detailed surface mesh is expensive to maintain. The study instead increases resolution around a selected landing region, concentrating computation where finer terrain information is needed. In the numerical example, the landing-site assessment accounts for surface slope and distance, and the shape model is augmented with small surface features to test local reconstruction.

<figure>
  <div class="post__video">
    <video class="post__local-video" controls playsinline preload="none" poster="{{ '/images/posts/low-thrust-missions/castalia-refinement.jpg' | relative_url }}" aria-label="Simulated local surface refinement near a candidate landing region on Castalia">
      <source src="{{ '/videos/castalia-refinement.mp4' | relative_url }}" type="video/mp4">
      <a href="{{ '/videos/castalia-refinement.mp4' | relative_url }}">Watch the Castalia surface-refinement simulation</a>
    </video>
  </div>
  <figcaption class="post__image__caption">Local surface refinement (3:00). Additional simulated measurements resolve smaller features near the landing region. The small craters and outcroppings were added to the simulation's shape model to evaluate reconstruction; they are not claimed as observed features of Castalia.</figcaption>
</figure>

These exploration simulations illustrate the later guidance and reconstruction framework, rather than the reachability-based low-thrust transfers shown earlier. Together, the studies connect two mission decisions: how to reach a useful orbit, and how to maneuver from there to learn about an unfamiliar body and prepare for landing.


## References

1. S. Kulumani and T. Lee, “Systematic design of optimal low-thrust transfers for the three-body problem,” *Proceedings of the AIAA/AAS Astrodynamics Specialist Conference*, AAS 15-757, 2015. [Preprint](https://arxiv.org/abs/1510.02695).
2. S. Kulumani and T. Lee, “Low-thrust trajectory design using reachability sets near asteroid 4769 Castalia,” *Proceedings of the AIAA/AAS Astrodynamics Specialist Conference*, AIAA 2016-5376, 2016. [Paper](https://doi.org/10.2514/6.2016-5376) · [Preprint](https://arxiv.org/abs/1608.05601).
3. S. Kulumani and T. Lee, “Systematic design of optimal low-thrust transfers for the three-body problem,” *Journal of the Astronautical Sciences*, 66(1), pp. 1–31, 2019. [Paper](https://doi.org/10.1007/s40295-018-00139-y).

4. S. Kulumani and T. Lee, “Bayesian shape reconstruction and optimal guidance for autonomous landing on asteroids,” *Journal of the Astronautical Sciences*, 69, pp. 335–367, 2022. [Paper](https://doi.org/10.1007/s40295-022-00310-6) · [Preprint](https://arxiv.org/abs/2203.06485).
