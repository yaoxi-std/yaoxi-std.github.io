---
title: 【专题】网络流
tags: topics
category: 专题
date: 2021-12-17 18:28:54
---

## 【专题】网络流

网络流的话，先口糊好怎么建图，然后~~复制~~默写一下板子就好了。

难点其实有两个，一个是如何建图，另一个是输出路径。

如果一道题有许多奇怪的限制，并且$n$和$m$很小，导致$O(n^2m)$可以通过，就可以往网络流方面去想。

~~其实网络流24题的全称叫网络流和线性规划24题？~~

### 费用流需要注意的地方

1. 费用流建反边的$cost$是原来的$cost$的**相反数**，即需要`add(u, v, c, f), add(v, u, -c, 0);`
2. 计算流量的方式和普通网络流相同，但是计算总$cost$是每次加上`edge.cost * flow`，**不要忘记乘上$cost$**，用全局变量存$cost$会好写一些。
3. 由于费用流的边权可能$\le 0$，所以**必须**用$spfa$而无法使用$dijkstra$，并且$dfs$**增广时必须开$vis$数组防止无限递归**。
4. （这应该算是个小$tip$）网络流$tot$一开始清空成$1$可以不需要再调用`init`函数，也不需要再把$head$清空成$-1$。

### 流模型
{% post_link 'sol-p2756' %} </br>

{% post_link 'sol-p4016' %} </br>

{% post_link 'sol-p1251' %} </br>

{% post_link 'sol-p2754' %} </br>

{% post_link 'sol-p2763' %} </br>

{% post_link 'sol-p2764' %} </br>

{% post_link 'sol-p2765' %} </br>

{% post_link 'sol-p2766' %} </br>

{% post_link 'sol-p2770' %}

### 割模型
{% post_link 'sol-p2762' %}

### 非模型
{% post_link 'sol-p2761' %} </br>

{% post_link 'sol-p4011' %}

### 模版代码

#### 网络流(dinic)

```cpp
struct Dinic {
    struct Edge {
        int v, flow;
    } edge[MAXM];
    int tot = 1, flow = 0;
    int head[MAXN], nxt[MAXM], lev[MAXN], cur[MAXN];
    void addedge(int u, int v, int flow) {
        edge[++tot] = {v, flow};
        nxt[tot] = head[u], head[u] = tot;
        edge[++tot] = {u, 0};
        nxt[tot] = head[v], head[v] = tot;
    }
    bool bfs(int s, int t) {
        fill(lev, lev + MAXN, -1);
        queue<int> que;
        que.push(s);
        lev[s] = 0;
        while (!que.empty()) {
            int u = que.front();
            que.pop();
            for (int i = head[u]; i; i = nxt[i]) {
                int v = edge[i].v;
                if (edge[i].flow && lev[v] == -1) {
                    lev[v] = lev[u] + 1;
                    que.push(v);
                }
            }
        }
        return lev[t] != -1;
    }
    int augment(int u, int t, int mx) {
        if (u == t || mx == 0)
            return mx;
        int ret = 0;
        for (int &i = cur[u]; i; i = nxt[i]) {
            int v = edge[i].v;
            if (lev[v] != lev[u] + 1)
                continue;
            int tmp = augment(v, t, min(mx, edge[i].flow));
            mx -= tmp, ret += tmp;
            edge[i].flow -= tmp, edge[i ^ 1].flow += tmp;
            if (mx == 0)
                break;
        }
        return ret;
    }
    int maxflow(int s, int t) {
        while (bfs(s, t)) {
            copy(head, head + MAXN, cur);
            flow += augment(s, t, INF);
        }
        return flow;
    }
};
```

#### 最小费用最大流(dinic)

```cpp
struct Dinic {
    struct Edge {
        int v, flow, cost;
    } edge[MAXM];
    int tot = 1, flow = 0, cost = 0;
    int head[MAXN], nxt[MAXM], dis[MAXN], cur[MAXN];
    bool vis[MAXN];
    void addedge(int u, int v, int flow, int cost) {
        edge[++tot] = {v, flow, cost};
        nxt[tot] = head[u], head[u] = tot;
        edge[++tot] = {u, 0, -cost};
        nxt[tot] = head[v], head[v] = tot;
    }
    bool spfa(int s, int t) {
        fill(vis, vis + MAXN, 0);
        fill(dis, dis + MAXN, INF);
        queue<int> que;
        que.push(s);
        dis[s] = 0, vis[s] = 1;
        while (!que.empty()) {
            int u = que.front();
            que.pop(), vis[u] = 0;
            for (int i = head[u]; i; i = nxt[i]) {
                int v = edge[i].v;
                if (edge[i].flow && dis[v] > dis[u] + edge[i].cost) {
                    dis[v] = dis[u] + edge[i].cost;
                    if (!vis[v])
                        que.push(v), vis[v] = 1;
                }
            }
        }
        return dis[t] != INF;
    }
    int augment(int u, int t, int mx) {
        if (u == t || mx == 0)
            return mx;
        vis[u] = 1;
        int ret = 0;
        for (int &i = cur[u]; i; i = nxt[i]) {
            int v = edge[i].v;
            if (vis[v] || dis[v] != dis[u] + edge[i].cost)
                continue;
            int tmp = augment(v, t, min(mx, edge[i].flow));
            cost += tmp * edge[i].cost;
            mx -= tmp, ret += tmp;
            edge[i].flow -= tmp, edge[i ^ 1].flow += tmp;
            if (mx == 0)
                break;
        }
        vis[u] = 0;
        return ret;
    }
    int mcmf(int s, int t) {
        while (spfa(s, t)) {
            copy(head, head + MAXN, cur);
            flow += augment(s, t, INF);
        }
        return flow;
    }
};
```