import {
  Activity,
  Bell,
  Edit2Icon,
  File,
  Laptop,
  Trash2Icon,
  Users,
  X,
  Search,
  Filter,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { FaMobileAlt, FaTools } from "react-icons/fa";
import {
  LineChart,
  PieChart,
  Pie,
  Cell,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Modal from "../../components/common/Modal";
import ImportantAcs from "../../components/common/ImportantAcs";
import Table from "../../components/common/Table";
import axios from "axios";

const Dashboard = ({ showActivities, toggleActivities }) => {
  const data = [
    { Name: "Jan", Sales: 13 },
    { Name: "Feb", Sales: 50 },
    { Name: "Mar", Sales: 178 },
    { Name: "April", Sales: 138 },
    { Name: "May", Sales: 250 },
    { Name: "June", Sales: 218 },
    { Name: "July", Sales: 138 },
    { Name: "August", Sales: 238 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const openModal = () => setIsModalOpened(true);
  const closeModal = () => setIsModalOpened(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [equipments, setEquipments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEquipments = () => {
      const load = async () => {
        try {
          const res = await axios.get(
            "http://localhost:5172/api/add/fetch/equipments"
          );
          setEquipments(res.data);
        } catch (error) {
          console.error("Error while fetching products:", error);
        } finally {
          setIsLoading(false);
        }
      };
      load();
    };
    fetchEquipments();
  }, []);

  // Handle real-time search functionality
  useEffect(() => {
    if (searchTerm.trim()) {
      const results = equipments.filter((item) =>
        item.eq_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchTerm, equipments]);

  // Handle filter functionality
  const handleFilter = () => {
    if (filterStatus === "All") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results = equipments.filter((item) => item.status === filterStatus);
    setSearchResults(results);
    setShowSearchResults(true);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus input when search results are shown
  useEffect(() => {
    if (showSearchResults && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearchResults]);

  return (
    <>
      <div
        className="top-header-boxes flex gap-3 w-full p-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100
  overflow-x-auto md:overflow-x-hidden flex-nowrap md:flex-wrap"
      >
        {/* Box 1 */}
        <div className="box-1 flex-shrink-0 w-48 md:flex-1 md:min-w-[200px] h-40 bg-white shadow-lg rounded-md flex flex-col hover:scale-103 transition-all cursor-pointer ">
          <div className="card-head relative flex flex-row justify-between items-center w-full rounded-md">
            <div className="tool-pic w-12 h-12 mx-2 my-2 rounded-full bg-gray-100 border border-gray-300 shadow-lg"></div>
            <div className="separator relative bg-blue-900 w-[1px] h-10 -translate-x-1"></div>
            <div className="count--users relative flex flex-col items-start mx-2 my-2 right-2">
              <span className="text-blue-900 font-semibold text-[17px] flex">
                <Laptop />
                Laptops
              </span>
              <span className="text-xs text-blue-500 font-semibold">
                30+ Peoples
              </span>
            </div>
          </div>
          <div className="card-bottom relative w-full flex-1 flex justify-center items-center rounded-b-md">
            <span className="text-sm line-clamp-3 text-start mx-2 text-gray-600 w-full">
              This product is increasing your sales, more people tend to use it.
            </span>
          </div>
        </div>

        {/* Box 2 */}
        <div className="box-1 flex-shrink-0 w-48 md:flex-1 md:min-w-[200px] h-40 bg-white shadow-lg rounded-md flex flex-col hover:scale-103 transition-all cursor-pointer">
          <div className="card-head relative flex flex-row justify-between items-center w-full rounded-md">
            <div className="tool-pic w-12 h-12 mx-2 my-2 rounded-full bg-gray-100 border border-gray-300 shadow-lg"></div>
            <div className="separator relative bg-blue-900 w-[1px] h-10 -translate-x-1"></div>
            <div className="count--users relative flex flex-col items-start mx-2 my-2 right-2">
              <span className="text-blue-900 font-semibold text-[17px] flex items-center">
                <FaMobileAlt />
                Phones
              </span>
              <span className="text-xs text-blue-500 font-semibold">
                500+ Peoples
              </span>
            </div>
          </div>
          <div className="card-bottom relative w-full flex-1 flex justify-center items-center rounded-b-md">
            <span className="text-sm line-clamp-3 text-start mx-2 text-gray-600 w-full">
              This product is increasing your sales, more people tend to use it.
            </span>
          </div>
        </div>

        {/* Box 3 */}
        <div className="box-1 flex-shrink-0 w-48 md:flex-1 md:min-w-[200px] h-40 bg-white shadow-lg rounded-md flex flex-col hover:scale-103 transition-all cursor-pointer">
          <div className="card-head relative flex justify-center items-center w-full h-1/2 rounded-md top-3">
            <span className="w-16 h-16 rounded-full bg-blue-200 font-semibold text-[17px] text-center flex justify-center items-center">
              <FaTools className="text-blue-900 text-2xl" />
            </span>
          </div>
          <div className="card-bottom relative w-full flex-1 flex justify-center items-center rounded-b-md">
            <span className="text-gray-600 font-semibold text-lg">
              500 Equipnments
            </span>
          </div>
        </div>

        {/* Box 4 */}
        <div className="box-1 flex-shrink-0 w-48 md:flex-1 md:min-w-[200px] h-40 bg-white shadow-lg rounded-md flex flex-col hover:scale-103 transition-all cursor-pointer">
          <div className="card-head relative flex justify-center items-center w-full h-1/2 rounded-md top-3">
            <span className="w-16 h-16 bg-blue-200 rounded-full font-semibold text-[17px] text-center flex justify-center items-center">
              <Users className="text-blue-900" />
            </span>
          </div>
          <div className="card-bottom relative w-full flex-1 flex justify-center items-center rounded-b-md">
            <span className="text-gray-600 font-semibold text-lg">
              2000 Clients
            </span>
          </div>
        </div>

        {/* Box 5 */}
        <div className="box-1 flex-shrink-0 w-48 md:flex-1 md:min-w-[200px] h-40 bg-white shadow-lg rounded-md flex flex-col hover:scale-103 transition-all cursor-pointer">
          <div className="card-head relative flex flex-row justify-between items-center w-full rounded-md">
            <div className="tool-pic w-12 h-12 mx-2 my-2 rounded-full bg-gray-100 border border-gray-300 shadow-lg"></div>
            <div className="separator relative bg-blue-900 w-[1px] h-10 -translate-x-1"></div>
            <div className="count--users relative flex flex-col items-start mx-2 my-2 right-2">
              <span className="text-blue-900 font-semibold text-[17px] flex">
                <File />
                Report
              </span>
              <span className="text-xs text-blue-500 font-semibold">
                30+ Peoples
              </span>
            </div>
          </div>
          <div className="card-bottom relative w-full flex-1 flex justify-center items-center rounded-b-md">
            <span className="text-sm line-clamp-3 text-start mx-2 text-gray-600 w-full">
              This product is increasing your sales, more people tend to use it.
            </span>
          </div>
        </div>
      </div>

      {/* Graphs and Important Activities Section */}
      <div className="graphs relative top-8 w-full mb-8 flex flex-col lg:flex-row gap-2 items-stretch">
        {/* Left Graph (Line + Pie stacked) */}
        <div className="bg-white shadow-md rounded-md border border-gray-300 flex flex-col lg:w-[calc(100%-29%)]">
          <div className="graph-header h-10 border-b border-gray-200 flex justify-center items-center">
            <span className="font-semibold text-gray-700">
              Company Equipments Analysis
            </span>
          </div>

          <div className="graph-body lg:h-full lg:flex lg:flex-row flex-1">
            <div className="line-plot flex-1 border-b border-gray-200">
              <div className="h-[200px] lg:h-[70%] p-2 sm:h-full">
                <ResponsiveContainer width={"100%"} height={"100%"}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray={"3 3"} />
                    <XAxis dataKey={"Name"} />
                    <YAxis dataKey={"Sales"} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type={"monotone"}
                      dataKey={"Sales"}
                      stroke="#8884d8"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-gray-100 rounded-bl-md p-2 text-xs text-gray-600 ">
                Monthly sales performance analysis
              </div>
            </div>

            <div className="pie-plot flex-1 sm:h-full">
              <div className="h-[200px] lg:h-[70%] p-2">
                <ResponsiveContainer width={"100%"} height={"100%"}>
                  <PieChart>
                    <Pie
                      data={data}
                      cx={"50%"}
                      cy={"50%"}
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} : ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={windowWidth < 768 ? 60 : 80}
                      fill="#8884d8"
                      dataKey={"Sales"}
                    >
                      {data.map((entry, i) => (
                        <Cell
                          key={`cell-${i}`}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={22} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-gray-100 rounded-br-md p-2 text-xs text-gray-600">
                Sales distribution by month
              </div>
            </div>
          </div>
        </div>

        {/* Activities */}
        <div
          className={`flex-1 shadow-md rounded-md border bg-white border-gray-300 h-auto lg:h-[500px] ${
            showActivities ? "block" : "hidden lg:block"
          }`}
        >
          <div className="relative w-full md:flex-1 h-96 md:h-full rounded-md border bg-white border-gray-300">
            <div className="head w-full h-13 bg-blue-900 rounded-t-md justify-center items-center">
              <span className="flex justify-center items-center translate-y-3 text-white font-semibold">
                <Activity className="text-white text-center flex justify-center items-center" />
                Important Activities
              </span>
            </div>

            <div className="body w-full max-h-[90%] rounded-b-md flex flex-col items-center space-y-2 overflow-y-auto p-2">
              <div
                className="note w-[99%] h-20 bg-gray-200 hover:scale-104 transition-all cursor-pointer rounded-md shrink-0 flex flex-row items-center justify-between"
                onClick={openModal}
              >
                <div className="icon w-[10%] relative left-2">
                  <Bell className="text-yellow-500 translate-x-2" />
                </div>
                <div className="note-body flex flex-col">
                  <span className="text-blue-500 font-semibold">
                    Stock Notification
                  </span>
                  <p className="text-sm text-gray-700">
                    Lorem ipsum, dolor sit amet
                  </p>
                </div>
                <span
                  className="note-delete relative right-0 w-8 h-full flex justify-center items-center hover:bg-red-400 rounded-r-md hover:text-white transition-all"
                  onClick={() => !isModalOpened}
                >
                  <X className="w-4 h-4 font-semibold" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="equipment-users-table relative top-5 w-full mb-4 border border-gray-300 bg-white rounded-md shadow-md overflow-hidden">
        <div className="head w-full h-12 flex justify-center items-center border-b border-b-gray-200">
          <span className="font-semibold text-blue-500">
            Daily Equipment Track
          </span>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section p-4 w-full flex flex-col md:flex-row gap-4 bg-gray-50 border-b">
          <div className="search-box relative flex-1" ref={searchRef}>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search equipment..."
                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm && setShowSearchResults(true)}
              />
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute z-10 mt-4 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((item) => (
                      <div
                        key={`result-${item.id}`}
                        className="p-3 border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setSearchTerm(item.eq_name);
                          setShowSearchResults(false);
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{item.eq_name}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              ID: {item.id} | Stock: {item.amount} | Price: {item.price} FRW
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              item.status === "Available"
                                ? "bg-green-100 text-green-800"
                                : item.status === "Rented"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-gray-500">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="filter-box flex-1">
            <div className="flex items-center gap-2">
              <Filter className="text-gray-500" />
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Rented">Rented</option>
                <option value="Maintainance">Maintainance</option>
              </select>
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 whitespace-nowrap"
                onClick={handleFilter}
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>

        {/* Equipment Table */}
        <div className="overflow-x-auto">
          {equipments ? (
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {equipments.map((item) => (
                  <tr key={item.id} className="transition hover:bg-blue-100">
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
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="loadingcontainer relative w-full h-screen flex justify-center items-center">
              <div className="loading relative w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center border-5 border-blue-500 border-b-white">
                <div className="loader absolute w-8 h-8 border-3 border-white bg-white rounded-full"></div>
              </div>
              <div className="loading-word relative left-6">
                <p className="text-blue-500 font-semibold text-2xl">
                  Loading...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpened}
        isClosed={closeModal}
        title={"Stock Notification"}
      />
    </>
  );
};

export default Dashboard;

