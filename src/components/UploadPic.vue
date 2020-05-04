<template>
  <a-upload
    name="avatar"
    listType="picture-card"
    class="avatar-uploader"
    :showUploadList="false"
    action="//jsonplaceholder.typicode.com/posts/"
    :beforeUpload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="createImg" />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      loading: false,
      imageUrl: this.imageUrlFromParent
    };
  },
  props:{
    type:{
      type:String
    },
    imageUrlFromParent:{
      type:String
    }
  },
  watch:{
     imageUrlFromParent(newPic,oldPic){
       console.log('&&&&&&&&&&&&&&&')
       console.log(newPic,oldPic)
     }
  },
  methods: {
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
          console.log(this.imageUrl)
        });
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      if (!isJPG) {
        this.$message.error("您只能上传png或jpg格式的图片");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图片大小需小于2MB");
      }
      if (isJPG && isLt2M) {
        const fd =new FormData()
        fd.append('file',file)
        const url = '/api/trademark/image/uploadImage';
        this.$axios({
          method: 'post',
          url: url,
          data: fd
        })
          .then(res => {
            console.log(res);
            if(res.data.success){
              this.imageUrl=res.data.data.imagePath
              console.log(this.imageUrl)
              console.log(this.type);
              switch(this.type){
                case '手动上传商标图样':
                  this.$emit("getImageUrl",this.imageUrl)
                  break
                case '企业营业执照':
                   this.$emit("getImageUrl1",this.imageUrl)
                   break
                case '身份证正面':
                  this.$emit("getImageUrl2",this.imageUrl)
                  break
                case '身份证反面':
                  this.$emit("getImageUrl3",this.imageUrl)
                  break
                case '个体户证明资料':
                  this.$emit("getImageUrl4",this.imageUrl)
                  break
                case '修改个人头像':
                  this.$emit("getImageUrl5",this.imageUrl)
                  break
                case '下载委托书':
                  this.$emit("getImageUrl6",this.imageUrl)
                  break
                case '商标上传':
                  this.$emit('getImageUrl7',this.imageUrl)
                  break  
              }
             
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style scoped>
.avatar-uploader > .ant-upload {
  width: 135px;
  height: 95px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.createImg {
  width: 100%;
  height: 95px;
}
</style>