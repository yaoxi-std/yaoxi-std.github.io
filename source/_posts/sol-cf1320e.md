---
title: CF1320E Treeland and Viruses 题解
tags: solutions
category: 题解
date: 2021-12-01 21:32:57
---

## CF1320E Treeland and Viruses 题解

~~水黑~~

### 题面

[题目链接](https://www.luogu.com.cn/problem/CF1320E)

### 解法

建虚树，跑$dijkstra$。

~~所以这题为什么能评黑~~

### AC代码

**`nd`数组别开小了，要开$4 \times 10^5$**

```cpp
/**
 * @file:           CF1320E.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/CF1320E
*/
// #pragma GCC optimize ("O2")
#include <bits/stdc++.h>
using namespace std;
#define resetIO(x) \
    freopen(#x ".in", "r", stdin), freopen(#x ".out", "w", stdout)
#define debug(fmt, ...) \
    fprintf(stderr, "[%s:%d] " fmt "\n", __FILE__, __LINE__, ##__VA_ARGS__)
template <class _Tp>
inline _Tp& read(_Tp &x) {
    bool sign = false;
    char ch = getchar();
    long double tmp = 1;
    for (; !isdigit(ch); ch = getchar())
        sign |= (ch == '-');
    for (x = 0; isdigit(ch); ch = getchar())
        x = x * 10 + (ch ^ 48);
    if (ch == '.')
        for (ch = getchar(); isdigit(ch); ch = getchar())
            tmp /= 10.0, x += tmp * (ch ^ 48);
    return sign ? (x = -x) : x;
}
template <class _Tp>
inline void write(_Tp x) {
    if (x < 0)
        putchar('-'), x = -x;
    if (x > 9)
        write(x / 10);
    putchar((x % 10) ^ 48);
}
const int MAXN = 2e5 + 10;
const int MAXM = 4e5 + 10;
const int LOGN = 20;
const int INFI = 0x3f3f3f3f;
struct graph {
    struct edges {
        int u, v, w;
    } edge[MAXM];
    int head[MAXN], nxt[MAXM], tot;
    void clear() {
        tot = 0;
        memset(head, -1, sizeof(head));
    }
    void addedge(int u, int v, int w = 1) {
        edge[tot] = {u, v, w};
        nxt[tot] = head[u];
        head[u] = tot++;
    }
};
struct distant {
    int id, fr, ve, dis; // from, velocity, distance
    int calc() const {
        // ##sb-mistakes## `(0 - 1) / x + 1 == 1`，要特判或者写成`(? + x - 1) / x`
        return (dis + ve - 1) / ve;
    }
    bool operator<(const distant &o) const {
        int cx = calc(), cy = o.calc();
        return cx == cy ? id < o.id : cx < cy;
    }
    bool operator>(const distant &o) const {
        int cx = calc(), cy = o.calc();
        return cx == cy ? id < o.id : cx < cy;
    }
    distant operator+(int x) const {
        return distant{id, fr, ve, dis + x};
    }
};
int n, q, k, m, cnt, idn, id[MAXN], nd[MAXM];
int top, sta[MAXN], dep[MAXN], fa[MAXN][LOGN];
int iv[MAXN], iu[MAXN], is[MAXN];
// ##sb-mistakes## `std::priority_queue`默认是`std::less<_Tp>`，自定义类型要么按照`\gt`的逻辑重载`operator<()`，要么按照`\gt`的逻辑重载`operator>()`并且修改默认参数
priority_queue<pair<distant, int>, vector<pair<distant, int>>, greater<pair<distant, int>>> que;
distant dis[MAXN];
graph tr, vtr;
void build(int u, int f) {
    id[u] = ++idn, fa[u][0] = f, dep[u] = dep[f] + 1;
    for (int i = 1; i < LOGN; ++i)
        fa[u][i] = fa[fa[u][i - 1]][i - 1];
    for (int i = tr.head[u]; ~i; i = tr.nxt[i])
        if (tr.edge[i].v != f)
            build(tr.edge[i].v, u);
}
int lca(int u, int v) {
    if (dep[u] < dep[v])
        swap(u, v);
    int t = dep[u] - dep[v];
    for (int i = LOGN - 1; ~i; --i)
        if ((t >> i) & 1)
            u = fa[u][i];
    if (u == v)
        return u;
    for (int i = LOGN - 1; ~i; --i)
        if (fa[u][i] != fa[v][i])
            u = fa[u][i], v = fa[v][i];
    return fa[u][0];
}
void add_vedge(int u, int v) {
    int w = dep[v] - dep[u];
    vtr.addedge(u, v, w);
    vtr.addedge(v, u, w);
}
void build_vtr() {
    sort(nd + 1, nd + cnt + 1, [](int x, int y) {
        return id[x] < id[y];
    });
    cnt = unique(nd + 1, nd + cnt + 1) - nd - 1;
    sta[top = 1] = 1, vtr.head[1] = -1, vtr.tot = 0;
    for (int i = 1; i <= cnt; ++i) {
        if (nd[i] == 1)
            continue;
        int l = lca(sta[top], nd[i]);
        while (id[l] <= id[sta[top - 1]])
            add_vedge(sta[top - 1], sta[top]), --top;
        if (sta[top] != l)
            vtr.head[l] = -1, add_vedge(l, sta[top]), sta[top] = l;
        vtr.head[nd[i]] = -1, sta[++top] = nd[i];
    }
    for (int i = 1; i < top; ++i)
        add_vedge(sta[i], sta[i + 1]);
}
void clear_dis(int u, int f) {
    dis[u] = {INFI, INFI, 1, INFI};
    for (int i = vtr.head[u]; ~i; i = vtr.nxt[i])
        if (vtr.edge[i].v != f)
            clear_dis(vtr.edge[i].v, u);
}
signed main() {
    read(n);
    tr.clear(), vtr.clear();
    for (int i = 1; i < n; ++i) {
        int u, v;
        read(u), read(v);
        tr.addedge(u, v);
        tr.addedge(v, u);
    }
    build(1, 0);
    read(q);
    while (q--) {
        read(k), read(m), cnt = 0;
        for (int i = 1; i <= k; ++i)
            read(iv[i]), read(is[i]);
        for (int i = 1; i <= m; ++i)
            read(iu[i]);
        for (int i = 1; i <= k; ++i)
            nd[++cnt] = iv[i];
        for (int i = 1; i <= m; ++i)
            nd[++cnt] = iu[i];
        build_vtr(), clear_dis(1, 0);
        while (!que.empty())
            que.pop();
        for (int i = 1; i <= k; ++i) {
            dis[iv[i]] = {i, iv[i], is[i], 0};
            que.push({dis[iv[i]], iv[i]});
        }
        while (!que.empty()) {
            distant d = que.top().first;
            int u = que.top().second;
            que.pop();
            if (dis[u] < d)
                continue;
            for (int i = vtr.head[u]; ~i; i = vtr.nxt[i]) {
                int v = vtr.edge[i].v, w = vtr.edge[i].w;
                if (d + w < dis[v]) {
                    dis[v] = d + w;
                    que.push({dis[v], v});
                }
            }
        }
        for (int i = 1; i <= m; ++i)
            write(dis[iu[i]].id), putchar(" \n"[i == m]);
    }
    return 0;
}
```