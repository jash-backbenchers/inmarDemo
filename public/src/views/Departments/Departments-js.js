import Services from '@/services/Services';

export default {
  name: 'Departments',
  created() {
    this.fetch();
  },
  data() {
    return {
      departmentsdata: [],
      loading: false,
    };
  },
  methods: {
    fetch() {
      this.loading = true
      Services.products.list({
        resource: this.$Services.api.api+'/departments',
      }).then((data) => {
        this.loading = false
        this.departmentsdata=data.data;
      });
      
    },
  },
};
