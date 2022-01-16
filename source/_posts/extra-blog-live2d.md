---
title: Live2D 搭建
date: 2022-01-15 20:35:28
tags: blog
---

## Live2D 搭建

一日闲来无事，忽觉Live2D。网上找教程，却嫌不够详细。奈何？奈何？只得自己摸索。

<!-- more -->

~~写的什么烂诗~~

---

### 初级

#### 说明

这是最基础的Live2D，完成后只有一个人物在网页上，没有对话功能。

且**初级与中级、高级之间没有任何联系**，如果想要更好的效果，请**跳过初级教程**。

#### 操作

先安装`hexo-helper-live2d`插件。

```sh
npm install --save hexo-helper-live2d
```

然后到[这里](https://github.com/xiazeyu/live2d-widget-models)找一个你喜欢的Live2D模型进行安装。如选择了`live2d-widget-model-wanko`：

```sh
npm install live2d-widget-model-wanko # 没有 --save
```

然后到**根目录**的`_config.yml`中添加配置：

```yml
# Live2D
## https://github.com/EYHN/hexo-helper-live2d
## https://l2dwidget.js.org/docs/class/src/index.js~L2Dwidget.html#instance-method-init
live2d:
  enable: true
  #enable: false
  scriptFrom: local # 默认
  pluginRootPath: live2dw/ # 插件在站点上的根目录(相对路径)
  pluginJsPath: lib/ # 脚本文件相对与插件根目录路径
  pluginModelPath: assets/ # 模型文件相对与插件根目录路径
  # scriptFrom: jsdelivr # jsdelivr CDN
  # scriptFrom: unpkg # unpkg CDN
  # scriptFrom: https://cdn.jsdelivr.net/npm/live2d-widget@3.x/lib/L2Dwidget.min.js # 你的自定义 url
  tagMode: false # 标签模式, 是否仅替换 live2d tag标签而非插入到所有页面中
  debug: false # 调试, 是否在控制台输出日志
  model
    use: live2d-widget-model-wanko # 替换成你的模型名
    # use: live2d-widget-model-wanko # npm-module package name
    # use: wanko # 博客根目录/live2d_models/ 下的目录名
    # use: ./wives/wanko # 相对于博客根目录的路径
    # use: https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json # 你的自定义 url
  display:
    position: right
    width: 145
    height: 315
  mobile:
    show: true # 是否在移动设备上显示
    scale: 0.5 # 移动设备上的缩放       
  react:
    opacityDefault: 0.7
    opacityOnHover: 0.8
```

运行`hexo c && hexo g && hexo s`，就可以在本地看到Live2D模型了。

---

### 中级

#### 说明

阅读高级教程之前，请先阅读中级教程。

#### 操作

先关闭`hexo-helper-live2d`（如果已经按照初级教程开启过的话）：

```sh
npm uninstall hexo-helper-live2d
npm uninstall live2d-widget-model-wanko # 替换成你的模型名
```

克隆[live2d-widget](https://github.com/stevenjoezhang/live2d-widget)到本地`themes/next/live2d-widget`（我这里是`next`主题）中：

```sh
cd themes/next
git clone https://github.com/stevenjoezhang/live2d-widget.git
```

修改`next`主题配置文件：

打开`themes/next/layout/_layout.swig`，在`<footer>`标签中添加以下代码：

```html
<!-- Live2D -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"></script>
<script src="/live2d-widget/autoload.js" type="text/javascript"></script>
```

并在文件的`<head>`标签中添加

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css">
```

然后重新生成并运行。

---

### 高级

### 说明

相比中级，增加了换装功能。

### 操作

**先按照中级完成操作**

打开`themes/next/layout/_layout.swig`，在`<footer>`标签中的`<script src="/live2d-widget/autoload.js>`之前的部分添加`jquery`和`jquery-ui`，代码如下：

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-ui-dist@1.12.1/jquery-ui.min.js"></script>
```

修改`themes/next/live2d-widget/autoload.js`，删掉原有内容替换如下：

```javascript
// 加载 CSS
$("<link>").attr({href: "/live2d-widget/waifu.css", rel: "stylesheet", type: "text/css"}).appendTo('head');

// 插入 DIV
$('body').append('<div class="waifu"><div class="waifu-tips"></div><canvas id="live2d" class="live2d"></canvas><div class="waifu-tool"><span class="fui-home"></span> <span class="fui-chat"></span> <span class="fui-eye"></span> <span class="fui-user"></span> <span class="fui-photo"></span> <span class="fui-info-circle"></span> <span class="fui-cross"></span></div></div>');

// 加载 JS
$.ajax({
	url: '/live2d-widget/waifu-tips.js',
	dataType:"script",
	cache: true,
	async: false
});
$.ajax({
	url: '/live2d-widget/live2d.min.js',
	dataType:"script",
	cache: true,
	async: false
});

// 初始化看板娘，加载 waifu-tips.json

/* 可直接修改部分参数 */
live2d_settings['modelId'] = 1;                  // 默认模型 ID
live2d_settings['modelTexturesId'] = 88;          // 默认材质 ID
/* 在 initModel 前添加 */
initModel('/live2d-widget/waifu-tips.json');
```

修改`themes/next/live2d-widget/waifu-tips.js`，删掉原有内容替换如下：

```javascript
window.live2d_settings = Array(); /*

        く__,.ヘヽ.　　　　/　,ー､ 〉
        　　　　　＼ ', !-─‐-i　/　/´
        　　　 　 ／｀ｰ'　　　 L/／｀ヽ､            Live2D 看板娘 参数设置
        　　 　 /　 ／,　 /|　 ,　 ,　　　 ',          Version 1.4.2
        　　　ｲ 　/ /-‐/　ｉ　L_ ﾊ ヽ!　 i             Update 2018.11.12
        　　　 ﾚ ﾍ 7ｲ｀ﾄ　 ﾚ'ｧ-ﾄ､!ハ|　 |  
        　　　　 !,/7 '0'　　 ´0iソ| 　 |　　　
        　　　　 |.从"　　_　　 ,,,, / |./ 　 |    网页添加 Live2D 看板娘
        　　　　 ﾚ'| i＞.､,,__　_,.イ / 　.i 　|       https://yaoxi-std.github.io/2022/01/15/extra-blog-live2d/
        　　　　　 ﾚ'| | / k_７_/ﾚ'ヽ,　ﾊ.　|           
        　　　　　　 | |/i 〈|/　 i　,.ﾍ |　i　|    Thanks
        　　　　　　.|/ /　ｉ： 　 ﾍ!　　＼　|          journey-ad / https://github.com/journey-ad/live2d_src
        　　　 　 　 kヽ>､ﾊ 　 _,.ﾍ､ 　 /､!            xiazeyu / https://github.com/xiazeyu/live2d-widget.js
        　　　　　　 !'〈//｀Ｔ´', ＼ ｀'7'ｰr'         Live2d Cubism SDK WebGL 2.1 Projrct & All model authors.
        　　　　　　 ﾚ'ヽL__|___i,___,ンﾚ|ノ           fghrsh / https://github.com/fghrsh/live2d_api
        　　　　　 　　　ﾄ-,/　|___./
        　　　　　 　　　'ｰ'　　!_,.:*********************************************************************************/

// 后端接口
live2d_settings["modelAPI"] = "//live2d.fghrsh.net/api/"; // 自建 API 修改这里
live2d_settings["tipsMessage"] = "waifu-tips.json"; // 同目录下可省略路径
live2d_settings["hitokotoAPI"] = "hitokoto.cn"; // 一言 API，可选 'lwl12.com', 'hitokoto.cn', 'jinrishici.com'(古诗词)

// 默认模型
live2d_settings["modelId"] = 1; // 默认模型 ID，可在 F12 控制台找到
live2d_settings["modelTexturesId"] = 88; // 默认材质 ID，可在 F12 控制台找到

// 工具栏设置
live2d_settings["showToolMenu"] = true; // 显示 工具栏          ，可选 true(真), false(假)
live2d_settings["canCloseLive2d"] = true; // 显示 关闭看板娘  按钮，可选 true(真), false(假)
live2d_settings["canSwitchModel"] = true; // 显示 模型切换    按钮，可选 true(真), false(假)
live2d_settings["canSwitchTextures"] = true; // 显示 材质切换    按钮，可选 true(真), false(假)
live2d_settings["canSwitchHitokoto"] = true; // 显示 一言切换    按钮，可选 true(真), false(假)
live2d_settings["canTakeScreenshot"] = true; // 显示 看板娘截图  按钮，可选 true(真), false(假)
live2d_settings["canTurnToHomePage"] = true; // 显示 返回首页    按钮，可选 true(真), false(假)
live2d_settings["canTurnToAboutPage"] = true; // 显示 跳转关于页  按钮，可选 true(真), false(假)

// 模型切换模式
live2d_settings["modelStorage"] = true; // 记录 ID (刷新后恢复)，可选 true(真), false(假)
live2d_settings["modelRandMode"] = "switch"; // 模型切换，可选 'rand'(随机), 'switch'(顺序)
live2d_settings["modelTexturesRandMode"] = "rand"; // 材质切换，可选 'rand'(随机), 'switch'(顺序)

// 提示消息选项
live2d_settings["showHitokoto"] = true; // 显示一言
live2d_settings["showF12Status"] = true; // 显示加载状态
live2d_settings["showF12Message"] = false; // 显示看板娘消息
live2d_settings["showF12OpenMsg"] = true; // 显示控制台打开提示
live2d_settings["showCopyMessage"] = true; // 显示 复制内容 提示
live2d_settings["showWelcomeMessage"] = true; // 显示进入面页欢迎词

//看板娘样式设置
live2d_settings["waifuSize"] = "800x800"; // 看板娘大小，例如 '280x250', '600x535'
live2d_settings["waifuTipsSize"] = "250x70"; // 提示框大小，例如 '250x70', '570x150'
live2d_settings["waifuFontSize"] = "14px"; // 提示框字体，例如 '12px', '30px'
live2d_settings["waifuToolFont"] = "14px"; // 工具栏字体，例如 '14px', '36px'
live2d_settings["waifuToolLine"] = "20px"; // 工具栏行高，例如 '20px', '36px'
live2d_settings["waifuToolTop"] = "0px"; // 工具栏顶部边距，例如 '0px', '-60px'
live2d_settings["waifuMinWidth"] = "768px"; // 面页小于 指定宽度 隐藏看板娘，例如 'disable'(禁用), '768px'
live2d_settings["waifuEdgeSide"] = "left:0"; // 看板娘贴边方向，例如 'left:0'(靠左 0px), 'right:30'(靠右 30px)
live2d_settings["waifuDraggable"] = "disable"; // 拖拽样式，例如 'disable'(禁用), 'axis-x'(只能水平拖拽), 'unlimited'(自由拖拽)
live2d_settings["waifuDraggableRevert"] = true; // 松开鼠标还原拖拽位置，可选 true(真), false(假)

// 其他杂项设置
live2d_settings["l2dVersion"] = "1.4.2"; // 当前版本
live2d_settings["l2dVerDate"] = "2018.11.12"; // 版本更新日期
live2d_settings["homePageUrl"] = "auto"; // 主页地址，可选 'auto'(自动), '{URL 网址}'
live2d_settings["aboutPageUrl"] =
    "https://yaoxi-std.github.io/2022/01/15/extra-blog-live2d/"; // 关于页地址, '{URL 网址}'
live2d_settings["screenshotCaptureName"] = "live2d.png"; // 看板娘截图文件名，例如 'live2d.png'

/****************************************************************************************************/

String.prototype.render = function (context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return this.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace("\\", "");
        }

        var variables = token.replace(/\s/g, "").split(".");
        var currentObject = context;
        var i, length, variable;

        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return "";
        }
        return currentObject;
    });
};

var re = /x/;
console.log(re);

function empty(obj) {
    return typeof obj == "undefined" || obj == null || obj == "" ? true : false;
}
function getRandText(text) {
    return Array.isArray(text)
        ? text[Math.floor(Math.random() * text.length + 1) - 1]
        : text;
}

function showMessage(text, timeout, flag) {
    if (
        flag ||
        sessionStorage.getItem("waifu-text") === "" ||
        sessionStorage.getItem("waifu-text") === null
    ) {
        if (Array.isArray(text))
            text = text[Math.floor(Math.random() * text.length + 1) - 1];
        if (live2d_settings.showF12Message)
            console.log("[Message]", text.replace(/<[^<>]+>/g, ""));

        if (flag) sessionStorage.setItem("waifu-text", text);

        $(".waifu-tips").stop();
        $(".waifu-tips").html(text).fadeTo(200, 1);
        if (timeout === undefined) timeout = 5000;
        hideMessage(timeout);
    }
}

function hideMessage(timeout) {
    $(".waifu-tips").stop().css("opacity", 1);
    if (timeout === undefined) timeout = 5000;
    window.setTimeout(function () {
        sessionStorage.removeItem("waifu-text");
    }, timeout);
    $(".waifu-tips").delay(timeout).fadeTo(200, 0);
}

function initModel(waifuPath, type) {
    /* console welcome message */
    eval(
        (function (p, a, c, k, e, r) {
            e = function (c) {
                return (
                    (c < a ? "" : e(parseInt(c / a))) +
                    ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
                );
            };
            if (!"".replace(/^/, String)) {
                while (c--) r[e(c)] = k[c] || e(c);
                k = [
                    function (e) {
                        return r[e];
                    },
                ];
                e = function () {
                    return "\\w+";
                };
                c = 1;
            }
            while (c--)
                if (k[c]) p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
            return p;
        })(
            "8.d(\" \");8.d(\"\\U,.\\y\\5.\\1\\1\\1\\1/\\1,\\u\\2 \\H\\n\\1\\1\\1\\1\\1\\b ', !-\\r\\j-i\\1/\\1/\\g\\n\\1\\1\\1 \\1 \\a\\4\\f'\\1\\1\\1 L/\\a\\4\\5\\2\\n\\1\\1 \\1 /\\1 \\a,\\1 /|\\1 ,\\1 ,\\1\\1\\1 ',\\n\\1\\1\\1\\q \\1/ /-\\j/\\1\\h\\E \\9 \\5!\\1 i\\n\\1\\1\\1 \\3 \\6 7\\q\\4\\c\\1 \\3'\\s-\\c\\2!\\t|\\1 |\\n\\1\\1\\1\\1 !,/7 '0'\\1\\1 \\X\\w| \\1 |\\1\\1\\1\\n\\1\\1\\1\\1 |.\\x\\\"\\1\\l\\1\\1 ,,,, / |./ \\1 |\\n\\1\\1\\1\\1 \\3'| i\\z.\\2,,A\\l,.\\B / \\1.i \\1|\\n\\1\\1\\1\\1\\1 \\3'| | / C\\D/\\3'\\5,\\1\\9.\\1|\\n\\1\\1\\1\\1\\1\\1 | |/i \\m|/\\1 i\\1,.\\6 |\\F\\1|\\n\\1\\1\\1\\1\\1\\1.|/ /\\1\\h\\G \\1 \\6!\\1\\1\\b\\1|\\n\\1\\1\\1 \\1 \\1 k\\5>\\2\\9 \\1 o,.\\6\\2 \\1 /\\2!\\n\\1\\1\\1\\1\\1\\1 !'\\m//\\4\\I\\g', \\b \\4'7'\\J'\\n\\1\\1\\1\\1\\1\\1 \\3'\\K|M,p,\\O\\3|\\P\\n\\1\\1\\1\\1\\1 \\1\\1\\1\\c-,/\\1|p./\\n\\1\\1\\1\\1\\1 \\1\\1\\1'\\f'\\1\\1!o,.:\\Q \\R\\S\\T v\"+e.V+\" / W \"+e.N);8.d(\" \");",
            60,
            60,
            "|u3000|uff64|uff9a|uff40|u30fd|uff8d||console|uff8a|uff0f|uff3c|uff84|log|live2d_settings|uff70|u00b4|uff49||u2010||u3000_|u3008||_|___|uff72|u2500|uff67|u30cf|u30fc||u30bd|u4ece|u30d8|uff1e|__|u30a4|k_|uff17_|u3000L_|u3000i|uff1a|u3009|uff34|uff70r|u30fdL__||___i|l2dVerDate|u30f3|u30ce|nLive2D|u770b|u677f|u5a18|u304f__|l2dVersion|FGHRSH|u00b40i".split(
                "|"
            ),
            0,
            {}
        )
    );

    /* 判断 JQuery */
    if (typeof $.ajax != "function")
        typeof jQuery.ajax == "function"
            ? (window.$ = jQuery)
            : console.log("[Error] JQuery is not defined.");

    /* 加载看板娘样式 */
    live2d_settings.waifuSize = live2d_settings.waifuSize.split("x");
    live2d_settings.waifuTipsSize = live2d_settings.waifuTipsSize.split("x");
    live2d_settings.waifuEdgeSide = live2d_settings.waifuEdgeSide.split(":");

    $("#live2d").attr("width", live2d_settings.waifuSize[0]);
    $("#live2d").attr("height", live2d_settings.waifuSize[1]);
    $(".waifu-tips").width(live2d_settings.waifuTipsSize[0]);
    $(".waifu-tips").height(live2d_settings.waifuTipsSize[1]);
    $(".waifu-tips").css("top", live2d_settings.waifuToolTop);
    $(".waifu-tips").css("font-size", live2d_settings.waifuFontSize);
    $(".waifu-tool").css("font-size", live2d_settings.waifuToolFont);
    $(".waifu-tool span").css("line-height", live2d_settings.waifuToolLine);

    if (live2d_settings.waifuEdgeSide[0] == "left")
        $(".waifu").css("left", live2d_settings.waifuEdgeSide[1] + "px");
    else if (live2d_settings.waifuEdgeSide[0] == "right")
        $(".waifu").css("right", live2d_settings.waifuEdgeSide[1] + "px");

    window.waifuResize = function () {
        $(window).width() <= Number(live2d_settings.waifuMinWidth.replace("px", ""))
            ? $(".waifu").hide()
            : $(".waifu").show();
    };
    if (live2d_settings.waifuMinWidth != "disable") {
        waifuResize();
        $(window).resize(function () {
            waifuResize();
        });
    }

    try {
        if (live2d_settings.waifuDraggable == "axis-x")
            $(".waifu").draggable({
                axis: "x",
                revert: live2d_settings.waifuDraggableRevert,
            });
        else if (live2d_settings.waifuDraggable == "unlimited")
            $(".waifu").draggable({ revert: live2d_settings.waifuDraggableRevert });
        else $(".waifu").css("transition", "all .3s ease-in-out");
    } catch (err) {
        console.log("[Error] JQuery UI is not defined.");
    }

    live2d_settings.homePageUrl =
        live2d_settings.homePageUrl == "auto"
            ? window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + "/"
            : live2d_settings.homePageUrl;
    if (
        window.location.protocol == "file:" &&
        live2d_settings.modelAPI.substr(0, 2) == "//"
    )
        live2d_settings.modelAPI = "http:" + live2d_settings.modelAPI;

    $(".waifu-tool .fui-home").click(function () {
        //window.location = 'https://www.fghrsh.net/';
        window.location = live2d_settings.homePageUrl;
    });

    $(".waifu-tool .fui-info-circle").click(function () {
        //window.open('https://imjad.cn/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-02');
        window.open(live2d_settings.aboutPageUrl);
    });

    if (typeof waifuPath == "object") loadTipsMessage(waifuPath);
    else {
        $.ajax({
            cache: true,
            url:
                waifuPath == ""
                    ? live2d_settings.tipsMessage
                    : waifuPath.substr(waifuPath.length - 15) == "waifu-tips.json"
                    ? waifuPath
                    : waifuPath + "waifu-tips.json",
            dataType: "json",
            success: function (result) {
                loadTipsMessage(result);
            },
        });
    }

    if (!live2d_settings.showToolMenu) $(".waifu-tool").hide();
    if (!live2d_settings.canCloseLive2d) $(".waifu-tool .fui-cross").hide();
    if (!live2d_settings.canSwitchModel) $(".waifu-tool .fui-eye").hide();
    if (!live2d_settings.canSwitchTextures) $(".waifu-tool .fui-user").hide();
    if (!live2d_settings.canSwitchHitokoto) $(".waifu-tool .fui-chat").hide();
    if (!live2d_settings.canTakeScreenshot) $(".waifu-tool .fui-photo").hide();
    if (!live2d_settings.canTurnToHomePage) $(".waifu-tool .fui-home").hide();
    if (!live2d_settings.canTurnToAboutPage)
        $(".waifu-tool .fui-info-circle").hide();

    if (waifuPath === undefined) waifuPath = "";
    var modelId = sessionStorage.getItem("modelId");
    var modelTexturesId = sessionStorage.getItem("modelTexturesId");

    if (!live2d_settings.modelStorage || modelId == null) {
        modelId = live2d_settings.modelId;
        modelTexturesId = live2d_settings.modelTexturesId;
    }
    loadModel(modelId, modelTexturesId);
}

function loadModel(modelId, modelTexturesId = 0) {
    if (live2d_settings.modelStorage) {
        sessionStorage.setItem("modelId", modelId);
        sessionStorage.setItem("modelTexturesId", modelTexturesId);
    } else {
        live2d_settings["modelId"] = modelId;
        live2d_settings["modelTexturesId"] = modelTexturesId;
    }
    loadlive2d(
        "live2d",
        live2d_settings.modelAPI + "get/?id=" + modelId + "-" + modelTexturesId,
        live2d_settings.showF12Status
            ? console.log(
                    "[Status]",
                    "live2d",
                    "模型",
                    modelId + "-" + modelTexturesId,
                    "加载完成"
                )
            : null
    );
}

function loadTipsMessage(result) {
    window.waifu_tips = result;

    $.each(result.mouseover, function (index, tips) {
        $(document).on("mouseover", tips.selector, function () {
            var text = getRandText(tips.text);
            text = text.render({ text: $(this).text() });
            showMessage(text, 3000);
        });
    });
    $.each(result.click, function (index, tips) {
        $(document).on("click", tips.selector, function () {
            var text = getRandText(tips.text);
            text = text.render({ text: $(this).text() });
            showMessage(text, 3000, true);
        });
    });
    $.each(result.seasons, function (index, tips) {
        var now = new Date();
        var after = tips.date.split("-")[0];
        var before = tips.date.split("-")[1] || after;

        if (
            after.split("/")[0] <= now.getMonth() + 1 &&
            now.getMonth() + 1 <= before.split("/")[0] &&
            after.split("/")[1] <= now.getDate() &&
            now.getDate() <= before.split("/")[1]
        ) {
            var text = getRandText(tips.text);
            text = text.render({ year: now.getFullYear() });
            showMessage(text, 6000, true);
        }
    });

    if (live2d_settings.showF12OpenMsg) {
        re.toString = function () {
            showMessage(getRandText(result.waifu.console_open_msg), 5000, true);
            return "";
        };
    }

    if (live2d_settings.showCopyMessage) {
        $(document).on("copy", function () {
            showMessage(getRandText(result.waifu.copy_message), 5000, true);
        });
    }

    $(".waifu-tool .fui-photo").click(function () {
        showMessage(getRandText(result.waifu.screenshot_message), 5000, true);
        window.Live2D.captureName = live2d_settings.screenshotCaptureName;
        window.Live2D.captureFrame = true;
    });

    $(".waifu-tool .fui-cross").click(function () {
        sessionStorage.setItem("waifu-dsiplay", "none");
        showMessage(getRandText(result.waifu.hidden_message), 1300, true);
        window.setTimeout(function () {
            $(".waifu").hide();
        }, 1300);
    });

    window.showWelcomeMessage = function (result) {
        var text;
        if (window.location.href == live2d_settings.homePageUrl) {
            var now = new Date().getHours();
            if (now > 23 || now <= 5)
                text = getRandText(result.waifu.hour_tips.t23 - 5);
            else if (now > 5 && now <= 7)
                text = getRandText(result.waifu.hour_tips.t5 - 7);
            else if (now > 7 && now <= 11)
                text = getRandText(result.waifu.hour_tips.t7 - 11);
            else if (now > 11 && now <= 14)
                text = getRandText(result.waifu.hour_tips.t11 - 14);
            else if (now > 14 && now <= 17)
                text = getRandText(result.waifu.hour_tips.t14 - 17);
            else if (now > 17 && now <= 19)
                text = getRandText(result.waifu.hour_tips.t17 - 19);
            else if (now > 19 && now <= 21)
                text = getRandText(result.waifu.hour_tips.t19 - 21);
            else if (now > 21 && now <= 23)
                text = getRandText(result.waifu.hour_tips.t21 - 23);
            else text = getRandText(result.waifu.hour_tips.default);
        } else {
            var referrer_message = result.waifu.referrer_message;
            if (document.referrer !== "") {
                var referrer = document.createElement("a");
                referrer.href = document.referrer;
                var domain = referrer.hostname.split(".")[1];
                if (window.location.hostname == referrer.hostname)
                    text =
                        referrer_message.localhost[0] +
                        document.title.split(referrer_message.localhost[2])[0] +
                        referrer_message.localhost[1];
                else if (domain == "baidu")
                    text =
                        referrer_message.baidu[0] +
                        referrer.search.split("&wd=")[1].split("&")[0] +
                        referrer_message.baidu[1];
                else if (domain == "so")
                    text =
                        referrer_message.so[0] +
                        referrer.search.split("&q=")[1].split("&")[0] +
                        referrer_message.so[1];
                else if (domain == "google")
                    text =
                        referrer_message.google[0] +
                        document.title.split(referrer_message.google[2])[0] +
                        referrer_message.google[1];
                else {
                    $.each(result.waifu.referrer_hostname, function (i, val) {
                        if (i == referrer.hostname) referrer.hostname = getRandText(val);
                    });
                    text =
                        referrer_message.default[0] +
                        referrer.hostname +
                        referrer_message.default[1];
                }
            } else
                text =
                    referrer_message.none[0] +
                    document.title.split(referrer_message.none[2])[0] +
                    referrer_message.none[1];
        }
        showMessage(text, 6000);
    };
    if (live2d_settings.showWelcomeMessage) showWelcomeMessage(result);

    var waifu_tips = result.waifu;

    function loadOtherModel() {
        var modelId = modelStorageGetItem("modelId");
        var modelRandMode = live2d_settings.modelRandMode;

        $.ajax({
            cache: modelRandMode == "switch" ? true : false,
            url: live2d_settings.modelAPI + modelRandMode + "/?id=" + modelId,
            dataType: "json",
            success: function (result) {
                loadModel(result.model["id"]);
                var message = result.model["message"];
                $.each(waifu_tips.model_message, function (i, val) {
                    if (i == result.model["id"]) message = getRandText(val);
                });
                showMessage(message, 3000, true);
            },
        });
    }

    function loadRandTextures() {
        var modelId = modelStorageGetItem("modelId");
        var modelTexturesId = modelStorageGetItem("modelTexturesId");
        var modelTexturesRandMode = live2d_settings.modelTexturesRandMode;

        $.ajax({
            cache: modelTexturesRandMode == "switch" ? true : false,
            url:
                live2d_settings.modelAPI +
                modelTexturesRandMode +
                "_textures/?id=" +
                modelId +
                "-" +
                modelTexturesId,
            dataType: "json",
            success: function (result) {
                if (
                    result.textures["id"] == 1 &&
                    (modelTexturesId == 1 || modelTexturesId == 0)
                )
                    showMessage(waifu_tips.load_rand_textures[0], 3000, true);
                else showMessage(waifu_tips.load_rand_textures[1], 3000, true);
                loadModel(modelId, result.textures["id"]);
            },
        });
    }

    function modelStorageGetItem(key) {
        return live2d_settings.modelStorage
            ? sessionStorage.getItem(key)
            : live2d_settings[key];
    }

    /* 检测用户活动状态，并在空闲时显示一言 */
    if (live2d_settings.showHitokoto) {
        window.getActed = false;
        window.hitokotoTimer = 0;
        window.hitokotoInterval = false;
        $(document)
            .mousemove(function (e) {
                getActed = true;
            })
            .keydown(function () {
                getActed = true;
            });
        setInterval(function () {
            if (!getActed) ifActed();
            else elseActed();
        }, 1000);
    }

    function ifActed() {
        if (!hitokotoInterval) {
            hitokotoInterval = true;
            hitokotoTimer = window.setInterval(showHitokotoActed, 30000);
        }
    }

    function elseActed() {
        getActed = hitokotoInterval = false;
        window.clearInterval(hitokotoTimer);
    }

    function showHitokotoActed() {
        if ($(document)[0].visibilityState == "visible") showHitokoto();
    }

    function showHitokoto() {
        switch (live2d_settings.hitokotoAPI) {
            case "lwl12.com":
                $.getJSON(
                    "https://api.lwl12.com/hitokoto/v1?encode=realjson",
                    function (result) {
                        if (!empty(result.source)) {
                            var text = waifu_tips.hitokoto_api_message["lwl12.com"][0];
                            if (!empty(result.author))
                                text += waifu_tips.hitokoto_api_message["lwl12.com"][1];
                            text = text.render({
                                source: result.source,
                                creator: result.author,
                            });
                            window.setTimeout(function () {
                                showMessage(
                                    text + waifu_tips.hitokoto_api_message["lwl12.com"][2],
                                    3000,
                                    true
                                );
                            }, 5000);
                        }
                        showMessage(result.text, 5000, true);
                    }
                );
                break;
            case "fghrsh.net":
                $.getJSON(
                    "https://api.fghrsh.net/hitokoto/rand/?encode=jsc&uid=3335",
                    function (result) {
                        if (!empty(result.source)) {
                            var text = waifu_tips.hitokoto_api_message["fghrsh.net"][0];
                            text = text.render({ source: result.source, date: result.date });
                            window.setTimeout(function () {
                                showMessage(text, 3000, true);
                            }, 5000);
                            showMessage(result.hitokoto, 5000, true);
                        }
                    }
                );
                break;
            case "jinrishici.com":
                $.ajax({
                    url: "https://v2.jinrishici.com/one.json",
                    xhrFields: { withCredentials: true },
                    success: function (result, status) {
                        if (!empty(result.data.origin.title)) {
                            var text = waifu_tips.hitokoto_api_message["jinrishici.com"][0];
                            text = text.render({
                                title: result.data.origin.title,
                                dynasty: result.data.origin.dynasty,
                                author: result.data.origin.author,
                            });
                            window.setTimeout(function () {
                                showMessage(text, 3000, true);
                            }, 5000);
                        }
                        showMessage(result.data.content, 5000, true);
                    },
                });
                break;
            default:
                $.getJSON("https://v1.hitokoto.cn", function (result) {
                    if (!empty(result.from)) {
                        var text = waifu_tips.hitokoto_api_message["hitokoto.cn"][0];
                        text = text.render({
                            source: result.from,
                            creator: result.creator,
                        });
                        window.setTimeout(function () {
                            showMessage(text, 3000, true);
                        }, 5000);
                    }
                    showMessage(result.hitokoto, 5000, true);
                });
        }
    }

    $(".waifu-tool .fui-eye").click(function () {
        loadOtherModel();
    });
    $(".waifu-tool .fui-user").click(function () {
        loadRandTextures();
    });
    $(".waifu-tool .fui-chat").click(function () {
        showHitokoto();
    });
}
```

修改`themes/next/live2d-widget/waifu-tips.json`，删掉原有内容替换如下：

```json
{
    "waifu": {
        "console_open_msg": ["哈哈，你打开了控制台，是想要看看我的秘密吗？"],
        "copy_message": ["你都复制了些什么呀，转载要记得加上出处哦"],
        "screenshot_message": ["照好了嘛，是不是很可爱呢？"],
        "hidden_message": ["我们还能再见面的吧…"],
        "load_rand_textures": ["我还没有其他衣服呢", "我的新衣服好看嘛"],
        "hour_tips": {
            "t5-7": ["早上好！一日之计在于晨，美好的一天就要开始了"],
            "t7-11": ["上午好！工作顺利嘛，不要久坐，多起来走动走动哦！"],
            "t11-14": ["中午了，工作了一个上午，现在是午餐时间！"],
            "t14-17": ["午后很容易犯困呢，今天的运动目标完成了吗？"],
            "t17-19": ["傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~"],
            "t19-21": ["晚上好，今天过得怎么样？"],
            "t21-23": ["已经这么晚了呀，早点休息吧，晚安~"],
            "t23-5": ["你是夜猫子呀？这么晚还不睡觉，明天起的来嘛"],
            "default": ["嗨~ 快来逗我玩吧！"]
        },
        "referrer_message": {
            "localhost": ["欢迎阅读<span style=\"color:#0099cc;\">『", "』</span>", " - "],
            "baidu": ["Hello! 来自 百度搜索 的朋友<br>你是搜索 <span style=\"color:#0099cc;\">", "</span> 找到的我吗？"],
            "so": ["Hello! 来自 360搜索 的朋友<br>你是搜索 <span style=\"color:#0099cc;\">", "</span> 找到的我吗？"],
            "google": ["Hello! 来自 谷歌搜索 的朋友<br>欢迎阅读<span style=\"color:#0099cc;\">『", "』</span>", " - "],
            "default": ["Hello! 来自 <span style=\"color:#0099cc;\">", "</span> 的朋友"],
            "none": ["欢迎阅读<span style=\"color:#0099cc;\">『", "』</span>", " - "]
        },
        "referrer_hostname": {
            "yaoxi-std.github.io": ["yaoxi-std"]
        },
        "model_message": {
            "1": ["来自 Potion Maker 的 Pio 酱 ~"],
            "2": ["来自 Potion Maker 的 Tia 酱 ~"]  
        },
        "hitokoto_api_message": {
            "lwl12.com": ["这句一言来自 <span style=\"color:#0099cc;\">『{source}』</span>", "，是 <span style=\"color:#0099cc;\">{creator}</span> 投稿的", "。"],
            "fghrsh.net": ["这句一言出处是 <span style=\"color:#0099cc;\">『{source}』</span>，是 <span style=\"color:#0099cc;\">FGHRSH</span> 在 {date} 收藏的！"],
            "jinrishici.com": ["这句诗词出自 <span style=\"color:#0099cc;\">《{title}》</span>，是 {dynasty}诗人 {author} 创作的！"],
            "hitokoto.cn": ["这句一言来自 <span style=\"color:#0099cc;\">『{source}』</span>，是 <span style=\"color:#0099cc;\">{creator}</span> 在 hitokoto.cn 投稿的。"]
        }
    },
    "mouseover": [
        { "selector": ".container a[href^='http']", "text": ["要看看 <span style=\"color:#0099cc;\">{text}</span> 么？"] },
        { "selector": ".fui-home", "text": ["点击前往首页，想回到上一页可以使用浏览器的后退功能哦"] },
        { "selector": ".fui-chat", "text": ["一言一语，一颦一笑。一字一句，一颗赛艇。"] },
        { "selector": ".fui-eye", "text": ["嗯··· 要切换 看板娘 吗？"] },
        { "selector": ".fui-user", "text": ["喜欢换装 Play 吗？"] },
        { "selector": ".fui-photo", "text": ["要拍张纪念照片吗？"] },
        { "selector": ".fui-info-circle", "text": ["这里有关于我的信息呢"] },
        { "selector": ".fui-cross", "text": ["你不喜欢我了吗..."] },
        { "selector": "#tor_show", "text": ["翻页比较麻烦吗，点击可以显示这篇文章的目录呢"] },
        { "selector": "#comment_go", "text": ["想要去评论些什么吗？"] },
        { "selector": "#night_mode", "text": ["深夜时要爱护眼睛呀"] },
        { "selector": "#qrcode", "text": ["手机扫一下就能继续看，很方便呢"] },
        { "selector": ".comment_reply", "text": ["要吐槽些什么呢"] },
        { "selector": "#back-to-top", "text": ["回到开始的地方吧"] },
        { "selector": "#author", "text": ["该怎么称呼你呢"] },
        { "selector": "#mail", "text": ["留下你的邮箱，不然就是无头像人士了"] },
        { "selector": "#url", "text": ["你的家在哪里呢，好让我去参观参观"] },
        { "selector": "#textarea", "text": ["认真填写哦，垃圾评论是禁止事项"] },
        { "selector": ".OwO-logo", "text": ["要插入一个表情吗"] },
        { "selector": "#csubmit", "text": ["要[提交]^(Commit)了吗，首次评论需要审核，请耐心等待~"] },
        { "selector": ".ImageBox", "text": ["点击图片可以放大呢"] },
        { "selector": "input[name=s]", "text": ["找不到想看的内容？搜索看看吧"] },
        { "selector": ".previous", "text": ["去上一页看看吧"] },
        { "selector": ".next", "text": ["去下一页看看吧"] },
        { "selector": ".dropdown-toggle", "text": ["这里是菜单"] },
        { "selector": "c-player a.play-icon", "text": ["想要听点音乐吗"] },
        { "selector": "c-player div.time", "text": ["在这里可以调整<span style=\"color:#0099cc;\">播放进度</span>呢"] },
        { "selector": "c-player div.volume", "text": ["在这里可以调整<span style=\"color:#0099cc;\">音量</span>呢"] },
        { "selector": "c-player div.list-button", "text": ["<span style=\"color:#0099cc;\">播放列表</span>里都有什么呢"] },
        { "selector": "c-player div.lyric-button", "text": ["有<span style=\"color:#0099cc;\">歌词</span>的话就能跟着一起唱呢"] },
        { "selector": ".waifu #live2d", "text": ["干嘛呢你，快把手拿开", "鼠…鼠标放错地方了！"] }
    ],
    "click": [
        {
            "selector": ".waifu #live2d",
            "text": [
                "是…是不小心碰到了吧",
                "萝莉控是什么呀",
                "你看到我的小熊了吗",
                "再摸的话我可要报警了！⌇●﹏●⌇",
                "110吗，这里有个变态一直在摸我(ó﹏ò｡)"
            ]
        }
    ],
    "seasons": [
        { "date": "01/01", "text": ["<span style=\"color:#0099cc;\">元旦</span>了呢，新的一年又开始了，今年是{year}年~"] },
        { "date": "02/14", "text": ["又是一年<span style=\"color:#0099cc;\">情人节</span>，{year}年找到对象了嘛~"] },
        { "date": "03/08", "text": ["今天是<span style=\"color:#0099cc;\">妇女节</span>！"] },
        { "date": "03/12", "text": ["今天是<span style=\"color:#0099cc;\">植树节</span>，要保护环境呀"] },
        { "date": "04/01", "text": ["悄悄告诉你一个秘密~<span style=\"background-color:#34495e;\">今天是愚人节，不要被骗了哦~</span>"] },
        { "date": "05/01", "text": ["今天是<span style=\"color:#0099cc;\">五一劳动节</span>，计划好假期去哪里了吗~"] },
        { "date": "06/01", "text": ["<span style=\"color:#0099cc;\">儿童节</span>了呢，快活的时光总是短暂，要是永远长不大该多好啊…"] },
        { "date": "09/03", "text": ["<span style=\"color:#0099cc;\">中国人民抗日战争胜利纪念日</span>，铭记历史、缅怀先烈、珍爱和平、开创未来。"] },
        { "date": "09/10", "text": ["<span style=\"color:#0099cc;\">教师节</span>，在学校要给老师问声好呀~"] },
        { "date": "10/01", "text": ["<span style=\"color:#0099cc;\">国庆节</span>，新中国已经成立了呢"] },
        { "date": "11/05-11/12", "text": ["今年的<span style=\"color:#0099cc;\">双十一</span>是和谁一起过的呢~"] },
        { "date": "12/20-12/31", "text": ["这几天是<span style=\"color:#0099cc;\">圣诞节</span>，主人肯定又去剁手买买买了~"] }
    ]
}
```

修改`themes/next/live2d-widget/waifu-tips.css`，**不要删掉**原有内容，在文档末尾添加如下代码：

```css
.waifu {
    position: fixed;
    bottom: 0;
    z-index: 1;
    font-size: 0;
    -webkit-transform: translateY(20px);
    transform: translateY(20px);
}
.waifu:hover {
    -webkit-transform: translateY(15px);
    transform: translateY(15px);
}
.waifu-tips {
    opacity: 0;
    margin: -20px 20px;
    padding: 5px 10px;
    border: 1px solid rgba(224, 186, 140, 0.62);
    border-radius: 12px;
    background-color: rgba(236, 217, 188, 0.5);
    box-shadow: 0 3px 15px 2px rgba(191, 158, 118, 0.2);
    text-overflow: ellipsis;
    overflow: hidden;
    position: absolute;
    animation-delay: 5s;
    animation-duration: 50s;
    animation-iteration-count: infinite;
    animation-name: shake;
    animation-timing-function: ease-in-out;
}
.waifu-tool {
    display: none;
    color: #aaa;
    top: 50px;
    right: 10px;
    position: absolute;
}
.waifu:hover .waifu-tool {
    display: block;
}
.waifu-tool span {
    display: block;
    cursor: pointer;
    color: #5b6c7d;
    transition: 0.2s;
}
.waifu-tool span:hover {
    color: #34495e;
}
.waifu #live2d{
    position: relative;
}

@keyframes shake {
    2% {
        transform: translate(0.5px, -1.5px) rotate(-0.5deg);
    }

    4% {
        transform: translate(0.5px, 1.5px) rotate(1.5deg);
    }

    6% {
        transform: translate(1.5px, 1.5px) rotate(1.5deg);
    }

    8% {
        transform: translate(2.5px, 1.5px) rotate(0.5deg);
    }

    10% {
        transform: translate(0.5px, 2.5px) rotate(0.5deg);
    }

    12% {
        transform: translate(1.5px, 1.5px) rotate(0.5deg);
    }

    14% {
        transform: translate(0.5px, 0.5px) rotate(0.5deg);
    }

    16% {
        transform: translate(-1.5px, -0.5px) rotate(1.5deg);
    }

    18% {
        transform: translate(0.5px, 0.5px) rotate(1.5deg);
    }

    20% {
        transform: translate(2.5px, 2.5px) rotate(1.5deg);
    }

    22% {
        transform: translate(0.5px, -1.5px) rotate(1.5deg);
    }

    24% {
        transform: translate(-1.5px, 1.5px) rotate(-0.5deg);
    }

    26% {
        transform: translate(1.5px, 0.5px) rotate(1.5deg);
    }

    28% {
        transform: translate(-0.5px, -0.5px) rotate(-0.5deg);
    }

    30% {
        transform: translate(1.5px, -0.5px) rotate(-0.5deg);
    }

    32% {
        transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }

    34% {
        transform: translate(2.5px, 2.5px) rotate(-0.5deg);
    }

    36% {
        transform: translate(0.5px, -1.5px) rotate(0.5deg);
    }

    38% {
        transform: translate(2.5px, -0.5px) rotate(-0.5deg);
    }

    40% {
        transform: translate(-0.5px, 2.5px) rotate(0.5deg);
    }

    42% {
        transform: translate(-1.5px, 2.5px) rotate(0.5deg);
    }

    44% {
        transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }

    46% {
        transform: translate(1.5px, -0.5px) rotate(-0.5deg);
    }

    48% {
        transform: translate(2.5px, -0.5px) rotate(0.5deg);
    }

    50% {
        transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }

    52% {
        transform: translate(-0.5px, 1.5px) rotate(0.5deg);
    }

    54% {
        transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }

    56% {
        transform: translate(0.5px, 2.5px) rotate(1.5deg);
    }

    58% {
        transform: translate(2.5px, 2.5px) rotate(0.5deg);
    }

    60% {
        transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }

    62% {
        transform: translate(-1.5px, 0.5px) rotate(1.5deg);
    }

    64% {
        transform: translate(-1.5px, 1.5px) rotate(1.5deg);
    }

    66% {
        transform: translate(0.5px, 2.5px) rotate(1.5deg);
    }

    68% {
        transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }

    70% {
        transform: translate(2.5px, 2.5px) rotate(0.5deg);
    }

    72% {
        transform: translate(-0.5px, -1.5px) rotate(1.5deg);
    }

    74% {
        transform: translate(-1.5px, 2.5px) rotate(1.5deg);
    }

    76% {
        transform: translate(-1.5px, 2.5px) rotate(1.5deg);
    }

    78% {
        transform: translate(-1.5px, 2.5px) rotate(0.5deg);
    }

    80% {
        transform: translate(-1.5px, 0.5px) rotate(-0.5deg);
    }

    82% {
        transform: translate(-1.5px, 0.5px) rotate(-0.5deg);
    }

    84% {
        transform: translate(-0.5px, 0.5px) rotate(1.5deg);
    }

    86% {
        transform: translate(2.5px, 1.5px) rotate(0.5deg);
    }

    88% {
        transform: translate(-1.5px, 0.5px) rotate(1.5deg);
    }

    90% {
        transform: translate(-1.5px, -0.5px) rotate(-0.5deg);
    }

    92% {
        transform: translate(-1.5px, -1.5px) rotate(1.5deg);
    }

    94% {
        transform: translate(0.5px, 0.5px) rotate(-0.5deg);
    }

    96% {
        transform: translate(2.5px, -0.5px) rotate(-0.5deg);
    }

    98% {
        transform: translate(-1.5px, -1.5px) rotate(-0.5deg);
    }

    0%, 100% {
        transform: translate(0, 0) rotate(0);
    }
}
@font-face {
  font-family: 'Flat-UI-Icons';
  src: url('flat-ui-icons-regular.eot');
  src: url('flat-ui-icons-regular.eot?#iefix') format('embedded-opentype'), url('flat-ui-icons-regular.woff') format('woff'), url('flat-ui-icons-regular.ttf') format('truetype'), url('flat-ui-icons-regular.svg#flat-ui-icons-regular') format('svg');
}
[class^="fui-"],
[class*="fui-"] {
  font-family: 'Flat-UI-Icons';
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.fui-cross:before {
  content: "\e609";
}
.fui-info-circle:before {
  content: "\e60f";
}
.fui-photo:before {
  content: "\e62a";
}
.fui-eye:before {
  content: "\e62c";
}
.fui-chat:before {
  content: "\e62d";
}
.fui-home:before {
  content: "\e62e";
}
.fui-user:before {
  content: "\e631";
}
```

到[这里](https://github.com/fghrsh/live2d_demo)下载以`flat-ui-icons`开头的$4$个图标文件，放在`themes/next/live2d-widget/`文件夹中。

至此工作全部完成，清理目录并重新生成`html`文件，打开`localhost`，你会发现角色可以正常换装了。
