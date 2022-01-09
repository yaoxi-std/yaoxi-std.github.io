---
title: CF1613F Tree Coloring
tags: solutions
category: 题解
date: 2022-01-03 13:36:14
---

## CF1613F Tree Coloring
<!-- more -->

### 题面

[题目链接](https://www.luogu.com.cn/problem/CF1613F)

### 解法

不易直接计算符合条件的方案数，所以利用容斥计算不符合条件的方案数。假设有$i$个点的$c_k=c_{fa_k}-1$，整棵树就被分成了$n-i$条链，每条链只要有一个点确定了则其他点都能确定，排列数为$(n-i)!$。设有$i$个点的$c_k=c_{fa_k}-1$共有$f(i)$种方案，则

$$ans=\sum_{i=0}^{n-1}{(-1)^i(n-i)!f(i)}$$

考虑如何计算$f(i)$。对于节点$u$，要么不和子节点相差为$1$，要么只能和其中一个子节点相差为$1$，所以其生成函数为

$$F_u(x) = deg_ux + 1$$

$f(i)$的生成函数显然是每个$u$的生成函数乘起来：

$$F(x) = \prod_{u=1}^{n}{(deg_ux + 1)}$$

所以求出$f(i)$如下：

$$f(i) = [x^i]\prod_{u=1}^{n}{(deg_ux + 1)}$$

使用分治NTT计算，时间复杂度$O(n \log^2 n)$。

### AC代码

```cpp
/**
 * @file:           CF1613F.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/CF1613F
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
const int MAXN = 1 << 19;
const int INF = 0x3f3f3f3f3f3f3f3f;
const int MOD = 998244353;
namespace maths {
    int add(int x, int y) {
        x += y;
        return x >= MOD ? x - MOD : x;
    }
    int sub(int x, int y) {
        x -= y;
        return x < 0 ? x + MOD : x;
    }
    int qpow(int x, int y, int p = MOD) {
        int ret = 1;
        for (; y; y >>= 1, x = x * x % p)
            if (y & 1)
                ret = ret * x % p;
        return ret;
    }
    template <class _Tp>
    void change(_Tp* f, int len) {
        static int rev[MAXN];
        for (int i = rev[0] = 0; i < len; ++i) {
            rev[i] = rev[i >> 1] >> 1;
            if (i & 1)
                rev[i] |= len >> 1;
        }
        for (int i = 0; i < len; ++i)
            if (i < rev[i])
                swap(f[i], f[rev[i]]);
    }
    void ntt(int* f, int len, int on) {
        change(f, len);
        for (int h = 2; h <= len; h <<= 1) {
            int gn = qpow(3, (MOD - 1) / h);
            for (int j = 0; j < len; j += h) {
                int g = 1;
                for (int k = j; k < j + h / 2; ++k) {
                    int u = f[k], t = g * f[k + h / 2] % MOD;
                    f[k] = add(u, t), f[k + h / 2] = sub(u, t);
                    g = g * gn % MOD;
                }
            }
        }
        if (on == -1) {
            reverse(f + 1, f + len);
            int inv = qpow(len, MOD - 2);
            for (int i = 0; i < len; ++i)
                f[i] = f[i] * inv % MOD;
        }
    }
}
using namespace maths;
int n, fa[MAXN], deg[MAXN], fac[MAXN];
int f[MAXN], f1[MAXN], f2[MAXN];
vector<int> g[MAXN];
void build(int u, int f) {
    fa[u] = f;
    for (auto v : g[u])
        if (v != f)
            build(v, u), ++deg[u];
}
void solve(int l, int r) {
    if (r - l == 2)
        return;
    int mid = (l + r) >> 1, len = r - l;
    solve(l, mid), solve(mid, r);
    copy(f + l, f + mid, f1);
    fill(f1 + len / 2, f1 + len, 0);
    copy(f + mid, f + r, f2);
    fill(f2 + len / 2, f2 + len, 0);
    ntt(f1, len, 1);
    ntt(f2, len, 1);
    for (int i = 0; i < len; ++i)
        f1[i] = f1[i] * f2[i] % MOD;
    ntt(f1, len, -1);
    copy(f1, f1 + len, f + l);
}
signed main() {
    read(n);
    for (int i = 1; i < n; ++i) {
        int u, v;
        read(u), read(v);
        g[u].push_back(v);
        g[v].push_back(u);
    }
    build(1, 0);
    int len = 1;
    while (len <= n + n)
        len <<= 1;
    for (int i = 0; i < len; i += 2)
        f[i] = 1, f[i + 1] = deg[i >> 1];
    solve(0, len);
    for (int i = fac[0] = 1; i <= n; ++i)
        fac[i] = fac[i - 1] * i % MOD;
    int ans = 0;
    for (int i = 0; i < n; ++i) {
        if (i & 1)
            ans = sub(ans, fac[n - i] * f[i] % MOD);
        else
            ans = add(ans, fac[n - i] * f[i] % MOD);
    }
    write(ans), putchar('\n');
    return 0;
}
```