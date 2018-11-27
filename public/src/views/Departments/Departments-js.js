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
    getImageLocation(id){
      try {
        return require(`@/assets/${id}.png`);
     }
     // fallback if does not exists
     catch(err) {
        return require('@/assets/default.png');

     }     
    },
    fetch() {
      this.loading = true
      Services.api.list({
        resource: this.$Services.api.api+'/departments',
      }).then((data) => {
        this.loading = false
        this.departmentsdata=data.data;
      });
      
    },
  },
};
