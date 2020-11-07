<template>
  <div class="wrap">
    <ul id="marquee">
      <li class="scorlllist" v-for="(item, index) in lists" :key="index">
        {{ item.notice_title }}
      </li>
       
    </ul>
      
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "Scroller",
  props: ["lists"], // 父组件传入数据， 数组形式
  methods: {
    move() {
      // 获取内容区宽度
      let width = document.getElementById("marquee").scrollWidth;
      let width1 = document.getElementsByClassName("wrap")[0].offsetWidth;
        //   console.log(width2[0].scrollWidth);
      let marquee = document.getElementById("marquee");
      let speed = 10; // 位移距离 // 设置位移
      console.log(width1);
      setInterval(function () {
        speed = speed - 1; // 如果位移超过文字宽度，则回到起点
        if (-speed >= width) {
          speed = width1;
        }
        marquee.style.transform = "translateX(" + speed + "px)";
      }, 40);
    },
  },
  mounted: function () {
    this.move();
  },
};
</script>
 <style scoped>
/*样式的话可以写*/
.wrap  {
  overflow: hidden;
  width: 100%;
}
#box  {
  height: 100%;
}
ul,
li  {
  padding: 0;
  list-style: none;
  margin: 0;
      white-space: nowrap;
}
ul  {
  /* white-space: normal; */
  margin: 0 10px;
  overflow: hidden;
}
.scorlllist {
  height: 100%;
  margin-right: 100%;
  display: inline-block;
  color:red;
  font-weight: 700;
}
#marquee {
  /* display: inline-block;
      white-space: normal;
  margin:0 10px; */
}
</style>