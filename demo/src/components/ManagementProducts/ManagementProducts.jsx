import { Component } from "react";
import TableProduct from "../TableProducts";
export default class ManagementProducts extends Component {
  state = {
    values: {
      id: "",
      name: "",
      image: "",
      price: 0,
      type: "Apple",
      description: "",
    },
    errors: {
      id: "",
      name: "",
      image: " ",
      price: " ",
      description: "",
    },
    inValid: true,
    listProducts: [
      {
        id: "A123",
        name: "Iphone 14 Pro max",
        image:
          "https://images.unsplash.com/photo-1606341802409-aceb7ebbec1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFwcGxlJTIwaXBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        price: 27000000,
        type: "Apple",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque necessitatibus veniam sed consequuntur et tempora quas accusantium debitis possimus voluptate!",
      },
    ],
    editingProduct: null,
  };

  formValid = (formErrors, formValues) => {
    let valid = true;
    Object.values(formErrors).forEach((item) => {
      item.length > 0 && (valid = false);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // let isValid = false;
    // const newErrors = {};
    // for (const [key, value] of Object.entries(this.state.values)) {
    //   if (!value.toString().trim()) {
    //     newErrors[key] = "Trường này không được để trống!";
    //   }
    // }
    // this.setState({ errors: { ...this.state.errors, ...newErrors } });
    if (this.state.editingProduct) {
      console.log(this.state.editingProduct);
      this.state.listProducts.some((item, index) => {
        if (item.id === this.state.editingProduct.id) {
          const newProducts = [...this.state.listProducts];
          newProducts[index] = this.state.values;
          console.log(newProducts);
          this.setState({
            listProducts: newProducts,
            editingProduct: null,
            values: {
              id: "",
              name: "",
              image: "",
              price: 0,
              type: "Apple",
              description: "",
            },
          });
          return true;
        }
        return false;
      });
    } else {
      console.log("add");
      const listProducts = [...this.state.listProducts, this.state.values];

      this.setState({
        listProducts,
        values: {
          id: "",
          name: "",
          image: "",
          price: 0,
          type: "Apple",
          description: "",
        },
      });
    }
  };

  handleOnChange = (event) => {
    const { id, value } = event.target;
    const pattern = event.target.getAttribute("pattern");
    const formErrors = { ...this.state.errors };
    const formValues = { ...this.state.values };

    if (!value.trim()) {
      formErrors[id] = "Trường này không nên để trống";
    } else {
      formErrors[id] = "";
      if (pattern) {
        switch (id) {
          case "id":
            {
              const regex = new RegExp(pattern);
              const valid = regex.test(value);
              if (!valid) {
                formErrors[id] =
                  "Id chỉ bao gồm số và chữ và không chứa các ký tự đặc biệt";
              } else {
                formErrors[id] = "";
              }
            }
            break;

          default:
            break;
        }
      }
    }

    const newValues = { ...formValues, [id]: value };
    const newErrors = { ...formErrors };
    this.setState({
      values: newValues,
      errors: newErrors,
    });
  };

  handleOnBlur = (event) => {
    const { id, value } = event.target;
    const pattern = event.target.getAttribute("pattern");
    const formErrors = { ...this.state.errors };
    const formValues = { ...this.state.values };
    console.log(value);
    if (!value.trim()) {
      formErrors[id] = "Trường này không nên để trống";
    } else {
      const regex = new RegExp(pattern);
      const valid = regex.test(value);
      if (pattern) {
        switch (id) {
          case "id":
            if (!valid) {
              formErrors[id] =
                "Id chỉ bao gồm số và chữ và không chứa các ký tự đặc biệt";
            } else {
              formErrors[id] = "";
            }
            break;
          default:
            break;
        }
      }
    }

    const newValues = { ...formValues, [id]: value };
    const newErrors = { ...formErrors };
    this.setState({
      values: newValues,
      errors: newErrors,
    });
  };

  handleDelete = (productId) => {
    // sẽ trả về vị trí nếu tìm được
    const foundProductIndex = this.state.listProducts.findIndex((item) => {
      return item.id === productId;
    });

    // hàm splice(index , deletedCount)
    if (foundProductIndex !== -1) {
      const newProducts = this.state.listProducts.splice(foundProductIndex, 1);
      this.setState({ listProducts: newProducts });
    }
  };
  handleStartEdit = (productId) => {
    const foundProduct =
      this.state.listProducts.find((item) => {
        return item.id === productId;
      }) || null;
    console.log(foundProduct);
    // hàm splice(index , deletedCount)
    this.setState({ editingProduct: foundProduct, values: foundProduct });
  };

  render() {
    const { values, errors, editingProduct } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-6 mb-3">
              <label htmlFor="">ID sản phẩm</label>
              <input
                type="text"
                name="id"
                id="id"
                className="form-control"
                value={values.id}
                pattern="[A-Za-z0-9]{0,5}"
                onChange={this.handleOnChange}
                onBlur={this.handleOnBlur}
              />

              {errors.id && (
                <span className="text-danger small">{errors.id}</span>
              )}
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="">Hình ảnh</label>
              <input
                type="text"
                name="image"
                id="image"
                className="form-control"
                value={values.image}
                onChange={this.handleOnChange}
              />
              {errors.image && (
                <span className="text-danger small">{errors.image}</span>
              )}
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="">Tên sản phẩm</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={values.name}
                onChange={this.handleOnChange}
              />
              {errors.name && (
                <span className="text-danger small">{errors.name}</span>
              )}
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="">Loại sản phẩm</label>
              <select
                name="type"
                id="type"
                className="form-control"
                onChange={this.handleOnChange}
              >
                <option value={"apple"}>Apple</option>
                <option value={"samsung "}>Samsung</option>
              </select>
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="">Giá</label>
              <input
                onChange={this.handleOnChange}
                value={values.price}
                type="text"
                name="price"
                id="price"
                className="form-control"
              />
              {errors.price && (
                <span className="text-danger small">{errors.price}</span>
              )}
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="">Mô tả sản phẩm</label>
              <input
                type="text"
                name="description"
                id="description"
                className="form-control"
                value={values.description}
                onChange={this.handleOnChange}
              />
              {errors.description && (
                <span className="text-danger small">{errors.description}</span>
              )}
            </div>
            <div className="col-12">
              {editingProduct ? (
                <button className="btn btn-secondary">Sửa sản phẩm</button>
              ) : (
                <button className="btn btn-primary mr-4">Thêm sản phẩm</button>
              )}
            </div>
          </div>
        </form>
        <TableProduct
          data={this.state.listProducts}
          handleDelete={this.handleDelete}
          handleStartEdit={this.handleStartEdit}
        />
      </div>
    );
  }
}

// let newkey = "image";
// let a = { id: "1", name: "122", image: 10 };
// let b = { ...a, [newkey]: 2 };
// console.log(b);
