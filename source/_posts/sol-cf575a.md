---
title: CF575A Fibonotci 题解
tags: solutions
category: 题解
date: 2021-11-24 20:56:30
---

## CF575A Fibonotci 题解

### 题面

[题目链接](https://www.luogu.com.cn/problem/CF575A)

### 解法

$K \le 10^{18}$ 显然矩阵快速幂优化。矩阵转移方程如下：

$$
    \begin{bmatrix}
        f_i & f_{i-1}
    \end{bmatrix}
    =
    \begin{bmatrix}
        f_{i-1} & f_{i-2}
    \end{bmatrix}
    \begin{pmatrix}
        s_{i-1} & 1 \\
        s_{i-2} & 0
    \end{pmatrix}
$$

并套路地设

$$
    M_i =
    \begin{pmatrix}
        s_{i-1} & 1 \\
        s_{i-2} & 0
    \end{pmatrix}
$$

最终答案即为

$$
    \begin{bmatrix}
        1 & 0
    \end{bmatrix}
    \times
    \prod_{i=1}^{k}{
        \begin{pmatrix}
            s_{i-1} & 1 \\
            s_{i-2} & 0
        \end{pmatrix}
    }
    =
    \begin{bmatrix}
        1 & 0
    \end{bmatrix}
    \times
    \prod_{i=1}^{k}{M_i}
$$

由于函数大部分具有周期性，不妨先按照分成若干个类似$[i\cdot n, (i+1)\cdot n)$的区间分别处理。

对于未修改过的区间直接预处理$[0,n)$的矩阵乘积并快速幂计算。

考虑修改的区间。为了避免对一个$s_i$的修改影响到两个不同的区间，可以先将对$s_i$的修改映射到对矩阵$M_{i+1}$和$M_{i+2}$的修改。然后发现处理一个区间时需要多次单点修改和一次区间查询，用线段树维护即可。

需要注意的是一些特判（基本上是$k \lt n$的情况）。

时间复杂度$O((n + m) (\log{n} + \log{k}))$。

~~特判不取模，爆零两行泪/kk~~

### AC代码

```cpp
/**
 * @file:           CF575A.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/CF575A
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
using pii = pair<int, int>;
const int MAXN = 5e4 + 10;
const int INFL = 0x3f3f3f3f3f3f3f3f;
struct node {
    int t, s1, s2;
};
int n, m, k, p, s[MAXN];
pii a[MAXN];
node b[MAXN * 2];
unordered_map<int, int> mp;
int add(int x, int y) {
    x += y;
    return x >= p ? x - p : x;
}
struct matrix {
    int a[2][2];
    matrix() { a[0][0] = a[0][1] = a[1][0] = a[1][1] = 0; }
    matrix(int x) { a[0][0] = a[1][1] = x, a[0][1] = a[1][0] = 0; }
    matrix(int s1, int s2) { a[0][0] = s2, a[0][1] = 1, a[1][0] = s1, a[1][1] = 0; }
    matrix operator*(const matrix &o) const {
        matrix ret;
        for (int i = 0; i < 2; ++i)
            for (int j = 0; j < 2; ++j)
                for (int k = 0; k < 2; ++k)
                    ret.a[i][j] = add(ret.a[i][j], a[i][k] * o.a[k][j] % p);
        return ret;
    }
    friend matrix operator^(matrix x, int y) {
        matrix ret = 1;
        for (; y; y >>= 1, x = x * x)
            if (y & 1) ret = ret * x;
        return ret;
    }
};
#define li (i << 1)
#define ri (i << 1) | 1
#define lson li, l, mid
#define rson ri, mid + 1, r
struct segment_tree {
    matrix nd[MAXN * 4];
    void pushup(int i) {
        nd[i] = nd[li] * nd[ri];
    }
    void update(int i, int l, int r, int p, matrix v) {
        if (l == r)
            return void(nd[i] = v);
        int mid = (l + r) >> 1;
        if (p <= mid)
            update(lson, p, v);
        else
            update(rson, p, v);
        pushup(i);
    }
    matrix query(int i, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr)
            return nd[i];
        int mid = (l + r) >> 1;
        matrix ret = 1;
        if (ql <= mid)
            ret = ret * query(lson, ql, qr);
        if (qr > mid)
            ret = ret * query(rson, ql, qr);
        return ret;
    }
};
segment_tree tr;
signed main() {
    read(k), read(p);
    read(n);
    for (int i = 0; i < n; ++i)
        read(s[i]);
    read(m);
    for (int i = 1; i <= m; ++i)
        read(a[i].first), read(a[i].second);
    sort(a + 1, a + m + 1);
    int cnt = 0;
    for (int i = 1; i <= m; ++i) {
        if (i > 1 && a[i].first + 1 == a[i - 1].first + 2)
            b[++cnt] = {a[i].first + 1, a[i - 1].second, a[i].second};
        if (i == 1 || a[i].first + 1 != a[i - 1].first + 2)
            b[++cnt] = {a[i].first + 1, s[(a[i].first - 1) % n], a[i].second};
        if (i == m || a[i].first + 2 != a[i + 1].first + 1)
            b[++cnt] = {a[i].first + 2, a[i].second, s[(a[i].first + 1) % n]};
    }
    while (cnt && b[cnt].t > k)
        --cnt;
    for (int i = 0; i < n; ++i)
        tr.update(1, 0, n - 1, i, matrix(s[(i + n - 2) % n], s[(i + n - 1) % n]));
    if (k == 0 || k == 1) {
        return write(k % p), putchar('\n'), 0;
    } else if (k < n) {
        matrix ret;
        ret.a[0][0] = 1;
        return write((ret * tr.query(1, 0, n - 1, 2, k)).a[0][0]), putchar('\0'), 0;
    }
    matrix sum = tr.query(1, 0, n - 1, 0, n - 1);
    matrix base = tr.query(1, 0, n - 1, 2, n - 1);
    int pos = 1, pre = 0;
    while (pos <= cnt) {
        int cur = b[pos].t / n;
        base = base * (sum ^ (cur - pre - 1)), pre = cur;
        int cl = max(2ll, cur * n), cr = min(k, cur * n + n - 1), lst = pos;
        while (pos <= cnt && cl <= b[pos].t && b[pos].t <= cr) {
            tr.update(1, 0, n - 1, b[pos].t % n, matrix(b[pos].s1, b[pos].s2));
            ++pos;
        }
        base = base * tr.query(1, 0, n - 1, cl % n, cr % n);
        for (int j = lst; j < pos; ++j)
            tr.update(1, 0, n - 1, b[j].t % n, matrix(s[(b[j].t - 2) % n], s[(b[j].t - 1) % n]));
    }
    int cur = k / n;
    if (pre < cur) {
        base = base * (sum ^ (cur - pre - 1));
        for (int i = cur * n; i <= k; ++i)
            base = base * matrix(s[(i - 2) % n], s[(i - 1) % n]);
    }
    matrix ret;
    ret.a[0][0] = 1;
    ret = ret * base;
    write(ret.a[0][0]), putchar('\n');
    return 0;
}
```