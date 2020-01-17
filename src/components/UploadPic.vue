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
      imageUrl: ""
    };
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
        console.log(file)
        const fd =new FormData()
        fd.append('file',file)
        const url = '/api/trademark/image/uploadImage';
        // const params = {
        //   file: file
        // };
        this.$axios({
          method: 'post',
          url: url,
          data: fd
        })
          .then(res => {
            console.log(res);
            if(res.data.success){
              this.imageUrl=res.data.data.imagePath
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