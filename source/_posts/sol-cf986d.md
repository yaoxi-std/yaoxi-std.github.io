---
title: CF986D Perfect Encoding
tags: solutions
category: 题解
date: 2022-01-02 15:57:25
---

## CF986D Perfect Encoding

### 题面

[题目链接](https://www.luogu.com.cn/problem/CF986D)

### 解法

一道思维难度低但码量极大且及其卡常的烂题。

首先根据小学奥数学过的东西，可以知道分解出许多$3$，剩下无法分解的凑成$1$到$2$个$2$，这样得到的积一定是最大的。

答案明显是单调的，可以考虑二分+判断。$n$的范围巨大，需要用高精度+FFT+快速幂，时间复杂度一下子$O(n \log^3 n)$级别，无法通过。

进一步思考，答案应该接近$\log_3n$，不妨从$\lfloor \log_3n \rfloor$开始枚举答案，只需要枚举大约$6$个就可以找到答案，优化成$O(n \log^2 n)$。

时间复杂度无法进一步优化，于是设法开始卡常。首先这个高精度必须得压位，而且为了防止MLE又不能开`long long`，所以假设压$x$位，就要求FFT时$(10^x)^2 \times \frac{1.5 \times 10^6}{10^x} \le$ `INT_MAX`，于是$x$最大取到$3$，压$3$位。

其次在进行快速幂时，变量$x$需要一直乘上自己，可以省略一次FFT。由于快速幂刚开始时数字不是很大，我们选择用`vector`储存高精度而不是使用定长数组，这样又可以提高一些变量拷贝的效率。至此我就没有再想到能够进一步优化的方法了，但是也足以在时限内通过了。

### AC代码

```cpp
/**
 * @file:           CF986D.cpp
 * @author:         yaoxi-std
 * @url:            https://www.luogu.com.cn/problem/CF986D
*/
// 加大火车
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
    double tmp = 1;
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
const int MAXN = 1 << 21;
const int MAXB = 1000;
const int MAXK = 3;
const int INF = 0x3f3f3f3f;
const double PI = acos(-1);
const double LOG3_10 = log(10) / log(3);
namespace bignum {
    using comp = complex<double>;
    comp flhs[MAXN], frhs[MAXN];
    long long tmp[MAXN];
    void change(comp *f, int len) {
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
    void fft(comp *f, int len, int on) {
        change(f, len);
        for (int h = 2; h <= len; h <<= 1) {
            comp wn(cos(2 * PI / h), sin(2 * PI / h));
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
                f[i] /= len;
        }
    }
    vector<int>& polymul(vector<int>& lhs, int rhs) {
        for (int i = 0; i < lhs.size(); ++i)
            lhs[i] *= rhs;
        for (int i = 0; i < lhs.size() - 1; ++i)
            lhs[i + 1] += lhs[i] / MAXB, lhs[i] %= MAXB;
        int len = lhs.size();
        while (lhs[len - 1] >= MAXB)
            lhs.push_back(lhs[len - 1] / MAXB), lhs[len - 1] %= MAXB, ++len;
        return lhs;
    }
    vector<int>& polymul(vector<int>& lhs) {
        int len = 1;
        while (len < lhs.size() * 2)
            len <<= 1;
        for (int i = 0; i < lhs.size(); ++i)
            flhs[i] = lhs[i];
        for (int i = lhs.size(); i < len; ++i)
            flhs[i] = 0;
        lhs.resize(len);
        fft(flhs, len, 1);
        for (int i = 0; i < len; ++i)
            flhs[i] = flhs[i] * flhs[i];
        fft(flhs, len, -1);
        for (int i = 0; i < len; ++i)
            tmp[i] = (long long)(flhs[i].real() + 0.5);
        for (int i = 0; i < len - 1; ++i)
            tmp[i + 1] += tmp[i] / MAXB, tmp[i] %= MAXB;
        for (int i = 0; i < len; ++i)
            lhs[i] = tmp[i];
        while (*lhs.rbegin() == 0)
            lhs.pop_back();
        return lhs;
    }
    vector<int>& polymul(vector<int>& lhs, const vector<int>& rhs) {
        int len = 1;
        while (len < lhs.size() + rhs.size())
            len <<= 1;
        for (int i = 0; i < lhs.size(); ++i)
            flhs[i] = lhs[i];
        for (int i = lhs.size(); i < len; ++i)
            flhs[i] = 0;
        for (int i = 0; i < rhs.size(); ++i)
            frhs[i] = rhs[i];
        for (int i = rhs.size(); i < len; ++i)
            frhs[i] = 0;
        lhs.resize(len);
        fft(flhs, len, 1), fft(frhs, len, 1);
        for (int i = 0; i < len; ++i)
            flhs[i] = flhs[i] * frhs[i];
        fft(flhs, len, -1);
        for (int i = 0; i < len; ++i)
            tmp[i] = (long long)(flhs[i].real() + 0.5);
        for (int i = 0; i < len - 1; ++i)
            tmp[i + 1] += tmp[i] / MAXB, tmp[i] %= MAXB;
        for (int i = 0; i < len; ++i)
            lhs[i] = tmp[i];
        while (*lhs.rbegin() == 0)
            lhs.pop_back();
        return lhs;
    }
    bool is_less(const vector<int>& lhs, const vector<int>& rhs) {
        if (lhs.size() != rhs.size())
            return lhs.size() < rhs.size();
        for (int i = lhs.size() - 1; ~i; --i)
            if (lhs[i] != rhs[i])
                return lhs[i] < rhs[i];
        return true;
    }
    vector<int> qpow(vector<int> x, int y) {
        vector<int> ret{1};
        for (; y; y >>= 1, polymul(x, x))
            if (y & 1)
                polymul(ret, x);
        return ret;
    }
}
using namespace bignum;
int n, cur, num;
char buf[MAXN];
vector<int> inp, now, now2;
void print(vector<int>& vec) {
    printf("%d", vec[vec.size() - 1]);
    for (int i = vec.size() - 2; ~i; --i)
        printf("%02d", vec[i]);
    printf("\n");
}
bool check(int n) {
    if (n < 6)
        return is_less(inp, vector<int>{n});
    int tx, ty;
    if (n % 3 == 0)
        tx = n / 3 - 1, ty = 3;
    if (n % 3 == 1)
        tx = n / 3 - 1, ty = 4;
    if (n % 3 == 2)
        tx = n / 3 - 1, ty = 6;
    while (cur < tx)
        polymul(now, 3), ++cur;
    polymul(now2 = now, ty);
    return is_less(inp, now2);
}
signed main() {
    scanf("%s", buf);
    n = strlen(buf);
    num = floor(3 * LOG3_10 * (n - 1));
    cur = max((int)0, num / 3 - 1);
    reverse(buf, buf + n);
    while (n % MAXK)
        buf[n++] = '0';
    for (int i = 0; i < n; i += MAXK) {
        inp.push_back(0);
        for (int j = 0, x = 1; j < MAXK; ++j, x *= 10)
            *inp.rbegin() += x * (buf[i + j] - '0');
    }
    now = qpow(vector<int>{3}, cur);
    for (int i = num; ; ++i)
        if (check(i))
            return write(i), putchar('\n'), 0;
    return 0;
}
```