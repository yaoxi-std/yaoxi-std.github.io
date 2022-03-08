---
title: sol-nflsoj462b
tags: [solutions, school]
category: 题解
date: 2022-03-08 16:02:24
---

## NFLSOJ-462B
<!-- more -->

### 题面

[题目链接](http://www.nfls.com.cn:20034/contest/462/problem/2)

### 解法

**注意：这不是常规的题解，此题解的写法常数极大，优点是不需要分类讨论**

容易发现每次 $c+1$ 后，$mex$ 最多 $+1$，所以很显然每次询问暴力在上次答案基础上 $+1$ 再判断的复杂度是 $O(n)$ 的。

关键点在于如何判断是否可行。假设我们要判断 $x$ 是否可以成为 $mex$，这等价于判断是否有一条链包含区间 $[0,x)$ 的数且不包含 $x$。暴力的写法是从 $a_u = x$ 处将树断开，$dfs$ 得到是否能将 $[0,x)$ 放在同一条链，这种写法是 $O(n^2)$ 的，可获得 $50pts$。

对于正解，首先将区间 $[0,x)$ 划分为在原来权值上的两个区间 $[l_1,r_1]\bigcup[l_2,r_2]$。下文中为了方便表述，用原区间 $[0,x)$ 表示。

既然我们要抽出 $[0,x)$ 所在的链，有没有更好的方法将链抽出来呢？首先一定是找到链中点的 $lca$。维护一个 $ST$ 表，可以在 $O(\log n)$ 或 $O(1)$（使用欧拉序 $lca$）的时间复杂度内求出区间 $[l,r]$ 的 $lca$。

求出 $lca$ 后，如何找到链尾呢？我们不妨使用 $dfs$ 序。维护两个 $dfs$ 序，$dfn1$ 表示在遍历每个子树时**从左到右**进行递归的 $dfn$，$dfn2$ 表示在遍历每个子树时**从右到左**进行递归。这样一来，区间 $[l,r]$ 中 $dfn1$ 最大的点就是右链中最深的点，$dfn2$ 最大的点就是左链中最深的点。再写 $2$ 个 $ST$ 表维护即可 $O(1)$ 查询。

这样一来，我们就找到了链的 $lca$ 记为 $t$，左链和右链链尾分别记为 $u$ 和 $v$。特判一下当 $u=v$ 时，这时的链只有一条，那么让 $u:=t$，这时候判一下 $lca(u,v)=t$ 以保证链的形态合法。

最后还需要判断 $[0,x)$ 中所有的数是否都在链上且 $x$ 要求不在链上。可以预处理出一棵树上主席树，在 $O(\log n)$ 的时间复杂度内进行判断。

综上所述，此算法的总复杂度为 $O(n \log n)$。常数极大以至于需要卡卡常才能过。

### AC代码

为了卡常，需要使用 $fread$ 和 $fwrite$。

```cpp
/**
 * @file:           mex.cpp
 * @author:         yaoxi-std
 * @url:            
*/
#pragma GCC optimize ("O2")
#pragma GCC optimize ("Ofast", "inline", "-ffast-math")
#pragma GCC target ("avx,sse2,sse3,sse4,mmx")
#include <bits/stdc++.h>
using namespace std;
#define resetIO(x) \
    freopen(#x ".in", "r", stdin), freopen(#x ".out", "w", stdout)
#define debug(fmt, ...) \
    fprintf(stderr, "[%s:%d] " fmt "\n", __FILE__, __LINE__, ##__VA_ARGS__)
namespace fastio {
const int MAXBUF = 1 << 21;
char buf[MAXBUF], *p1 = buf, *p2 = buf;
char pbuf[MAXBUF], *pp = pbuf;
inline char getc() { return (p1 == p2) && (p2 = (p1 = buf) + fread(buf, 1, MAXBUF, stdin)), *p1++; }
inline void putc(char c) { (pp == pbuf + MAXBUF) && (fwrite(pbuf, 1, MAXBUF, stdout), pp = pbuf), *pp++ = c; }
inline void print_final() { fwrite(pbuf, 1, pp - pbuf, stdout), pp = pbuf; }
};  // namespace fastio
using namespace fastio;
template <class _Tp>
inline _Tp& read(_Tp& x) {
    bool sign = false;
    char ch = getc();
    long double tmp = 1;
    for (; !isdigit(ch); ch = getc())
        sign |= (ch == '-');
    for (x = 0; isdigit(ch); ch = getc())
        x = x * 10 + (ch ^ 48);
    if (ch == '.')
        for (ch = getc(); isdigit(ch); ch = getc())
            tmp /= 10.0, x += tmp * (ch ^ 48);
    return sign ? (x = -x) : x;
}
template <class _Tp>
inline void write(_Tp x) {
    if (x < 0)
        putc('-'), x = -x;
    if (x > 9)
        write(x / 10);
    putc((x % 10) ^ 48);
}
bool m_be;
using ll = long long;
const int MAXN = 2e5 + 10;
const int LOGN = 19;
const int INF = 0x3f3f3f3f;
int n, a[MAXN], fa[MAXN], pos[MAXN], lg2[MAXN * 2];
int dfc1, dfc2, dfn1[MAXN], dfn2[MAXN], lst1[MAXN], lst2[MAXN];
int cnto, dep[MAXN], ord[MAXN * 2], fir[MAXN], rmin[LOGN][MAXN * 2];
int rdfn1[LOGN][MAXN], rdfn2[LOGN][MAXN], rlca[LOGN][MAXN];
vector<int> g[MAXN];
struct SegmentTree {
    struct Node {
        int ls, rs, sum;
    } nd[MAXN * 25];
    int tot, rt[MAXN];
    int& operator[](int i) { return rt[i]; }
    int newnode(int i) { return nd[++tot] = nd[i], tot; }
    void update(int& i, int l, int r, int q, int v) {
        i = newnode(i);
        if (l == r) return void(nd[i].sum += v);
        int mid = (l + r) >> 1;
        if (q <= mid) update(nd[i].ls, l, mid, q, v);
        else update(nd[i].rs, mid + 1, r, q, v);
        nd[i].sum = nd[nd[i].ls].sum + nd[nd[i].rs].sum;
    }
    int query(int i, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return nd[i].sum;
        int mid = (l + r) >> 1, ret = 0;
        if (ql <= mid) ret += query(nd[i].ls, l, mid, ql, qr);
        if (qr > mid) ret += query(nd[i].rs, mid + 1, r, ql, qr);
        return ret;
    }
} sgt;
inline int argmin(int* arr, int x, int y) { return arr[x] < arr[y] ? x : y; }
inline int argmax(int* arr, int x, int y) { return arr[x] > arr[y] ? x : y; }
void build0(int u, int f) {
    dep[u] = dep[f] + 1, ord[++cnto] = u, fir[u] = cnto, fa[u] = f;
    sgt.update(sgt[u] = sgt[f], 0, n, a[u], 1);
    for (auto v : g[u]) {
        if (v == f) continue;
        build0(v, u), ord[++cnto] = u;
    }
}
void build1(int u, int f) {
    dfn1[u] = ++dfc1;
    for (int i = 0; i < g[u].size(); ++i)
        if (g[u][i] != f) build1(g[u][i], u);
    lst1[u] = dfc1;
}
void build2(int u, int f) {
    dfn2[u] = ++dfc2;
    for (int i = g[u].size() - 1; i >= 0; --i)
        if (g[u][i] != f) build2(g[u][i], u);
    lst2[u] = dfc2;
}
int lca(int x, int y) {
    int l = min(fir[x], fir[y]), r = max(fir[x], fir[y]);
    int k = lg2[r - l + 1];
    return argmin(dep, rmin[k][l], rmin[k][r - (1 << k) + 1]);
}
int lcas(int l, int r) {
    int k = lg2[r - l + 1];
    return lca(rlca[k][l], rlca[k][r - (1 << k) + 1]);
}
int maxdfn1(int l, int r) {
    int k = lg2[r - l + 1];
    return argmax(dfn1, rdfn1[k][l], rdfn1[k][r - (1 << k) + 1]);
}
int maxdfn2(int l, int r) {
    int k = lg2[r - l + 1];
    return argmax(dfn2, rdfn2[k][l], rdfn2[k][r - (1 << k) + 1]);
}
void init() {
    build0(1, 0), build1(1, 0), build2(1, 0);
    for (int i = 2; i <= cnto; ++i) lg2[i] = lg2[i >> 1] + 1;
    for (int i = 1; i <= cnto; ++i) rmin[0][i] = ord[i];
    for (int j = 1; j < LOGN; ++j)
        for (int i = 1; i + (1 << j) - 1 <= cnto; ++i)
            rmin[j][i] = argmin(dep, rmin[j - 1][i], rmin[j - 1][i + (1 << (j - 1))]);
    for (int i = 0; i < n; ++i)
        rdfn1[0][i] = rdfn2[0][i] = rlca[0][i] = pos[i];
    for (int j = 1; j < LOGN; ++j)
        for (int i = 0; i + (1 << j) <= n; ++i) {
            rdfn1[j][i] = argmax(dfn1, rdfn1[j - 1][i], rdfn1[j - 1][i + (1 << (j - 1))]);
            rdfn2[j][i] = argmax(dfn2, rdfn2[j - 1][i], rdfn2[j - 1][i + (1 << (j - 1))]);
            rlca[j][i] = lca(rlca[j - 1][i], rlca[j - 1][i + (1 << (j - 1))]);
        }
}
int query(int u, int v, int t, int f, int l, int r) {
    return sgt.query(sgt[u], 0, n, l, r)
         + sgt.query(sgt[v], 0, n, l, r)
         - sgt.query(sgt[t], 0, n, l, r)
         - sgt.query(sgt[f], 0, n, l, r);
}
bool check(int c, int x) {
    int l = (0 - c + n) % n, r = (x - 1 - c + n) % n;
    int tx = (x - c + n) % n;
    if (l <= r) {
        int t = lcas(l, r), f = fa[t];
        int u = maxdfn1(l, r), v = maxdfn2(l, r);
        if (u == v) u = t;
        if (lca(u, v) != t) return false;
        return query(u, v, t, f, l, r) == x
            && query(u, v, t, f, tx, tx) == 0;
    } else {
        int l1 = l, r1 = n - 1, l2 = 0, r2 = r;
        int t = lca(lcas(l1, r1), lcas(l2, r2)), f = fa[t];
        int u = argmax(dfn1, maxdfn1(l1, r1), maxdfn1(l2, r2));
        int v = argmax(dfn2, maxdfn2(l1, r1), maxdfn2(l2, r2));
        if (u == v) u = t;
        if (lca(u, v) != t) return false;
        return query(u, v, t, f, l1, r1)
             + query(u, v, t, f, l2, r2) == x
            && query(u, v, t, f, tx, tx) == 0;
    }
}
bool m_ed;
signed main() {
    resetIO(mex);
    debug("Mem %.5lfMB.", fabs(&m_ed - &m_be) / 1024 / 1024);
    read(n);
    for (int i = 1; i <= n; ++i)
        read(a[i]), pos[a[i]] = i;
    for (int i = 1; i < n; ++i) {
        int u, v; read(u), read(v);
        g[u].push_back(v), g[v].push_back(u);
    }
    init();
    for (int i = 1, k = n; i <= n; ++i) {
        if (k < n) ++k;
        while (k && !check(i - 1, k)) --k;
        write(k), putc(" \n"[i == n]);
    }
    return print_final(), 0;
}
```