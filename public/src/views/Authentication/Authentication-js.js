import router from '@/router';

export default {
  name: 'Authentication',
  data() {
    return {
      username: null,
      email: null,
      password: null,
      is_loading: false,
      show_error: false,
      error_message: 'Invalid Credentials'
    };
  },
  methods: {
    // Login
    login() {
      const that = this;
      const proceed = this.validate();
      if (proceed) {
        this.is_loading = true;
        this.$Services.auth.login(this.username, this.password).then(
          (success) => {
            this.$Services.auth.setToken(success.data.token);
            localStorage.setItem('profile', JSON.stringify(success.data.user));
            this.$Services.noty.success('Successfully authenticated', 'Welcome');
            router.push({
              path: '/departments'
            });
          },
          (error) => {
            this.error_message = error.response.data.description;
            that.is_loading = false;
            that.show_error = true;
            this.$Services.noty.error(this.error_message);
          },
        );
      } else {
        that.show_error = true;
      }
    },
    // To reset the form
    reset() {
      this.email = null;
      this.username = null;
      this.password = null;
      this.is_loading = false;
    },
    // To validate the form
    validate() {
      let proceed = true;
      if (this.password === null || this.password === '' || this.username === null || this.username === '') proceed = false;
      return proceed;
    },
  },
};