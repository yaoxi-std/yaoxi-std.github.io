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

### 题目

{% post_link 'sol-p3803' %} </br>

{% post_link 'sol-p4245' %} </br>

{% post_link 'sol-p4721' %} </br>

{% post_link 'sol-p4238' %} </br>

{% post_link 'sol-cf632e' %} </br>

{% post_link 'sol-cf986d' %}

### 模版代码
```cpp
const long double MPI = acos(-1);
const int MOD = 998244353;
// const int MOD = 1004535809; // 备用
// const int MOD = 469762049; // 备用
using comp = std::complex<double>;
int rev[MAXN];
void change(comp *f, int len) {
    for (int i = 0; i < len; ++i) {
        rev[i] = rev[i >> 1] >> 1;
        if (i & 1)
            rev[i] |= len >> 1;
    }
    for (int i = 0; i < len; ++i)
        if (i < rev[i])
            swap(f[i], f[rev[i]]);
}
void fft(comp *f, int len, int on) {
    change(f, len);
    for (int h = 2; h <= len; h <<= 1) {
        comp wn(cos(2 * MPI / h), sin(2 * MPI / h));
        for (int j = 0; j < len; j += h) {
            comp w(1, 0);
            for (int k = j; k < j + h / 2; ++k) {
                comp u = f[k], t = w * f[k + h / 2];
                f[k] = u + t;
                f[k + h / 2] = u - t;
                w = w * wn;
            }
        }
    }
    if (on == -1) {
        reverse(f + 1, f + len);
        for (int i = 0; i < len; ++i)
            f[i].real(f[i].real() / len);
    }
}
void ntt(int *f, int len, int on) {
    change(f, len);
    for (int h = 2; h <= len; h <<= 1) {
        int gn = qpow(3, (MOD - 1) / h);
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
```

