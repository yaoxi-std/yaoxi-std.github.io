---
title: CF710F String Set Queries 题解
date: 2021-11-22 22:28:23
tags: solutions
category: 题解
---

## CF710F String Set Queries 题解

### ~~又卷出来一道黑题哈哈哈~~

### 题面

[题目链接](https://www.luogu.com.cn/problem/CF710F)

### 解法

首先看到多模匹配想到AC自动机。

这个强制在线看起来很麻烦的样子，因为AC自动机必须要离线下来才能build。所以就引入一种新的算法叫做“二进制分组”。

> ### 二进制分组
> 
> ~~这个算法一看名字就很$\log$~~
> 
> 维护一个stack，里面的值都是2的次幂。每次操作在栈顶插入一个1，如果栈顶的两个数相同就将其合并，并改为两个数的和。查询的时候遍历整个stack对每个值进行查询。
> 
> 这样假设每次合并和查询stack中一个值的复杂度都是$O(x)$的（这里$x$指的是栈内当前值的大小）显然查询的复杂度是$O(x)$的，然后插入的复杂度是$O(x\log{n})$，因为每个插入的数只会被合并$\log{n}$次。总复杂度为$O(qx\log{n})$。

而在这道题中，$qx = \sum{|S|} = 3 \times 10^5$，所以显然是能过的。

于是这道题本身并不算难，但是评黑的原因我认为是它**毒瘤卡空间！！！**

关于我代码中卡空间的~~奇技淫巧~~就是将AC自动机的节点开成内存池，动态分配（代码中`node* malloc_p()`的作用就在此）。还有就是注意AC自动机在构建的时候把$cnt$数组预处理好，这样就不用每次跳$fail$指针了（我代码一开始就在这里TLE了）。

### AC代码

```cpp
/**
 * @file:           CF710F.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/CF710F
*/
// #pragma GCC optimize ("O2")
#include <bits/stdc++.h>
using namespace std;
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
using lli = long long;
const int MAXN = 1e6 + 10;
const int MAXK = 22;
const int INFI = 0x3f3f3f3f;
bool m_be;
struct node {
    int cnt, fail, nxt[26];
    void clear() {
        cnt = fail = 0;
        fill(nxt, nxt + 26, 0);
    }
};
int ntot, ntop;
node nnd[MAXN];
node *buf[MAXN];
node* malloc_p() {
    return ntop ? buf[ntop--] : &nnd[++ntot];
}
struct ac_automaton {
    int tot;
    node *nd[MAXN];
    void init() {
        nd[tot = 0] = malloc_p();
    }
    void clear() {
        for (int i = 0; i <= tot; ++i)
            nd[i]->clear(), buf[++ntop] = nd[i];
        nd[tot = 0] = malloc_p();
    }
    void insert(const char *s) {
        int rt = 0;
        for (int i = 0; s[i]; ++i) {
            if (!nd[rt]->nxt[s[i] - 'a'])
                nd[rt]->nxt[s[i] - 'a'] = (nd[++tot] = malloc_p(), tot);
            rt = nd[rt]->nxt[s[i] - 'a'];
        }
        ++nd[rt]->cnt;
    }
    void build() {
        static queue<int> que;
        while (!que.empty())
            que.pop();
        for (int i = 0; i < 26; ++i)
            if (nd[0]->nxt[i])
                que.push(nd[0]->nxt[i]);
        while (!que.empty()) {
            int u = que.front();
            que.pop();
            nd[u]->cnt += nd[nd[u]->fail]->cnt;
            for (int i = 0; i < 26; ++i) {
                if (nd[u]->nxt[i]) {
                    nd[nd[u]->nxt[i]]->fail = nd[nd[u]->fail]->nxt[i];
                    que.push(nd[u]->nxt[i]);
                } else {
                    nd[u]->nxt[i] = nd[nd[u]->fail]->nxt[i];
                }
            }
        }
    }
    lli query(char *s) {
        lli ret = 0, p = 0;
        for (int i = 0; s[i]; ++i) {
            p = nd[p]->nxt[s[i] - 'a'];
            ret += nd[p]->cnt;
        }
        return ret;
    }
};
struct group {
    string dat[MAXN];
    ac_automaton ac[MAXK];
    int n, top, sl[MAXK], sr[MAXK];
    void init() {
        for (int i = 1; i < MAXK; ++i)
            ac[i].init();
    }
    void insert(char *s) {
        dat[++n] = s;
        ++top, sl[top] = n, sr[top] = n;
        ac[top].clear(), ac[top].insert(s), ac[top].build();
        while (top > 1 && sr[top] - sl[top] == sr[top - 1] - sl[top - 1]) {
            sr[top - 1] = sr[top], ac[top--].clear();
            ac[top].clear();
            for (int i = sl[top]; i <= sr[top]; ++i)
                ac[top].insert(dat[i].c_str());
            ac[top].build();
        }
    }
    lli query(char *s) {
        lli ret = 0;
        for (int i = 1; i <= top; ++i)
            ret += ac[i].query(s);
        return ret;
    }
};
int m, opt;
char s[MAXN];
group add, sub;
bool m_ed;
signed main() {
    debug("memory = %.5lfMB", (&m_ed - &m_be) / 1024.0 / 1024.0);
    scanf("%d", &m);
    int mm = m;
    add.init(), sub.init();
    while (m--) {
        scanf("%d%s", &opt, s + 1);
        if (opt == 1) {
            add.insert(s + 1);
        } else if (opt == 2) {
            sub.insert(s + 1);
        } else {
            printf("%lld\n", add.query(s + 1) - sub.query(s + 1));
            fflush(stdout);
        }
    }
    return 0;
}
```