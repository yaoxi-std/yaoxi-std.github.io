---
title: 论对拍在OI中的妙用
date: 2022-03-03 21:51:35
tags: 
---

# 论对拍在OI中的妙用

<!-- more -->

---

# 前言

众所周知，国内的OI比赛中，一般都是以选手的最后一次提交得分为准，且选手无法在比赛当中实时查看得分。这就导致了很多时候选手的最终得分与期望得分不符的情况，也就是所谓的“挂分”。为了避免这种情况的发生，选手一般会在比赛中自己造数据，分别让暴力程序和待检验的程序计算，检验输出是否相同，这就是所谓“对拍”。

> 对拍是一种进行检验或调试的方法，通过对比两个程序的输出来检验程序的正确性。可以将自己程序的输出与其他程序的输出进行对比，从而判断自己的程序是否正确。 
> 
>  —— OI Wiki

对拍过程需要多次进行，因此需要选手实现自动化对拍。

最基础的对拍程序框架如下：

```cpp
int main() {
    int cas = 1000; // 对拍次数
    while (cas--) {
        // 在 Linux / macOS 下运行当前目录下文件时需要加 `./` 前缀，Windows 可以不加
        system("./_generator.exe > task.in");         // 造数据
        system("./_brute.exe < task.in > task.ans");  // 获得暴力程序的输出
        system("./task.exe < task.in > task.out");    // 获得待检验程序的输出
        if (system("fc.exe task.out task.ans")) {
            // Windows 下使用 `fc` 命令比较文件是否相同
            // 如果相同，`system` 调用会返回 0，否则返回 1 表示不同
            // Linux / macOS 下没有 `fc` 命令，用 `diff` 替代如下：
            // system("diff task.out task.ans");
            std::cerr << "Wrong Answer" << std::endl;
            return 1;
        }
    }
    std::cerr << "Accepted" << std::endl;
    return 0;
}
```

其中的 `_generator.exe` 是数据生成器的可执行文件，`_brute.exe` 为暴力可执行文件，`task.exe` 为待检验程序的可执行文件，这三个文件需要与对拍程序的可执行文件（我一般称作 `matcher.exe`）放在同一个目录下。

这种对拍虽然简单，但有时在比赛中不能获得很好的效果，比如只能将待检验程序与暴力进行对拍，无法检测数组越界等。

本文就来讲讲“对拍在OI中的妙用”，即**高阶的对拍技巧**。

---

# 正文

## 数据生成器的写法

在考场上，我们不会去写那种非常标准的 `generator`（毕竟考场上也不会给你提供 `testlib.h`）。为了便于生成不同子任务对应的数据范围，我一般会使用一下框架编写生成器：

```cpp
// 头文件省略


// 随机数部分，保证数据的随机性
random_device rd;
mt19937 rng(rd());

//// 生成随机整数，范围 [l, r]
int rand_int(int l, int r) {
    uniform_int_distribution<int> qwq(l, r);    // C++11 自带的均匀分布
    return qwq(rng);
}

//// 生成随机浮点数，范围 [l, r)
double rand_double(double l, double r) {
    uniform_real_distribution<double> qwq(l, r);
    return qwq(rng);
}


// 对应子任务的数据范围
// 使用 namespace 较为优雅

//// 对应的第一个 subtask
namespace subtask1 {
const int N_MIN = 100;
const int N_MAX = 200;
const int A_MAX = 1e5;
};  // namespace subtask1

//// 对应的第二个 subtask
namespace subtask2 {
const int N_MIN = 1e3;
//// ......
};  // namespace subtask2

//// 需要修改数据范围时，只需要修改下面这一句就行
using namespace subtask1;

// 全局变量储存
const int MAXN = 1e5 + 10;

int n, a[MAXN];

// 主函数部分
int main() {
    //// 造数据
    n = rand_int(N_MIN, N_MAX);
    for (int i = 1; i <= n; ++i)
        a[i] = rand_int(1, A_MAX);
    
    //// 输出数据
    printf("%d\n", n);
    for (int i = 1; i <= n; ++i)
        printf("%d%c", a[i], " \n"[i == n]);
    return 0;
}
```

自己研究出来的 `generator` 不得不说真的挺优雅～

### 数据的随机性

这份生成器在 Linux / macOS 下完美运行并且可以生成完全随机的数据。但是如果你在 Windows 下使用 MinGW 编译，就会发现每次输出的数据 !完!全!相!同! 

这是由于 MinGW 的 `random_device` 实现不好，没有调用系统熵，从而不能做到真随机。至于在 MinGW 下的真随机，笔者也没有找到较好的方法。鉴于大部分 NOI 系列比赛中都会提供 NOI Linux ~~（除了 JSOI 这种毒瘤）~~，还是建议大家在 Linux 下对拍吧！

## 各种错误的处理

### Wrong Answer 的处理

对于常规情况，我们只需要使用上文提到的 `fc` 或 `diff` 命令即可检验两个文件是否相同。

#### 忽略空白符

然而有时会遇到这样的情况:

```sh
$ diff 1.out 1.ans
2d1
<
```

打开文件一看，`1.out` 如下：

```
114514 1919810

```

`1.ans` 如下：

```
114514 1919810
```

这样的输出让你感到奇怪：明明两个输出的数字都一样，为什么 `diff` 出来会报错呢？仔细看了一会儿发现 `1.out` 多了一个行末回车。这是比较好的情况，万一 `.ans` 文件是在 Windows 下制造的，很有可能会使得 `.ans` 文件的回车符全都变成了 `CRLF` 而非在类 Unix 操作系统下的 `LF`，此时肉眼看不出两个文件的差别，`diff` 却会报错。

如何避免这种情况呢？`diff` 有一个忽略空白符的选项 `diff -w`，或者在 Windows 下使用 `fc.exe /w` 可以忽略空白符。

只需要在上文的对拍程序中稍作修改即可：

```cpp
if (system("fc.exe /w task.out task.ans")) // 或者 system("diff -w task.out task.ans")
```

#### Special Judge

[spj的写法](https://oi-wiki.org/tools/special-judge/)这里不再赘述。

对拍时也只需要修改一点点，将原本调用 `fc` 或 `diff` 改为调用 `_spj.exe` 即可:

```cpp
if (system("./_spj.exe task.in task.out task.ans")) // 需要保证 `_spj.exe` 与对拍程序处于同一目录下
```

**善意的提醒：** 一定要多造一些极端数据！！！

### Runtime Error 的处理

程序出现 Runtime Error 时，会返回一个非 $0$ 的返回值。由此我们可以根据程序的返回值来判断是否出现运行错误。

```cpp
// 第三个 system 改成这样
if (system("./task.exe < task.in > task.out")) {
    // 如果运行到这里，说明返回值非 0，就是运行错误了。
    std::cerr << "Runtime Error" << std::endl;
    return 2;
}
```

However，有时数组越界了，可程序却正常运行跑过去了，没有出现 RE 的情况（这是比较玄学的），上面的程序也无法判断。

这时就要请出 C++ 的大杀器 **Address Sanitizer** 了。（其实我第一次听说还是从大毒瘤 JSOI 的在线系统里）

这个东西我也不多介绍了，总之就是能够有效地判断数组越界或者内存访问越界问题。

至于如何开启，就要手动修改编译命令：

```sh
g++ -O2 -std=c++14 -fsanitize=address -o task.exe task.cpp # 只是举个例子
```

Dev-Cpp 如何修改编译命令请自行百度。

顺嘴提一句，**检查RE的时候一定要用大数据来测！！！**

### Time Limit Exceeded 的处理

这就涉及到 C++ 的计时模块了。由于我们只是写个对拍，没必要到时间就把程序掐掉，只是计算下程序运行的时间即可。

建议使用 C++11 自带的 `std::chrono::steady_clock`，需要添加头文件 `chrono.h`（已包含在万能头中）。

```cpp
using namespace std::chrono;
auto t1 = steady_clock::now();
// do something like `system("...")`
system("something");
auto t2 = steady_clock::now();
double dif = duration_cast<duration<double>>(t2 - t1).count();
// dif 就是运行的时间，以秒为单位，较为精确
if (dif > 1) {
    std::cerr << "Time Limit Exceeded" << std::endl;
    return 3;
}
```

**检查TLE的时候也一定要用大数据来测！！！**

### Memory Limit Exceeded 的处理

#### 静态内存空间

在你的程序代码中，最开头定义一个 `bool` 变量 `m_be`，主函数前定义 `m_ed`，将两者地址做差，就得到了区间内定义的静态变量总大小。

```cpp
// 头文件
bool m_be;
int arr[MAXN], brr[MAXN]; // ...
bool m_ed;
int main() {
    std::cerr << fabs(&m_ed - &m_be) / 1024 / 1024 << std::endl;
    // something else
}
```

输出的是以MB为单位的静态空间大小。

为什么要使用 `fabs` 呢？这是因为在不同编译器的不同实现中，有可能会有不同的效果。在我的 macOS 上，使用 clang 编译的就是 `&m_be < &m_ed`，g++ 则是 `&m_ed < &m_be`，但是绝对值相同。

至于动态空间大小，我想应该没有人会无聊到在OI中开一大堆 `vector` 之类的东西吧。。。好像暂时也没看到什么比较好的方法测动态内存，就跳过了。

---

# 总结

贴一下最终的对拍程序代码吧（Linux / macOS版）：

```cpp
#include <bits/stdc++.h>
using namespace std;
using namespace std::chrono;
int main() {
    int tot = 1000;
    system("g++ -std=c++14 -O2 -o _generator.exe _generator.cpp");
    system("g++ -std=c++14 -O2 -o _brute_.exe _brute_.cpp");
    system("g++ -std=c++14 -O2 -fsanitize=address -o task.exe task.cpp");
    for (int cas = 1; cas <= tot; ++cas) {
        system("./_generator.exe > task.in");
        system("./_brute.exe < task.in > task.ans");
        auto t1 = steady_clock::now();
        if (system("./task.exe < task.in > task.out")) {
            cerr << "Runtime Error" << endl;
            return 2;
        }
        auto t2 = steady_clock::now();
        double dif = duration_cast<duration<double>>(t2 - t1).count();
        if (dif > 1) {
            cerr << "Time Limit Exceeded" << endl;
            return 3;
        }
        if (system("diff -w task.out task.ans")) {
            cerr << "Wrong Answer" << endl;
            return 1;
        }
        cerr << "Test " << cas << " Passed" << endl;
    }
    cerr << "Accepted" << endl;
    return 0;
}
```
