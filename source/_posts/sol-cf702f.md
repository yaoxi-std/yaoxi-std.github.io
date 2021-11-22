---
title: CF702F T-Shirts 题解
date: 2021-11-22 16:24:42
tags: solutions
---

## CF702F T-Shirts 题解

### 题面

[题目链接](https://www.luogu.com.cn/problem/CF702F)

### 解法

首先不难想到朴素的做法，对每个人枚举所有T恤。但是这样显然无法进一步优化。

但是发现可以按顺序枚举所有T恤$i$，对每个人$j$若$v_j \ge c_i$则将$v_j$减去$c_i$，同时将$cnt_j$加一。

下面考虑如何用数据结构优化。我们需要一个可以查找第一个$\ge c_i$并且能支持区间减去$c_i$的数据结构，这个可以用平衡树做到。似乎其他人用的都是FHQ的做法，但我不会FHQ所以只能用splay代替了。

每次操作可以把整个区间分为三个部分：$[0,c_i)$，$[c_i,2c_i)$和$[2c_i,+\infty)$。第一个区间显然不需要操作，第二个区间我们暴力删除并重新插入，第三个区间维护一个tag标记。

这样看起来会T飞，然而来计算一下时间复杂度就会发现，对于一个在$[c_i,2c_i)$中的数每次减去$c_i$，相当于最少每次$\times \frac{1}{2}$，所以一个数$v_i$最多会被暴力修改$\log_2{v_i}$次，所以复杂度是可以接受的。

再来考虑如何在splay上操作。我们找到$c_i$的前驱，记为节点$u$，再找到$2c_i-1$的后继，记为节点$v$，只需要将$u$转到根节点，$v$转到根节点的右儿子，这样$v$和$v$的右儿子都在区间$[2c_i,+\infty)$中，维护tag并懒惰更新；而$v$的左儿子全都在区间$[c_i,2c_i)$中，只需遍历一遍重新插入即可；其他节点都不需要改动。

最后就是每次操作注意顺序，一定要先更新$[c_i,2c_i)$再更新$[2c_i,+\infty)$，不然你会发现懒惰标记打下去平衡树不满足二叉搜索树的性质了（别问我怎么知道的，我就因为这个调了一下午）。

时间复杂度$O(n\log^2{n})$，空间复杂度如果节点重复利用的话可以做到$O(n)$（具体见代码）。

### AC代码

```cpp
/**
 * @file:           2021.11.21-1.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/CF702F
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
const int MAXN = 2e5 + 10;
const int INFL = 0x3f3f3f3f3f3f3f3f;
struct node {
    int val, id, tag, cnt, tac;
    bool operator<(const node &o) const {
        return val == o.val ? id < o.id : val < o.val;
    }
    bool operator==(const node &o) const {
        return val == o.val && id == o.id;
    }
    node& operator+=(int x) {
        val += x, tag += x, ++cnt, ++tac;
        return *this;
    }
    node& operator+=(const node &o) {
        val += o.tag, tag += o.tag;
        cnt += o.tac, tac += o.tac;
        return *this;
    }
};
struct splay_tree {
    node val[MAXN];
    int rt, tot, top, buf[MAXN];
    int siz[MAXN], fa[MAXN], ch[MAXN][2];
    void maintain(int x) { siz[x] = siz[ch[x][0]] + siz[ch[x][1]] + 1; }
    int get(int x) { return x == ch[fa[x]][1]; }
    void clear(int x) { siz[x] = fa[x] = ch[x][0] = ch[x][1] = 0; val[x] = {0, 0, 0, 0, 0}; if (x) buf[++top] = x; }
    int newnode() { return top ? buf[top--] : ++tot; }
    void getdown(int x, int v) { val[x] += v; }
    void pushdown(int x) {
        if (ch[x][0]) val[ch[x][0]] += val[x];
        if (ch[x][1]) val[ch[x][1]] += val[x];
        val[x].tag = val[x].tac = 0;
    }
    void rotate(int x) {
        pushdown(fa[x]), pushdown(x);
        int y = fa[x], z = fa[y], w = get(x);
        ch[y][w] = ch[x][w ^ 1];
        if (ch[x][w ^ 1]) fa[ch[x][w ^ 1]] = y;
        ch[x][w ^ 1] = y, fa[y] = x, fa[x] = z;
        if (z) ch[z][y == ch[z][1]] = x;
        maintain(y), maintain(x);
    }
    void splay(int x, int r = 0) {
        for (int f = fa[x]; f = fa[x], f != r; rotate(x))
            if (fa[f] != r) rotate(get(x) == get(f) ? f : x);
        if (r == 0) rt = x;
    }
    void insert(node k) {
        int cur = rt, f = 0;
        while (cur) {
            pushdown(cur);
            f = cur;
            cur = ch[cur][val[cur] < k];
        }
        cur = newnode();
        val[cur] = k;
        fa[cur] = f;
        if (f) ch[f][val[f] < k] = cur;
        maintain(cur), maintain(f);
        splay(cur);
    }
    int find(node k) {
        int cur = rt;
        while (cur) {
            pushdown(cur);
            if (k == val[cur]) {
                splay(cur);
                return cur;
            }
            cur = ch[cur][val[cur] < k];
        }
        return 0;
    }
    int pre() {
        int cur = ch[rt][0];
        pushdown(rt), pushdown(cur);
        while (ch[cur][1])
            cur = ch[cur][1], pushdown(cur);
        if (cur) splay(cur);
        return cur;
    }
    int nxt() {
        int cur = ch[rt][1];
        pushdown(rt), pushdown(cur);
        while (ch[cur][0])
            cur = ch[cur][0], pushdown(cur);
        if (cur) splay(cur);
        return cur;
    }
    void erase(node k) {
        if (!find(k)) debug("???");
        if (!ch[rt][0] && !ch[rt][1]) {
            clear(rt);
            rt = 0;
        } else if (!ch[rt][0]) {
            int cur = rt;
            rt = ch[cur][1];
            fa[rt] = 0;
            clear(cur);
        } else if (!ch[rt][1]) {
            int cur = rt;
            rt = ch[cur][0];
            fa[rt] = 0;
            clear(cur);
        } else {
            int cur = rt, x = pre();
            fa[ch[cur][1]] = x;
            ch[rt][1] = ch[cur][1];
            clear(cur);
            maintain(rt);
        }
    }
    int prev(node k) {
        insert(k);
        int ret = pre();
        erase(k);
        return ret;
    }
    int next(node k) {
        insert(k);
        int ret = nxt();
        erase(k);
        return ret;
    }
    void dfs(int x, node *vals, int &len) {
        if (!x) return;
        pushdown(x);
        dfs(ch[x][0], vals, len);
        vals[++len] = val[x];
        dfs(ch[x][1], vals, len);
    }
    void solve(int cost) {
        int len = 0;
        static node vals[MAXN];
        int u = prev({cost, 0, 0, 0, 0});
        int v = next({cost * 2, 0, 0, 0, 0});
        splay(u, 0), splay(v, u);
        dfs(ch[v][0], vals, len);
        for (int i = 1; i <= len; ++i) {
            erase(vals[i]);
            vals[i].val -= cost;
            vals[i].cnt++;
            insert(vals[i]);
        }
        val[v].val -= cost, val[v].cnt++;
        if (ch[v][1]) getdown(ch[v][1], -cost);
    }
};
struct shirt {
    int c, q;
    bool operator<(const shirt &o) const {
        return q == o.q ? c < o.c : q > o.q;
    }
};
int n, m, b[MAXN], ans[MAXN];
shirt a[MAXN];
splay_tree splay;
node tmp[MAXN];
signed main() {
    read(n);
    for (int i = 1; i <= n; ++i)
        read(a[i].c), read(a[i].q);
    read(m);
    for (int i = 1; i <= m; ++i)
        read(b[i]);
    splay.insert({-INFL, 0, 0, 0, 0});
    splay.insert({INFL, 0, 0, 0, 0});
    for (int i = 1; i <= m; ++i)
        splay.insert({b[i], i, 0, 0, 0});
    sort(a + 1, a + n + 1);
    for (int i = 1; i <= n; ++i)
        splay.solve(a[i].c);
    int len = 0;
    splay.dfs(splay.rt, tmp, len);
    for (int i = 1; i <= len; ++i)
        ans[tmp[i].id] = tmp[i].cnt;
    for (int i = 1; i <= m; ++i)
        write(ans[i]), putchar(i == m ? '\n' : ' ');
    return 0;
}
```