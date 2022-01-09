---
title: CF1096G Lucky Tickets 题解
tags: solutions
category: 题解
date: 2021-12-08 21:18:33
---

## CF1096G Lucky Tickets 题解
<!-- more -->

### 题面

[题目链接](https://www.luogu.com.cn/problem/CF1096G)

### 解法

~~第一次这么轻松地做计数题~~

有了{% post_link 'sol-cf632e' 'CF632E' %}的经验，这题$10$秒以内就能切。

先构造生成函数$f(x) = \sum\limits_{i \in K}{x^i}$，取其中$\frac{n}{2}$个数字的和相当于$f^\frac{n}{2}(x)$。$NTT$计算即可，答案很好统计。

$5$分钟就做掉了。

### AC代码

```cpp
/**
 * @file:           CF1096G.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/CF1096G
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
const int MAXN = 1 << 21;
const int INFL = 0x3f3f3f3f3f3f3f3f;
const int MOD = 998244353;
const int G0 = 3;
int n, k, f[MAXN];
int qpow(int x, int y) {
    int ret = 1;
    for (; y; y >>= 1, x = x * x % MOD)
        if (y & 1)
            ret = ret * x % MOD;
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
        int gn = qpow(G0, (MOD - 1) / h);
        for (int j = 0; j < len; j += h) {
            int g = 1;
            for (int k = j; k < j + h / 2; ++k) {
                int u = f[k], t = g * f[k + h / 2] % MOD;
                f[k] = (u + t + MOD) % MOD;
                f[k + h / 2] = (u - t + MOD) % MOD;
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
signed main() {
    read(n) /= 2, read(k);
    for (int i = 1, x; i <= k; ++i)
        read(x), f[x] = true;
    int len = 1;
    while (len <= n * 9)
        len <<= 1;
    ntt(f, len, 1);
    for (int i = 0; i < len; ++i)
        f[i] = qpow(f[i], n);
    ntt(f, len, -1);
    int ans = 0;
    for (int i = 0; i < len; ++i)
        (ans += f[i] * f[i]) %= MOD;
    write(ans), putchar('\n');
    return 0;
}
```