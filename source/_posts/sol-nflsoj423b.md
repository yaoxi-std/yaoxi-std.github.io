---
title: NFLSOJ-423B
tags: solutions
category: 题解
date: 2022-02-06 22:17:35
---

## NFLSOJ-423B
<!-- more -->

### 题面

[题目链接](http://www.nfls.com.cn:20034/contest/423/problem/2)

### 解法

可以先去看{% post_link 'sol-cf986e' '这道题' %}（不看也没关系）。

显然可以$dsu \, on \, tree$一波。

代码通俗易懂，尤其是$dfs$里的几个$getfactor$非常显眼，阅读代码就可以知道$dsu$的逻辑了。

### AC代码

```cpp
/**
 * @file:           NFLSOJ423B.cpp
 * @author:         yaoxi-std
 * @url:            http://www.nfls.com.cn:20034/contest/423/problem/2
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
    double tmp = 1.0;
    for (; !isdigit(ch); ch = getchar())
        sign |= (ch == '-');
    for (x = 0; isdigit(ch); ch = getchar())
        x = x * 10 + (ch ^ 48);
    if (ch == '.')
        for (ch = getchar(); isdigit(ch); ch = getchar())
            tmp /= 10, x += tmp * (ch ^ 48);
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
const int MAXP = 1e6 + 10;
const int MAXL = 1e7 + 10;
const int LOGL = 23;
const int INF = 0x3f3f3f3f3f3f3f3f;
const int MOD = 1e9 + 7;
bool m_be;
int n, q, k, a[MAXN], ans[MAXN];
vector<int> g[MAXN];
int qpow(int x, int y, int p = MOD) {
    int ret = 1;
    for (; y; y >>= 1, x = x * x % p)
        if (y & 1)
            ret = ret * x % p;
    return ret;
}
int cntp, pri[MAXP], fac[MAXL];
bool mark[MAXL];
void getprime(int n) {
    for (int i = 2; i <= n; ++i) {
        if (!mark[i])
            pri[++cntp] = i, fac[i] = cntp;
        for (int j = 1; j <= cntp; ++j) {
            if (i * pri[j] > n)
                break;
            mark[i * pri[j]] = true;
            fac[i * pri[j]] = j;
            if (i % pri[j] == 0)
                break;
        }
    }
}
vector<pair<int, int>> getfactors(int n) {
    vector<pair<int, int>> result;
    while (n > 1) {
        int p = fac[n], t = 0;
        while (n % pri[p] == 0)
            n /= pri[p], ++t;
        result.push_back({p, t});
    }
    return result;
}
struct Query {
    int x, c, i;
};
vector<Query> query[MAXN];
int top, sta[MAXN];
int dfc, dfn[MAXN], idfn[MAXN];
int fa[MAXN], siz[MAXN], dep[MAXN], wson[MAXN];
vector<int> sons[MAXN];
void build(int u, int f) {
    fa[u] = f, siz[u] = 1;
    sta[++top] = u, dep[u] = dep[f] + 1;
    dfn[u] = ++dfc, idfn[dfc] = u;
    if (top > k)
        sons[sta[top - k]].push_back(u);
    for (auto v : g[u]) {
        if (v == f)
            continue;
        build(v, u);
        siz[u] += siz[v];
        if (siz[v] > siz[wson[u]])
            wson[u] = v;
    }
    --top;
}
int num[MAXP][LOGL];
void dfs(int u) {
    for (auto v : g[u]) {
        if (v == fa[u] || v == wson[u])
            continue;
        dfs(v);
        for (int i = dfn[v]; i < dfn[v] + siz[v]; ++i) {
            int x = idfn[i];
            if (dep[x] - dep[u] > k)
                continue;
            for (auto d : getfactors(a[x]))
                --num[d.first][d.second];
        }
    }
    if (wson[u])
        dfs(wson[u]);
    for (auto v : g[u]) {
        if (v == fa[u] || v == wson[u])
            continue;
        for (int i = dfn[v]; i < dfn[v] + siz[v]; ++i) {
            int x = idfn[i];
            if (dep[x] - dep[u] > k)
                continue;
            for (auto d : getfactors(a[x]))
                ++num[d.first][d.second];
        }
    }
    for (auto x : sons[u]) {
        for (auto d : getfactors(a[x]))
            --num[d.first][d.second];
    }
    for (auto d : getfactors(a[u]))
        ++num[d.first][d.second];
    for (auto t : query[u]) {
        ans[t.i] = 1;
        for (auto d : getfactors(t.c)) {
            int sum = 0;
            for (int i = 0; i < d.second; ++i)
                sum += num[d.first][i] * i;
            for (int i = d.second; i < LOGL; ++i)
                sum += num[d.first][i] * d.second;
            (ans[t.i] *= qpow(pri[d.first], sum)) %= MOD;
        }
    }
}
bool m_ed;
signed main() {
    getprime(1e7);
    read(n), read(q), read(k);
    for (int i = 1; i <= n; ++i)
        read(a[i]);
    for (int i = 1; i < n; ++i) {
        int u, v;
        read(u), read(v);
        g[u].push_back(v);
        g[v].push_back(u);
    }
    for (int i = 1; i <= q; ++i) {
        int x, c;
        read(x), read(c);
        query[x].push_back({x, c, i});
    }
    build(1, 0), dfs(1);
    for (int i = 1; i <= q; ++i)
        write(ans[i]), putchar('\n');
    return 0;
}

```