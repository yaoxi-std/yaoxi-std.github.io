---
title: 云剪贴板
date: 2021-11-21 17:47:26
type: clip-board
password: sjcakioi
tag: important
comments: false
---

### 板子
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
const int INF = 0x3f3f3f3f3f3f3f3f;

signed main() {
    // resetIO();
    
    return 0;
}
```

### 板子-vscode版本
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
        "#define int long long",
        "#define resetIO(x) \\",
        "    freopen(#x \".in\", \"r\", stdin), freopen(#x \".out\", \"w\", stdout)",
        "#define debug(fmt, ...) \\",
        "    fprintf(stderr, \"[%s:%d] \" fmt \"\\n\", __FILE__, __LINE__, ##__VA_ARGS__)",
        "template <class _Tp>",
        "inline _Tp& read(_Tp &x) {",
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
        "const int MAXN = 1e5 + 10;",
        "const int INF = 0x3f3f3f3f3f3f3f3f;",
        "",
        "signed main() {",
        "    // resetIO();",
        "    $0",
        "    return 0;",
        "}"
    ]
}
```

### 火车头（有用的东西）
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

### 短小精悍的火车头（雾
```cpp
#pragma GCC optimize ("O2")
#pragma GCC optimize ("Ofast", "inline", "-ffast-math")
#pragma GCC target ("avx,sse2,sse3,sse4,mmx")
```

### 算法板子

**不要抄板子，要自己写，只是防止自己忘记**

#### {% post_link 'sol-p3803' 'FFT && NTT' %}

```cpp
const long double MPI = acos(-1);
const int MOD = 998244353;
// const int MOD = 1004535809; // 备用
// const int MOD = 469762049; // 备用
using comp = std::complex<double>;
int rev[MAXN];
void change(comp *f, int len) {
    for (int i = 0; i < len; ++i) {
        rev[i] = rev[i >> 1] >> 1;
        if (i & 1)
            rev[i] |= len >> 1;
    }
    for (int i = 0; i < len; ++i)
        if (i < rev[i])
            swap(f[i], f[rev[i]]);
}
void fft(comp *f, int len, int on) {
    change(f, len);
    for (int h = 2; h <= len; h <<= 1) {
        comp wn(cos(2 * MPI / h), sin(2 * MPI / h));
        for (int j = 0; j < len; j += h) {
            comp w(1, 0);
            for (int k = j; k < j + h / 2; ++k) {
                comp u = f[k], t = w * f[k + h / 2];
                f[k] = u + t;
                f[k + h / 2] = u - t;
                w = w * wn;
            }
        }
    }
    if (on == -1) {
        reverse(f + 1, f + len);
        for (int i = 0; i < len; ++i)
            f[i].real(f[i].real() / len);
    }
}
void ntt(int *f, int len, int on) {
    change(f, len);
    for (int h = 2; h <= len; h <<= 1) {
        int gn = qpow(3, (MOD - 1) / h);
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
```

#### 虚树

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
        if (l < 1 || l > bcc)
            lca(sta[top], s[i]);
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

#### 圆方树

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

#### Splay

```cpp
struct splay_tree {
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