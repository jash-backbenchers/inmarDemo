export default {
  created() {
    this.getSettings();
  },
  data() {
    return {
      settings:{
        location:[],
        department:[],
        category:[],
        subcategory:[],
      },
      saving_product:false,
      payload: {
        sku: null,
        name: null,
        location: null,
        department: null,
        category: null,
        subcategory: null,
      },
    }
  },
  methods: {
    handleLocationChange(location){
      this.payload.location=location;
    },
    handleDepartmentChange(department){
      this.payload.department=department;
    },
    handleCategoryChange(category){
      this.payload.category=category;
    },
    handleSubCategoryChange(subcategory){
      this.payload.subcategory=subcategory;
    },
    resetForm() {
      this.payload = {
        sku: null,
        name: null,
        location: null,
        department: null,
        category: null,
        subcategory: null,
      };
    },
    getSettings(){
      this.$Services.products.list({
        resource: `${this.$Services.api.api}/settings`,
      }).then((data) => {
        this.settings=data.data.result;
      });
    },
    saveProduct() {
      const that = this;
      that.saving_product = true;
      if (that.validate()) {
        that.$Services.products.create({data:{product:that.payload}}).then(
          () => {
            that.saving_product = false;
            that.$Services.noty.success('Product Added Successfully');
            window.location.href = '/products/null';
          },
          (error) => {
            that.saving_product = false;
            if (error.response.status === 400) {
              that.$Services.noty.error(error.response.data);
            } else {
              that.$Services.noty.error('Something went wrong');
            }
          },
        );
      } else {
        that.saving_product = false;
      }
    },
    validate() {
        let proceed = true;
        const that = this;
        that.errors = {};
        if (that.payload.sku === '' || that.payload.sku === null) {
          proceed = false;
          that.errors.sku = 'SKU feild is required';
          that.$Services.noty.error('SKU feild is required');
        }
        if (that.payload.name === '' || that.payload.name === null) {
          proceed = false;
          that.errors.name = 'Name feild is required';
          that.$Services.noty.error('Name feild is required');
        }
        if (that.payload.location === '' || that.payload.location === null) {
          proceed = false;
          that.errors.location = 'Location feild is required';
          that.$Services.noty.error('Location feild is required');
        }
        if (that.payload.department === '' || that.payload.department === null) {
          proceed = false;
          that.errors.department = 'Department feild is required';
          that.$Services.noty.error('Department feild is required');
        }
        if (that.payload.category === '' || that.payload.category === null) {
          proceed = false;
          that.errors.category = 'Category feild is required';
          that.$Services.noty.error('Category feild is required');
        }
        if (that.payload.subcategory === '' || that.payload.subcategory === null) {
          proceed = false;
          that.errors.subcategory = 'Sub-category feild is required';
          that.$Services.noty.error('Sub-category feild is required');
        }
        
        return proceed;
      },
  }
}
