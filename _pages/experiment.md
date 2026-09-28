---
layout: page
title: Experiments
description: From mathematical foundations to autonomous flight.
permalink: /experiment/
toc: false
---

We test geometric control, estimation, and learning algorithms through indoor, outdoor, and shipboard flight experiments. Our flight hardware and software developed in-house provide direct access to sensing, onboard computation, and control, allowing new methods to be evaluated under real disturbances, measurement uncertainty, and computational constraints.

![Quadrotor during an indoor payload-transport flight experiment]({{ '/images/quad_payload.png' | relative_url }}#wide)
*Indoor flight testing in the lab's netted motion-capture space.*

## Selected experiments

These demonstrations connect the methods described on our [Research page]({{ '/research/' | relative_url }}) to physical systems. Each highlights a different challenge in control, learning, or navigation.

### Agile flight and learning

Large rotations, wind disturbances, and coupled vehicle–pendulum motion test how geometric controllers and learned policies perform beyond nominal flight conditions.

{% include experiment-videos.html group="agile" %}

### Aerial transportation

Transporting a suspended load couples the motion of the aircraft, cable, and payload. These experiments test how controllers coordinate that motion while tracking a desired trajectory.

{% include experiment-videos.html group="transport" %}

### Perception and navigation

Autonomous navigation depends on useful state estimates despite incomplete observations, sensor delays, and moving surroundings. These demonstrations include indoor maritime emulation, shipboard flight, and aerial and ground exploration.

{% include experiment-videos.html group="perception" %}

## Facilities and platforms

### Flight spaces and motion capture

- A 40 ft × 20 ft netted indoor flight space with 12 Vicon Valkyrie motion-capture cameras.
- A 20 ft × 20 ft netted outdoor flight space.

### Onboard sensing and computation

- Flight hardware based on NVIDIA Jetson modules, including Orin.
- RTK GPS localization.
- Flight software developed in C++ and Python, with ROS integration.

### Computing infrastructure

- A GPU server with two NVIDIA A100 80 GB GPUs and one NVIDIA A100 40 GB GPU.

## Open-source software

We share selected control and simulation tools through the [FDCL GitHub organization](https://github.com/fdcl-gwu), supporting implementation and further development of the methods used in our research.

- [Geometric UAV Control](https://github.com/fdcl-gwu/uav_geometric_control): implementations of geometric quadrotor controllers in C++, Python, and MATLAB, including standard and decoupled-yaw formulations.
- [UAV Simulator](https://github.com/fdcl-gwu/uav_simulator): a Python, ROS, and Gazebo simulation environment for a UAV with geometric control.
