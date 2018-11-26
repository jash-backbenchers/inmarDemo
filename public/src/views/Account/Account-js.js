export default {
  created() {
    this.getData();

  },
  data() {
    return {
      profile : JSON.parse(localStorage.getItem('profile')),
      // current:0,
      payload: {
        user: {
          first_name: null,
          last_name: null,
          mobile: null,
          email: null,
          username: null,
        }
      },
    }
  },
  methods: {
    getData(){
      this.$Services.users.list({
        resource: this.$Services.users.api + this.profile._id,
      })
      .then((data) => {
        this.payload.user = data.data.user;
      })  
    },
    saveUser() {
      const that = this;
      that.saving_user = true;
      if (that.validate()) {
        that.$Services.users.update({
          resource:that.$Services.users.api+that.payload.user._id,
          data: that.payload.user
        }).then(
          () => {
            that.saving_user = false;
            setTimeout(() => {
            }, 2000);
            that.$Services.noty.success('User updated Successfully');
          },
          (error) => {
            that.saving_user = false;
            if (error.response.status === 400) {
              that.$Services.noty.error(error.response.data);
            } else {
              that.$Services.noty.error('Something went wrong');
            }
          },
        );
      } else {
        that.saving_user = false;
      }
    },
    validate() {
        let proceed = true;
        const that = this;
        that.errors = {};
        // eslint-disable-next-line
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (that.payload.user.first_name === '' || that.payload.user.first_name === null) {
          proceed = false;
          that.errors.first_name = 'First Name feild is required';
          that.$Services.noty.error('First Name feild is required');
        }
        if (that.payload.user.last_name === '' || that.payload.user.last_name === null) {
          proceed = false;
          that.errors.last_name = 'Last Name feild is required';
          that.$Services.noty.error('Last Name feild is required');
        }
        if (that.payload.user.mobile === '' || that.payload.user.mobile === null) {
          proceed = false;
          that.errors.mobile = 'Mobile feild is required';
          that.$Services.noty.error('Mobile feild is required');
        }
        if (that.payload.user.email === '' || that.payload.user.email === null) {
          proceed = false;
          that.errors.email = 'Email feild is required';
          that.$Services.noty.error('Email feild is required');
        } else if (!re.test(String(this.payload.user.email).toLowerCase())) {
          proceed = false;
          this.errors.email = 'Invalid Email address';
          that.$Services.noty.error('Invalid Email address');
        }
        if (that.payload.user.username === '' || that.payload.user.username === null) {
          proceed = false;
          that.errors.username = 'Username feild is required';
          that.$Services.noty.error('Username feild is required');
        }
        return proceed;
      },
  }

}