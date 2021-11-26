---
title: BZOJ2720 列队春游 题解
tags: solutions
category: 题解
date: 2021-11-26 17:15:39
---

## BZOJ2720 列队春游 题解

### 题面

[题目链接](https://darkbzoj.tk/problem/2720)

### 解法

对于这种全排列的题目发现不太好用$dp$。仔细观察发现对于每个人的期望视野都是独立的，可以直接相加，所以直接算$E(c)$表示有$c$个人的高度小于该同学时该同学的期望视野。答案显然$\sum\limits_{i=1}^{n}{E(c_i)}$。

考虑如何求$E(c)$。根据期望公式易得$E(c) = \sum\limits_{i=1}^{c}{i \cdot P(i)}$。

但是$P(i)$不好求而$P(\ge i)$相对好求，于是继续观察这个等式，发现每个$P(i)$都被计算了恰好$i$次，所以$E(c)$就可以表示为如下：

$$
    E(c) = \sum_{i=1}^{c}{P(\ge i)}
$$

这样就只需要考虑概率而不需要考虑期望了。

接下来考虑$P(\ge i)$。既然视野$\ge i$，那么至少要有$i-1$个高度$\lt h$的人站在前面，于是$P(\ge i)$表示如下：

$$
\begin{align}
        P(\ge i) &= \frac{n-i+1}{n} \cdot \frac{c^{\underline{i-1}}}{(n-1)^{\underline{i-1}}} \\
	    &= \frac{n-i+1}{n} \cdot \frac{c!(n-i)!}{(n-1)!(c-i+1)!} \\
	    &= \frac{c!}{n!} \cdot \frac{(n-i+1)!}{(c-i+1)!}
    \end{align}
$$

于是将该式代入到$E(c)$中得到：

$$
    \begin{align}
        E(c) &= \sum_{i=1}^{c}{i \cdot P(i)} \\
        &= \sum_{i=1}^{c}{P(\ge i)} \\
        &= \sum_{i=1}^{c}{\frac{c!}{n!} \cdot \frac{(n-i+1)!}{(c-i+1)!}} \\
        &= \frac{c!}{n!}\sum_{i=1}^{c}{\frac{(n-i+1)!}{(c-i+1)!}} \\
        &= \frac{c!(n-c)!}{n!}\sum_{i=1}^{c}{\binom{n-i+1}{c-i+1}} \\
        &= \frac{c!(n-c)!}{n!}\sum_{i=0}^{c-1}{\binom{n-c+i+1}{i+1}}
    \end{align}
$$

由于$\sum\limits_{i=0}^{k}{\binom{n+i}{m+i}} = \binom{n+k+1}{m+k}$（易证），所以可以进一步将$E(c)$的$\Sigma$优化掉。

$$
    \begin{align}
        E(c) &= \frac{c!(n-c)!}{n!}\sum_{i=0}^{c-1}{\binom{n-c+i+1}{i+1}} \\
        &= \frac{c!(n-c)!}{n!} \cdot \binom{n+1}{c} \\
        &= \frac{c!(n-c)!}{n!} \cdot \frac{(n+1)!}{c!(n-c+1)!} \\
        &= \frac{n+1}{n-c+1}
    \end{align}
$$

所以得到结论

$$
    E(c) = \frac{n+1}{n-c+1}
$$

于是最终的答案就变成了

$$
    ans = \sum_{i=1}^{n}{\frac{n+1}{n-c+1}}
$$

$O(n)$求解即可。

### AC代码

```cpp
/**
 * @file:           BZOJ2720.cpp
 * @author:         yaoxi-std
 * @url:            https://darkbzoj.tk/problem/2720
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
const int MAXN = 1e5 + 10;
const int INFL = 0x3f3f3f3f3f3f3f3f;
using ldb = long double;
int n, h[MAXN], cnt[MAXN];
signed main() {
    read(n);
    for (int i = 1; i <= n; ++i)
        ++cnt[read(h[i])];
    for (int i = 1; i <= 1000; ++i)
        cnt[i] += cnt[i - 1];
    ldb ans = 0;
    for (int i = 1; i <= n; ++i)
        ans += (ldb)(n + 1) / (n - cnt[h[i] - 1] + 1);
    printf("%.2Lf\n", ans);
    return 0;
}
```