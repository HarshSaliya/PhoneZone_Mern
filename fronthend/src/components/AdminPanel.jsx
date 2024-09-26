import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel({ authUser }) {
  const [phones, setPhones] = useState([]);
  const [newPhone, setNewPhone] = useState({
    name: '',   title: '',    price: '',   category: '',   image: '',  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPhoneId, setCurrentPhoneId] = useState(null);

  useEffect(() => {
    fetchPhones();
    }, []);

   const fetchPhones = async () => {
       try {
       const { data } = await axios.get('http://localhost:4001/phone');
      setPhones(data);
      } catch (error) {
      console.error("Error fetching phones:", error);
    }
  };

      const handleDelete = async (id) => {
       try {
      await axios.delete(`http://localhost:4001/phone/${id}`);
      fetchPhones();
      } catch (error) {
      console.error("Error deleting phone:", error);
     }
      };

       const handleAddPhone = async () => {
       try {
      await axios.post('http://localhost:4001/phone', newPhone);
      fetchPhones();
      resetForm();
        } catch (error) {
        console.error("Error adding phone:", error);
      }
  };

  const handleUpdatePhone = async (id) => {
      try {
       await axios.put(`http://localhost:4001/phone/${id}`, newPhone);
       fetchPhones();
      resetForm();
     } catch (error) {
      console.error("Error updating phone:", error);
     }
  };

  const handleChange = (e) => {
    setNewPhone({ ...newPhone, [e.target.name]: e.target.value });
  };

  const handleEdit = (phone) => {
    setNewPhone({
      name: phone.name, title: phone.title,  price: phone.price,  category: phone.category, image: phone.image,
    });
    setIsEditing(true);
    setCurrentPhoneId(phone._id);
  };

  const resetForm = () => {
    setNewPhone({ name: '', title: '', price: '', category: '', image: '' });
    setIsEditing(false);
    setCurrentPhoneId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      handleUpdatePhone(currentPhoneId);
    } else {
      handleAddPhone();
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Admin Panel - Manage Products</h1>

      <h3 className="text-2xl font-semibold mb-2 text-gray-700">{isEditing ? 'Edit Phone' : 'Add New Phone'}</h3>
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Phone Name"
            value={newPhone.name}
            onChange={handleChange}
            className="input input-bordered w-full focus:border-blue-500"
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Phone Title"
            value={newPhone.title}
            onChange={handleChange}
            className="input input-bordered w-full focus:border-blue-500"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Phone Price"
            value={newPhone.price}
            onChange={handleChange}
            className="input input-bordered w-full focus:border-blue-500"
            required
          />
          <input
            type="text"   name="category"  placeholder="Phone Category" value={newPhone.category} onChange={handleChange}
            className="input input-bordered w-full focus:border-blue-500"
            required
          />
          <input
            type="text"  name="image" placeholder="Phone Image URL" value={newPhone.image}  onChange={handleChange}
            className="input input-bordered w-full focus:border-blue-500"
            required
          />
        </div>
        <div className="flex justify-between">
          <button 
            type="submit"
            className="btn btn-primary text-white hover:bg-blue-600"
          >
            {isEditing ? 'Update Phone' : 'Add Phone'}
          </button>
          <button 
            type="button" 
            onClick={resetForm}
            className="btn btn-secondary text-white hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>

      
      <h3 className="text-2xl font-semibold mb-2 text-gray-700">All Phones</h3>
      <div className="overflow-x-auto">
        <table className="table w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-blue-200 text-gray-800">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {phones.map((phone) => (
              <tr key={phone._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-gray-700">{phone.name}</td>
                <td className="py-2 px-4 border-b text-gray-700">{phone.title}</td>
                <td className="py-2 px-4 border-b text-gray-700">{phone.price}</td>
                <td className="py-2 px-4 border-b text-gray-700">{phone.category}</td>
                <td className="py-2 px-4 border-b">
                  <img src={phone.image} alt={phone.name} className="h-16 w-16 object-cover rounded" />
                </td>
                <td className="py-2 px-4 border-b">
                  <button 
                    onClick={() => handleEdit(phone)} 
                    className="btn btn-warning text-white hover:bg-yellow-500 mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(phone._id)} 
                    className="btn btn-danger text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
