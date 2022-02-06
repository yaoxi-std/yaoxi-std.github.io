---
title: CF986E Prince's Problem
tags: solutions
category: 题解
date: 2022-02-06 21:55:42
---

## CF986E Prince's Problem
<!-- more -->

### 题面

[题目链接](https://www.luogu.com.cn/problem/CF986E)

### 解法

我为何竟第一时间想到树剖？

数据结构题做多了属于是。其实根本没有修改操作要个P的树剖，树上差分不就行了。套路地将$(x,y)$拆分成$\frac{ans(x)\times ans(y)}{ans(lca(x,y))\times ans(fa[lca(x,y)])}$，然后发现可以离线下来一边$dfs$一边搞。

具体地，由于$10^7$以内的质数只有不到$7\times 10^5$个，所以在$dfs$时记录数组$num[p][k]$表示根到当前节点$u$的路径上包含质因子$p$的次数为$k$的节点个数。然后处理询问，显然可以做到在$O(n\log^2n+\omega)$的时间复杂度内完成。

### AC代码

```cpp
/**
 * @file:           CF986E.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/CF986E
*/
// #pragma GCC optimize ("O2")
// #pragma GCC optimize ("Ofast", "inline", "-ffast-math")
// #pragma GCC target ("avx,sse2,sse3,sse4,mmx")
#include <bits/stdc++.h>
using namespace std;
#define int long long
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
const int MAXN = 1e5 + 10;
const int MAXP = 7e5 + 10;
const int MAXL = 1e7 + 10;
const int LOGN = 17;
const int LOGL = 24;
const int INF = 0x3f3f3f3f3f3f3f3f;
const int MOD = 1e9 + 7;
bool m_be;
int n, q, cnt, a[MAXN], ans[MAXN];
vector<int> g[MAXN];
int qpow(int x, int y, int p = MOD) {
    int ret = 1;
    for (; y; y >>= 1, x = x * x % p)
        if (y & 1)
            ret = ret * x % p;
    return ret;
}
int getinv(int x, int p = MOD) {
    return qpow(x, p - 2, p);
}
int cntp, pri[MAXP], fac[MAXL];
bitset<MAXL> mark;
void getprime(int mx) {
    mark = 0;
    for (int i = 2; i <= mx; ++i) {
        if (!mark[i])
            pri[++cntp] = i, fac[i] = cntp;
        for (int j = 1; j <= cntp; ++j) {
            if (i * pri[j] > mx)
                break;
            mark[i * pri[j]] = true;
            fac[i * pri[j]] = j;
            if (i % pri[j] == 0)
                break;
        }
    }
}
vector<pair<int, int>> getfactors(int x) {
    vector<pair<int, int>> result;
    while (x > 1) {
        int p = fac[x], c = 0;
        while (x % pri[p] == 0)
            x /= pri[p], ++c;
        result.push_back({p, c});
    }
    return result;
}
int dfc, dfn[MAXN], dep[MAXN], fa[MAXN][LOGN];
void build(int u, int f) {
    dfn[u] = ++dfc;
    fa[u][0] = f, dep[u] = dep[f] + 1;
    for (int i = 1; i < LOGN; ++i)
        fa[u][i] = fa[fa[u][i - 1]][i - 1];
    for (auto v : g[u]) {
        if (v == f)
            continue;
        build(v, u);
    }
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
struct Query {
    int x, w, i, k;
    bool operator<(const Query& o) const {
        return dfn[x] < dfn[o.x];
    }
} query[MAXN * 4];
int num[MAXP][LOGL];
void dfs(int u, int& cur) {
    for (auto t : getfactors(a[u]))
        ++num[t.first][t.second];
    while (cur <= cnt && dfn[query[cur].x] < dfn[u])
        ++cur;
    while (cur <= cnt && query[cur].x == u) {
        for (auto t : getfactors(query[cur].w)) {
            int sum = 0;
            for (int i = 0; i < t.second; ++i)
                sum += num[t.first][i] * i;
            for (int i = t.second; i < LOGL; ++i)
                sum += num[t.first][i] * t.second;
            if (query[cur].k == 1)
                (ans[query[cur].i] *= qpow(pri[t.first], sum)) %= MOD;
            if (query[cur].k == -1)
                (ans[query[cur].i] *= getinv(qpow(pri[t.first], sum))) %= MOD;
        }
        ++cur;
    }
    for (auto v : g[u]) {
        if (v == fa[u][0])
            continue;
        dfs(v, cur);
    }
    for (auto t : getfactors(a[u]))
        --num[t.first][t.second];
}
bool m_ed;
signed main() {
    debug("Memory used: %.5lfMB.", (&m_ed - &m_be) / 1024.0 / 1024.0);
    getprime(1e7);
    read(n);
    for (int i = 1; i < n; ++i) {
        int u, v;
        read(u), read(v);
        g[u].push_back(v);
        g[v].push_back(u);
    }
    build(1, 0);
    for (int i = 1; i <= n; ++i)
        read(a[i]);
    read(q);
    for (int i = 1; i <= q; ++i) {
        int x, y, w;
        read(x), read(y), read(w);
        int p = lca(x, y);
        query[++cnt] = {x, w, i, 1};
        query[++cnt] = {y, w, i, 1};
        query[++cnt] = {p, w, i, -1};
        query[++cnt] = {fa[p][0], w, i, -1};
    }
    sort(query + 1, query + cnt + 1);
    fill(ans + 1, ans + q + 1, 1);
    dfs(1, *new int(1));
    for (int i = 1; i <= q; ++i)
        write(ans[i]), putchar('\n');
    return 0;
}
```