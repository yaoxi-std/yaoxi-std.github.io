---
title: AT2064 Many Easy Problems 题解
tags: solutions
category: 题解
date: 2021-12-06 20:25:21
---

## AT2064 Many Easy Problems 题解

### 题面

[题目链接](https://www.luogu.com.cn/problem/AT2064)

### 解法

对于每个节点$u$，考虑其对$f(i)$的贡献。

正面的贡献不好计算，考虑用总方案数减去不经过$u$的数量，则

$$
\begin{aligned}
f(i) &= \sum\limits_{u=1}^{n}{\left(\binom{n}{i} - \binom{n-siz_u}{i} - \sum\limits_{v \in son_u}{\binom{siz_v}{i}}\right)} \\
&= n\binom{n}{i} - \sum\limits_{u=1}^{n}{\left(\binom{n-siz_u}{i} + \sum\limits_{v \in son_u}{\binom{siz_v}{i}}\right)}
\end{aligned}
$$

设$cnt_i$表示子树大小为$i$的节点数量。为了便于之后的计算，我们将不在节点$u$子树中的节点定义为一棵新的子树并加入$son_u$。形式化地，即对于每个节点$u\neq 1$，将$n-siz_u$加入$cnt$数组中。式子简化如下：

$$
\begin{aligned}
f(i) &= n\binom{n}{i} - \sum\limits_{u=1}^{n}{\sum\limits_{v \in son_u}{\binom{siz_v}{i}}} \\
&= n\binom{n}{i} - \sum\limits_{j=i}^{n}{cnt_j \cdot \binom{j}{i}}
\end{aligned}
$$

展开组合数得到

$$
\begin{aligned}
f(i) &= n\binom{n}{i} - \sum\limits_{j=i}^{n}{cnt_j \cdot \binom{j}{i}} \\
&= n\binom{n}{i} - \sum\limits_{j=i}^{n}{\frac{cnt_j \cdot j!}{i! (j - i)!}} \\
&= n\binom{n}{i} - \frac{1}{i!}\sum\limits_{j=i}^{n}{\frac{cnt_j \cdot j!}{(j - i)!}}
\end{aligned}
$$

由于后面的求和符号中既有$j$又有$i-j$，想办法将其化为卷积的形式。

$$
\begin{aligned}
f(i) &= n\binom{n}{i} - \frac{1}{i!}\sum\limits_{j=i}^{n}{\frac{cnt_j \cdot j!}{(j - i)!}} \\
&= n\binom{n}{i} - \frac{1}{i!}\sum\limits_{j=0}^{n-i}{\frac{cnt_{n - j} \cdot (n - j)!}{(n - i - j)!}}
\end{aligned}
$$

所以令$F_j = cnt_{n - j} \cdot (n - j)!$，$G_j = \frac{1}{j!}$，最终式子成了

$$
f(i) = n\binom{n}{i} - \frac{1}{i!}\sum\limits_{j=0}^{n-i}{F_j \cdot G_{n - i - j}}
$$

使用$NTT$优化即可。注意$924844033$的原根是$5$而不是$3$。

### AC代码

```cpp
/**
 * @file:           AT2064.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/AT2064
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
const int MOD = 924844033;
const int G0 = 5;
namespace maths {
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
}
int n, fa[MAXN], siz[MAXN], cnt[MAXN], ans[MAXN];
int fac[MAXN], inv[MAXN], f[MAXN], g[MAXN], res[MAXN];
vector<int> tr[MAXN];
using namespace maths;
void build(int u, int f) {
    fa[u] = f, siz[u] = 1;
    for (auto v : tr[u])
        if (v != f)
            build(v, u), siz[u] += siz[v];
    ++cnt[siz[u]], ++cnt[n - siz[u]];
}
void init() {
    for (int i = fac[0] = 1; i < MAXN; ++i)
        fac[i] = fac[i - 1] * i % MOD;
    inv[MAXN - 1] = qpow(fac[MAXN - 1], MOD - 2);
    for (int i = MAXN - 2; ~i; --i)
        inv[i] = inv[i + 1] * (i + 1) % MOD;
}
int binom(int x, int y) {
    return fac[x] * inv[y] % MOD * inv[x - y] % MOD;
}
signed main() {
    read(n), init();
    for (int i = 1; i < n; ++i) {
        int u, v;
        read(u), read(v);
        tr[u].push_back(v);
        tr[v].push_back(u);
    }
    build(1, 0), cnt[0] = cnt[n] = 0;
    int len = 1;
    // ##sb-mistakes## 这个故事告诉我们FFT/NTT做卷积一定要开两倍长度
    // while (len <= n)
    while (len <= n + n)
        len <<= 1;
    for (int i = 0; i <= n; ++i)
        f[i] = cnt[n - i] * fac[n - i] % MOD;
    for (int i = 0; i <= n; ++i)
        g[i] = inv[i];
    ntt(f, len, 1), ntt(g, len, 1);
    for (int i = 0; i < len; ++i)
        res[i] = f[i] * g[i] % MOD;
    ntt(res, len, -1);
    for (int i = 1; i <= n; ++i)
        ans[i] = (n * binom(n, i) % MOD - inv[i] * res[n - i] % MOD + MOD) % MOD;
    for (int i = 1; i <= n; ++i)
        write(ans[i]), putchar('\n');
    return 0;
}
```