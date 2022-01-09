---
title: CF632E Thief in a Shop 题解
tags: solutions
category: 题解
date: 2021-12-05 16:35:36
---

## CF632E Thief in a Shop 题解
<!-- more -->

### 题面

[题目链接](https://www.luogu.com.cn/problem/CF632E)

### 解法

~~其实这题可以直接暴力做的~~

还是学习一下[生成函数](https://oi-wiki.org/math/gen-func/ogf/)吧。

对于所有物品构造生成函数$f(x) = \sum\limits_{i\in S}{x^i}$

取出$k$个物品相当于$f^k(x)$。

但是题解里说模数$998244353$和$1004535809$都被卡了，所以可以选择使用双模数防止被$hack$。

时间复杂度$O(N \log N)$，其中$N$是$10^6$级别的。

### AC代码

```cpp
/**
 * @file:           CF632E.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/CF632E
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
const int MAXN = 1 << 20;
const int INFL = 0x3f3f3f3f3f3f3f3f;
namespace maths {
    int mod;
    void init(int mod) {
        maths::mod = mod;
    }
    int qpow(int x, int y) {
        int ret = 1;
        for (; y; y >>= 1, x = x * x % mod)
            if (y & 1)
                ret = ret * x % mod;
        return ret;
    }
    void change(int *f, int len) {
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
    void ntt(int *f, int len, int on) {
        change(f, len);
        for (int h = 2; h <= len; h <<= 1) {
            int gn = qpow(3, (mod - 1) / h);
            for (int j = 0; j < len; j += h) {
                int g = 1;
                for (int k = j; k < j + h / 2; ++k) {
                    int u = f[k], t = g * f[k + h / 2] % mod;
                    f[k] = (u + t + mod) % mod;
                    f[k + h / 2] = (u - t + mod) % mod;
                    g = g * gn % mod;
                }
            }
        }
        if (on == -1) {
            reverse(f + 1, f + len);
            int inv = qpow(len, mod - 2);
            for (int i = 0; i < len; ++i)
                f[i] = f[i] * inv % mod;
        }
    }
}
int n, k, cnt, a[MAXN], b[MAXN], answ[MAXN];
signed main() {
    read(n), read(k);
    for (int i = 1; i <= n; ++i) {
        int x;
        read(x);
        a[x] = b[x] = 1;
    }
    int len = 1 << 20;
    maths::init(998244353);
    maths::ntt(a, len, 1);
    for (int i = 0; i < len; ++i)
        a[i] = maths::qpow(a[i], k);
    maths::ntt(a, len, -1);
    maths::init(1004535809);
    maths::ntt(b, len, 1);
    for (int i = 0; i < len; ++i)
        b[i] = maths::qpow(b[i], k);
    maths::ntt(b, len, -1);
    for (int i = 1; i < len; ++i)
        if (a[i] || b[i])
            answ[++cnt] = i;
    for (int i = 1; i <= cnt; ++i)
        write(answ[i]), putchar(" \n"[i == cnt]);
    return 0;
}
```