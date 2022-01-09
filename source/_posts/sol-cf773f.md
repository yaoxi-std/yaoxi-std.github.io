---
title: CF773F Test Data Generation
tags: solutions
category: 题解
date: 2022-01-07 20:01:40
---

## CF773F Test Data Generation
<!-- more -->

### 题面

[题目链接](https://www.luogu.com.cn/problem/CF773F)

### 解法

update: 发现[FFT不同写法会输出不同的答案](https://www.luogu.com.cn/discuss/396583)

第一种解法出错，显然$n$要是奇数。

第二种解法出错，则$a_n$和$\frac{a_n}{g}$奇偶性不同，只有$a_n$为偶数，$\frac{a_n}{g}$为奇数。这时$a_n$中因数$2$的个数与$g$中的相同。

于是我们可以枚举$g$中因数$2$的个数$k$，将序列$a$的所有数除以$2^k$，答案就是$1 \le a_i \le \frac{max_a}{2^k}$且$a_n$为奇数的个数。

令$f_{a,n}$表示所有数$\in [1,a]$，长度为$n$，最后一位为奇数的方案数。

令$g_{a,n}$表示所有数$\in [1,a]$，长度为$n$，最后一位为偶数的方案数。

答案是

$$\sum\limits_{i \equiv 1 \pmod{2}} f_{\lfloor\frac{max_a}{2^k}\rfloor,i}$$

由于要计算每个$f_{\lfloor\frac{max_a}{2^k}\rfloor}$，如果可以从$f_{\lfloor\frac{max_a}{2^{k+1}}\rfloor}$转移就可以不用每次都重新计算。

所以分为$f_{a} \to f_{2a}$和$f_{a-1} \to f_{a}$两种情况转移。

第一种情况下，当$a$为奇数时：

$$
\begin{aligned}
f_{2a,k} &= \sum_{i+j=k}{(f_{a,i}+g_{a,i})g_{a,j}}-g_{a,k}g_{a,0}[k \neq 0] \\
g_{2a,k} &= \sum_{i+j=k}{(f_{a,i}+g_{a,i})f_{a,j}}-f_{a,k}f_{a,0}[k \neq 0] \\
\end{aligned}
$$

第一种情况下，当$a$为偶数时：

$$
\begin{aligned}
f_{2a,k} &= \sum_{i+j=k}{(f_{a,i}+g_{a,i})f_{a,j}}-g_{a,k}f_{a,0}[k \neq 0] \\
g_{2a,k} &= \sum_{i+j=k}{(f_{a,i}+g_{a,i})g_{a,j}}-f_{a,k}g_{a,0}[k \neq 0] \\
\end{aligned}
$$

第二种情况下，很容易转移：

$$
\begin{aligned}
f_{a,k} &= f_{a-1,k} + (f_{a-1,k-1} + g_{a-1,k-1})[a \equiv 1 \pmod{2}] \\
g_{a,k} &= g_{a-1,k} + (f_{a-1,k-1} + g_{a-1,k-1})[a \equiv 0 \pmod{2}] \\
\end{aligned}
$$

时间复杂度$O(max_n \log max_n \log max_a)$。

### AC代码

```cpp
/**
 * @file:           CF773F.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/CF773F
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
const int INF = 0x3f3f3f3f3f3f3f3f;
const long double PI = acos(-1);
namespace maths {
int mod;
using comp = complex<long double>;
inline int add(int x, int y) {
    x += y;
    return x >= mod ? x - mod : x;
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
void polymul(int n, int* lhs, int* rhs, int* ans) {
    static comp f1[MAXN], f2[MAXN];
    int len = 1;
    while (len <= n + n)
        len <<= 1;
    for (int i = 0; i < len; ++i)
        f1[i] = f2[i] = 0;
    for (int i = 0; i <= n; ++i)
        f1[i] = lhs[i], f2[i] = rhs[i];
    fft(f1, len, 1), fft(f2, len, 1);
    for (int i = 0; i < len; ++i)
        f1[i] *= f2[i];
    fft(f1, len, -1);
    for (int i = 0; i <= n; ++i)
        ans[i] = (int)(f1[i].real() + 0.5) % mod;
}
};  // namespace maths
using namespace maths;
int n, m, ans;
int f[MAXN], g[MAXN], tf[MAXN], tg[MAXN], sum[MAXN];
void solve(int x) {
    if (x == 0)
        return void(f[0] = 1);
    int y = x >> 1;
    solve(y);
    if (y & 1) {
        for (int i = 0; i <= n; ++i)
            sum[i] = add(f[i], g[i]);
        f[0] = 0;
        polymul(n, sum, f, tg);
        polymul(n, sum, g, tf);
        f[0] = 1;
        for (int i = 0; i <= n; ++i) {
            f[i] = add(f[i], tf[i]);
            g[i] = add(g[i], tg[i]);
        }
    } else {
        for (int i = 0; i <= n; ++i)
            sum[i] = add(f[i], g[i]);
        f[0] = 0;
        polymul(n, sum, f, tf);
        polymul(n, sum, g, tg);
        f[0] = 1;
        for (int i = 0; i <= n; ++i) {
            f[i] = add(f[i], tf[i]);
            g[i] = add(g[i], tg[i]);
        }
    }
    if (x & 1) {
        for (int i = n; i; --i)
            f[i] = add(f[i], add(f[i - 1], g[i - 1]));
    }
    for (int i = 1; i <= n; i += 2)
        ans = add(ans, f[i]);
}
signed main() {
    read(n), read(m), read(mod);
    solve(m >> 1);
    write(ans), putchar('\n');
    return 0;
}
```