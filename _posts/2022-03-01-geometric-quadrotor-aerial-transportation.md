---
layout: post
title: 'Geometric Quadrotor Control and Aerial Transportation'
description: From agile flight on SE(3) to suspended loads and cooperative transport, geometric control connects coupled dynamics, stability analysis, and UAV experiments.
date: 2022-03-01 00:00:00 -0500
date_basis: "March 2022 issue of the latest journal publication covered in this overview; the first day represents the publication month."
author: Taeyoung
image: '/images/posts/quadrotor-transport/payload-flight.jpg'
image_fit: contain
image_max_width: 720
image_alt: 'A quadrotor carrying a payload on a long link inside the FDCL flight arena.'
image_caption: 'Indoor payload-transport experiment from Yu, Gamagedara, Kim, Lee, and Suk (2020). The controller tracks the payload trajectory while accounting for the coupled motion of the vehicle and suspended load.'
thumbnail: '/images/posts/quadrotor-transport/payload-flight.jpg'
thumbnail_alt: 'Quadrotor and suspended payload during an indoor flight experiment.'
tags: [Research]
toc: false
---

A quadrotor must tilt to move horizontally. Add a suspended load, and every maneuver also changes the motion of the connecting cable and payload. When several aircraft carry one object, their forces and motions become coupled through the load. Reliable control requires understanding these interactions as part of a single dynamical system.

FDCL's work develops **geometric controllers directly on the spaces of positions, rotations, and cable directions**. Beginning with quadrotor tracking on SE(3), this research extends to robust and adaptive flight control, flexible cables, and cooperative transportation. The common thread is a close connection between nonlinear dynamics, mathematical stability analysis, and physical experiments.

## From attitude control to complete vehicle motion

A quadrotor has four rotor inputs but six translational and rotational degrees of freedom. It cannot choose its position and every component of its orientation independently: the thrust direction needed for translation constrains the vehicle's attitude.

The 2010 work with Melvin Leok and N. Harris McClamroch formulates the dynamics on **SE(3)**, the space of rigid-body positions and orientations [1]. The controller follows a position trajectory and a heading direction while respecting the coupling between thrust and attitude. Its geometric formulation avoids Euler-angle singularities and supports analysis beyond small motions around hover. Numerical examples include recovery from an initially inverted orientation.

This builds on the principles described in [Attitude Control: Geometry, Topology, and Stability]({{ '/geometric-attitude-control' | relative_url }}), while addressing the additional challenge of underactuation. A globally defined model does not by itself imply global stability; the tracking guarantees depend on the controller and its stated initial-condition assumptions.

## Robustness, adaptation, and control priorities

Practical flight introduces disturbances and imperfect models. The 2013 robust tracking study establishes bounds on tracking errors in the presence of bounded uncertainties [2]. Geometric nonlinear PID control adds integral action with a corresponding stability analysis [3]. These approaches extend the geometric framework while retaining an explicit connection between the controller and the guarantees it provides.

Later work incorporates **neural networks whose parameters adapt online** to compensate for unknown forces and moments in wind [4]. The analysis establishes uniform ultimate boundedness of the tracking errors under the stated assumptions. Indoor experiments include a backflip in unsteady wind, followed by stable hovering.

<div class="post__video">
  <div class="post__video__wrap">
    <iframe src="https://www.youtube.com/embed/a-DG2PcUu7k" title="Geometric adaptive quadrotor control: backflip in wind" loading="lazy" width="640" height="480" frameborder="0" allowfullscreen></iframe>
  </div>
</div>

*Backflip in wind from the experimental study accompanying Bisheban and Lee (2021) [4]. The adaptive neural networks compensate for disturbances within the geometric controller.*

A complementary approach separates control of the **thrust direction** from control of **yaw** [5]. Thrust direction determines translational acceleration, so a large heading error should not unnecessarily interfere with position tracking. The 2022 study develops this decomposition on the sphere and circle, adds adaptive terms, and validates the controller in indoor and outdoor flights.

## A suspended load changes the control problem

Transporting a load requires controlling more than the aircraft's position. Accelerating the vehicle changes the cable direction; the resulting tension accelerates the payload and reacts back on the aircraft. A vehicle can follow its own trajectory while its payload swings substantially.

The 2013 work with Koushil Sreenath and Vijay Kumar connects geometric control with differential flatness for a quadrotor carrying a cable-suspended load [6]. Subsequent work with Farhad Goodarzi and Daewon Lee models a flexible cable as a sequence of connected links [7]. Each link direction lies on a sphere, allowing cable deformation and its interaction with the vehicle to be represented without local-angle singularities. The controller stabilizes the vehicle position while bringing the links toward their vertical equilibrium.

The key modeling principle is to include the load and cable dynamics in the control problem. Their motion is part of the state to be regulated, rather than only an external disturbance acting on the aircraft.

## Several aircraft, one coupled payload

Cooperative transportation adds another layer of interaction: each aircraft influences both the shared payload and the other vehicles through the connecting cables.

The 2016 study develops a geometric model and stabilization controller for a rigid-body payload carried by multiple quadrotors through flexible cables, with each cable represented by serial links [8]. The 2018 study addresses tracking of both the **position and orientation of a rigid-body payload**, using an arbitrary number of quadrotors connected through rigid-link models [9]. Its control design and stability analysis explicitly include the coupled payload, link, and vehicle dynamics, together with modeled uncertainties.

These are related but distinct results: stabilizing a payload with deforming cables and tracking a moving rigid-body payload under a rigid-link model. The 2018 tracking study demonstrates its controller numerically. Together, the works establish a geometric framework for coordinating forces through a shared physical object.

## Payload tracking in flight

The 2020 work with Beomyeol Yu, Kanishke Gamagedara, S. Kim, and Jinyoung Suk extends single-vehicle payload tracking to include the connecting link's mass distribution in the mathematical model and analysis [10]. It also presents a preliminary indoor flight experiment.

The experiment uses a **0.25 kg payload on a 1.11 m link**, with motion capture and onboard estimation supplying state information. The payload follows a figure-eight reference, while the controller coordinates the aircraft and link motion. The preliminary hardware implementation neglects link mass; the full treatment of link mass belongs to the theoretical and numerical portion of the study.

<div class="post__video">
  <div class="post__video__wrap">
    <iframe src="https://www.youtube.com/embed/iOOaV7SKJ1g" title="Geometric control of a quadrotor transporting a payload along a figure-eight trajectory" loading="lazy" width="640" height="480" frameborder="0" allowfullscreen></iframe>
  </div>
</div>

*Payload-transport flight experiment accompanying Yu and colleagues (2020) [10]. The reference trajectory is specified for the suspended payload.*

## A foundation for aerial manipulation

Across these studies, geometry provides a consistent way to represent rotations, thrust directions, and cable motion as the system grows from one vehicle to a coupled transportation mechanism. Stability analysis makes the assumptions and guarantees explicit, while experiments test the methods under sensing, computation, and disturbance conditions encountered in flight.

This foundation supports research toward aerial delivery, cooperative handling, and manipulation in places that are difficult to reach from the ground. Implementations of FDCL's flight-control methods are available in the lab's [geometric UAV control repository](https://github.com/fdcl-gwu/uav_geometric_control).

## References

1. T. Lee, M. Leok, and N. H. McClamroch, “Geometric tracking control of a quadrotor UAV on SE(3),” *Proceedings of the IEEE Conference on Decision and Control*, pp. 5420–5425, 2010. [Paper](https://mathweb.ucsd.edu/~mleok/pdf/LeLeMc2010_quadrotor.pdf).
2. T. Lee, M. Leok, and N. H. McClamroch, “Nonlinear robust tracking control of a quadrotor UAV on SE(3),” *Asian Journal of Control*, 15(2), pp. 391–408, 2013. [Paper](https://doi.org/10.1002/asjc.567).
3. F. Goodarzi, D. Lee, and T. Lee, “Geometric nonlinear PID control of a quadrotor UAV on SE(3),” *Proceedings of the European Control Conference*, pp. 3845–3850, 2013. [Paper](https://doi.org/10.23919/ECC.2013.6669644).
4. M. Bisheban and T. Lee, “Geometric adaptive control with neural networks for a quadrotor in wind fields,” *IEEE Transactions on Control Systems Technology*, 29(4), pp. 1533–1548, 2021. [Paper](https://doi.org/10.1109/TCST.2020.3006184).
5. K. Gamagedara and T. Lee, “Geometric adaptive controls of a quadrotor unmanned aerial vehicle with decoupled attitude dynamics,” *ASME Journal of Dynamic Systems, Measurement, and Control*, 144(3), article 031002, 2022. [Paper](https://doi.org/10.1115/1.4052714).
6. K. Sreenath, T. Lee, and V. Kumar, “Geometric control and differential flatness of a quadrotor UAV with a cable-suspended load,” *Proceedings of the IEEE Conference on Decision and Control*, pp. 2269–2274, 2013. [Paper](https://doi.org/10.1109/CDC.2013.6760219).
7. F. Goodarzi, D. Lee, and T. Lee, “Geometric control of a quadrotor UAV transporting a payload connected via flexible cable,” *International Journal of Control, Automation, and Systems*, 13(6), pp. 1486–1498, 2015. [Paper](https://doi.org/10.1007/s12555-014-0304-0).
8. F. Goodarzi and T. Lee, “Stabilization of a rigid body payload with multiple cooperative quadrotors,” *ASME Journal of Dynamic Systems, Measurement, and Control*, 138(12), article 121001, 2016. [Paper](https://doi.org/10.1115/1.4033945) · [Preprint](https://arxiv.org/abs/1511.02180).
9. T. Lee, “Geometric control of quadrotor UAVs transporting a cable-suspended rigid body,” *IEEE Transactions on Control Systems Technology*, 26(1), pp. 255–264, 2018. [Paper](https://doi.org/10.1109/TCST.2017.2656060).
10. B. Yu, K. Gamagedara, S. Kim, T. Lee, and J. Suk, “Geometric control and experimental validation for a quadrotor UAV transporting a payload,” *Proceedings of the IEEE Conference on Decision and Control*, pp. 201–207, 2020.
