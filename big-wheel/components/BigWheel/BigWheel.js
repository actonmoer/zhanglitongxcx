// components/BigWheel/BigWheel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  attached () {
    this.drowFan();
    this.drawGo();
    this.drawFill();
  },
  /**
   * 组件的初始数据
   */
  data: {
    angle: 0,
    index: 0,
    angle1: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 画个扇形
     */
    drowFan: function () {
      var context = wx.createCanvasContext('myCanvas', this);
      var array = [60, 100, 60, 60, 60, 60];
      var colors = ["#228B22", "pink", "#008B8B", "#ADFF2F", "#fb5f01", "#0701fb", "#f801fb"];
      var total = 0;
      for (var val = 0; val < array.length; val++) {
        total += array[val];
      }
      var point = { x: 150, y: 150 };
      var radius = 150;
      for (var i = 0; i < array.length; i++) {
        context.beginPath();
        var start = 0;
        if (i > 0) {
          for (var j = 0; j < i; j++) {
            start += array[j] / total * 2 * Math.PI;
          }
        }
        var end = start + array[i] / total * 2 * Math.PI;
        context.arc(point.x, point.y, radius, start, end);
        context.setLineWidth(2)
        context.lineTo(point.x, point.y);
        context.setStrokeStyle('#F5F5F5');
        context.setFillStyle(colors[i]);
        context.fill();
        context.closePath();
        context.stroke();
      }
      // 画中间按钮
      context.draw();
    },

    /**
     * 画GO
     */
    drawGo: function () {
      var point = { x: 50, y: 50 };
      let context = wx.createCanvasContext('go', this);
      context.beginPath();
      context.moveTo(point.x, point.y); 
      context.arc(point.x, point.y, 25, 0, 2 * Math.PI);
      context.setLineWidth(2)
      context.lineTo(point.x, point.y);
      context.setFillStyle("red");
      context.fill();
      context.closePath();

      context.beginPath();
      context.moveTo(25, 50);
      context.lineTo(50, 12.5);
      context.lineTo(75, 50);
      context.lineTo(25, 50);
      context.setFillStyle('red')
      context.fill();
      context.closePath();

      context.beginPath();
      context.setLineWidth(1)
      context.setFontSize(30)
      context.setFillStyle('#ffffff')
      context.setTextAlign('center')
      context.setTextBaseline('middle')
      context.fillText('GO', 50, 50, 30);
      context.fill();
      context.closePath();

      context.draw();
    },

    /**
     * 开始旋转
     */
    playBigWheel: function () {
      const rdm = Math.floor(Math.random() * 360);
      let index = this.data.index;

      index++;

      this.setData({
        // angle: (3600 + rdm) * index,
        angle: 60,
        index: index
      });
      console.log(this.data.angle);
    },

    /**
     * 试试
     */
    onShishi: function () {
      console.log("shishi");
      const deg = this.data.angle1;
      this.setData({
        angle1: deg + 360
      });
    },

    /**
     * 画正方形
     */
    drawFill: function () {
      const ctx = wx.createCanvasContext('shishi', this);
      ctx.beginPath();
      // ctx.translate(20, 20);
      // ctx.fillRect(-25, -25, 50, 50);
      ctx.arc(50, 50, 50, 0, 2 * Math.PI);
      ctx.setFillStyle('red');
      ctx.fill();
      ctx.closePath;

      ctx.beginPath();
      ctx.setLineWidth(1)
      ctx.setFontSize(30)
      ctx.setFillStyle('#ffffff')
      ctx.setTextAlign('center')
      ctx.setTextBaseline('middle')
      ctx.fillText('GO', 50, 50, 30);
      ctx.fill();
      ctx.closePath();

      ctx.draw();
  
  
    },

    /**
     * 动画
     */
   
    createAnimation: function () {
      const rdm = Math.floor(Math.random() * 360);
      let index = this.data.index;

      var animation = wx.createAnimation({
          duration: 4000,
          timingFunction: "ease-out"
        });

      index++;

      // 转的圈数
      let deg = (rdm + 3600) * index;
      animation.rotate(deg).step();

      this.setData({
        animationData: animation.export(),
        index: index
      });
    }
    
  }
})
