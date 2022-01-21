---
title: CF297E Mystic Carvings
tags: solutions
category: 题解
date: 2022-01-21 20:23:47
---

## CF297E Mystic Carvings
<!-- more -->

### 题面

[题目链接](https://www.luogu.com.cn/problem/CF297E)

~~偷来hb的题（强烈安利codeforces的friends功能）~~

### 解法

在圆中连接$3$条不在端点处相交的弦，共有以下$5$种情况：

![add](add.png)

![sub](sub.png)

那么第一行的$2$种是合法的，第二行的$3$种不合法。发现第二行的$3$种更加便于计算，于是想到用总数$\binom{n}{3}$减去不合法的。

第二行第一种情况，枚举中间的一条弦，预处理出每条弦的两侧不与其相交的弦的数量，计为$ls_i$和$rs_i$，第一种情况的贡献为

$$
\sum_{i=1}^n ls_i \times rs_i
$$

第二种和第三种情况可以一起考虑。还是先枚举一条弦，之后还需要一条与其相交的和一条与其不相交的就可以构造出第二种或第三种情况。同时每种情况会被计算$2$次，所以第二、三种情况的贡献为

$$
\sum_{i=1}^n \frac{1}{2}(n-ls_i-rs_i-1)(ls_i+rs_i)
$$

至于如何求出$ls_i$和$rs_i$，用树状数组和CDQ分治都可。

时间复杂度$O(n \log n)$。

### AC代码

```cpp
/**
 * @file:           CF297E.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/CF297E
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
const int MAXN = 2e5 + 10;
const int INF = 0x3f3f3f3f3f3f3f3f;
struct line {
    int l, r, id;
    bool operator<(const line& o) const {
        return id < o.id;
    }
};
int n, ls[MAXN], rs[MAXN], cnt[MAXN];
line ln[MAXN];
void solve1(int l, int r) {
    if (l == r)
        return;
    int mid = (l + r) >> 1;
    solve1(l, mid);
    solve1(mid + 1, r);
    int pos = l;
    for (int i = mid + 1; i <= r; ++i) {
        while (pos <= mid && ln[pos].r < ln[i].r)
            pos++;
        ls[ln[i].id] += pos - l;
    }
    inplace_merge(ln + l, ln + mid + 1, ln + r + 1, [](const line& lhs, const line& rhs) {
        return lhs.r < rhs.r;
    });
}
void solve2(int l, int r) {
    if (l == r)
        return;
    int mid = (l + r) >> 1;
    solve2(l, mid);
    solve2(mid + 1, r);
    int pos = l;
    for (int i = mid + 1; i <= r; ++i) {
        while (pos <= mid && ln[pos].r > ln[i].r)
            pos++;
        rs[ln[i].id] += pos - l;
    }
    inplace_merge(ln + l, ln + mid + 1, ln + r + 1, [](const line& lhs, const line& rhs) {
        return lhs.r > rhs.r;
    });
}
signed main() {
    read(n);
    for (int i = 1; i <= n; ++i) {
        read(ln[i].l), read(ln[i].r);
        if (ln[i].l > ln[i].r)
            swap(ln[i].l, ln[i].r);
        ln[i].id = i;
    }
    sort(ln + 1, ln + n + 1, [](const line& lhs, const line& rhs) {
        return lhs.l > rhs.l;
    });
    solve1(1, n);
    sort(ln + 1, ln + n + 1, [](const line& lhs, const line& rhs) {
        return lhs.l < rhs.l;
    });
    solve2(1, n);
    fill(cnt + 1, cnt + n + n + 1, 0);
    for (int i = 1; i <= n; ++i)
        ++cnt[ln[i].r];
    for (int i = 1; i <= n + n; ++i)
        cnt[i] += cnt[i - 1];
    for (int i = 1; i <= n; ++i) {
        rs[ln[i].id] += cnt[ln[i].l];
    }
    fill(cnt + 1, cnt + n + n + 1, 0);
    for (int i = 1; i <= n; ++i)
        ++cnt[ln[i].l];
    for (int i = n + n; i >= 1; --i)
        cnt[i] += cnt[i + 1];
    for (int i = 1; i <= n; ++i) {
        rs[ln[i].id] += cnt[ln[i].r];
    }
    sort(ln + 1, ln + n + 1);
    int ans = 0;
    for (int i = 1; i <= n; ++i) {
        ans += ls[i] * rs[i] * 2;
        ans += (n - ls[i] - rs[i] - 1) * (ls[i] + rs[i]);
    }
    ans = n * (n - 1) * (n - 2) / 6 - ans / 2;
    write(ans), putchar('\n');
    return 0;
}
```

这年头OJ数组越界都不报RE报WA的吗？