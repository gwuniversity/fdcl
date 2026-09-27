---
layout: post
title: 'Vision-Based Maritime Flight: From Deep Perception to UAV Experiments'
description: Combining transformer networks, geometric estimation, and flight testing to navigate relative to a ship.
date: 2026-07-15 00:00:00 -0400
date_basis: "Maneesha Wickramasuriya doctoral defense, as recorded in the lab defense announcement."
author: Taeyoung
image: '/images/video-posters/vision_in_loop.jpg'
image_alt: 'Indoor UAV flight alongside rendered ship views and onboard pose estimates.'
video: '/videos/vision_in_loop.mp4'
video_label: 'Vision-in-the-loop maritime UAV flight demonstration'
image_caption: 'A physical UAV flies indoors while its perception system processes photorealistic maritime imagery.'
tags: [Research]
toc: false
---

A UAV approaching a ship needs to know its position and orientation relative to the vessel. Waves, changing viewpoints, lighting, and limited access to reliable navigation signals make this a demanding perception and control problem.

FDCL’s maritime autonomy research connects **deep visual perception, geometric estimation, and experimental validation**, in collaboration with the U.S. Naval Academy. It builds from shipboard visual–inertial flight experiments to transformer-based perception and mixed-reality testing of a complete autonomous flight system.

The deep-perception work led by **Maneesha (“Maneesh”) Wickramasuriya** forms a central part of his doctoral dissertation, *Deep Transformer Network for Autonomous UAV Launch and Recovery in Ocean Environments*.

## The foundation: autonomous flight from a moving ship

Earlier work by **Kanishke Gamagedara, Taeyoung Lee, and Murray Snyder** developed the onboard hardware, estimation, and control software for autonomous launch and landing from a U.S. Naval Academy research vessel in Chesapeake Bay. The experiments tested both RTK-GPS-based relative positioning and vision-based flight.

A **delayed Kalman filter** fuses measurements according to when they were acquired: a delayed observation corrects a past estimate, which is then propagated to the current time. This makes the estimation system account for sensing and processing delays while the aircraft and ship continue moving.

<figure>
  <div class="post__video">
    <video class="post__local-video" controls playsinline preload="none" poster="{{ '/images/posts/maritime-flight/shipboard-flight.jpg' | relative_url }}" aria-label="Visual-inertial UAV flight above the deck of a research vessel">
      <source src="{{ '/videos/shipboard-visual-inertial-flight.mp4' | relative_url }}" type="video/mp4">
      <a href="{{ '/videos/shipboard-visual-inertial-flight.mp4' | relative_url }}">Watch the shipboard flight excerpt</a>
    </video>
  </div>
  <figcaption class="post__image__caption">An excerpt from the earlier shipboard visual–inertial flight experiments. Insets show the onboard camera view and visual features used for navigation. These experiments preceded the transformer-based perception system.</figcaption>
</figure>

## Learning to recognize the ship’s structure

The transformer approach learns recognizable ship structures from a single camera image. It predicts geometric keypoints on several parts of the vessel, recovers an individual pose from each part, and combines those estimates through **Bayesian fusion**. Using several structures reduces dependence on the visibility of any one ship component.

Collecting hundreds of thousands of labeled images at sea is impractical. Instead, the researchers reconstructed the vessel’s geometry and rendered **approximately 435,000 synthetic training images**, varying camera poses, textures, backgrounds, and lighting. The network learns ship structure across these variations rather than relying only on matching local image texture between successive frames.

<figure>
  <img src="{{ '/images/posts/maritime-flight/synthetic-training.jpg' | relative_url }}" alt="Synthetic ship images with varied viewpoints, vessel textures, skies, and ocean backgrounds." loading="lazy" width="1440" height="812">
  <figcaption class="post__image__caption">Synthetic training images vary appearance while preserving the vessel’s geometry, allowing automatic generation of images and corresponding pose labels.</figcaption>
</figure>

## From synthetic images to shipboard observations

The 2025 JGCD study evaluated the trained network on synthetic test images and real images collected during shipboard flight experiments. The real-image tests included normal, overexposed, and underexposed views.

| Evaluation | Mean position error | Mean rotation error |
|---|---:|---:|
| Synthetic test images | 0.204 m | 0.91° |
| Real images: overexposed ship | 0.112 m | 1.8° |
| Real images: underexposed ship | 0.089 m | 1.1° |
| Real images: normal exposure | 0.177 m | 4.0° |

For the three real-image datasets, position error was **0.66–0.97% of each dataset’s maximum range**. These results demonstrate transfer from synthetic training to real maritime imagery under the tested conditions. They evaluate pose estimation from flight imagery; closed-loop flight using the transformer is addressed in the later study below.

<figure>
  <img src="{{ '/images/posts/maritime-flight/shipboard-validation.jpg' | relative_url }}" alt="Predicted ship keypoints and bounding boxes overlaid on real shipboard images under normal exposure." loading="lazy" width="1440" height="278">
  <img src="{{ '/images/posts/maritime-flight/bright-light-validation.jpg' | relative_url }}" alt="Predicted ship keypoints and bounding boxes under strong sunlight and overexposure." loading="lazy" width="1440" height="278">
  <figcaption class="post__image__caption">Validation on real shipboard images: predicted keypoints and projected ship-part bounding boxes under normal exposure (top) and overexposure (bottom).</figcaption>
</figure>

## Mixed reality: connecting perception to a flying UAV

The **ICUAS 2025** study introduced a vision-in-the-loop environment using **3D Gaussian Splatting**. Images captured around the research vessel are used to construct a photorealistic scene that can be rendered from new viewpoints.

<figure>
  <img src="{{ '/images/posts/maritime-flight/real-and-rendered.jpg' | relative_url }}" alt="Four real photographs of the research vessel in the top row, with corresponding Gaussian-splatting renderings in the bottom row." loading="lazy" width="1440" height="718">
  <figcaption class="post__image__caption">Real vessel images (top) and corresponding 3D Gaussian Splatting renderings (bottom), illustrating the maritime environment used for indoor verification.</figcaption>
</figure>

The **ICUAS 2026** study extends this environment to autonomous closed-loop flight with onboard perception and estimation:

1. A motion-capture system measures the physical UAV’s pose so that the renderer can generate the corresponding maritime camera view.
2. Those RGB images are streamed to the onboard computer, where the transformer estimates ship-relative position and orientation.
3. A delayed Kalman filter combines the visual estimates with high-rate inertial measurements, and a geometric controller uses the resulting current-time estimate to command flight.

The experiments demonstrated **autonomous takeoff, trajectory tracking, and landing** in the indoor maritime emulation shown in the opening video. The setup exposes perception latency, asynchronous updates, and onboard computing constraints while retaining physical UAV dynamics. It provides an intermediate validation stage before at-sea deployment of the integrated transformer-based system.

## Complementary sensing and geometric estimation

The same emphasis on vessel geometry also supports [LiDAR-based pose estimation]({{ '/pointnet' | relative_url }}). A point transformer learns 40 ship keypoints from sparse 3D scans, providing a complementary route to relative localization when image appearance is difficult to interpret.

Related work on [invariant Kalman filtering for relative dynamics](https://arxiv.org/abs/2412.10519) develops the geometric estimation theory for motion between two systems. This complements the demonstrated delayed-filter flight architecture and supports further research on ship-relative sensor fusion.

## Related publications

- K. Gamagedara, T. Lee, and M. Snyder, [*Delayed Kalman Filter for Vision-Based Autonomous Flight in Ocean Environments*](https://doi.org/10.1016/j.conengprac.2023.105791), *Control Engineering Practice*, 143, 105791, 2024. Shipboard flight and delay-aware visual–inertial estimation.
- M. Wickramasuriya, T. Lee, and M. Snyder, *Deep Monocular Relative 6D Pose Estimation for Ship-Based Autonomous UAV*, AIAA SciTech Forum, paper AIAA 2024-2877, 2024. An earlier development of the deep monocular perception approach.
- M. Wickramasuriya, T. Lee, and M. Snyder, [*Deep Transformer Network for Monocular Pose Estimation of Shipborne Unmanned Aerial Vehicle*](https://doi.org/10.2514/1.G008588), *Journal of Guidance, Control, and Dynamics*, 48(8), 1915–1930, 2025. Multi-part perception, Bayesian fusion, and synthetic-to-real evaluation.
- M. Wickramasuriya, B. Yu, T. Lee, and M. Snyder, [*Vision-in-the-Loop Simulation for Deep Monocular Pose Estimation of UAV in Ocean Environment*](https://arxiv.org/abs/2502.05409), ICUAS 2025. Photorealistic maritime rendering and indoor testing.
- M. Wickramasuriya, B. Yu, J. Shin, M. Huslig, T. Lee, and M. Snyder, [*Hardware- and Vision-in-the-Loop Validation of Deep Monocular Pose Estimation for Autonomous Maritime UAV Flight*](https://arxiv.org/abs/2606.19176), ICUAS 2026. Integrated onboard perception, estimation, and autonomous flight experiments.

[Pose-estimation code](https://github.com/fdcl-gwu/TNN-MO) · [Doctoral defense announcement]({{ '/news/ben-maneesh-defenses' | relative_url }}) · [Complementary LiDAR research]({{ '/pointnet' | relative_url }})
