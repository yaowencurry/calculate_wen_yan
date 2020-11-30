import * as echarts from '../../component/ec-canvas/echarts';
import {
  calDegree,
  calAverage
} from '../../../utils/calDuck';

const app = getApp();



Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {}
    }
  },
  data: {
    ec: {
      onInit: null
    },
    type: '0',
    degreeList: [],
    averageList: [],
    dateList: [],
    array: ['近7次历史数据', '近15次历史数据', '近30次历史数据', '全部'],
    index: 0,
    rangeData: ['0', '1', '2', '3'],
  },

  onReady() {},
  onShow() {
    this.handleSetData('0')
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    this.handleSetData(this.data.type);
  },
  handleSetData(type) {
    this.initData();

    let name = type === '0' ? '平均值' : '均匀度';
    let yDataType = type === '0' ? 'bar' : 'line';
    let data = type === '0' ? this.data.averageList : this.data.degreeList;
    let initChart = this.refreshChart(data, yDataType, name);
    this.setData({
      ec: {
        onInit: initChart
      }
    })
    this.selectComponent('#myCharts').init()
  },
  handleType(e) {
    const {
      type
    } = e.target.dataset
    this.setData({
      type
    })
    this.handleSetData(type);
  },
  initData() {
    let historyData = JSON.parse(wx.getStorageSync('historyData'));
    const {
      index
    } = this.data;
    let data = [];
    if (index == 0) {
      data = historyData.slice(-7)
    } else if (index == 1) {
      data = historyData.slice(-15)
    } else if (index == 2) {
      data = historyData.slice(-30)
    } else {
      data = historyData.slice()
    }
    data.forEach(shelf => {
      let arr = []
      shelf.data.map(item => {
        item.barList.map(bar => {
          bar.detail.map(detail => {
            arr.push(detail);
            shelf.degree = calDegree(arr, shelf.unit);
            shelf.average = calAverage(arr, shelf.unit);
            shelf.count = arr.length;
          })
        })
      })
    })
    let degreeList = data.map(item => item.degree);
    let averageList = data.map(item => item.average);
    let dateList = data.map(item => item.date);
    this.setData({
      degreeList,
      averageList,
      dateList
    })
  },
  refreshChart(data, type, name) {
    let _that = this;
    return function (canvas, width, height, dpr) {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      canvas.setChart(chart);
      var option = {
        title: {
          text: `${name}统计表${type=='bar' ? '(单位:g)' : '(单位:%)'}`,
          left: 'center',
          padding: 10
        },
        color: ["#0078d7"],
        legend: {
          top: 20,
          left: 'center',
          z: 30
        },
        grid: {
          left: '20',
          right: '8%',
          bottom: '1%',
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: _that.data.dateList,
          boundaryGap: true
        },
        yAxis: [{
          x: 'center',
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          offset: 0,
          type: "value",
        }],
        dataZoom: [{
          start: 0,
          type: "inside"
        }],
        series: [{
          type,
          smooth: true,
          barWidth: "25%",
          barGap: '30%',
          data,
          label: {
            show: true,
            position: 'top',
            color: '#0078d7'
          },
        }, ]
      };
      chart.setOption(option);
      return chart;
    }
  }
});