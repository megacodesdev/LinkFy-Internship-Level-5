import { EditIcon, PlusCircle, Trash2Icon } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { FaQuestion } from "react-icons/fa";

export default function Members() {
  const [equipments, setEquipments] = useState([]);
  const [message, setMessage] = useState("");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const closeModal = () => setIsModalOpened(false);

  const loadEquipments = async () => {
    const fetchEquipments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5172/api/add/fetch/equipments"
        );
        setEquipments(response.data);
      } catch (error) {
        console.error(error);
        setMessage("Error fetching equipments");
      }
    };

    fetchEquipments();
  };

  loadEquipments();

  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpened(false);
      }
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal;
    }
  };

  const [formData, setFormData] = useState({
    eq_name: "",
    amount: "",
    price: "",
    status: "",
    created_at: "",
  });

  const resetDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5172/api/add/equipment",
        formData
      );
      if (response.status === 201) {
        setMessage(response.data.message);
        setIsModalOpened(false);
        setFormData("");
      } else {
        response.status === 500;
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Server error while adding product in stock.");
    } finally {
      setIsLoading(false);
    }
  };

  const [userId, setUserId] = useState(null);

  const deleteEquipment = async (e) => {
    try {
      const res = await axios.delete(
        `http://localhost:5172/api/delete/equipment/${userId}`
      );
      if (res.status === 200) {
        console.log(res.data.message);
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.error("Error while deleting equipment.");
    }
  };

  const [updateData, setUpdateData] = useState({
    eq_name: "",
    amount: "",
    price: "",
    status: "",
    created_at: "",
  });

  const handleUpdateChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5172/api/update/equipment/${userId}`,
        updateData
      );
      if (res.status === 200) {
        setEditModal(false);
      }
    } catch (error) {
      console.error("Something went wrong here.");
    }
  };

  return (
    <>
      <div className="container w-full h-full rounded-md flex flex-col">
        <div className="header relative w-full bg-white/50 flex flex-wrap justify-between items-center px-4 py-3 md:px-8 md:py-4 shadow-sm">
          <div className="members">
            <span className="text-blue-500 font-bold text-lg sm:text-xl md:text-2xl">
              Equipments
            </span>
          </div>
          <div className="add-btn flex justify-center items-center mt-2 sm:mt-0">
            <button
              className="flex justify-center items-center bg-blue-500 py-2 px-4 sm:py-2.5 sm:px-6 gap-2 text-white text-sm sm:text-base font-semibold rounded-md shadow-md hover:bg-blue-600 cursor-pointer hover:scale-99 active:scale-95 transition-all"
              onClick={() => setIsModalOpened(true)}
            >
              <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Add Equipment</span>
            </button>
          </div>
        </div>

        <div className="body w-full h-full relative top-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    #ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Equipment Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Stock Amount
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Stock-in Date
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {equipments.map((item) => (
                  <>
                    {item ? (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-100 transition hover:scale-101"
                      >
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.id}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.eq_name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.amount}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.price} FRW
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          <span
                            className={`px-2 inline-flex text-xs leading-7 font-semibold rounded-xs ${
                              item.status === "Rented"
                                ? "bg-red-100 text-red-800"
                                : item.status === "Available"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.created_at.slice(0, 19)}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="text-blue-600 hover:text-blue-900 mr-2"
                            onMouseEnter={() => setUserId(item.id)}
                            onClick={() => setEditModal(true)}
                          >
                            <EditIcon />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onMouseEnter={() => setUserId(item.id)}
                            onClick={() => deleteEquipment()}
                          >
                            <Trash2Icon />
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <>
                        <div className="loading relative w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center border-5 border-blue-500  border-b-white">
                          <div className="loader absolute  w-8 h-8 border-3 border-white bg-white rounded-full"></div>
                        </div>
                        <div className="loading-word relative left-6">
                          <p className="text-blue-500 font-semibold text-2xl">
                            Loading
                          </p>
                        </div>
                      </>
                    )}
                    {editModal && (
                      <div
                        className="fixed inset-0 z-50 w-full h-full bg-black/30 transition-opacity duration-300 flex justify-center items-center px-4 sm:px-6"
                        onClick={handleClickOutside}
                        key={"Edit Modal"}
                      >
                        <div
                          className="relative w-full max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[90vh] bg-white rounded-md flex flex-col overflow-hidden transform transition-transform duration-300"
                          ref={modalRef}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="modal-head sticky top-0 bg-white z-10 w-full h-16 border-b border-gray-300 flex justify-between items-center px-4 sm:px-6">
                            <span className="font-semibold text-base sm:text-lg text-blue-500">
                              You are going to edit{" "}
                              <span className="text-yellow-500">
                                {item.eq_name}
                              </span>
                            </span>
                            <div
                              className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-red-500 transition-colors duration-300"
                              onClick={() => setEditModal(false)}
                            >
                              <X className="w-4 h-4 text-red-500 hover:text-white" />
                            </div>
                          </div>

                          <div className="modal-body w-full flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
                            <form
                              className="w-full flex flex-col space-y-6"
                              onSubmit={handleUpdate}
                            >
                              <div className="flex flex-col space-y-2">
                                <label className="text-sm sm:text-base font-semibold text-gray-600">
                                  Equipment Name
                                </label>
                                <input
                                  type="text"
                                  name="eq_name"
                                  placeholder={item.eq_name}
                                  value={updateData.eq_name}
                                  onChange={handleUpdateChange}
                                  className="text-sm sm:text-md w-full outline-none border border-gray-400 px-4 py-2 rounded focus:ring-1 ring-blue-500 focus:border-blue-400"
                                  required
                                />
                              </div>

                              <div className="flex flex-col space-y-2">
                                <label className="text-sm sm:text-base font-semibold text-gray-600">
                                  Stock-in Amount
                                </label>
                                <input
                                  type="number"
                                  name="amount"
                                  placeholder={item.amount}
                                  value={updateData.amount}
                                  onChange={handleUpdateChange}
                                  className="text-sm sm:text-md w-full outline-none border border-gray-400 px-4 py-2 rounded focus:ring-1 ring-blue-500 focus:border-blue-400"
                                  required
                                />
                              </div>

                              <div className="flex flex-col space-y-2">
                                <label className="text-sm sm:text-base font-semibold text-gray-600">
                                  Equipment Price
                                </label>
                                <input
                                  type="number"
                                  name="price"
                                  placeholder={item.price}
                                  value={updateData.price}
                                  onChange={handleUpdateChange}
                                  className="text-sm sm:text-md w-full outline-none border border-gray-400 px-4 py-2 rounded focus:ring-1 ring-blue-500 focus:border-blue-400"
                                  required
                                />
                              </div>

                              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center">
                                <div className="w-full md:w-1/2 flex flex-col space-y-2">
                                  <label className="text-sm sm:text-base font-semibold text-gray-600">
                                    <FaQuestion className="inline mr-2" />{" "}
                                    Status
                                  </label>
                                  <select
                                    name="status"
                                    value={updateData.status}
                                    onChange={handleUpdateChange}
                                    className="border text-gray-600 border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-1 ring-blue-500 focus:border-blue-400"
                                    required
                                  >
                                    <option
                                      className="bg-gray-200 text-gray-700"
                                      value=""
                                    >
                                      Select Status
                                    </option>
                                    <option
                                      className="bg-gray-200 text-gray-700"
                                      value="Available"
                                    >
                                      Available
                                    </option>
                                    <option
                                      className="bg-gray-200 text-gray-700"
                                      value="Rented"
                                    >
                                      Rented
                                    </option>
                                    <option
                                      className="bg-gray-200 text-gray-700"
                                      value="Maintainance"
                                    >
                                      Maintainance
                                    </option>
                                  </select>
                                </div>

                                <button className="flex justify-center items-center w-full md:w-auto bg-blue-500 py-2.5 px-6 gap-2 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 cursor-pointer hover:scale-105 active:scale-95 transition-all">
                                  {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-t-blue-500 border-white rounded-full animate-spin"></div>
                                  ) : (
                                    "Update equipment"
                                  )}
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpened && (
        <div
          className="fixed inset-0 z-50 w-full h-full bg-black/30 transition-opacity duration-300 flex justify-center items-center px-4 sm:px-6"
          onClick={handleClickOutside}
          key={"Add Modal"}
        >
          <div
            className="relative w-full max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[90vh] bg-white rounded-md flex flex-col overflow-hidden transform transition-transform duration-300"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head sticky top-0 bg-white z-10 w-full h-16 border-b border-gray-300 flex justify-between items-center px-4 sm:px-6">
              <span className="font-semibold text-base sm:text-lg text-blue-500">
                <span className="text-blue-500">Add Equipment in Stock</span>
              </span>
              <div
                className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-red-500 transition-colors duration-300"
                onClick={() => {
                  setIsModalOpened(false);
                  setFormData("");
                }}
              >
                <X className="w-4 h-4 text-red-500 hover:text-white" />
              </div>
            </div>

            <div className="modal-body w-full flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
              <form
                className="w-full flex flex-col space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col space-y-2">
                  <label className="text-sm sm:text-base font-semibold text-gray-600">
                    Equipment Name
                  </label>
                  <input
                    type="text"
                    name="eq_name"
                    placeholder="Enter name..."
                    value={formData.eq_name}
                    onChange={resetDataChange}
                    className="text-sm sm:text-md w-full outline-none border border-gray-400 px-4 py-2 rounded focus:ring-1 ring-blue-500 focus:border-blue-400"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-sm sm:text-base font-semibold text-gray-600">
                    Stock-in Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    placeholder={"Enter amount..."}
                    value={formData.amount}
                    onChange={resetDataChange}
                    className="text-sm sm:text-md w-full outline-none border border-gray-400 px-4 py-2 rounded focus:ring-1 ring-blue-500 focus:border-blue-400"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-sm sm:text-base font-semibold text-gray-600">
                    Equipment Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder={"Enter price..."}
                    value={formData.price}
                    onChange={resetDataChange}
                    className="text-sm sm:text-md w-full outline-none border border-gray-400 px-4 py-2 rounded focus:ring-1 ring-blue-500 focus:border-blue-400"
                    required
                  />
                </div>

                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center">
                  <div className="w-full md:w-1/2 flex flex-col space-y-2">
                    <label className="text-sm sm:text-base font-semibold text-gray-600">
                      <FaQuestion className="inline mr-2" /> Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={resetDataChange}
                      className="border text-gray-600 border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-1 ring-blue-500 focus:border-blue-400"
                      required
                    >
                      <option className="bg-gray-200 text-gray-700" value="">
                        Select Status
                      </option>
                      <option
                        className="bg-gray-200 text-gray-700"
                        value="Available"
                      >
                        Available
                      </option>
                      <option
                        className="bg-gray-200 text-gray-700"
                        value="Rented"
                      >
                        Rented
                      </option>
                      <option
                        className="bg-gray-200 text-gray-700"
                        value="Maintainance"
                      >
                        Maintainance
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="flex justify-center items-center w-full md:w-auto bg-blue-500 py-2.5 px-6 gap-2 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 cursor-pointer hover:scale-101 active:scale-95 transition-all"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-t-blue-500 border-white rounded-full animate-spin"></div>
                    ) : (
                      "Add equipment"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
