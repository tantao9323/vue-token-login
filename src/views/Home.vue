<template>
  <div class="home">
    <Row>
      <Col style="fontSize:20px;">
        <router-link to="/about">About</router-link>
      </Col>
    </Row>
    <Row  type="flex" justify="center" align="middle">
      <Col span="8">
        <Avatar>USER</Avatar>
      </Col>
      <Col span="8" style="fontSize:20px;">
        {{$store.state.userInfo.nickname}}
      </Col>
      <Col span="8">
        <Button @click="handleSubmit">signout</Button>
      </Col>
    </Row>
  </div>
</template>

<script>

export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getUserInfo");
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
