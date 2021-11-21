---
title: 云剪贴板
date: 2021-11-21 17:47:26
type: clip-board
password: zczczczc
tag: important
comments: false
---

### 板子
```cpp
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
        "const int INFL = 0x3f3f3f3f3f3f3f3f;",
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