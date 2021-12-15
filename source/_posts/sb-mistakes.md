---
title: SB错误
date: 2021-11-20 19:24:51
tags: important
top: 1500
comments: false
---

## 一些sb的错误汇总
 - AC自动机在做多模式匹配的时候**一定要跳fail指针**不然会**漏遍历很多东西**（AC自动机白学了）！！！(2021.11.20, P3715)
 - 写矩阵快速幂优化dp（尤其是dp[i]依赖于dp[i-2]这种）的时候一定要算好，不能重复加了(2021.11.20, P3715)
 - 取模的题目遇到特判一定记得输出取模，不然等着被hack吧。。。(2021.11.24, CF575A)
 - 换根$dp$不要在统计$pre$和$nxt$数组时就写$dfs$!!!数组整个改变!!!不然会死得很惨（指对着n=1000,m=100的大样例调1h）(2021.11.27, P3233)
 - 多测不清空，爆零两行泪/kk 多测`dfn`数组记得清空啊 (2021.11.29, P4606)
 - `(0 - 1) / x + 1 == 1`，要特判或者写成`(? + x - 1) / x` (2021.12.1 CF1320E)
 - `std::priority_queue`默认是`std::less<_Tp>`，自定义类型要么按照`\gt`的逻辑重载`operator<()`，要么按照`\gt`的逻辑重载`operator>()`并且修改默认参数（这个好像错了不止一次了）(2021.12.1 CF1320E)
 - 这个故事告诉我们FFT/NTT做卷积一定要开两倍长度 (2021.12.6, AT2064)
 - 开`vector`当动态开点树状数组`resize`时没有$+1$ (2021.12.10, P6329)