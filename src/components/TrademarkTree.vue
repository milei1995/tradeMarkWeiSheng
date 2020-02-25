<template>
  <a-tree
    checkable
    :checkStrictly="checkStrictly"
    @expand="onExpand"
    :expandedKeys="expandedKeys"
    :autoExpandParent="autoExpandParent"
    v-model="checkedKeys"
    @select="onSelect"
    :selectedKeys="selectedKeys"
    :treeData="treeData"
  />
</template>

<script>
// const treeData = [
// {
//   title: "0-0",
//   key: "0-0",
//   children: [
//     {
//       title: "0-0-0",
//       key: "0-0-0",
//       children: [
//         { title: "0-0-0-0", key: "0-0-0-0" },
//         { title: "0-0-0-1", key: "0-0-0-1" },
//         { title: "0-0-0-2", key: "0-0-0-2" }
//       ]
//     },
//     {
//       title: "0-0-1",
//       key: "0-0-1",
//       children: [
//         { title: "0-0-1-0", key: "0-0-1-0" },
//         { title: "0-0-1-1", key: "0-0-1-1" },
//         { title: "0-0-1-2", key: "0-0-1-2" }
//       ]
//     },
//     {
//       title: "0-0-2",
//       key: "0-0-2"
//     }
//   ]
// },
// {
//   title: "0-1",
//   key: "0-1",
//   children: [
//     { title: "0-1-0-0", key: "0-1-0-0" },
//     { title: "0-1-0-1", key: "0-1-0-1" },
//     { title: "0-1-0-2", key: "0-1-0-2" }
//   ]
// },
// {
//   title: "0-2",
//   key: "0-2"
// }
// ];
import { setStorage, getStorage } from "../mixin/storage";
export default {
  name: "TrademarkTree",
  data() {
    return {
      expandedKeys: ["0-0-0", "0-0-1"],
      autoExpandParent: true,
      checkStrictly:false,
      checkedKeys: ["0-0-0"],
      selectedKeys: [],
      treeData: []
    };
  },
  watch: {
    checkedKeys(val) {
      this.$emit("onCheckItem", val);
    }
  },
  mounted() {
    const originTreeData = getStorage("treeData");
    if (originTreeData == [] || originTreeData == undefined) {
      this.getClassifyGoods();
    } else {
      this.treeData = originTreeData;
    }
  },
  methods: {
    onExpand(expandedKeys) {
      console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
      this.$emit("onExpandItem", expandedKeys);
    },
    onCheck(checkedKeys) {
      console.log("onCheck", checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
    },
    getClassifyGoods() {
      const params = {
        queryType: 2
      };
      const url =
        "/api/trademark/trademarkClassifyGoods/selectTrademarkClassifyGoodsList";
      this.$axios({
        method: "get",
        url: url,
        params: params
      }).then(res => {
        console.log(res);
        if (res.data.success) {
          const treeData = [];
          res.data.data.list.forEach(item => {
            const children = [];
            item.classifyGroups.forEach(item2 => {
              const obj2 = {
                title: item2.groupsId + " " + item2.groupsName,
                fatherId: item.classifyId,
                price: item.price,
                key: item2.groupsId,
                id: item2.groupsId
              };
              children.push(obj2);
            });
            const obj1 = {
              title: "第" + item.classifyNum + "类" + " " + item.classifyName,
              key: item.classifyNum,
              id: item.classifyId,
              price: item.classifyPrice,
              children: children
            };
            treeData.push(obj1);
          });
          console.log(treeData);
          setStorage("treeData", treeData);
          this.treeData = treeData;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .ant-tree {
            li{
              .ant-tree-checkbox{
                display: none;
              }
            }
}
</style>

