---
title: CF639F Bear and Chemistry 题解
tags: solutions
category: 题解
date: 2021-12-03 21:13:31
---

## CF639F Bear and Chemistry 题解

又一道黑

### 题面

[题目链接](https://www.luogu.com.cn/problem/CF639F)

### 解法

思路很好想，预处理一遍边双缩点得到一棵树，询问建完虚树再一遍边双缩点跑出来$V$集合中的点是否全在一个边双中。

时间复杂度$O(n \log n)$，常数巨大。

### AC代码

调了两天后发现是因为~~tarjan退栈的时候把`ins`标记改成了`true`~~

~~写题不注意，对拍两小时（关键还$^{TM}$没拍出错误？）~~

```cpp
/**
 * @file:           CF639F.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/CF639F
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
const int MAXN = 1e6 + 10;
const int LOGN = 20;
const int INFL = 0x3f3f3f3f;
bool m_be;
int n, m, q, k, h, cnt, len, is[MAXN], iu[MAXN], iv[MAXN], s[MAXN], nd[MAXN];
int idn, top, rt[MAXN], id[MAXN], dep[MAXN], fa[MAXN][LOGN], sta[MAXN];
int dfc1, bcc1, top1, sta1[MAXN], sfa1[MAXN], dfn1[MAXN], low1[MAXN], col1[MAXN];
int dfc2, bcc2, top2, sta2[MAXN], sfa2[MAXN], dfn2[MAXN], low2[MAXN], col2[MAXN];
vector<int> g[MAXN], tr[MAXN], vtr[MAXN];
bool ins1[MAXN], ins2[MAXN];
bool m_ed;
void tarjan1(int u, int f) {
    sfa1[u] = f;
    dfn1[u] = low1[u] = ++dfc1;
    sta1[++top1] = u, ins1[u] = true;
    int cntf = 0;
    for (auto v : g[u]) {
        if (v == f) {
            ++cntf;
            continue;
        }
        if (!dfn1[v]) {
            tarjan1(v, u);
            low1[u] = min(low1[u], low1[v]);
        } else if (ins1[v]) {
            low1[u] = min(low1[u], dfn1[v]);
        }
    }
    if (f && cntf > 1)
        low1[u] = min(low1[u], dfn1[f]);
    if (dfn1[u] == low1[u]) {
        ++bcc1;
        while (true) {
            int v = sta1[top1--];
            ins1[v] = false;
            col1[v] = bcc1;
            if (u == v)
                break;
        }
    }
}
void tarjan2(int u, int f) {
    sfa2[u] = f;
    dfn2[u] = low2[u] = ++dfc2;
    sta2[++top2] = u, ins2[u] = true;
    int cntf = 0;
    for (auto v : vtr[u]) {
        if (v == f) {
            ++cntf;
            continue;
        }
        if (!dfn2[v]) {
            tarjan2(v, u);
            low2[u] = min(low2[u], low2[v]);
        } else if (ins2[v]) {
            low2[u] = min(low2[u], dfn2[v]);
        }
    }
    if (f && cntf > 1)
        low2[u] = min(low2[u], dfn2[f]);
    if (dfn2[u] == low2[u]) {
        ++bcc2;
        while (true) {
            int v = sta2[top2--];
            ins2[v] = false;
            col2[v] = bcc2;
            if (u == v)
                break;
        }
    }
}
void addvedge(int u, int v) {
    vtr[u].push_back(v);
    vtr[v].push_back(u);
}
void build1(int u, int f) {
    id[u] = ++idn, rt[u] = (f ? rt[f] : u);
    dep[u] = dep[f] + 1, fa[u][0] = f;
    for (int i = 1; i < LOGN; ++i)
        fa[u][i] = fa[fa[u][i - 1]][i - 1];
    for (auto v : tr[u])
        if (v != f)
            build1(v, u);
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
void build2(int rtx, int cl) {
    sta[top = 1] = rtx, vtr[rtx].clear();
    for (int i = cl; i <= cnt && rt[s[i]] == rtx; ++i) {
        if (s[i] == rtx)
            continue;
        int l = lca(s[i], sta[top]);
        while (id[l] <= id[sta[top - 1]])
            addvedge(sta[top - 1], sta[top]), --top;
        if (l != sta[top])
            vtr[l].clear(), addvedge(l, sta[top]), sta[top] = nd[++len] = l;
        vtr[s[i]].clear(), sta[++top] = s[i];
    }
    for (int i = 1; i < top; ++i)
        addvedge(sta[i], sta[i + 1]);
}
signed main() {
    read(n), read(m), read(q);
    for (int i = 1; i <= m; ++i) {
        int u, v;
        read(u), read(v);
        if (u == v)
            continue;
        g[u].push_back(v);
        g[v].push_back(u);
    }
    for (int i = 1; i <= n; ++i)
        if (!dfn1[i])
            tarjan1(i, 0);
    for (int i = 1; i <= n; ++i) {
        if (sfa1[i] && col1[i] != col1[sfa1[i]]) {
            tr[col1[sfa1[i]]].push_back(col1[i]);
            tr[col1[i]].push_back(col1[sfa1[i]]);
        }
    }
    for (int i = 1; i <= bcc1; ++i)
        if (!id[i])
            build1(i, 0);
    int rnd = 0;
    for (int tt = 1; tt <= q; ++tt) {
        bool answ = true;
        read(k), read(h), cnt = bcc2 = dfc2 = 0;
        for (int i = 1; i <= k; ++i)
            read(is[i]), is[i] = (is[i] + rnd - 1) % n + 1;
        for (int i = 1; i <= h; ++i) {
            read(iu[i]), iu[i] = (iu[i] + rnd - 1) % n + 1;
            read(iv[i]), iv[i] = (iv[i] + rnd - 1) % n + 1;
        }
        for (int i = 1; i <= k; ++i)
            s[++cnt] = col1[is[i]];
        for (int i = 1; i <= h; ++i)
            s[++cnt] = col1[iu[i]], s[++cnt] = col1[iv[i]];
        sort(s + 1, s + cnt + 1, [](int x, int y) {
            return id[x] < id[y];
        });
        len = cnt = unique(s + 1, s + cnt + 1) - s - 1;
        copy(s + 1, s + cnt + 1, nd + 1);
        for (int i = 1; i <= cnt; ++i)
            if (rt[s[i]] != rt[s[i - 1]])
                build2(rt[s[i]], i);
        for (int i = 1; i <= h; ++i)
            if (col1[iu[i]] != col1[iv[i]])
                addvedge(col1[iu[i]], col1[iv[i]]);
        for (int i = 1; i <= len; ++i)
            dfn2[nd[i]] = 0;
        for (int i = 1; i <= len; ++i)
            if (!dfn2[nd[i]])
                tarjan2(nd[i], 0);
        for (int i = 1; i <= k; ++i)
            if (col2[col1[is[i]]] != col2[col1[is[1]]])
                answ = false;
        puts(answ ? "YES" : "NO"), (rnd += answ ? tt : 0) %= n;
    }
    return 0;
}
```