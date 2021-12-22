---
title: 【专题】网络流
tags: topics
category: 专题
date: 2021-12-17 18:28:54
---

## 【专题】网络流

网络流的话，先口糊好怎么建图，然后~~复制~~默写一下板子就好了。

~~其实网络流24题的全称叫网络流和线性规划24题？~~


### 费用流需要注意的地方

1. 费用流建反边的$cost$是原来的$cost$的**相反数**，即需要`add(u, v, c, f), add(v, u, -c, 0);`
2. 计算流量的方式和普通网络流相同，但是计算总$cost$是每次加上`edge.cost * flow`，**不要忘记乘上$cost$**，用全局变量存$cost$会好写一些。
3. 由于费用流的边权可能$\le 0$，所以**必须**用$spfa$而无法使用$dijkstra$，并且$dfs$**增广时必须开$vis$数组防止无限递归**。
4. （这应该算是个小$tip$）网络流$tot$一开始清空成$1$可以不需要再调用`init`函数，也不需要再把$head$清空成$-1$。

### 流模型
{% post_link 'sol-p2756' 'P2756' %}
{% post_link 'sol-p4016' 'P4016' %}
{% post_link 'sol-p1251' 'P1251' %}
{% post_link 'sol-p2754' 'P2754' %}

### 割模型
{% post_link 'sol-p2762' 'P2762' %}

### 非模型
{% post_link 'sol-p2761' 'P2761' %}
{% post_link 'sol-p4011' 'P4011' %}

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
        memset(lev, -1, sizeof(lev));
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
            memcpy(cur, head, sizeof(cur));
            flow += augment(s, t, INF);
        }
        return flow;
    }
};
```

#### 费用流(dinic)

```cpp
struct Dinic {
    struct Edge {
        int v, cost, flow;
    } edge[MAXM];
    int tot = 1, cost = 0, flow = 0;
    int head[MAXN], nxt[MAXM], dis[MAXN], cur[MAXN];
    bool vis[MAXN];
    void addedge(int u, int v, int cost, int flow) {
        edge[++tot] = {v, cost, flow};
        nxt[tot] = head[u], head[u] = tot;
        edge[++tot] = {u, -cost, 0};
        nxt[tot] = head[v], head[v] = tot;
    }
    bool spfa(int s, int t) {
        memset(vis, 0, sizeof(vis));
        memset(dis, 0x3f, sizeof(dis));
        queue<int> que;
        que.push(s);
        dis[s] = 0, vis[s] = true;
        while (!que.empty()) {
            int u = que.front();
            que.pop(), vis[u] = false;
            for (int i = head[u]; i; i = nxt[i]) {
                int v = edge[i].v;
                if (edge[i].flow && dis[v] > dis[u] + edge[i].cost) {
                    dis[v] = dis[u] + edge[i].cost;
                    if (!vis[v]) {
                        que.push(v);
                        vis[v] = true;
                    }
                }
            }
        }
        return dis[t] != INF;
    }
    int augment(int u, int t, int mx) {
        if (u == t || mx == 0)
            return mx;
        vis[u] = true;
        int ret = 0;
        for (int &i = cur[u]; i; i = nxt[i]) {
            int v = edge[i].v;
            if (vis[v] || dis[u] + edge[i].cost != dis[v])
                continue;
            int tmp = augment(v, t, min(mx, edge[i].flow));
            mx -= tmp, ret += tmp;
            edge[i].flow -= tmp, edge[i ^ 1].flow += tmp;
            cost += edge[i].cost * tmp;
            if (mx == 0)
                break;
        }
        vis[u] = false;
        return ret;
    }
    void mcmf(int s, int t) {
        while (spfa(s, t)) {
            memcpy(cur, head, sizeof(cur));
            flow += augment(s, t, INF);
        }
    }
};
```