---
title: NFLSOJ-456C
tags: [solutions, school]
category: 题解
date: 2022-03-04 16:44:22
---

## NFLSOJ-456C
<!-- more -->

### 题面

[题目链接](http://www.nfls.com.cn:20034/contest/456/problem/3) $\bigvee$ [ZJOI2014 星系调查](https://www.luogu.com.cn/problem/P3340)

### 解法

这是一道数学题。

看完题发现是让我们求点到任意一条直线的最小距离平方和。

容易想到点到直线距离公式:

$$
Dis = \cfrac{|Ax_1+By_1+C|}{\sqrt{A^2+B^2}}
$$
$$
Dis^2 = \cfrac{(Ax_1+By_1+C)^2}{A^2+B^2}
$$
那么答案也很容易表示出来:
$$
\begin{aligned}
Ans &= \sum_{i=1}^{m} \frac{(Ax_i+By_i+C)^2}{A^2+B^2} \\
&= \frac{1}{A^2+B^2}\sum_{i=1}^m (Ax_i+By_i+C)^2 \\
&= \frac{1}{A^2+B^2}\sum_{i=1}^m A^2x_i^2+B^2y_i^2+C^2+2ABx_iy_i+2ACx_i+2BCy_i \\
&= \cfrac{1}{A^2+B^2} {\left(A^2\sum_{i=1}^m  x_i^2 + B^2\sum_{i=1}^m y_i^2 + 2AB\sum_{i=1}^m x_iy_i + 2AC\sum_{i=1}^m x_i + 2BC\sum_{i=1}^m y_i + C^2m  \right)} \\
&= \cfrac{A^2\sum x^2 + B^2\sum y^2 + 2AB\sum xy + 2AC\sum x + 2BC\sum y + C^2m}{A^2+B^2} \\
&= \frac{mC^2 + (2A\sum x + 2B\sum y)C + A^2\sum x^2 + B^2\sum y^2 + 2AB\sum xy}{A^2+B^2} \\
\end{aligned} \\
$$
我考场上推到这里，想着用模拟退火退一个 $Ax+By+C=0$ 的函数出来。调了 $40min$ 的参数，最后连小样例都没过去......

发现分子是关于 $C$ 的二次函数，为了让函数取 $\min$，设法将 $C$ 消去，能用 $A$ 和 $B$ 表示:
$$
\begin{aligned}
C&=-\frac{2A\sum x + 2B\sum y}{2m} \\
&= -A\frac{\sum x}{m} -B\frac{\sum y}{m} \\
&= -(A\bar x + B\bar y)
\end{aligned} \\
$$
带回到原式中:
$$
\begin{aligned}
Ans &= \cfrac{(A\bar x + B\bar y)^2m - (2A\sum x + 2B\sum y)(A\bar x + B\bar y) + A^2\sum x^2 + B^2\sum y^2 + 2AB\sum xy}{A^2 + B^2} \\
&= \cfrac{A^2\bar x^2m + B^2\bar y^2m - 2A^2\bar x\sum x - 2B^2\bar y\sum y - 2AB\bar x\sum y - 2AB\bar y\sum x + A^2\sum x^2 + B^2\sum y^2 + 2AB\sum xy}{A^2+B^2} \\
&= \cfrac{A^2(\bar x^2m - 2\bar x\sum x + \sum x^2) + B^2(\bar y^2m - 2\bar y\sum y + \sum y^2) + 2AB(\sum xy - \bar x\sum y - \bar y\sum x)}{A^2+B^2}
\end{aligned}
$$
为了简化下面的计算，设三个辅助变量 $M,N,K$。
$$
\begin{aligned}
M &= \bar x^2m - 2\bar x\sum x + \sum x^2 \\
N &= \bar y^2m - 2\bar y\sum y + \sum y^2 \\
K &= \sum xy - \bar x\sum y - \bar y\sum x
\end{aligned}
$$

$$
Ans = \frac{A^2M + B^2N + 2ABK}{A^2+B^2} 
$$

乘过去
$$
A^2Ans + B^2Ans = A^2M + B^2N + 2ABK
$$
再设一个辅助变量 $k = \frac{A}{B}$，
$$
\begin{aligned}
A^2(M - Ans) + B^2(N - Ans) + 2ABK &= 0 \\
(M - Ans)k^2 + 2Kk + (N - Ans) &= 0 \\
\end{aligned}
$$

$$
\begin{aligned}
\Delta &= 4K^2 - 4(M-Ans)(N-Ans) \\
&= 4K^2 - 4MN + 4(N+M)Ans - 4Ans^2 \\
&= -4Ans^2 + 4(N+M)Ans + 4K^2 - 4MN \\
&\ge 0
\end{aligned}
$$

又是个二次函数，但是$\ge 0$

$$
Ans^2 - (N+M)Ans + MN - K^2 \ge 0 \\
$$
$$
\begin{aligned}
\min(Ans) &= \cfrac{N+M-\sqrt{(N+M)^2 - 4(MN - K^2)}}{2} \\
&= \cfrac{N+M-\sqrt{(N-M)^2 - K^2}}{2}
\end{aligned}
$$

发现设完 $k$ 之后就和使用斜截式推出来基本相同了。

推完式子，这道题的图是个基环树而且不带修，用树上差分和环上差分，维护一下 $x,y,xy,x^2,y^2$ 几个值以及路径长度就可以计算了。

其实可以带修啊，线段树维护环，然后对于每个小子树树剖维护下就行了。

就部分分而言，这道题不是道好题，因为如果没推出来式子就会一分都拿不到，而式子推出来后大部分人都知道该怎么做。

### AC代码

非常好写

```cpp
/**
 * @file:           inv.cpp
 * @author:         yaoxi-std
 * @url:            
*/
// #pragma GCC optimize ("O2")
// #pragma GCC optimize ("Ofast", "inline", "-ffast-math")
// #pragma GCC target ("avx,sse2,sse3,sse4,mmx")
#include <bits/stdc++.h>
using namespace std;
#define resetIO(x) \
    freopen(#x ".in", "r", stdin), freopen(#x ".out", "w", stdout)
#define debug(fmt, ...) \
    fprintf(stderr, "[%s:%d] " fmt "\n", __FILE__, __LINE__, ##__VA_ARGS__)
template <class _Tp>
inline _Tp& read(_Tp& x) {
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
bool m_be;
using ll = long long;
const int MAXN = 1e5 + 10;
const int LOGN = 19;
const int INF = 0x3f3f3f3f;
struct Node {
    int x2, y2, xy, x, y, p;
    void get(int _x, int _y) {
        x2 = _x * _x, y2 = _y * _y, xy = _x * _y, x = _x, y = _y, p = 1;
    }
    Node operator+(const Node& o) const {
        return { x2 + o.x2, y2 + o.y2, xy + o.xy, x + o.x, y + o.y, p + o.p };
    }
    Node operator-(const Node& o) const {
        return { x2 - o.x2, y2 - o.y2, xy - o.xy, x - o.x, y - o.y, p - o.p };
    }
} xp[MAXN], circ[MAXN], tree[MAXN];
int n, m, q, idc, deg[MAXN], root[MAXN], sfa[MAXN];
int dep[MAXN], fa[MAXN][LOGN];
vector<int> g[MAXN];
void build(int u, int f, int sf) {
    fa[u][0] = f, sfa[u] = sf, dep[u] = dep[f] + 1;
    tree[u] = tree[f] + xp[u];
    for (int i = 1; i < LOGN; ++i) fa[u][i] = fa[fa[u][i - 1]][i - 1];
    for (auto v : g[u]) {
        if (v == f || dep[v]) continue;
        build(v, u, sf);
    }
}
int lca(int u, int v) {
    assert(sfa[u] == sfa[v]);
    if (dep[u] < dep[v]) swap(u, v);
    int t = dep[u] - dep[v];
    for (int i = LOGN - 1; ~i; --i) if ((t >> i) & 1) u = fa[u][i];
    if (u == v) return u;
    for (int i = LOGN - 1; ~i; --i) if (fa[u][i] != fa[v][i]) u = fa[u][i], v = fa[v][i];
    return fa[u][0];
}
double calcmin(Node nd) {
    double avgx = (double)nd.x / nd.p;
    double avgy = (double)nd.y / nd.p;
    double A = nd.p * avgx * avgx - 2 * avgx * nd.x + nd.x2;
    double B = 2 * avgx * nd.y + 2 * avgy * nd.x - 2 * avgx * avgy * nd.p - 2.0 * nd.xy;
    double C = nd.p * avgy * avgy - 2 * avgy * nd.y + nd.y2;
    double Delta = (A - C) * (A - C) + B * B;
    double Ans = (A + C - sqrt(Delta)) / 2;
    return Ans;
}
bool m_ed;
signed main() {
    resetIO(inv);
    debug("Mem %.5lfMB.", fabs(&m_ed - &m_be) / 1024 / 1024);
    read(n), read(m);
    for (int i = 1; i <= n; ++i) {
        int x, y; read(x), read(y); xp[i].get(x, y);
    }
    for (int i = 1; i <= m; ++i) {
        int u, v; read(u), read(v); ++deg[u], ++deg[v];
        g[u].push_back(v), g[v].push_back(u);
    }
    if (m == n - 1) {
        root[++idc] = 1;
        for (int i = 1; i <= n; ++i) sfa[i] = idc;
    } else {
        queue<int> que;
        for (int i = 1; i <= n; ++i) if (deg[i] == 1) que.push(i);
        while (que.size()) {
            int u = que.front(); que.pop();
            for (auto v : g[u]) if (--deg[v] == 1) que.push(v);
        }
        int cur = 0, pre = 0;
        for (int i = 1; i <= n; ++i) if (deg[i] == 2) cur = i;
        do {
            root[++idc] = cur;
            for (auto v : g[cur])
                if (v != pre && deg[v] == 2) {
                    pre = cur, cur = v;
                    break;
                }
        } while (cur != root[1]);
    }
    for (int i = 1; i <= idc; ++i) dep[root[i]] = 1;
    for (int i = 1; i <= idc; ++i) circ[i] = circ[i - 1] + xp[root[i]];
    for (int i = 1; i <= idc; ++i) build(root[i], 0, i);
    read(q);
    while (q--) {
        int u, v; read(u), read(v);
        double ans = 1e18;
        if (sfa[u] == sfa[v]) {
            int t = lca(u, v), f = fa[t][0];
            Node nd = tree[u] + tree[v] - tree[t] - tree[f];
            ans = calcmin(nd);
        } else {
            Node nd1 = tree[u] + tree[v], nd2 = nd1;
            if (sfa[u] > sfa[v]) swap(u, v);
            nd1 = nd1 + circ[sfa[v] - 1] - circ[sfa[u]];
            nd2 = nd2 + circ[idc] - circ[sfa[v]] + circ[sfa[u] - 1];
            ans = min(calcmin(nd1), calcmin(nd2));
        }
        printf("%.5lf\n", ans);
    }
    return 0;
}
```

