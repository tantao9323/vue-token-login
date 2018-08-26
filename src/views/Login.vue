<template>
  <div class="login">
    <Row type="flex" justify="center" align="middle">
      <Col span="6">
          <Form ref="form" :model="form" :rules="rules">
              <FormItem prop="username">
                  <Input type="text" v-model="form.username" placeholder="Username">
                      <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem prop="password">
                  <Input type="password" v-model="form.password" placeholder="Password">
                      <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('form')">Signin</Button>
              </FormItem>
          </Form>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "Please fill in the username",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$store.dispatch("login", this.form).then(() => {
            const redirectUrl = decodeURIComponent(
              this.$route.query.redirect || "/"
            );
            this.$router.push({
              path: redirectUrl
            });
          });
        } else {
          this.$Message.error("Check username or password!");
        }
      });
    }
  }
};
</script>
