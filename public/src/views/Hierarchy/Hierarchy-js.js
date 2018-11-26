
import Services from '@/services/Services';
import {tree} from 'vued3tree'

export default {
  components: {
    tree
  },
  name: 'Products',
  created() {
    this.fetch();
  },
  data() {
    return {
      data: {},
    };
  },
  methods: {
    fetch() {
      this.loading = true
      Services.api.list({
        resource: this.$Services.api.api+'/tree',
      }).then((data) => {
        this.data=data.data;
      });  
    },
  },
};
