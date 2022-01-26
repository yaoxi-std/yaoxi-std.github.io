---
title: UVA11107 Life Forms
tags: solutions
category: 题解
date: 2022-01-26 19:32:25
---

## UVA11107 Life Forms
<!-- more -->

### 题面

[题目链接](https://www.luogu.com.cn/problem/UVA11107)

### 解法

相同子串想到用后缀数组。

考虑将所有串用`$`连接。这样在$height$数组上用ST表维护区间最小值（即区间LCS），第一遍扫描用双指针取$\left\lfloor\dfrac n 2\right\rfloor+1$个不同串中的数字，求出答案的长度，第二遍扫描出长度为$ans$的子串，经过$hash$去重后输出即可。我的写法需要特判$n=1$。

时间复杂度$O(m \log m)$，其中$m=\sum |S|$。

~~代码写的极丑极不优雅~~

### AC代码

```cpp
/**
 * @file:           UVA11107.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/UVA11107
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
const int MAXN = 120;
const int MAXM = 1e3 + 10;
const int MAXK = 1e5 + 150;
const int LOGK = 19;
const int INF = 0x3f3f3f3f3f3f3f3f;
struct SuffixArray {
    int n, sa[MAXK], rk[MAXK], tp[MAXK], ht[MAXK], he[MAXK];
    void radix_sort(int m) {
        static int buc[MAXK];
        for (int i = 0; i <= m; ++i)
            buc[i] = 0;
        for (int i = 1; i <= n; ++i)
            buc[rk[i]]++;
        for (int i = 1; i <= m; ++i)
            buc[i] += buc[i - 1];
        for (int i = n; i >= 1; --i)
            sa[buc[rk[tp[i]]]--] = tp[i];
    }
    void init(int n, char* s) {
        this->n = n;
        int m = 128;
        for (int i = 1; i <= n; ++i)
            rk[i] = s[i], tp[i] = i;
        radix_sort(m);
        for (int p = 0, w = 1; p < n; m = p, w <<= 1) {
            p = 0;
            for (int i = 1; i <= w; ++i)
                tp[++p] = n - w + i;
            for (int i = 1; i <= n; ++i)
                if (sa[i] > w)
                    tp[++p] = sa[i] - w;
            radix_sort(m);
            copy(rk + 1, rk + n + 1, tp + 1);
            rk[sa[1]] = p = 1;
            for (int i = 2; i <= n; ++i) {
                if (tp[sa[i - 1]] == tp[sa[i]] && tp[sa[i - 1] + w] == tp[sa[i] + w])
                    rk[sa[i]] = p;
                else
                    rk[sa[i]] = ++p;
            }
        }
        for (int i = 1, k = 0; i <= n; ++i) {
            if (k)
                k--;
            while (s[i + k] == s[sa[rk[i] - 1] + k])
                k++;
            ht[i] = k;
        }
        for (int i = 1; i <= n; ++i)
            he[i] = ht[sa[i]];
    }
};
int n, lg2[MAXK], mn[MAXK][LOGK];
int li[MAXN], ri[MAXN], id[MAXK], sz[MAXK], cnt[MAXN];
char s[MAXN][MAXM], str[MAXK];
bool vis[MAXN];
unordered_map<int, bool> outed;
SuffixArray sa;
int query(int l, int r) {
    int k = lg2[r - l];
    return min(mn[l + 1][k], mn[r - (1 << k) + 1][k]);
}
signed main() {
    for (int i = 2; i < MAXK; ++i)
        lg2[i] = (i & (i - 1)) ? lg2[i - 1] : lg2[i - 1] + 1;
    int tot = 0;
    while (true) {
        if (read(n) == 0)
            break;
        if (tot++)
            putchar('\n');
        for (int i = 1; i <= n; ++i)
            scanf("%s", s[i]);
        if (n == 1) {
            printf("%s\n", s[1]);
            continue;
        }
        int len = 1;
        for (int i = 1; i <= n; ++i) {
            int t = strlen(s[i]);
            li[i] = len;
            ri[i] = len + t - 1;
            copy(s[i], s[i] + t, str + len);
            str[len + t] = '$';
            len += t + 1;
        }
        str[--len] = '\0';
        sa.init(len, str);
        for (int i = 1; i <= len; ++i) {
            int p = upper_bound(li + 1, li + n + 1, sa.sa[i]) - li - 1;
            if (li[p] <= sa.sa[i] && sa.sa[i] <= ri[p])
                id[i] = p, sz[i] = ri[p] - sa.sa[i] + 1;
            else
                id[i] = 0, sz[i] = 0;
        }
        for (int i = 1; i <= len; ++i)
            mn[i][0] = min({sa.he[i], sz[i - 1], sz[i]});
        for (int j = 1; j < LOGK; ++j) {
            for (int i = 1; i + (1 << j) - 1 <= len; ++i) {
                mn[i][j] = min(mn[i][j - 1], mn[i + (1 << (j - 1))][j - 1]);
            }
        }
        int cur = 0, ans = 0;
        fill(cnt, cnt + n + 1, 0);
        for (int l = 1, r = 1; r <= len; ++r) {
            while (id[l] == 0)
                ++l;
            while (id[r] == 0)
                ++r;
            if (cnt[id[r]]++ == 0)
                ++cur;
            while (cur > n / 2 + 1) {
                if (--cnt[id[l]] == 0)
                    --cur;
                ++l;
            }
            while (l < r && cnt[id[l]] > 1)
                --cnt[id[l]], ++l;
            if (cur == n / 2 + 1)
                ans = max(ans, query(l, r));
        }
        cur = 0;
        fill(cnt, cnt + n + 1, 0);
        if (ans == 0) {
            puts("?");
        } else {
            outed.clear();
            for (int l = 1, r = 1; r <= len; ++r) {
                while (id[l] == 0)
                    ++l;
                while (id[r] == 0)
                    ++r;
                if (cnt[id[r]]++ == 0)
                    ++cur;
                while (cur > n / 2 + 1) {
                    if (--cnt[id[l]] == 0)
                        --cur;
                    ++l;
                }
                while (l < r && cnt[id[l]] > 1)
                    --cnt[id[l]], ++l;
                if (cur == n / 2 + 1 && query(l, r) == ans) {
                    int h = 0;
                    for (int i = 0; i < ans; ++i)
                        h = (h * 12345 + str[sa.sa[r] + i]) % 19260817;
                    if (outed[h])
                        continue;
                    outed[h] = true;
                    for (int i = 0; i < ans; ++i)
                        putchar(str[sa.sa[r] + i]);
                    putchar('\n');
                }
            }
        }
        debug("%lld", ans);
    }
    return 0;
}
```