---
title: 一些tips
date: 2021-11-20 19:35:30
tags: important
top: 1450
comments: false
---

## Tips
 - AC自动机build以后可以先把cnt数组预处理出来，这样就不用每次都跳fail指针了（也不知道算卡常还是说不预处理复杂度就不对，反正我的{% post_link 'sol-cf710f' 'CF710F' %}就是加了这个优化才过了的）(2021.11.22, CF710F)
 - 计算树上最长路径和可以用**{% post_link 'sol-cf526g' '长链剖分的奇妙性质' %}**来维护 (2021.12.4, CF526G)
 - **不要**用变量`M_PI`!!! **要**用`acos(-1)`!!! (2021.12.5, P4245)