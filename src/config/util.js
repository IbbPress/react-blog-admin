export function welcome() {
  const time = new Date();
  const hour = time.getHours();
  const timeMap = {
    9:  '早上好',
    11: '上午好',
    13: '中午好',
    20: '下午好',
    24: '晚上好',
  };
  const key = Object.keys(timeMap).find(key => hour <= key);
  return timeMap[key];
}
