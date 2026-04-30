---
layout: post
title: Modular Reinforcement Learning for a Quadrotor UAV
description: This study addresses the limitations of traditional RL approaches for quadrotor control by decomposing the quadrotor dynamics into translational and yaw subsystems, resulting in more efficient training and enhanced yaw control performance.
date: 2025-01-14 15:01:35 +0300
author: ben
image: 'images/posts/ben/main.png'
tags: [Research]
toc: true
---

Imagine a quadrotor drone gliding through complex environments, expertly handling tight corners and sharp turns while maintaining precise control of its *heading*. Achieving this level of dexterity is no small feat, particularly because traditional reinforcement learning (RL)-based control methods often struggle to balance the delicate dynamics of translational and yawing motions. 

> What happens when we give drones a modular brain, designed to focus on specific tasks like balance and direction independently?

## Unlocking the Potential of Modular RL

Traditional RL approaches to controlling quadrotors often rely on an *end-to-end monolithic policy*—a single, unified neural network—designed to manage all aspects of flight dynamics simultaneously. While effective in many cases, these models face challenges when dealing with complex interactions of roll, pitch, and yaw motions. Why? Because rapid yawing motions can destabilize the drone’s other motions, as excessive acceleration/deceleration of quadrotor rotors potentially amplifies the imbalances.

<p align="center">

  <img src="{{ "/images/posts/ben/frameworks.png" | relative_url }}" width="800" />
</p>

Enter **modular reinforcement learning**. By dividing the quadrotor’s dynamics into two distinct parts—translational and yaw subsystems—modular RL allows specialized agents to manage each task independently. This decomposition not only simplifies the learning complexity but also enhances system robustness, as one module can continue operating even if the other encounters difficulties.

## A Look at the Learning Curves

<p align="center">
  <img src="{{ "/images/posts/ben/learning_curve.png" | relative_url }}" width="650" />
</p>

The proposed modular RL policies, namely <span style="color: red;">CMP</span> and <span style="color: blue;">DMP</span>, achieved faster convergence and superior performance compared to their monolithic counterparts, <span style="color: green;">NMP</span>. By focusing on specific subtasks, each agent can optimize its learning for its assigned task, avoiding the complexities and inefficiencies of learning a single, generalized policy.

Additionally, we explored centralized and decentralized inter-module communication between two agents. Centralized coordination allowed agents to share information during training, resulting in improved synergy and higher performance. Decentralized agents, while effective, occasionally faced coordination challenges in high-demand scenarios.


## From Simulation to Sky

<p align="center">
  <img src="{{ "/images/posts/ben/sim2real.png" | relative_url }}" width="700" />
</p>

Training RL agents in simulation is just the beginning; the real flight test comes in deploying them in the physical world. By employing sim-to-real techniques such as domain randomization (introducing variability in simulators) and policy regularization (smoothing control signals), trained RL agents transferred seamlessly from simulation to reality.

In flight tests, our modular framework consistently outperformed traditional monolithic approaches, particularly during aggressive maneuvers requiring high yaw rates. While traditional models struggled to maintain stability at high yaw rates (e.g., 40 deg/s), the modular agents demonstrated remarkable precision and adaptability. Another advantage? If one module needed fine-tuning, it could be adjusted without retraining the entire system, saving time and resources

<p align="center">
  <img src="{{ "/images/posts/ben/flight_traj.png" | relative_url }}" width="800" />
</p>

## What’s Next for Modular RL in Robotics?

Our work marks an important step forward in drone autonomy, but the implications go far beyond quadrotors. From self-driving cars to robotic arms in manufacturing, the modular RL approach promises smarter, more efficient, and more adaptable solutions.

So, next time you see a drone executing a flawless aerial maneuver, remember—it might just have a modular brain guiding its every move.

{: .tip }
For a detailed look at the study, check out the [research publication](https://doi.org/10.1109/LRA.2024.3511412) and explore our [training code](https://github.com/fdcl-gwu/gym-rotor-modularRL).