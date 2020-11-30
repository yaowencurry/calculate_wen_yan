function handleAverage(arr, hisory) {
  let sum = 0;
  let average;
  let unit = hisory || JSON.parse(wx.getStorageSync('unit'));
  if (unit == '0') {
    arr.map(item => {
      sum += Number(item.count / 1000) * 10000;
    });
    average = sum / arr.length / 10000;
  } else {
    arr.map(item => {
      sum += Number(item.count/100) * 10000;
    });
    average = sum / arr.length / 10000;
  }

  return average
}

export function calAverage(arr, hisory) {
  if (arr.length < 1) return
  let average = handleAverage(arr, hisory)
  if (!average) return
  return (average * 1000).toFixed(1)
}

export function calDegree(arr, hisory) {
  if (arr.length < 1) return
  let degree = null;
  let overSize = 0;
  let moreSize = 0;
  let average = handleAverage(arr, hisory);
  let unit = hisory || JSON.parse(wx.getStorageSync('unit'));
  arr.map(item => {
    if (unit == 0) {
      if ((item.count / 1000) >= (average * 0.95)) {
        overSize++
      }
      if ((item.count / 1000) > (average * 1.05)) {
        moreSize++
      }
    } else {
      if ((item.count/100) >= (average * 0.95)) {
        overSize++
      }
      if ((item.count/100) > (average * 1.05)) {
        moreSize++
      }
    }
  })
  degree = (overSize - moreSize) / arr.length;
  return (degree * 100).toFixed(1)
}