---
title: "This Week I Learned #28"
date: 2020-10-20T01:58+02:00
category: learning
audience: people interested in learning and metacognitive tools
tags:
  - TWIL
draft: false
---
Here are some of the things I learned this week, in the order I’ve noted them down. Starting this week, each item will have its own headline to keep things tidy and easily linkable.

### Prima facie

* A Latin expression that means _on the first impression_ or _on the face of it_ ([wiki](https://en.wikipedia.org/wiki/Prima_facie), via [this article](https://daringfireball.net/2020/10/telegram_apple_belarus) on Daring Fireball).

### Docker, Nginx, and Let's Encrypt

* This weekend I wrote a [tiny](https://github.com/kaishin/posse-server) Express.js app to use as a [POSSE](https://indieweb.org/POSSE) server for this website. After learning the hard way about the difference between [`CMD`](https://docs.docker.com/engine/reference/builder/#cmd) and [`RUN`](https://docs.docker.com/engine/reference/builder/#run) in a Dockerfile, I ran into an issue with my [nginx-proxy](https://github.com/nginx-proxy/nginx-proxy) and Let's Encrypt setup on the VPS. After several hours of poking around, I found an outdated version of [this Docker image](https://github.com/nginx-proxy/docker-letsencrypt-nginx-proxy-companion) to be the culprit, which will make me think twice before version-locking security dependencies like this one.

### The Walrus Operator

* The assignment operator `:=` in Python is called the _walrus operator_. Simply brilliant. I mean, look at it! (via [this episode](https://www.youtube.com/watch?v=nWTvXbQHwWs) of the Lex Fridman podcast).

*[VPS]: Virtual Private Server