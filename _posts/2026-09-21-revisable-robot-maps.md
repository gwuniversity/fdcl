---
layout: post
title: 'Robot Maps That Remember Motion and Revise Their Understanding'
description: PIMS-SLAM and REVISE connect persistent object tracking, revisable 3D mapping, and language-based scene understanding.
date: 2026-09-21 00:00:00 -0400
date_basis: "Latest supporting video revision: ICRA27.2/revise_supp_video_ver5.mp4, local modification date."
author: Taeyoung
image: '/images/posts/revisable-maps/chairs-separated.png'
image_fit: contain
image_max_width: 560
image_alt: 'Two adjacent chairs assigned distinct yellow and blue identities in a reconstructed 3D scene.'
image_caption: 'Two chairs, two identities. REVISE separates objects that were previously merged as additional views provide stronger evidence.'
thumbnail: '/images/posts/revisable-maps/chairs-separated.png'
thumbnail_alt: 'REVISE distinguishes two neighboring chairs in a 3D object map.'
tags: [Research]
toc: false
---

A robot needs more than a picture of its surroundings. It must recognize the same object across changing views, remember that an object can move, and correct its map when new observations reveal an earlier mistake. These challenges connect **geometric estimation with AI-based perception**: recognizing objects is useful only if their identities and locations remain consistent over time.

Two FDCL studies address complementary parts of this problem. **PIMS-SLAM** maintains object identity and motion history while reconstructing dynamic scenes. **REVISE** allows a robot to reconsider how observations are grouped into objects and search the resulting map using natural language. Both manuscripts are **submitted to ICRA 2027**.

These works support **CHASE—Cultivating Human-AI Synergy via Decentralized Elicitation and Learning**, funded by the **Office of Naval Research (ONR) Science of AI program for 2023–2027**, with a **$1.5 million total project award**. **Taeyoung Lee serves as co-principal investigator.** CHASE studies how humans and autonomous agents can collaborate under uncertainty. Persistent, revisable object maps contribute to the shared understanding of an environment that such collaboration requires.

## PIMS-SLAM: remembering objects through motion

Simultaneous localization and mapping, or **SLAM**, estimates a camera’s motion while building a map. Moving people and objects make this difficult: their motion can be confused with camera motion, and their old positions can leave clutter in the reconstruction.

Deciding independently in each frame whether an object is moving is fragile. An object may stop briefly, disappear behind another object, or receive a new tracking label when it reappears. PIMS-SLAM instead maintains a **Persistent Instance Motion State**, combining semantic, geometric, and object-composition evidence to associate observations over time.

This memory serves both camera tracking and mapping. It suppresses dynamic observations when estimating camera motion and guides the ownership, movement, and reassociation of the small 3D Gaussian elements used to represent the scene. Additional map maintenance adds newly revealed background surfaces and removes residual foreground geometry.

<figure>
  <div class="post__video">
    <video class="post__local-video" controls playsinline preload="none" poster="{{ '/images/posts/revisable-maps/pims-object-tracking.jpg' | relative_url }}" aria-label="Complete PIMS-SLAM supplementary video">
      <source src="{{ '/videos/pims-slam-full.mp4' | relative_url }}" type="video/mp4">
      <a href="{{ '/videos/pims-slam-full.mp4' | relative_url }}">Watch the complete PIMS-SLAM video</a>
    </video>
  </div>
  <figcaption class="post__image__caption">Complete PIMS-SLAM supplementary video (2:43), including the method, persistent-identity comparisons, dynamic-scene reconstructions, and evaluation results.</figcaption>
</figure>

The evaluation includes four dynamic sequences each from the Bonn and TUM datasets, plus four laboratory RGB-D sequences. To compare mapping with identical camera-pose inputs, the researchers reran the DynaGSLAM mapper with the same frames and PIMS-SLAM’s estimated trajectory.

| Dataset | DynaGSLAM | PIMS-SLAM |
| --- | ---: | ---: |
| Bonn | 26.76 dB | **34.59 dB** |
| TUM | 26.69 dB | **32.92 dB** |

These are mean **PSNR** scores for current-view renderings after tracking and mapping; higher values indicate lower image reconstruction error. Each configuration was run once. The comparison evaluates the complete mapping configurations, including their different segmentation and maintenance procedures. It does not isolate the contribution of persistent state alone.

## REVISE: a map that can change its mind

Object recognition has a different failure mode: two nearby chairs may initially look like one object, or different views of the same object may become separate map entries. An early decision can persist even after the robot obtains a better view.

REVISE retains the evidence behind those decisions: selected camera frames, depth, object masks, visual descriptors, and relationships across views. It periodically rebuilds object groups from this evidence, allowing **merging, splitting, and reassignment**.

<figure>
  <div class="post__video">
    <video class="post__local-video" controls playsinline preload="none" poster="{{ '/images/posts/revisable-maps/revise-full.jpg' | relative_url }}" aria-label="Complete REVISE supplementary video">
      <source src="{{ '/videos/revise-full.mp4' | relative_url }}" type="video/mp4">
      <a href="{{ '/videos/revise-full.mp4' | relative_url }}">Watch the complete REVISE video</a>
    </video>
  </div>
  <figcaption class="post__image__caption">Complete REVISE supplementary video (3:00), presenting revisable open-vocabulary instance mapping and its demonstrations.</figcaption>
</figure>

<figure>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px;">
    <div>
      <img src="{{ '/images/posts/revisable-maps/chairs-merged.png' | relative_url }}" alt="At 54 seconds, two neighboring chairs share the same object label." loading="lazy" width="1000" height="467">
      <p style="text-align: center; margin: 0;">Earlier: incorrectly merged</p>
    </div>
    <div>
      <img src="{{ '/images/posts/revisable-maps/chairs-separated.png' | relative_url }}" alt="At 66 seconds, REVISE assigns the two chairs separate yellow and blue labels." loading="lazy" width="1000" height="467">
      <p style="text-align: center; margin: 0;">Later: separate object identities</p>
    </div>
  </div>
  <figcaption class="post__image__caption">The same chair pair at 54 and 66 seconds in the manuscript’s example. Additional observations allow REVISE to split an incorrect grouping. Colors indicate object identities.</figcaption>
</figure>

Revision also matters after **loop closure**, when a robot recognizes a previously visited place and corrects its estimated camera trajectory. REVISE rebuilds geometry and cross-view evidence using those corrected poses, then reconsiders the object assignments. In a paired study on 18 ScanNet scenes with identical observations and pose corrections, enabling repair increased instance segmentation overlap from **25.8 to 27.4 mIoU** and semantic segmentation overlap from **13.2 to 14.5 mIoU**. Higher overlap means closer agreement with the reference labels.

## From object names to language-based queries

REVISE’s open-vocabulary representation connects object geometry to language. A user can search by a name, an appearance, or a function—for example, **“where to heat up food”** rather than a fixed category label.

<figure>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; align-items: center;">
    <img src="{{ '/images/posts/revisable-maps/heat-food-view.png' | relative_url }}" alt="Camera view of an office kitchen with the best match to the query where to heat up food highlighted in red." loading="lazy" width="640" height="480">
    <img src="{{ '/images/posts/revisable-maps/heat-food-map.png' | relative_url }}" alt="The retrieved object highlighted in red in the reconstructed office map, alongside the estimated camera trajectory." loading="lazy" width="517" height="353">
  </div>
  <figcaption class="post__image__caption">Real-world office demonstration using an RGB-D camera and ORB-SLAM3 poses. The query “where to heat up food” retrieves an object in both the camera view and the 3D map. Red marks the best match; pale orange marks the runner-up. This demonstrates map retrieval, rather than execution of a robot task.</figcaption>
</figure>

The retained evidence also supports cooperative mapping. In simulated two- and four-robot splits of recorded trajectories, REVISE reproduced its single-robot scores when pooling the same observations in a shared coordinate frame and grid. This establishes consistency under evidence pooling; independently navigating robots with uncertain relative poses remain a further challenge.

## Supporting human–AI collaboration in CHASE

Together, the studies explore two forms of map memory: **remembering how objects move** and **retaining enough evidence to revise what an object is**. They are separate systems, with complementary contributions toward maps that remain useful as observations and geometric estimates change.

The funded CHASE project brings together decentralized learning, uncertainty modeling, and communication to help human and robot teammates coordinate. Its research objectives include using vision and depth sensors to construct 3D maps, identify relevant objects, and present scene information to human collaborators during cooperative exploration. PIMS-SLAM and REVISE support this perception and mapping foundation: one preserves object histories in dynamic scenes, while the other revises object groupings and makes mapped objects accessible through language.

These mapping results advance CHASE’s broader human–AI collaboration goals by providing capabilities for persistent scene understanding, language-based object retrieval, and shared mapping.

Computational efficiency remains an important next step. The reported full PIMS-SLAM pipeline runs below one frame per second, and REVISE incurs additional computation when regrouping objects or repairing a map. The results establish mapping and perception capabilities while identifying the work needed for faster deployment.

## Papers

1. Cheng Liu, Beomyeol Yu, Maneesha Wickramasuriya, Tian Lan, Mahdi Imani, and Taeyoung Lee, *PIMS-SLAM: Persistent Instance Motion State for Gaussian SLAM in Dynamic Environments*, IEEE International Conference on Robotics and Automation (ICRA), 2027, **submitted**.
2. Beomyeol Yu, Cheng Liu, Maneesha Wickramasuriya, Mahdi Imani, Tian Lan, and Taeyoung Lee, *REVISE: Revisable Online Open-Vocabulary Instance Mapping with SLAM*, IEEE International Conference on Robotics and Automation (ICRA), 2027, **submitted**.
