---
title: CF755G PolandBall and Many Other Balls
tags: solutions
category: 题解
date: 2022-01-03 13:55:56
---

## CF755G PolandBall and Many Other Balls
<!-- more -->

### 题面

[题目链接](https://www.luogu.com.cn/problem/CF755G)

### 解法

首先想到朴素的dp。令$dp_{n,k}$表示$n$个数取$k$个，则

$$dp_{x+y,k} = \sum_{i+j=k}{dp_{x,i} \times dp_{y,j}} + \sum_{i+j=k-1}{dp_{x-1,i} \times dp_{y-1,j}}$$

发现左右两个求和符号都容易写成卷积的形式，不妨对于每个$x+y$取$x=y$代入计算，这样用倍增NTT就可以。

但是求$dp_{x+y}$时还要知道$dp_{x-1}$和$dp_{y-1}$，所以再设$F_{t,0 \le l \le 2}(x)$表示原来的$dp_{2^t-l,x}$的生成函数，有以下转移方程

$$
\begin{aligned}
F_{t,0}(x) &= F_{t-1,0}(x) \times F_{t-1,0}(x) + F_{t-1,1}(x) \times F_{t-1,1}(x) \\
F_{t,1}(x) &= F_{t-1,0}(x) \times F_{t-1,1}(x) + F_{t-1,1}(x) \times F_{t-1,2}(x) \\
F_{t,2}(x) &= F_{t-1,1}(x) \times F_{t-1,1}(x) + F_{t-1,2}(x) \times F_{t-1,2}(x)
\end{aligned}
$$

时间复杂度$O(k \log n \log k)$，可通过。

### AC代码

```cpp
/**
 * @file:           CF755G.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/CF755G
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
const int MAXK = 1 << 17;
const int LOGN = 30;
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
        static int rev[MAXK];
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
};
using namespace maths;
int n, k;
struct knap {
    struct node {
        int dp[MAXK];
        node() { memset(dp, 0, sizeof(dp)); }
        node(const node& o) { memcpy(dp, o.dp, sizeof(dp)); }
        node operator+(const node& rhs) const {
            node ret;
            for (int i = 0; i <= k; ++i)
                ret.dp[i] = add(dp[i], rhs.dp[i]);
            return ret;
        }
        node operator*(const node& rhs) const {
            static int f1[MAXK], f2[MAXK];
            node ret;
            int len = 1;
            while (len < k + k + 2)
                len <<= 1;
            for (int i = 0; i < len; ++i)
                f1[i] = dp[i], f2[i] = rhs.dp[i];
            ntt(f1, len, 1), ntt(f2, len, 1);
            for (int i = 0; i < len; ++i)
                f1[i] = f1[i] * f2[i] % MOD;
            ntt(f1, len, -1);
            for (int i = 0; i <= k; ++i)
                ret.dp[i] = f1[i];
            return ret;
        }
        node operator<<(int rhs) const {
            node ret;
            for (int i = rhs; i <= k; ++i)
                ret.dp[i] = dp[i - rhs];
            return ret;
        }
    } dp[3];
    knap operator*(const knap& rhs) const {
        knap ret;
        ret.dp[0] = dp[0] * rhs.dp[0] + ((dp[1] * rhs.dp[1]) << 1);
        ret.dp[1] = dp[0] * rhs.dp[1] + ((dp[1] * rhs.dp[2]) << 1);
        ret.dp[2] = dp[1] * rhs.dp[1] + ((dp[2] * rhs.dp[2]) << 1);
        return ret;
    }
};
knap dp[LOGN], ans;
signed main() {
    read(n), read(k);
    ans.dp[0].dp[0] = 1;
    dp[0].dp[0].dp[0] = dp[0].dp[0].dp[1] = 1;
    dp[0].dp[1].dp[0] = 1;
    for (int i = 1; i < LOGN; ++i)
        dp[i] = dp[i - 1] * dp[i - 1];
    for (int i = 0; i < LOGN; ++i)
        if  ((n >> i) & 1)
            ans = ans * dp[i];
    for (int i = 1; i <= k; ++i)
        write(ans.dp[0].dp[i]), putchar(" \n"[i == k]);
    return 0;
}
```