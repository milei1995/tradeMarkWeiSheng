<template>
  <div class="category">
    <div class="category-part1">分类:</div>
    <div class="category-part2">
      <div
        class="category-part2-item"
        v-for="(item,index) in categoryList"
        :key="index"
        :class="{active:categoryIndex==index}"
        @click="chooseCategory(index)"
      >{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import TrademarkCategoryIconMixin from "../mixin/trademarkCategoryIconMixin";
export default {
  name: "SearchCategoryCondution",
  mixins: [TrademarkCategoryIconMixin],
  data() {
    return {
      categoryList: [
        {
          id: "",
          name: "不限"
        }
      ],
      categoryIndex: 0
    };
  },
  props:["currentId"],
  created() {
    this.category.forEach(item => {
      const categoryNameItem = item.name.substr(1);
      const obj = {
        id: item.id,
        name: categoryNameItem
      };
      this.categoryList.push(obj);
    });
  },
 watch:{
  currentId(newId,oldId){
    console.log(newId,oldId)
    this.categoryIndex=newId
  }
 },
 mounted(){
   
 },
  methods: {
    chooseCategory(index) {
      console.log(this.currentId)
      console.log(index);
      this.categoryIndex = index;
      this.$emit('getCategoryId',index)
    }
  }
};
</script>

<style scoped>
.category {
  background-color: #ffffff;
  display: flex;
  min-width: 1130px;
}
.category-part1 {
  margin-top: 10px;
  color: #777f84;
  font-size: 12px;
  min-width: 50px;
}
.category-part2 {
  display: flex;
  flex-wrap: wrap;
}
.category-part2-item {
  width: 10%;
  margin-top: 10px;
  min-width: 70px;
  font-size: 12px;
}
.category-part2-item:hover {
  cursor: pointer;
}
.active {
  color: #00c1de;
}
</style>