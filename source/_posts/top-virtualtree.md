---
title: 【专题】虚树
tags: topics
category: 专题
date: 2021-12-17 18:29:26
---

## 【专题】虚树

这种东西想到要用很容易，关键是建完虚树后怎么做。

虚树题的特征为**多次询问且出现$\sum M \le 10^5$一类的数据范围**。

如果题目给出的是一张图而不是一棵树，可以思考是否能够结合圆方树等算法转化为虚树。

对于每次询问，将询问的节点和其在原树上的$LCA$单独建出来$dp$即可。

### 题目

{% post_link 'sol-p2495' 'P2495' %}

{% post_link 'sol-p4606' 'P4606' %}

{% post_link 'sol-p3233' 'P3233' %}

{% post_link 'sol-cf1320e' 'CF1320E' %}

{% post_link 'sol-cf639f' 'CF639F' %}

{% post_link 'sol-loj6184' 'LOJ6184' %}

### 模版代码
```cpp
void build_vtr() {
    sort(s + 1, s + k + 1, [](int x, int y) {
        return id[x] < id[y];
    });
    sta[top = 1] = 1, vtr.head[1] = -1, vtr.tot = 0;
    for (int i = 1; i <= k; ++i) {
        if (s[i] == 1)
            continue;
        int l = lca(sta[top], s[i]);
        if (l < 1 || l > bcc)
            lca(sta[top], s[i]);
        while (id[l] <= id[sta[top - 1]])
            add_vedge(sta[top - 1], sta[top]), --top;
        if (sta[top] != l)
            vtr.head[l] = -1, add_vedge(l, sta[top]), sta[top] = l;
        vtr.head[s[i]] = -1, sta[++top] = s[i];
    }
    for (int i = 1; i < top; ++i)
        add_vedge(sta[i], sta[i + 1]);
}
```