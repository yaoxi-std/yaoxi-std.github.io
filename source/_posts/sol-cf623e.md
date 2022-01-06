---
title: CF623E Transforming Sequence
tags: solutions
category: 题解
date: 2022-01-05 22:01:24
---

## CF623E Transforming Sequence

### 题面

[题目链接](https://www.luogu.com.cn/problem/CF623E)

### 解法

序列$a$的前缀或严格单调递增，考虑到$b_n$二进制表示中包含$k$个$1$的情况本质相同而顺序不重要，所以设$dp_{n,k}$表示长度为$n$的序列$a$中，$b_n$二进制表示中包含$k$个$1$。则有

$$
\begin{aligned}
dp_{n+m,k} &= \sum_{i+j=k}{dp_{n,i} \times dp_{m,j} \times \binom{k}{i} \times 2^{m \times i}} \\
&= \sum_{i+j=k}{dp_{n,i} \times dp_{m,j} \times \frac{k!}{i!j!} \times 2^{m \times i}} \\
&= k! \times \sum_{i+j=k}{(dp_{n,i} \times \frac{1}{i!} \times 2^{m \times i}) \times (dp_{m,j} \times \frac{1}{j!})} \\
\end{aligned}
$$

令$n=m$，倍增NTT求解。

需要注意，里面的$(dp_{n,i} \times i!)$和类似的不是卷积而是按位将系数相乘，只有$i$和$j$不同时才是卷积运算。于是阶乘和逆元不需要参与卷积运算的。

为了方便，代码中的`operator*()`是按位乘系数，`operator^()`是卷积。

时间复杂度$O(k \log n \log k)$。

注意模数是$10^9+7$要用{% post_link 'sol-p4245' '任意模数NTT' %}。

PS: MTT带个$5$的常数，这里$\log_2n=60$，$k=3\times 10^4$，FFT长度取$2^{16}$，导致理论上的运算次数已经卡满了$10^9$，本地小样例都要跑$7$秒，但谁叫CF评测机快呢～

### AC代码

```cpp
/**
 * @file:           CF623E.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/CF623E
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
const int MAXN = 1 << 16;
const int LOGN = 60;
const int BLOC = 1 << 15;
const int INF = 0x3f3f3f3f3f3f3f3f;
const int MOD = 1e9 + 7;
const long double PI = acos(-1);
namespace maths {
    using comp = complex<long double>;
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
    struct poly {
        const static int len = 1 << 16;
        int a[MAXN];
        int operator[](int i) const {
            return a[i];
        }
        int& operator[](int i) {
            return a[i];
        }
        poly operator*(const poly& rhs) const {
            poly ret;
            for (int i = 0; i < len; ++i)
                ret[i] = a[i] * rhs[i] % MOD;
            return ret;
        }
        poly operator^(const poly& rhs) const {
            static comp f1[MAXN], f2[MAXN], f3[MAXN];
            poly ret;
            for (int i = 0; i < len; ++i) {
                f1[i] = comp(a[i] / BLOC, a[i] % BLOC);
                f2[i] = comp(a[i] / BLOC, -a[i] % BLOC);
                f3[i] = comp(rhs[i] / BLOC, rhs[i] % BLOC);
            }
            fft(f1, len, 1), fft(f2, len, 1), fft(f3, len, 1);
            for (int i = 0; i < len; ++i) {
                f1[i] *= f3[i];
                f2[i] *= f3[i];
            }
            fft(f1, len, -1), fft(f2, len, -1);
            for (int i = 0; i < len; ++i) {
                int axay = (int)round((f1[i].real() + f2[i].real()) / 2) % MOD;
                int bxby = (int)round((f2[i].real() - f1[i].real()) / 2) % MOD;
                int axby = (int)round((f1[i].imag() + f2[i].imag()) / 2) % MOD;
                int aybx = (int)round((f1[i].imag() - f2[i].imag()) / 2) % MOD;
                ret[i] = (axay * BLOC % MOD * BLOC + (axby + aybx) * BLOC % MOD + bxby) % MOD;
            }
            return ret;
        }
    };
};
using namespace maths;
int n, k;
poly fac, inv, lhs, rhs, ans;
poly pw2[LOGN], dp[LOGN];
int binom(int x, int y) {
    return fac[x] * inv[y] % MOD * inv[x - y] % MOD;
}
signed main() {
    read(n), read(k);
    for (int i = fac[0] = 1; i <= k; ++i)
        fac[i] = fac[i - 1] * i % MOD;
    inv[k] = qpow(fac[k], MOD - 2);
    for (int i = k - 1; ~i; --i)
        inv[i] = inv[i + 1] * (i + 1) % MOD;
    for (int i = pw2[0][0] = 1; i <= k; ++i)
        pw2[0][i] = pw2[0][i - 1] * 2 % MOD;
    for (int i = 1; i <= k; ++i)
        dp[0][i] = 1;
    for (int i = 1; i < LOGN; ++i) {
        pw2[i] = pw2[i - 1] * pw2[i - 1];
        lhs = dp[i - 1] * inv * pw2[i - 1];
        rhs = dp[i - 1] * inv;
        dp[i] = (lhs ^ rhs) * fac;
    }
    ans[0] = 1;
    for (int i = 0; i < LOGN; ++i) {
        if (!((n >> i) & 1))
            continue;
        lhs = ans * inv * pw2[i];
        rhs = dp[i] * inv;
        ans = (lhs ^ rhs) * fac;
    }
    int tot = 0;
    for (int i = 0; i <= k; ++i)
        tot = add(tot, ans[i] * binom(k, i) % MOD);
    write(tot), putchar('\n');
    return 0;
}
```