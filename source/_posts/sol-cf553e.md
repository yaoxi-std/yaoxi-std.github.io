---
title: CF553E Kyoya and Train
tags: solutions
category: 题解
date: 2022-01-09 12:07:09
---

## CF553E Kyoya and Train

### 题面

[题目链接](https://www.luogu.com.cn/problem/CF553E)

### 解法

考虑dp。$dp_{u,i}$表示点$u$处已花费时间$i$的最小代价。

$$
dp_{u,i} = 
\begin{cases}
0 & (u = n, i \lt t) \\
x & (u = n, i \ge t) \\
\min\limits_{e:u \to v,w}{w+\sum\limits_{k=1}^{t}{p_{e,k} dp_{v,i+k}}} & (u \neq n, i \lt t) \\
dist(u, n) & (u \neq n, i \ge t) \\
\end{cases}
$$

暴力解dp，复杂度$O(mt^2)$。

时间复杂度的瓶颈在于第三行的求和，考虑优化它。

设$g_{e,i} = w_e + \sum\limits_{k=1}^{t}{p_{e,k} dp_{v_e,i+k}}$，再设$f_{e,i+t} = g_{e,i}$，就有了

$$
f_{e,i+t} = w_e + \sum_{k=1}^{t}{p_{e,k} dp_{v_e,i+k}}
$$

设$p'_k=p_{t-k}$（翻转），这个求和就变成了卷积：

$$
f_{e,i+t} = w_e + \sum_{k=1}^{t}{p'_{e,t-k} dp_{v_e,i+k}}
$$

通过分治FFT转移，复杂度降到$O(mt \log^2 t)$，可以接受。

### AC代码

```cpp
/**
 * @file:           CF553E.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/CF553E
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
const int MAXN = 55;
const int MAXM = 120;
const int MAXK = 1 << 17;
const int INF = 0x3f3f3f3f3f3f3f3f;
const double EPS = 1e-6;
const double PI = acos(-1);
namespace maths {
using comp = complex<double>;
template <class _Tp>
void change(_Tp* f, int len) {
    static int rev[MAXK] = {};
    for (int i = 0; i < len; ++i) {
        rev[i] = rev[i >> 1] >> 1;
        if (i & 1)
            rev[i] |= len >> 1;
    }
    for (int i = 0; i < len; ++i)
        if (i < rev[i])
            swap(f[i], f[rev[i]]);
}
void fft(comp* f, int len, int on) {
    change(f, len);
    for (int h = 2; h <= len; h <<= 1) {
        comp wn(cos(2 * PI / h), sin(2 * PI / h));
        for (int j = 0; j < len; j += h) {
            comp w(1, 0);
            for (int k = j; k < j + h / 2; ++k) {
                comp u = f[k], t = w * f[k + h / 2];
                f[k] = u + t, f[k + h / 2] = u - t;
                w *= wn;
            }
        }
    }
    if (on == -1) {
        reverse(f + 1, f + len);
        for (int i = 0; i < len; ++i)
            f[i] /= len;
    }
}
};  // namespace maths
using namespace maths;
struct Edge {
    int u, v, w;
    double p[MAXK];
    Edge() {}
    Edge(int _u, int _v, int _w) : u(_u), v(_v), w(_w) {}
} edge[MAXM];
int n, m, t, x;
int dis[MAXN][MAXN];
double f[MAXM][MAXK], dp[MAXN][MAXK];
void calc(int l, int r) {
    static comp tf[MAXK], tg[MAXK];
    int mid = (l + r) >> 1;
    int lx = r - mid, rx = r - l, len = 1;
    while (len <= lx + rx)
        len <<= 1;
    for (int e = 1; e <= m; ++e) {
        Edge& ed = edge[e];
        for (int i = 0; i < len; ++i)
            tf[i] = tg[i] = 0;
        for (int i = 0; i < lx; ++i)
            tf[i] = dp[ed.v][i + mid + 1];
        for (int i = 0; i < rx; ++i)
            tg[i] = ed.p[rx - i];
        fft(tf, len, 1), fft(tg, len, 1);
        for (int i = 0; i < len; ++i)
            tf[i] *= tg[i];
        fft(tf, len, -1);
        for (int i = l; i <= mid; ++i)
            f[e][i] += tf[i + rx - mid - 1].real();
    }
}
void solve(int l, int r) {
    static comp tf[MAXK], tg[MAXK];
    if (l == r) {
        for (int i = 1; i <= m; ++i)
            dp[edge[i].u][l] = min(dp[edge[i].u][l], f[i][l] + edge[i].w);
        return;
    }
    int mid = (l + r) >> 1;
    solve(mid + 1, r);
    calc(l, r);
    solve(l, mid);
}
signed main() {
    read(n), read(m), read(t), read(x);
    memset(dis, 0x3f, sizeof(dis));
    for (int i = 1; i <= n; ++i)
        dis[i][i] = 0;
    for (int i = 1; i <= m; ++i) {
        Edge& ed = edge[i];
        read(ed.u), read(ed.v), read(ed.w);
        dis[ed.u][ed.v] = min(dis[ed.u][ed.v], ed.w);
        for (int j = 1; j <= t; ++j)
            read(ed.p[j]) /= 1e5;
    }
    for (int k = 1; k <= n; ++k)
        for (int i = 1; i <= n; ++i)
            for (int j = 1; j <= n; ++j)
                if (dis[i][j] > dis[i][k] + dis[k][j])
                    dis[i][j] = dis[i][k] + dis[k][j];
    for (int i = 1; i < n; ++i)
        for (int j = 0; j <= t; ++j)
            dp[i][j] = INF;
    for (int i = 1; i <= n; ++i)
        for (int j = t + 1; j <= t + t; ++j)
            dp[i][j] = dis[i][n] + x;
    calc(0, t + t);
    solve(0, t);
    printf("%.10lf\n", dp[1][0]);
    return 0;
}
```