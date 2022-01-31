const titles =
    ['编号', '比赛', '题目', '补题', '得分', '时间', '每题总结', '比赛总结'];
const widths = [35, 250, 250, 35, 35, 35, 800, 800];
Date.prototype.format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1,                    //月份
    'd+': this.getDate(),                         //日
    'h+': this.getHours(),                        //小时
    'm+': this.getMinutes(),                      //分
    's+': this.getSeconds(),                      //秒
    'q+': Math.floor((this.getMonth() + 3) / 3),  //季度
    'S': this.getMilliseconds()                   //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
        RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
          RegExp.$1,
          (RegExp.$1.length == 1) ? (o[k]) :
                                    (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};
function createElementWithText(tagName, text) {
  var element = document.createElement(tagName);
  element.innerText = text;
  return element;
};
function timestampToText(timestamp) {
  return new Date(timestamp * 1000).format('yyyy-MM-dd\nhh:mm:ss');
};
function contestElement(contest) {
  var element = document.createElement('td');
  var nameTag = createElementWithText('a', contest['name']);
  var beginTime = timestampToText(contest['begin']);
  var endTime = timestampToText(contest['end']);
  nameTag.setAttribute('href', contest['url']);
  element.appendChild(nameTag);
  element.appendChild(document.createElement('br'));
  element.appendChild(document.createTextNode(beginTime));
  element.appendChild(document.createElement('br'));
  element.appendChild(document.createTextNode(endTime));
  element.appendChild(document.createElement('br'));
  element.appendChild(document.createTextNode('总分: ' + contest['score']));
  element.style.textAlign = 'center';
  return element;
};
function problemElement(problem) {
  var element = document.createElement('td');
  var nameTag = createElementWithText('a', problem['name']);
  nameTag.setAttribute('href', problem['url']);
  element.appendChild(nameTag);
  return element;
};
function getCheckIcon(chk) {
  return chk ? '\u2713' : '\u2717';
};
function displayData(data) {
  var table = document.getElementById('dp');
  var titleBar = document.createElement('tr');
  titles.forEach((title, i, arr) => {
    var element = createElementWithText('td', title);
    element.style.width = widths[i] + 'px';
    titleBar.appendChild(element);
  });
  table.setAttribute('border', 1);
  table.style.fontSize = '14px';
  table.appendChild(titleBar);
  data.forEach((contest, i, arr1) => {
    contest['problems'].forEach((problem, j, arr2) => {
      var contestSpan = document.createElement('tr');
      if (j == 0) {
        var indexSpan = createElementWithText('td', i + 1);
        indexSpan.setAttribute('rowspan', contest['problems'].length);
        var nameSpan = contestElement(contest);
        nameSpan.setAttribute('rowspan', contest['problems'].length);
        contestSpan.appendChild(indexSpan);
        contestSpan.appendChild(nameSpan);
      }
      contestSpan.appendChild(problemElement(problem));
      contestSpan.appendChild(
          createElementWithText('td', getCheckIcon(problem['corrected'])));
      contestSpan.appendChild(createElementWithText('td', problem['score']));
      contestSpan.appendChild(createElementWithText('td', problem['time']));
      contestSpan.appendChild(createElementWithText('td', problem['summary']));
      if (j == 0) {
        var summarySpan = createElementWithText('td', contest['summary']);
        summarySpan.setAttribute('rowspan', contest['problems'].length);
        contestSpan.appendChild(summarySpan);
      }
      table.appendChild(contestSpan);
    });
  });
  console.log('/dp/ loaded');
};
$.ajax({
  url: '/dp/contests.json',
  type: 'GET',
  dataType: 'json',
  success: function(data) {
    displayData(data)
  }
});