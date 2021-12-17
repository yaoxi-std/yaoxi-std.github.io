---
title: 【专题】后缀数组 SA
tags: topics
category: 专题
date: 2021-12-17 18:28:14
---

## 【专题】后缀数组 SA

~~虽然有不少此类题目可以用字符串hash瞎搞~~

记住代码中每个数组的含义：

| 数组 | 含义 |
| :-: | :-: |
| $sa_i$ | 排名为$i$的后缀的起始位置 |
| $rk_i$ | 后缀$s_{i \cdots n}$的排名 |
| $tp_i$ | 临时数组，用来在基数排序中记录临时排名 |
| $ht_i$ | 第$rk_i$个后缀和第$rk_{i-1}$个后缀的$LCP$ |

### 一些性质

#### 可重叠最长重复子串

即$ht$数组的最大值。

#### 不同子串个数

即$\frac{n \times (n + 1)}{2} - \sum\limits_{i=1}^{n}{ht_i}$（易证）。

#### 任意两个后缀的$LCP$

设分别为后缀$s_{i \cdots n}$和$s_{j \cdots n}$，其中$i \lt j$，$LCP = \min\limits_{k=i+1}^{j}{ht_k}$，用$RMQ$解决。

### 题目

{% post_link 'sol-p2408' 'P2408' %}

{% post_link 'sol-p4051' 'P4051' %}

{% post_link 'sol-p4248' 'P4248' %}

### 模版代码
```cpp
struct suffix_array {
    int n, sa[MAXN], rk[MAXN], tp[MAXN], ht[MAXN];
    void radix_sort(int m) {
        static int buk[MAXN];
        for (int i = 0; i <= m; ++i)
            buk[i] = 0;
        for (int i = 1; i <= n; ++i)
            buk[rk[i]]++;
        for (int i = 1; i <= m; ++i)
            buk[i] += buk[i - 1];
        for (int i = n; i >= 1; --i)
            sa[buk[rk[tp[i]]]--] = tp[i];
    }
    void init(char *s, int n) {
        this->n = n;
        int m = 100;
        for (int i = 1; i <= n; ++i)
            rk[i] = s[i] - '0' + 1, tp[i] = i;
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
    }
};
```