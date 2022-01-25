---
title: 【专题】多项式
tags: topics
category: 专题
date: 2021-12-17 18:29:55
---

## 【专题】多项式

主要为$FFT$，$NTT$，多项式求逆等变换，可以和生成函数结合起来考计数题。{% post_link 'sol-p3803' '这篇题解' %}中有对多项式乘法的较详细证明过程。

对于使用生成函数判断方案是否合法（而不是统计方案的数量），使用单模数容易被卡，建议在$998244353$，$1004535809$和$469762049$中选取两个，其原根都为$3$。

若题目中要求对奇怪的数取模，一定记得计算模数的原根，有可能不是$3$！

<!-- more -->
### 题目

{% post_link 'sol-p3803' %} </br>

{% post_link 'sol-p4245' %} </br>

{% post_link 'sol-p4721' %} </br>

{% post_link 'sol-p4238' %} </br>

{% post_link 'sol-cf632e' %} </br>

{% post_link 'sol-cf986d' %} </br>

{% post_link 'sol-cf1613f' %} </br>

{% post_link 'sol-cf755g' %} </br>

{% post_link 'sol-cf623e' %} </br>

{% post_link 'sol-cf773f' %} </br>

{% post_link 'sol-cf553e' %} </br>

{% post_link 'sol-p4725' %} </br>

{% post_link 'sol-p4726' %} </br>

{% post_link 'sol-p4002' %} </br>

{% post_link 'sol-p5850' %} </br>

{% post_link 'sol-p4491' %}

### 模版代码
```cpp
const long double MPI = acos(-1);
const int MOD = 998244353;
// const int MOD = 1004535809; // 备用
// const int MOD = 469762049; // 备用
namespace polynomial {
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
    static int rev[MAXN] = {};
    for (int i = 0; i < len; ++i) {
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
int polymul(const int* f, int n, const int* g, int m, int* ans) {
    static int tf[MAXN] = {}, tg[MAXN] = {};
    int len = 1;
    while (len < n + m - 1)
        len <<= 1;
    copy(f, f + n, tf);
    fill(tf + n, tf + len, 0);
    copy(g, g + m, tg);
    fill(tg + m, tg + len, 0);
    ntt(tf, len, 1);
    ntt(tg, len, 1);
    for (int i = 0; i < len; ++i)
        tf[i] = tf[i] * tg[i] % MOD;
    ntt(tf, len, -1);
    copy(tf, tf + n + m - 1, ans);
    return n + m - 1;
}
int polyinv(const int* f, int n, int* ans) {
    static int tmp[MAXN] = {};
    int len = 1;
    while (len < n)
        len <<= 1;
    fill(ans, ans + len + len, 0);
    ans[0] = qpow(f[0], MOD - 2);
    for (int h = 2; h <= len; h <<= 1) {
        copy(f, f + h, tmp);
        fill(tmp + h, tmp + h + h, 0);
        ntt(tmp, h + h, 1);
        ntt(ans, h + h, 1);
        for (int i = 0; i < h + h; ++i)
            ans[i] = ans[i] * (2 - ans[i] * tmp[i] % MOD + MOD) % MOD;
        ntt(ans, h + h, -1);
        fill(ans + h, ans + h + h, 0);
    }
    return n;
}
int derivation(const int* f, int n, int* ans) {
    for (int i = 0; i < n - 1; ++i)
        ans[i] = f[i + 1] * (i + 1) % MOD;
    return ans[n - 1] = 0, n - 1;
}
int integral(const int* f, int n, int* ans) {
    for (int i = n; i >= 1; --i)
        ans[i] = f[i - 1] * qpow(i, MOD - 2) % MOD;
    return ans[0] = 0, n + 1;
}
int ln(const int* f, int n, int* ans) {
    static int tf[MAXN] = {}, tg[MAXN] = {};
    derivation(f, n, tf);
    polyinv(f, n, tg);
    polymul(tf, n - 1, tg, n, ans);
    integral(ans, n - 1, ans);
    fill(ans + n, ans + n + n, 0);
    return n;
}
int exp(const int* f, int n, int* ans) {
    static int tmp[MAXN] = {};
    ans[0] = 1, ans[1] = 0;
    for (int h = 2; h <= (n << 1); h <<= 1) {
        ln(ans, h, tmp);
        for (int i = 0; i < h; ++i)
            tmp[i] = add(i == 0, sub(f[i], tmp[i]));
        polymul(ans, h, tmp, h, ans);
    }
    return n;
}
};  // namespace polynomial
```

