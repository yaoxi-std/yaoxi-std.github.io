---
title: 云剪贴板
date: 2021-11-21 17:47:26
type: clip-board
tag: important
comments: false
---

# 板子
```cpp
/**
 * @file:           {}.cpp
 * @author:         yaoxi-std
 * @url:            https://{}
*/
// #pragma GCC optimize ("O2")
// #pragma GCC optimize ("Ofast", "inline", "-ffast-math")
// #pragma GCC target ("avx,sse2,sse3,sse4,mmx")
#include <bits/stdc++.h>
using namespace std;
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
using ll = long long;
const int MAXN = 1e5 + 10;
const int INF = 0x3f3f3f3f;

signed main() {
    // resetIO();
    
    return 0;
}
```

# 板子-vscode版本
```json
"CPP Base": {
    "prefix": "cpp_base",
    "body": [
        "/**",
        " * @file:           ${1:${TM_FILENAME_BASE}}.cpp",
        " * @author:         yaoxi-std",
        " * @url:            ${2}",
        "*/",
        "// #pragma GCC optimize (\"O2\")",
        "// #pragma GCC optimize (\"Ofast\", \"inline\", \"-ffast-math\")",
        "// #pragma GCC target (\"avx,sse2,sse3,sse4,mmx\")",
        "#include <bits/stdc++.h>",
        "using namespace std;",
        "#define resetIO(x) \\",
        "    freopen(#x \".in\", \"r\", stdin), freopen(#x \".out\", \"w\", stdout)",
        "#define debug(fmt, ...) \\",
        "    fprintf(stderr, \"[%s:%d] \" fmt \"\\n\", __FILE__, __LINE__, ##__VA_ARGS__)",
        "template <class _Tp>",
        "inline _Tp& read(_Tp& x) {",
        "    bool sign = false;",
        "    char ch = getchar();",
        "    long double tmp = 1;",
        "    for (; !isdigit(ch); ch = getchar())",
        "        sign |= (ch == '-');",
        "    for (x = 0; isdigit(ch); ch = getchar())",
        "        x = x * 10 + (ch ^ 48);",
        "    if (ch == '.')",
        "        for (ch = getchar(); isdigit(ch); ch = getchar())",
        "            tmp /= 10.0, x += tmp * (ch ^ 48);",
        "    return sign ? (x = -x) : x;",
        "}",
        "template <class _Tp>",
        "inline void write(_Tp x) {",
        "    if (x < 0)",
        "        putchar('-'), x = -x;",
        "    if (x > 9)",
        "        write(x / 10);",
        "    putchar((x % 10) ^ 48);",
        "}",
        "using ll = long long;",
        "const int MAXN = 1e5 + 10;",
        "const int INF = 0x3f3f3f3f;",
        "",
        "signed main() {",
        "    // resetIO();",
        "    $0",
        "    return 0;",
        "}"
    ]
}
```

# 火车头（有用的东西）
```cpp
#pragma GCC optimize(3)
#pragma GCC target("avx")
#pragma GCC optimize("Ofast")
#pragma GCC optimize("inline")
#pragma GCC optimize("-fgcse")
#pragma GCC optimize("-fgcse-lm")
#pragma GCC optimize("-fipa-sra")
#pragma GCC optimize("-ftree-pre")
#pragma GCC optimize("-ftree-vrp")
#pragma GCC optimize("-fpeephole2")
#pragma GCC optimize("-ffast-math")
#pragma GCC optimize("-fsched-spec")
#pragma GCC optimize("unroll-loops")
#pragma GCC optimize("-falign-jumps")
#pragma GCC optimize("-falign-loops")
#pragma GCC optimize("-falign-labels")
#pragma GCC optimize("-fdevirtualize")
#pragma GCC optimize("-fcaller-saves")
#pragma GCC optimize("-fcrossjumping")
#pragma GCC optimize("-fthread-jumps")
#pragma GCC optimize("-funroll-loops")
#pragma GCC optimize("-fwhole-program")
#pragma GCC optimize("-freorder-blocks")
#pragma GCC optimize("-fschedule-insns")
#pragma GCC optimize("inline-functions")
#pragma GCC optimize("-ftree-tail-merge")
#pragma GCC optimize("-fschedule-insns2")
#pragma GCC optimize("-fstrict-aliasing")
#pragma GCC optimize("-fstrict-overflow")
#pragma GCC optimize("-falign-functions")
#pragma GCC optimize("-fcse-skip-blocks")
#pragma GCC optimize("-fcse-follow-jumps")
#pragma GCC optimize("-fsched-interblock")
#pragma GCC optimize("-fpartial-inlining")
#pragma GCC optimize("no-stack-protector")
#pragma GCC optimize("-freorder-functions")
#pragma GCC optimize("-findirect-inlining")
#pragma GCC optimize("-fhoist-adjacent-loads")
#pragma GCC optimize("-frerun-cse-after-loop")
#pragma GCC optimize("inline-small-functions")
#pragma GCC optimize("-finline-small-functions")
#pragma GCC optimize("-ftree-switch-conversion")
#pragma GCC optimize("-foptimize-sibling-calls")
#pragma GCC optimize("-fexpensive-optimizations")
#pragma GCC optimize("-funsafe-loop-optimizations")
#pragma GCC optimize("inline-functions-called-once")
#pragma GCC optimize("-fdelete-null-pointer-checks")
```

# 短小精悍的火车头（雾
```cpp
#pragma GCC optimize ("O2")
#pragma GCC optimize ("Ofast", "inline", "-ffast-math")
#pragma GCC target ("avx,sse2,sse3,sse4,mmx")
```

# fread & fwrite (卡常用)
```cpp
namespace fastio {
const int MAXBUF = 1 << 23;
char buf[MAXBUF], *p1 = buf, *p2 = buf;
char pbuf[MAXBUF], *pp = pbuf;
inline char getc() { return (p1 == p2) && (p2 = (p1 = buf) + fread(buf, 1, MAXBUF, stdin)), *p1++; }
inline void putc(char c) { (pp == pbuf + MAXBUF) && (fwrite(pbuf, 1, MAXBUF, stdout), pp = pbuf), *pp++ = c; }
inline void print_final() { fwrite(pbuf, 1, pp - pbuf, stdout), pp = pbuf; }
};  // namespace fastio
using namespace fastio;
```

# 算法板子

**不要抄板子，要自己写，只是防止自己忘记**

也就是说每次考前要复习一下这些板子

## {% post_link 'sol-p3803' 'FFT && NTT' %}

```cpp
using comp = complex<double>;
const int MAXN = 1 << 20;
const int INF = 0x3f3f3f3f;
const int MOD = 998244353;
// const int MOD = 1004535809;
// const int MOD = 469762049;
const double PI = acos(-1);
int add(int x, int y);
int sub(int x, int y);
int qpow(int x, int y, int p = MOD);
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
void ntt(int* f, int len, int on) {
    change(f, len);
    for (int h = 2; h <= len; h <<= 1) {
        int gn = qpow(3, (MOD - 1) / h);
        for (int j = 0; j < len; j += h) {
            int g = 1;
            for (int k = j; k < j + h / 2; ++k) {
                int u = f[k], t = g * f[k + h / 2] % MOD;
                f[k] = add(u, t), f[k + h / 2] = sub(u, t);
                g = g * gn % MOD;
            }
        }
    }
    if (on == -1) {
        reverse(f + 1, f + len);
        int inv = qpow(len, MOD - 2);
        for (int i = 0; i < len; ++i)
            f[i] = (f[i] * inv) % MOD;
    }
}
```

## 多项式全家桶

```cpp
const int MAXN = 1 << 21;
const int INF = 0x3f3f3f3f;
const int MOD = 998244353;
namespace polynomial {
inline int add(int x, int y) {
    x += y;
    return x >= MOD ? x - MOD : x;
}
inline int sub(int x, int y) {
    x -= y;
    return x < 0 ? x + MOD : x;
}
inline int qpow(int x, int y, int p = MOD) {
    int ret = 1;
    for (; y; y >>= 1, x = 1ll * x * x % p)
        if (y & 1)
            ret = 1ll * ret * x % p;
    return ret;
}
template <class _Tp>
void change(_Tp* f, int len) {
    static int rev[MAXN] = {};
    for (int i = rev[0] = 0; i < len; ++i) {
        rev[i] = rev[i >> 1] >> 1;
        if (i & 1)
            rev[i] |= len >> 1;
    }
    for (int i = 0; i < len; ++i)
        if (i < rev[i])
            swap(f[i], f[rev[i]]);
}
void ntt(int* f, int len, int on) {
    change(f, len);
    for (int h = 2; h <= len; h <<= 1) {
        int gn = qpow(3, (MOD - 1) / h);
        for (int j = 0; j < len; j += h) {
            int g = 1;
            for (int k = j; k < j + h / 2; ++k) {
                int u = f[k], t = 1ll * g * f[k + h / 2] % MOD;
                f[k] = add(u, t), f[k + h / 2] = sub(u, t);
                g = 1ll * g * gn % MOD;
            }
        }
    }
    if (on == -1) {
        reverse(f + 1, f + len);
        int inv = qpow(len, MOD - 2);
        for (int i = 0; i < len; ++i)
            f[i] = 1ll * f[i] * inv % MOD;
    }
}
int polymul(const int* f, int n, const int* g, int m, int* ans) {
    static int tf[MAXN] = {}, tg[MAXN] = {};
    int len = 1;
    while (len < n + m - 1)
        len <<= 1;
    copy(f, f + n, tf);
    fill(tf + n, tf + len, 0);
    copy(g, g + m, tg);
    fill(tg + m, tg + len, 0);
    ntt(tf, len, 1);
    ntt(tg, len, 1);
    for (int i = 0; i < len; ++i)
        tf[i] = 1ll * tf[i] * tg[i] % MOD;
    ntt(tf, len, -1);
    copy(tf, tf + n + m - 1, ans);
    return n + m - 1;
}
int polyinv(const int* f, int n, int* ans) {
    static int tmp[MAXN] = {};
    int len = 1;
    while (len < n)
        len <<= 1;
    fill(ans, ans + len + len, 0);
    ans[0] = qpow(f[0], MOD - 2);
    for (int h = 2; h <= len; h <<= 1) {
        copy(f, f + h, tmp);
        fill(tmp + h, tmp + h + h, 0);
        ntt(tmp, h + h, 1);
        ntt(ans, h + h, 1);
        for (int i = 0; i < h + h; ++i)
            ans[i] = 1ll * ans[i] * (2 - 1ll * ans[i] * tmp[i] % MOD + MOD) % MOD;
        ntt(ans, h + h, -1);
        fill(ans + h, ans + h + h, 0);
    }
    return n;
}
int derivation(const int* f, int n, int* ans) {
    for (int i = 0; i < n - 1; ++i)
        ans[i] = 1ll * f[i + 1] * (i + 1) % MOD;
    return ans[n - 1] = 0, n - 1;
}
int integral(const int* f, int n, int* ans) {
    for (int i = n; i >= 1; --i)
        ans[i] = 1ll * f[i - 1] * qpow(i, MOD - 2) % MOD;
    return ans[0] = 0, n + 1;
}
int ln(const int* f, int n, int* ans) {
    static int tf[MAXN] = {}, tg[MAXN] = {};
    derivation(f, n, tf);
    polyinv(f, n, tg);
    polymul(tf, n - 1, tg, n, ans);
    integral(ans, n - 1, ans);
    fill(ans + n, ans + n + n, 0);
    return n;
}
int exp(const int* f, int n, int* ans) {
    static int tmp[MAXN] = {};
    ans[0] = 1, ans[1] = 0;
    for (int h = 2; h <= (n << 1); h <<= 1) {
        ln(ans, h, tmp);
        for (int i = 0; i < h; ++i)
            tmp[i] = add(i == 0, sub(f[i], tmp[i]));
        polymul(ans, h, tmp, h, ans);
    }
    return n;
}
};  // namespace polynomial
using namespace polynomial;
```

## 虚树

```cpp
void build_vtr() {
    sort(s + 1, s + k + 1, [](int x, int y) {
        return id[x] < id[y];
    });
    sta[top = 1] = 1, vtr.head[1] = -1, vtr.tot = 0;
    for (int i = 1; i <= k; ++i) {
        if (s[i] == 1)
            continue;
        int l = lca(sta[top], s[i]);
        while (id[l] <= id[sta[top - 1]])
            add_vedge(sta[top - 1], sta[top]), --top;
        if (sta[top] != l)
            vtr.head[l] = -1, add_vedge(l, sta[top]), sta[top] = l;
        vtr.head[s[i]] = -1, sta[++top] = s[i];
    }
    for (int i = 1; i < top; ++i)
        add_vedge(sta[i], sta[i + 1]);
}
```

## 圆方树

```cpp
void tarjan(int u) {
    dfn[u] = low[u] = ++dfc;
    sta[++top] = u;
    for (int i = g.head[u]; ~i; i = g.nxt[i]) {
        int v = g.edge[i].v;
        if (!dfn[v]) {
            tarjan(v);
            low[u] = min(low[u], low[v]);
            if (dfn[u] == low[v]) {
                ++bcc;
                for (int x = 0; x != v; --top) {
                    x = sta[top];
                    tr.addedge(bcc, x);
                    tr.addedge(x, bcc);
                }
                tr.addedge(bcc, u);
                tr.addedge(u, bcc);
            }
        } else {
            low[u] = min(low[u], dfn[v]);
        }
    }
}
```

## Splay

```cpp
struct Splay {
    int rt, tot, val[MAXN], cnt[MAXN], siz[MAXN], fa[MAXN], ch[MAXN][2];
    void maintain(int x) { siz[x] = siz[ch[x][0]] + siz[ch[x][1]] + cnt[x]; }
    int get(int x) { return x == ch[fa[x]][1]; }
    void clear(int x) { val[x] = cnt[x] = siz[x] = fa[x] = ch[x][0] = ch[x][1] = 0; }
    void rotate(int x) {
        int y = fa[x], z = fa[y], w = get(x);
        ch[y][w] = ch[x][w ^ 1];
        if (ch[x][w ^ 1])
            fa[ch[x][w ^ 1]] = y;
        ch[x][w ^ 1] = y;
        fa[y] = x, fa[x] = z;
        if (z) ch[z][y == ch[z][1]] = x;
        maintain(y);
        maintain(x);
    }
    void splay(int x) {
        for (int f = fa[x]; f = fa[x], f; rotate(x))
            if (fa[f]) rotate(get(x) == get(f) ? f : x);
        rt = x;
    }
    void insert(int k) {
        int cur = rt, f = 0;
        while (cur) {
            if (val[cur] == k) {
                ++cnt[cur];
                maintain(cur);
                maintain(f);
                splay(cur);
                return;
            }
            f = cur;
            cur = ch[cur][val[cur] < k];
        }
        val[++tot] = k;
        ++cnt[tot];
        fa[tot] = f;
        if (f) ch[f][val[f] < k] = tot;
        maintain(tot);
        maintain(f);
        splay(tot);
    }
    int rank(int k) {
        int cur = rt, ret = 1;
        while (cur) {
            if (k < val[cur]) {
                cur = ch[cur][0];
            } else {
                ret += siz[ch[cur][0]];
                if (k == val[cur]) {
                    splay(cur);
                    return ret;
                }
                ret += cnt[cur];
                cur = ch[cur][1];
            }
        }
        return ret;
    }
    int kth(int k) {
        int cur = rt;
        while (cur) {
            if (k <= siz[ch[cur][0]]) {
                cur = ch[cur][0];
            } else {
                k -= siz[ch[cur][0]];
                if (k <= cnt[cur]) {
                    splay(cur);
                    return val[cur];
                }
                k -= cnt[cur];
                cur = ch[cur][1];
            }
        }
        return 0;
    }
    int pre() {
        int cur = ch[rt][0];
        while (ch[cur][1])
            cur = ch[cur][1];
        if (cur) splay(cur);
        return cur;
    }
    int nxt() {
        int cur = ch[rt][1];
        while (ch[cur][0])
            cur = ch[cur][0];
        if (cur) splay(cur);
        return cur;
    }
    void erase(int k) {
        rank(k);
        if (cnt[rt] > 1) {
            --cnt[rt];
            maintain(rt);
        } else if (!ch[rt][0] && !ch[rt][1]) {
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
            ch[x][1] = ch[cur][1];
            clear(cur);
            maintain(rt);
        }
    }
};
```

## 后缀数组 suffix array
```cpp
struct SuffixArray {
    int n, sa[MAXN], rk[MAXN], tp[MAXN], ht[MAXN], he[MAXN];
    void clear() {
        fill(sa, sa + n + 1, 0);
        fill(rk, rk + n + 1, 0);
        fill(tp, tp + n + 1, 0);
        fill(ht, ht + n + 1, 0);
        fill(he, he + n + 1, 0);
        n = 0;
    }
    void radix_sort(int m) {
        static int buc[MAXN];
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
        int m = 200;
        for (int i = 1; i <= n; ++i)
            rk[i] = s[i] + 1, tp[i] = i;
        radix_sort(m);
        for (int w = 1, p = 0; p < n; m = p, w <<= 1) {
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
            ht[i] = he[rk[i]] = k;
        }
    }
};
```

## Link Cut Tree
居然比Splay短！
```cpp
struct LCT {
    int fa[MAXN], ch[MAXN][2];
    int val[MAXN], sum[MAXN], tag[MAXN];
    void pushup(int x) { sum[x] = sum[ch[x][0]] ^ sum[ch[x][1]] ^ val[x]; }
    void connect(int x, int f, int w) { fa[x] = f, (~w) && (ch[f][w] = x); }
    int get(int x) {
        if (ch[fa[x]][0] == x)
            return 0;
        if (ch[fa[x]][1] == x)
            return 1;
        return -1;
    }
    void pushdown(int x) {
        if (tag[x]) {
            swap(ch[x][0], ch[x][1]);
            if (ch[x][0])
                tag[ch[x][0]] ^= 1;
            if (ch[x][1])
                tag[ch[x][1]] ^= 1;
            tag[x] = 0;
        }
    }
    void pushall(int x) {
        if (~get(x))
            pushall(fa[x]);
        pushdown(x);
    }
    void rotate(int x) {
        int y = fa[x], z = fa[y], w = get(x);
        if (~w)
            connect(ch[x][w ^ 1], y, w);
        connect(x, z, get(y));
        connect(y, x, w ^ 1);
        pushup(y);
        pushup(x);
    }
    void splay(int x) {
        pushall(x);
        for (int f = fa[x]; f = fa[x], ~get(x); rotate(x))
            if (~get(f))
                rotate(get(f) == get(x) ? f : x);
    }
    void access(int x) {
        int pre = 0;
        while (x) {
            splay(x);
            ch[x][1] = pre;
            pushup(x);
            pre = x;
            x = fa[x];
        }
    }
    void makeroot(int x) {
        access(x);
        splay(x);
        tag[x] ^= 1;
    }
    void split(int x, int y) {
        makeroot(x);
        access(y);
        splay(y);
    }
    int findroot(int x) {
        access(x);
        splay(x);
        while (ch[x][0])
            pushdown(x), x = ch[x][0];
        splay(x);
        return x;
    }
    bool link(int x, int y) {
        makeroot(x);
        if (findroot(y) == x)
            return false;
        fa[x] = y;
        return true;
    }
    bool cut(int x, int y) {
        if (findroot(x) != findroot(y))
            return false;
        split(x, y);
        if (fa[x] != y || ch[x][1])
            return false;
        fa[x] = ch[y][0] = 0;
        return true;
    }
};
```

## PAM
```cpp
struct PAM {
    int siz, tot, last;
    int cnt[MAXN], len[MAXN], fail[MAXN], nxt[MAXN][26];
    char str[MAXN];
    int newnode(int l) { return len[++siz] = l, siz; }
    void clear() {
        siz = -1, last = 0;
        str[tot = 0] = '$';
        newnode(0), newnode(-1);
        fail[0] = 1;
    }
    int getfail(int x) {
        while (str[tot - len[x] - 1] != str[tot])
            x = fail[x];
        return x;
    }
    void insert(char c) {
        str[++tot] = c;
        int now = getfail(last);
        if (!nxt[now][c - 'a']) {
            int x = newnode(len[now] + 2);
            fail[x] = nxt[getfail(fail[now])][c - 'a'];
            nxt[now][c - 'a'] = x;
        }
        last = nxt[now][c - 'a'];
        ++cnt[last];
    }
} pam;
```

## 压过行的LCT
比 Treap 短

```cpp
struct LCT {
    int fa[MAXN], ch[MAXN][2], val[MAXN], sum[MAXN], tag[MAXN];
    void pushup(int x) { sum[x] = sum[ch[x][0]] ^ sum[ch[x][1]] ^ val[x]; }
    void connect(int x, int f, int w) { fa[x] = f, (~w) && (ch[f][w] = x); }
    int get(int x) { return (ch[fa[x]][0] != x && ch[fa[x]][1] != x) ? -1 : (ch[fa[x]][1] == x); }
    void pushdown(int x) {
        if (tag[x]) {
            swap(ch[x][0], ch[x][1]);
            if (ch[x][0]) tag[ch[x][0]] ^= 1;
            if (ch[x][1]) tag[ch[x][1]] ^= 1;
            tag[x] = 0;
        }
    }
    void pushall(int x) { (~get(x) ? pushall(fa[x]) : (void)0), pushdown(x); }
    void rotate(int x) {
        int y = fa[x], z = fa[y], w = get(x);
        (~w) ? connect(ch[x][w ^ 1], y, w) : (void)0;
        connect(x, z, get(y)), connect(y, x, w ^ 1), pushup(y), pushup(x);
    }
    void splay(int x) { pushall(x); for (int f = fa[x]; f = fa[x], ~get(x); rotate(x)) if (~get(f)) rotate(get(f) == get(x) ? f : x); }
    void access(int x) { int pre = 0; while (x) splay(x), ch[x][1] = pre, pushup(x), pre = x, x = fa[x]; }
    void makeroot(int x) { access(x), splay(x), tag[x] ^= 1; }
    void split(int x, int y) { makeroot(x), access(y), splay(y); }
    int findroot(int x) { access(x), splay(x); while (ch[x][0]) pushdown(x), x = ch[x][0]; return splay(x), x; }
    bool link(int x, int y) { return makeroot(x), findroot(y) == x ? 0 : (fa[x] = y, 1); }
    bool cut(int x, int y) { return findroot(x) != findroot(y) || (split(x, y), fa[x] != y || ch[x][1]) ? 0 : (fa[x] = ch[y][0] = 0, 1); }
};
```

## Manacher
这个其实不需要记板子吧
```cpp
int manacher(char* s, int tlen) {
    static int d[MAXM];
    static char t[MAXM];
    int len = 0;
    for (int i = 1; i <= tlen; ++i)
        t[++len] = '#', t[++len] = s[i];
    t[++len] = '#', t[++len] = '$';
    int mx = 0, id = 0, ans = 0;
    for (int i = 1; i <= len; ++i) {
        d[i] = mx > i ? min(d[id * 2 - i], mx - i) : 1;
        while (t[i + d[i]] == t[i - d[i]])
            ++d[i];
        if (i + d[i] > mx)
            mx = i + d[i], id = i;
        ans = max(ans, d[i] - 1);
    }
    return ans;
}
```

## HLPP

```cpp
struct HLPP {
    struct Edge {
        int v; ll flow;
    } edge[MAXE * 2];
    int n, s, t, tot = 1;
    int head[MAXV], nxt[MAXE * 2];
    int h[MAXV], gap[MAXV * 2], inq[MAXV];
    ll e[MAXV];
    priority_queue<pair<int, int>> pq;
    inline void init(int n) { this->n = n; }
    inline void addedge(int u, int v, ll f) {
        edge[++tot] = {v, f}, nxt[tot] = head[u], head[u] = tot;
        edge[++tot] = {u, 0}, nxt[tot] = head[v], head[v] = tot;
    }
    inline bool bfs() {
        int fr = 0, bk = 0;
        static int que[MAXN];
        fill(h + 1, h + n + 1, INF);
        h[t] = 0, que[++bk] = t;
        while (fr < bk) {
            int u = que[++fr];
            for (int i = head[u]; i; i = nxt[i])
                if (h[edge[i].v] > h[u] + 1 && edge[i ^ 1].flow)
                    h[edge[i].v] = h[u] + 1, que[++bk] = edge[i].v;
        }
        return h[s] != INF;
    }
    inline void push(int u) {
        for (int i = head[u]; i; i = nxt[i])
            if (h[edge[i].v] + 1 == h[u] && edge[i].flow) {
                ll tmp = min(edge[i].flow, e[u]);
                edge[i].flow -= tmp, edge[i ^ 1].flow += tmp;
                e[u] -= tmp, e[edge[i].v] += tmp;
                if (edge[i].v != s && edge[i].v != t && !inq[edge[i].v])
                    pq.push({h[edge[i].v], edge[i].v}), inq[edge[i].v] = 1;
                if (!e[u]) break;
            }
    }
    inline void relabel(int u) {
        h[u] = INF;
        for (int i = head[u]; i; i = nxt[i])
            if (h[u] > h[edge[i].v] + 1 && edge[i].flow)
                h[u] = h[edge[i].v] + 1;
    }
    inline ll maxflow(int s, int t) {
        this->s = s, this->t = t;
        if (!bfs()) return e[t];
        h[s] = n;
        for (int i = 1; i <= n; ++i)
            if (h[i] < INF) ++gap[h[i]];
        for (int i = head[s]; i; i = nxt[i])
            if (ll d = edge[i].flow) {
                edge[i].flow -= d, edge[i ^ 1].flow += d;
                e[s] -= d, e[edge[i].v] += d;
                if (edge[i].v != s && edge[i].v != t && !inq[edge[i].v])
                    pq.push({h[edge[i].v], edge[i].v}), inq[edge[i].v] = 1;
            }
        while (pq.size()) {
            int u = pq.top().second; pq.pop();
            inq[u] = 0, push(u);
            if (e[u]) {
                if (h[u] != INF && !--gap[h[u]]) {
                    for (int i = 1; i <= n; ++i)
                        if (i != s && i != t && h[u] < h[i] && h[i] < n + 1)
                            h[i] = n + 1;
                }
                relabel(u), ++gap[h[u]], pq.push({h[u], u});
            }
        }
        return e[t];
    }
} network;
```

## FHQ-Treap

~~狗都不写splay~~

```cpp
random_device rd;
mt19937 rng(rd());
struct FHQ_Treap {
    int rt, tot, x, y, z, ret, ch[MAXN][2], val[MAXN], rnd[MAXN], siz[MAXN];
    inline void pushup(int u) { siz[u] = siz[ch[u][0]] + siz[ch[u][1]] + 1; }
    inline int newnode(int k) { return val[++tot] = k, rnd[tot] = rng(), siz[tot] = 1, ch[tot][0] = ch[tot][1] = 0, tot; }
    inline int merge(int x, int y) {
        if (!x || !y) return x | y;
        return (rnd[x] < rnd[y]) ? (ch[x][1] = merge(ch[x][1], y), pushup(x), x) : (ch[y][0] = merge(x, ch[y][0]), pushup(y), y);
    }
    inline void split(int u, int k, int& x, int& y) {
        if (!u) return void(x = y = 0);
        (val[u] <= k) ? (x = u, split(ch[u][1], k, ch[x][1], y)) : (y = u, split(ch[u][0], k, x, ch[y][0])), pushup(u);
    }
    inline void insert(int k) { split(rt, k, x, y), rt = merge(merge(x, newnode(k)), y); }
    inline void erase(int k) { split(rt, k, x, z), split(x, k - 1, x, y), y = merge(ch[y][0], ch[y][1]), rt = merge(merge(x, y), z); }
    inline int rank(int k) { return split(rt, k - 1, x, y), ret = siz[x] + 1, rt = merge(x, y), ret; }
    inline int kth(int k) {
        int cur = rt;
        while (true) {
            if (k == siz[ch[cur][0]] + 1) return val[cur];
            cur = (k <= siz[ch[cur][0]]) ? ch[cur][0] : (k -= siz[ch[cur][0]] + 1, ch[cur][1]);
        }
    }
    inline int prev(int k) { return split(rt, k - 1, x, y), ret = siz[x], rt = merge(x, y), kth(ret); }
    inline int next(int k) { return split(rt, k, x, y), ret = siz[x] + 1, rt = merge(x, y), kth(ret); }
} trp;
```