import React, { Component } from "react";

export default class TableProducts extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="mt-5">
        <h3 className="display-5 py-2">Danh sách sản phẩm</h3>
        <table className="table table-dark ">
          <thead className="thead">
            <tr>
              <td>ID</td>
              <td>Tên sản phẩm</td>
              <td>Hình ảnh</td>
              <td>Loại sản phẩm</td>
              <td>Giá</td>
              <td>Hành động</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td>{item.type}</td>
                  <td>{Number(item.price).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-warning mr-4"
                      onClick={() => this.props.handleStartEdit(item.id)}
                    >
                      {" "}
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.props.handleDelete(item.id)}
                    >
                      {" "}
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
