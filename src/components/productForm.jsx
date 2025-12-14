import { useState } from "react";
import "../styles/productForm.css";
import { db } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function ProductForm() {
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // Holds product being edited

  const productsCollectionRef = collection(db, "products");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Add product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(productsCollectionRef, {
        name: data.name,
        price: Number(data.price),
        category: data.category,
        company: data.company,
      });
      alert("Product added successfully");
      setData({ name: "", price: "", category: "", company: "" });
      getData();
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };

  // Get all products
  const getData = async () => {
    try {
      const snapshot = await getDocs(productsCollectionRef);
      const productsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      console.error(error);
    }
  };

  // Start editing
  const startEdit = (product) => {
    setEditingProduct(product);
    setData({
      name: product.name,
      price: product.price,
      category: product.category,
      company: product.company,
    });
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productDoc = doc(db, "products", editingProduct.id);
      await updateDoc(productDoc, {
        name: data.name,
        price: Number(data.price),
        category: data.category,
        company: data.company,
      });
      alert("Product updated successfully");
      setEditingProduct(null);
      setData({ name: "", price: "", category: "", company: "" });
      getData();
    } catch (error) {
      console.error(error);
      alert("Error updating product");
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      const productDoc = doc(db, "products", id);
      await deleteDoc(productDoc);
      alert("Product deleted successfully");
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* ADD / UPDATE FORM */}
      <form
        className="product"
        onSubmit={editingProduct ? handleUpdate : handleSubmit}
      >
        <h2>{editingProduct ? "Update Product" : "Add Product"}</h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={data.name}
          onChange={handleInputChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={data.price}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Product Category"
          value={data.category}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Product Company"
          value={data.company}
          onChange={handleInputChange}
          required
        />

        <button type="submit">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>

        {editingProduct && (
          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              setData({ name: "", price: "", category: "", company: "" });
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
      </form>

      {/* GET PRODUCTS BUTTON */}
      <button onClick={getData} className="get-btn">
        Get Product Data
      </button>

      {/* PRODUCTS TABLE */}
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.company}</td>
                  <td className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => startEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductForm;
