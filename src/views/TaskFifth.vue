<template>
    <div>
      <div class="card">
        {{ filtersActive.global.value }}
        <DataTable
          ref="dt"
          :value="filteredProducts"
          v-model:selection="selectedProducts"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filtersActive"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        >
          <template #header>
            <div class="card-header">
              <InputGroup class="card-search">
                <InputGroupAddon
                  class="card-addon-aqualizer"
                  @click="toggleSearchFields"
                >
                  <i class="pi pi-sliders-v"></i>
                </InputGroupAddon>
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Поиск..."
                  @keyup.enter="onSearch"
                />
                <Button
                  icon="pi pi-times"
                  severity="danger"
                  @click="clearSearch"
                  v-if="filters['global'].value"
                />
                <Button label="Search" @click="onSearch" />
              </InputGroup>
              <MultiSelect
                ref="multiSelect"
                v-model="selectedColumns"
                display="chip"
                :options="columns"
                optionLabel="name"
                placeholder="Поля таблицы"
                :maxSelectedLabels="3"
                class="card-multiselect"
              />
            </div>
          </template>
          <Column
            selectionMode="multiple"
            style="width: 3rem"
            :exportable="false"
          ></Column>
          <Column
            field="code"
            header="Code"
            sortable
            style="min-width: 12rem"
            v-if="canShowColumn('code')"
          ></Column>
          <Column
            field="name"
            header="Name"
            sortable
            style="min-width: 16rem"
            v-if="canShowColumn('name')"
          ></Column>
          <Column header="Image" v-if="canShowColumn('image')">
            <template #body="slotProps">
              <img
                :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                :alt="slotProps.data.image"
                class="border-round"
                style="width: 64px"
              />
            </template>
          </Column>
          <Column
            field="price"
            header="Price"
            sortable
            style="min-width: 8rem"
            v-if="canShowColumn('price')"
          >
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column
            field="category"
            header="Category"
            sortable
            style="min-width: 10rem"
            v-if="canShowColumn('category')"
          ></Column>
          <Column
            field="rating"
            header="Reviews"
            sortable
            style="min-width: 12rem"
            v-if="canShowColumn('rating')"
          >
            <template #body="slotProps">
              <Rating
                :modelValue="slotProps.data.rating"
                :readonly="true"
                :cancel="false"
              />
            </template>
          </Column>
          <Column
            field="inventoryStatus"
            header="Status"
            sortable
            style="min-width: 12rem"
            v-if="canShowColumn('inventoryStatus')"
          >
            <template #body="slotProps">
              <Tag
                :value="slotProps.data.inventoryStatus"
                :severity="getStatusLabel(slotProps.data.inventoryStatus)"
              />
            </template>
          </Column>
          <Column :exportable="false" style="min-width: 8rem">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                outlined
                rounded
                class="mr-2"
                @click="editProduct(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                outlined
                rounded
                severity="danger"
                @click="confirmDeleteProduct(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
      <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Product Details" :modal="true" class="p-fluid">
          <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-3" />
          <div class="field">
              <label for="name">Name</label>
              <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" />
              <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
          </div>
          <div class="field">
              <label for="description">Description</label>
              <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
          </div>
  
          <div class="field">
              <label for="inventoryStatus" class="mb-3">Inventory Status</label>
              <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
                  <template #value="slotProps">
                      <div v-if="slotProps.value && slotProps.value.value">
                          <Tag :value="slotProps.value.value" :severity="getStatusLabel(slotProps.value.label)" />
                      </div>
                      <div v-else-if="slotProps.value && !slotProps.value.value">
                          <Tag :value="slotProps.value" :severity="getStatusLabel(slotProps.value)" />
                      </div>
                      <span v-else>
                          {{slotProps.placeholder}}
                      </span>
                  </template>
              </Dropdown>
          </div>
  
          <div class="field">
              <label class="mb-3">Category</label>
              <div class="formgrid grid">
                  <div class="field-radiobutton col-6">
                      <RadioButton id="category1" name="category" value="Accessories" v-model="product.category" />
                      <label for="category1">Accessories</label>
                  </div>
                  <div class="field-radiobutton col-6">
                      <RadioButton id="category2" name="category" value="Clothing" v-model="product.category" />
                      <label for="category2">Clothing</label>
                  </div>
                  <div class="field-radiobutton col-6">
                      <RadioButton id="category3" name="category" value="Electronics" v-model="product.category" />
                      <label for="category3">Electronics</label>
                  </div>
                  <div class="field-radiobutton col-6">
                      <RadioButton id="category4" name="category" value="Fitness" v-model="product.category" />
                      <label for="category4">Fitness</label>
                  </div>
              </div>
          </div>
  
          <div class="formgrid grid">
              <div class="field col">
                  <label for="price">Price</label>
                  <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" />
              </div>
              <div class="field col">
                  <label for="quantity">Quantity</label>
                  <InputNumber id="quantity" v-model="product.quantity" integeronly />
              </div>
          </div>
          <template #footer>
              <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
              <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
          </template>
      </Dialog>
  
      <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="confirmation-content">
              <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
              <span v-if="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false"/>
              <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
          </template>
      </Dialog>
  
      <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="confirmation-content">
              <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
              <span v-if="product">Are you sure you want to delete the selected products?</span>
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false"/>
              <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
          </template>
      </Dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from "vue";
  import { FilterMatchMode } from "primevue/api";
  import { useToast } from "primevue/usetoast";
  import { ProductService } from "../service/ProductService";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import Rating from "primevue/rating";
  import Tag from "primevue/tag";
  import Textarea from "primevue/textarea";
  import Dropdown from "primevue/dropdown";
  import RadioButton from "primevue/radiobutton";
  import InputNumber from "primevue/inputnumber";
  import Dialog from "primevue/dialog";
  import InputGroup from "primevue/inputgroup";
  import InputGroupAddon from "primevue/inputgroupaddon";
  import MultiSelect from "primevue/multiselect";
  
  interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    image?: string;
    price?: number;
    category?: string;
    quantity?: number;
    rating?: number;
    inventoryStatus?: string;
  }
  
  interface ColumnOption {
    name: string;
  }
  
  interface StatusOption {
    label: string;
    value: string;
  }
  
  onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data));
  });
  
  const canShowColumn = (name: string): boolean => {
    if (selectedColumns.value.length) {
      return !!selectedColumns.value.find((column) => column.name === name);
    } else {
      return true;
    }
  };
  
  const toast = useToast();
  const dt = ref();
  const products = ref<Product[]>([]);
  const filteredProducts = computed(() => {
    if (!filtersActive.value.global.value) {
      return products.value;
    }
    return products.value.filter(product =>
      product.name?.toLowerCase().includes(filtersActive.value.global.value.toLowerCase()) ||
      product.code?.toLowerCase().includes(filtersActive.value.global.value.toLowerCase()) ||
      product.category?.toLowerCase().includes(filtersActive.value.global.value.toLowerCase())/* ||
      product.price.toString()?.toLowerCase().includes(filtersActive.value.global.value.toLowerCase()) */
    );
  });
  const productDialog = ref(false);
  const deleteProductDialog = ref(false);
  const deleteProductsDialog = ref(false);
  const product = ref<Product>({});
  const selectedProducts = ref<Product[]>([]);
  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const filtersActive = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const selectedColumns = ref<ColumnOption[]>([]);
  const columns = ref<ColumnOption[]>([
    { name: "code" },
    { name: "name" },
    { name: "image" },
    { name: "price" },
    { name: "category" },
    { name: "inventoryStatus" },
    { name: "rating" },
  ]);
  const submitted = ref(false);
  const statuses = ref<StatusOption[]>([
    { label: "INSTOCK", value: "instock" },
    { label: "LOWSTOCK", value: "lowstock" },
    { label: "OUTOFSTOCK", value: "outofstock" },
  ]);
  
  const formatCurrency = (value: number): string => {
    if (value)
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    return "";
  };
  const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
  };
  const saveProduct = () => {
    submitted.value = true;
  
    if (product?.value.name?.trim()) {
      if (product.value.id) {
        product.value.inventoryStatus = product.value.inventoryStatus
          ? product.value.inventoryStatus
          : "INSTOCK";
        products.value[findIndexById(product.value.id)] = product.value;
        toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        product.value.id = createId();
        product.value.code = createId();
        product.value.image = "product-placeholder.svg";
        product.value.inventoryStatus = product.value.inventoryStatus
          ? product.value.inventoryStatus
          : "INSTOCK";
        products.value.push(product.value);
        toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }
  
      productDialog.value = false;
      product.value = {};
    }
  };
  const editProduct = (prod: Product) => {
    product.value = { ...prod };
    productDialog.value = true;
  };
  const confirmDeleteProduct = (prod: Product) => {
    product.value = prod;
    deleteProductDialog.value = true;
  };
  const deleteProduct = () => {
    products.value = products.value.filter((val) => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };
  const findIndexById = (id: string): number => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
      if (products.value[i].id === id) {
        index = i;
        break;
      }
    }
  
    return index;
  };
  const createId = (): string => {
    let id = "";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };
  const deleteSelectedProducts = () => {
    products.value = products.value.filter(
      (val) => !selectedProducts.value.includes(val)
    );
    deleteProductsDialog.value = false;
    selectedProducts.value = [];
    toast.add({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };
  
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "INSTOCK":
        return "success";
  
      case "LOWSTOCK":
        return "warning";
  
      case "OUTOFSTOCK":
        return "danger";
  
      default:
        return "";
    }
  };
  
  const onSearch = () => {
    console.log("Search triggered with value:", filters.value.global.value);
    filtersActive.value = JSON.parse(JSON.stringify(filters.value))
  };
  
  const clearSearch = () => {
    filters.value.global.value = null;
    filtersActive.value.global.value = null;
  };
  const multiSelect = ref(null);
  const toggleSearchFields = () => {
    if (multiSelect.value) {
      multiSelect.value.show();
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .card-addon-aqualizer {
    background-color: #22c55e;
    color: white;
    cursor: pointer;
  }
  .card-search {
    width: 80%;
  }
  .card-multiselect {
    width: 20%;
  }
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
  }
  </style>
  