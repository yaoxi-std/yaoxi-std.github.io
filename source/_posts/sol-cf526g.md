---
title: CF526G Spiders Evil Plan 题解
tags: solutions
category: 题解
date: 2021-12-04 20:12:10
---

## CF526G Spiders Evil Plan 题解
<!-- more -->

### 题面

[题目链接](https://www.luogu.com.cn/problem/CF526G)

### 解法

有意思，很有意思。

首先我们暂时忽略路径必须经过$x$的限制进行思考。容易想到最长的一条路径是树的直径，且其他路径都是一个叶子到另一个叶子的类型，接着发现如果路径必须经过$x$也需要保证最长路径经过直径的其中一个端点（显然最优）。于是想到以直径两个端点为根分别建一棵树，分别求根经过$x$到一个叶子结点的最长路径后$\max$，可通过$y=1$。

将每条路径拆分为$2$个叶子结点的路径。如果无需经过节点$x$，那么除去到根的路径之外还需要取出$2y-1$个叶子结点路径。然后需要用到一个**长链剖分**小$trick$（也是这题最妙的地方），对于每条长链，定义其带权长度为**链头的父节点到链尾的距离**，即`sdep[u] - sdep[fa[top[u]]]`，可以证明**更长的链一定会比更短的链先被取到，且贡献即为链的带权长度**。于是取出树上的所有长链并从大到小排序，取得前$2y-1$个带权长度之和即为不经过$x$的$y$个最长路径长度之和。

![](sol-cf526g-tree1.png)

如图所示的一棵树，黑色边为其直径，将其**按边权**长链剖分后得到几条链，显然要先取黑色链，再按顺序取蓝色、粉色和橙色链，而每加入一条链后对答案的贡献就是链的带权长度。

现在考虑必须经过$x$的取法。分为两种情况，若前$2y-1$条链经过$x$直接取前缀和计算（至于如何判断可使用树上$dp$维护子树内叶子节点所在链的最靠前排名）。否则我们要找到第$1$到$2y-1$中的一条链（假定为$k$），将其移除并加入经过$x$的最长链。

查找并删除一条链时，仍可以分两种情况。若第$k$条链的$top_k$不是$x$的祖先，则其删除的代价为$len_k$，显然$k=2y-1$时最优。另一种$top_k$为$x$的祖先，从$u$往上倍增找到第一条$k\le 2y-1$的链，其叶子结点与$x$的$lca$为$s$，删除的代价为$sdep_k - dep_s$，二者取$\min$即可。

时间复杂度$O((n+q)\log n)$。

### AC代码

```cpp
/**
 * @file:           CF526G.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/CF526G
*/
// #pragma GCC optimize ("O2")
#include <bits/stdc++.h>
using namespace std;
#define int long long
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
const int MAXN = 1e5 + 10;
const int MAXM = 2e5 + 10;
const int LOGN = 18;
const int INFL = 0x3f3f3f3f3f3f3f3f;
struct tree {
    struct edges {
        int u, v, w;
    } edge[MAXM];
    int n, rt, head[MAXN], nxt[MAXM], tot;
    void clear(int _n) {
        this->n = _n;
        rt = tot = 0;
        memset(head, -1, sizeof(head));
    }
    void addedge(int u, int v, int w) {
        edge[tot] = {u, v, w};
        nxt[tot] = head[u];
        head[u] = tot++; 
    }
     
    int dis[MAXN], pre[MAXN];
    int maxdis(int u, int f, int d) {
        dis[u] = d, pre[u] = u;
        for (int i = head[u]; ~i; i = nxt[i]) {
            int v = edge[i].v, w = edge[i].w;
            if (v != f && dis[maxdis(v, u, d + w)] > dis[pre[u]])
                pre[u] = pre[v];
        }
        return pre[u];
    }
     
    int dfc, sfa[MAXN], dfn[MAXN], len[MAXN], wson[MAXN];
    int dep[MAXN], sdep[MAXN], fa[MAXN][LOGN];
    void build1(int u, int f) {
        len[u] = wson[u] = 0, fa[u][0] = f;
        for (int i = 1; i < LOGN; ++i)
            fa[u][i] = fa[fa[u][i - 1]][i - 1];
        for (int i = head[u]; ~i; i = nxt[i]) {
            int v = edge[i].v, w = edge[i].w;
            if (v != f) {
                dep[v] = dep[u] + 1;
                sdep[v] = sdep[u] + w;
                build1(v, u);
                if (len[v] + w > len[u])
                    len[u] = len[v] + w, wson[u] = v;
            }
        }
    }
    void build2(int u, int sf) {
        sfa[u] = sf, dfn[u] = ++dfc;
        if (wson[u])
            build2(wson[u], sf);
        for (int i = head[u]; ~i; i = nxt[i]) {
            int v = edge[i].v;
            if (v != fa[u][0] && v != wson[u])
                build2(v, v);
        }
    }
     
    int dp[MAXN], rnk[MAXN];
    void dfs(int u, int f) {
        dp[u] = rnk[u] ? rnk[u] : INFL;
        for (int i = head[u]; ~i; i = nxt[i]) {
            int v = edge[i].v;
            if (v != f) {
                dfs(v, u);
                dp[u] = min(dp[u], dp[v]);
            }
        }
    }
    int getlca(int u, int k) {
        for (int i = LOGN - 1; ~i; --i)
            if (dp[fa[u][i]] > k)
                u = fa[u][i];
        return fa[u][0];
    }
     
    int lef, id[MAXN], sum[MAXN * 2];
    pair<int, int> leaf[MAXN];
    void init(int _rt) {
        this->rt = _rt, lef = 0;
        build1(rt, 0), build2(rt, rt);
        for (int i = 1; i <= n; ++i)
            if (!wson[i])
                leaf[++lef] = {sdep[i] - sdep[fa[sfa[i]][0]], i};
        sort(leaf + 1, leaf + lef + 1, greater<pair<int, int>>());
        for (int i = 1; i <= lef; ++i)
            rnk[leaf[i].second] = i;
        for (int i = 1; i <= lef; ++i)
            id[i] = leaf[i].second;
        for (int i = 1; i <= n; ++i)
            sum[i] = sum[i - 1] + leaf[i].first;
        for (int i = 1; i <= n; ++i)
            sum[i + n] = sum[i + n - 1];
        dfs(rt, 0);
    }
    int solve(int x, int y) {
        int k = 2 * y - 1;
        if (dp[x] <= k)
            return sum[k];
        int s = getlca(x, k);
        return sum[k] + sdep[id[dp[x]]] - sdep[s] - min(leaf[k].first, sdep[id[dp[s]]] - sdep[s]);
    }
} tr1, tr2;
int n, q;
signed main() {
    read(n), read(q);
    tr1.clear(n), tr2.clear(n);
    for (int i = 1; i < n; ++i) {
        int u, v, w;
        read(u), read(v), read(w);
        tr1.addedge(u, v, w);
        tr1.addedge(v, u, w);
        tr2.addedge(u, v, w);
        tr2.addedge(v, u, w);
    }
    int rt1 = tr1.maxdis(1, 0, 0);
    int rt2 = tr1.maxdis(rt1, 0, 0);
    tr1.init(rt1), tr2.init(rt2);
    int lastans = 0;
    while (q--) {
        int x, y;
        read(x), read(y);
        x = (x + lastans - 1) % n + 1;
        y = (y + lastans - 1) % n + 1;
        lastans = max(tr1.solve(x, y), tr2.solve(x, y));
        write(lastans), putchar('\n');
    }
    return 0;
}
```