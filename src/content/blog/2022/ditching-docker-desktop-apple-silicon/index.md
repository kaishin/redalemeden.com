---
pubDate: May 2 2022
title: "Ditching Docker Desktop on Apple Silicon"
audience: "Docker and Apple silicon Mac users"
tags:
  - Guide
  - macOS
image: docker-whale.jpg
---

![Whale](./header-image.jpg)

When I got my first M1 MacBook Pro last year and started setting it up, I
 decided to not bring over Docker Desktop. For starters, the dashboard UI is
 wonky and had always put me off whenever I used it. Performance was nothing to
write home about either. But the straw that broke the camel back so to speak was
the licensing changes that denoted a clear shift in the company’s focus and
target audience.

Docker Desktop is collection of tools bundled in a single app: Engine, CLI,
Compose, Build, Content Trust, Scan, Kubernetes, and Credential Helper. Lucky
for me, my use case is relatively simple—I mostly rely on Docker to run half a
dozen databases locally. This means that I only need a subset of features that
Docker Desktop ships with.

As I started looking for alternatives, I was pleasantly surprised by how vibrant
the containerization space is—there is no shortage of options with different
interfaces and levels of control. On the requirement front, I mostly focused on
compatibility with [`docker-compose`](https://docs.docker.com/compose/). Here
are some of the alternatives I came across:

- [Multipass](https://multipass.run): Spins up an Ubuntu virtual machine using
  [HyperKit](https://minikube.sigs.k8s.io/docs/drivers/hyperkit/) (which in turn
  is built on top of the first-party [Hypervisor
  framework](https://developer.apple.com/documentation/hypervisor)). The folks
  at Ubuntu even introduced [a single-command
  workflow](https://ubuntu.com/blog/docker-on-mac-and-windows-multipass) for
  setting up a Docker environment on any machine, including macOS. For a more
  complete guide on how to set this up, check out [this
  guide](https://www.mybyways.com/blog/multipass-for-docker-containers-on-macos)
  by C.Y. Wong.

- [Minikube](https://minikube.sigs.k8s.io/docs/start/): The official way to run
  Kubernetes locally on macOS through the Hypervisor framework.  Supports Docker
  out of the box. The only gotcha is that you can’t use `docker-compose` and you
  need to migrate to Kubernetes manifest files.

- [Podman](https://podman.io) via [QEMU](https://www.qemu.org): A container
  engine compatible with `docker-compose` and other Docker APIs. Since it
  requires a virtual machine to run on top of on non-Linux OS'es, you can set up
  [podman-machine](https://docs.podman.io/en/latest/markdown/podman-machine.1.html)
  to work via QEMU following [this
  guide](https://blog.cloudassembler.com/post/podman-machine-mac-m1/). A bit too
  finicky for my taste, so I skipped trying this one out.

- [Rancher Desktop](https://rancherdesktop.io): A multi-platform electron app
  that takes care of running Kubernetes and Docker for you. Supports
  `docker-compose` .

- [Lima](https://github.com/lima-vm/lima): Spins up Linux VMs with automatic
  file sharing and port-forwarding. Uses [containerd](https://containerd.io/) as
  a container runtime. Runs on QEMU and Hypervisor like many other solutions
  above. To use it as replacement for Docker Desktop you need to follow some
  manual steps as [this
  guide](https://naomiaro.hashnode.dev/replacing-docker-desktop-with-lima-on-mac-os)
  outlines.

- [Colima](https://github.com/abiosoft/colima): Uses Lima under the hood, but
  forgoes the additional setup needed as it comes pre-configured for running
  Docker and optionally Kubernetes.

- And [many](https://k3d.io/v5.4.1/) [others](https://kind.sigs.k8s.io) that I
  didn’t bother looking into.

I tried most of the approaches above and landed on using Colima; by far the
leanest and most hassle-free alternative for my use case.

## Setting up Colima

The README of the project should be more than enough, but here is a rundown of
the steps I took to get it up and running.

I first had to install Colima and other Docker components to get started.

```sh
brew install colima docker docker-compose
```

As part of the installation, Colima sets up shell completion, but there is also
a dedicated command to do that later:

```sh
colima completion bash #fish, zsh, etc.
```

By default Colima seems to mount the entire user directory, but I’d rather mount
specific folders instead. I had previously created a `~/Volumes`  folder that I
use for various VM volume needs, so I mounted it as a read-write volume using
the following command:

```sh
colima start --mount ~/Volumes:w
```

And that’s it!

Now I have access to all the Docker CLI commands right from the macOS
shell—Colima already took care of setting up the Docker daemons and forwarding
the right ports to the host.

```sh
docker ps
docker-compose up -d
```

If your machine is resource constrained, you can temporarily stop the Colima VM
by running `colima stop`. To start it again, just run the same `start` command
above.

I have used this setup for almost a year now and I am quite the happy camper. I
sort of miss some aspects of the GUI dashboard, but they're nothing a
[SwiftBar](https://github.com/swiftbar/SwiftBar) plugin can't solve—hopefully I
can share more about that in a later post.

Have you used any of the alternatives above? What was your experience? Don't
hesitate to chime in via
[Mastodon](https://mastodon.social/web/@redalemeden/108245594126322878) or
[Twitter](https://twitter.com/kaishin/status/1521951812986810371)!
