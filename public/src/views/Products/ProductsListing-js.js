import Services from '@/services/Services';

export default {
  props: {
    id: {
      type: String,
      default: null
    },
  },
  name: 'Products',
  created() {
    this.fetch();
    this.getSettings();
  },
  watch: {
    id: function () {
      this.fetch()
    },
  },
  data() {
    return {
      settings: {
        location: [],
        department: [],
        category: [],
        subcategory: [],
      },
      data: [],
      categorydata: [],
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0
      },
      loading: false,
      visible: false,
      drawervisible: false,
      editvisible: false,
      confirmLoading: false,
      editLoading: false,
      show_modal: false,
      deleting_product: false,
      editable: false,
      payload: {
        sku: null,
        name: null,
        location: null,
        department: null,
        category: null,
        subcategory: null,
      },
      editpayload: {
        sku: null,
        name: null,
        location: null,
        department: null,
        category: null,
        subcategory: null,
      },
      search: {
        location: null,
        department: null,
        category: null,
        subcategory: null,
      },
      errors: {},
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
    onChange(page, pageSize) {
      this.pagination.current = page;
      this.pagination.pageSize = pageSize;
      this.fetch({
        page_size: this.pagination.pageSize,
        page: this.pagination.current,
      });
    },
    showDrawer() {
      this.drawervisible = true
    },
    onCloseDrawer() {
      this.drawervisible = false
    },
    onSearch() {
      this.fetch()
      this.drawervisible = false
    },
    onSearchReset() {
      this.search = {
        location: null,
        department: null,
        category: null,
        subcategory: null,
      }
    },
    showModal(product) {
      this.visible = true
      this.payload = product
    },
    handleOk(e) {
      this.visible = false;
      this.confirmLoading = false;
    },
    handleCancel(e) {
      this.visible = false
    },


    handleLocationChange(location) {
      this.editpayload.location = location;
    },
    handleDepartmentChange(department) {
      this.editpayload.department = department;
    },
    handleCategoryChange(category) {
      this.editpayload.category = category;
    },
    handleSubCategoryChange(subcategory) {
      this.editpayload.subcategory = subcategory;
    },

    handleSearchLocationChange(location) {
      this.search.location = location;
    },
    handleSearchDepartmentChange(department) {
      this.search.department = department;
    },
    handleSearchCategoryChange(category) {
      this.search.category = category;
    },
    handleSearchSubCategoryChange(subcategory) {
      this.search.subcategory = subcategory;
    },

    showEditModal(product) {
      this.editvisible = true
      this.editpayload = Object.assign({}, product);
    },
    handleEditCancel(e) {
      this.editvisible = false
    },

    showDeleteConfirm(id) {
      var that = this;
      this.$confirm({
        title: 'Are you sure delete this Product?',
        content: 'This action cannot be undone !',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          that.deleteproduct(id)
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },

    deleteproduct(id) {
      var that = this;
      this.deleting_product = true;
      this.$Services.products.delete({
        resource: this.$Services.products.api + id,
      }).then(
        () => {
          setTimeout(() => {

          }, 2000);
          that.deleting_product = false;
          that.$Services.noty.success('Deleted product Successfully');
          that.onChange(that.pagination.current, that.pagination.pageSize)
        },
        (error) => {
          that.deleting_product = false;
          that.$Services.noty.error('Something went wrong');
        },
      );
    },
    updateproduct(data) {
      var that = this;
      // this.deleting_product = true;
      this.editLoading = true;
      this.$Services.products.update({
        resource: this.$Services.products.api + data._id,
        data: {
          product: data
        }
      }).then(
        () => {
          this.editvisible = false;
          this.editLoading = false;
          that.$Services.noty.success('Successfully updated product');
          that.onChange(that.pagination.current, that.pagination.pageSize)
        },
        (error) => {
          this.editLoading = false;
          that.$Services.noty.error('Something went wrong');
        },
      );
    },
    fetch(params = {}) {
      this.loading = true;
      var resource = `/location/${this.search.location}/department/${this.search.department||this.id}/category/${this.search.category}/subcategory/${this.search.subcategory}`;
      Services.products.list({
        resource: this.$Services.api.api + resource,
        page_size: params.page_size || this.pagination.pageSize,
        page: params.page || this.pagination.current,
        params: params
      }).then((data) => {
        const pagination = { ...this.pagination
        };
        pagination.total = data.data.totalDocs;
        pagination.pageSize = data.data.limit;
        this.loading = false;
        this.data = data.data.docs;
        this.pagination = pagination;
      });
    },
    getSettings() {
      Services.products.list({
        resource: `${this.$Services.api.api}/settings`,
      }).then((data) => {
        this.settings = data.data.result;
      });
    }
  },
};