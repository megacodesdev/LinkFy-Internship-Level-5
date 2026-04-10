import React from 'react';

export default function Table(props){
    //   const equipmentData = [
    //     {
    //       id: 1,
    //       equipment: "Excavator",
    //       client: "Kigali Builders",
    //       location: "Kigali",
    //       phone: "+250 788 123 456",
    //       status: "Rented",
    //     },
    //     {
    //       id: 2,
    //       equipment: "Bulldozer",
    //       client: "Huye Constructions",
    //       location: "Huye",
    //       phone: "+250 728 654 321",
    //       status: "Available",
    //     },
    //     {
    //       id: 3,
    //       equipment: "Crane",
    //       client: "Rubavu Works",
    //       location: "Rubavu",
    //       phone: "+250 739 987 654",
    //       status: "Rented",
    //     },
    //     {
    //       id: 4,
    //       equipment: "Forklift",
    //       client: "Muhanga Transport",
    //       location: "Muhanga",
    //       phone: "+250 788 234 567",
    //       status: "Maintenance",
    //     },
    //     {
    //       id: 5,
    //       equipment: "Concrete Mixer",
    //       client: "Nyagatare Ltd",
    //       location: "Nyagatare",
    //       phone: "+250 722 555 666",
    //       status: "Available",
    //     },
    //     {
    //       id: 6,
    //       equipment: "Dump Truck",
    //       client: "Karongi Logistics",
    //       location: "Karongi",
    //       phone: "+250 783 112 233",
    //       status: "Rented",
    //     },
    //     {
    //       id: 7,
    //       equipment: "Scissor Lift",
    //       client: "Musanze Elevate",
    //       location: "Musanze",
    //       phone: "+250 730 334 455",
    //       status: "Available",
    //     },
    //     {
    //       id: 8,
    //       equipment: "Backhoe Loader",
    //       client: "Ngoma Heavy Duty",
    //       location: "Ngoma",
    //       phone: "+250 785 556 677",
    //       status: "Rented",
    //     },
    //     {
    //       id: 9,
    //       equipment: "Generator",
    //       client: "Rusizi Energy",
    //       location: "Rusizi",
    //       phone: "+250 789 223 344",
    //       status: "Available",
    //     },
    //     {
    //       id: 10,
    //       equipment: "Road Roller",
    //       client: "Rwamagana Pavers",
    //       location: "Rwamagana",
    //       phone: "+250 776 445 556",
    //       status: "Rented",
    //     },
    //     {
    //       id: 11,
    //       equipment: "Tower Light",
    //       client: "Bugesera Lighting",
    //       location: "Bugesera",
    //       phone: "+250 783 334 556",
    //       status: "Available",
    //     },
    //     {
    //       id: 12,
    //       equipment: "Air Compressor",
    //       client: "Gicumbi AirWorks",
    //       location: "Gicumbi",
    //       phone: "+250 732 778 899",
    //       status: "Maintenance",
    //     },
    //     {
    //       id: 13,
    //       equipment: "Water Pump",
    //       client: "Nyanza Flow Ltd",
    //       location: "Nyanza",
    //       phone: "+250 780 665 778",
    //       status: "Rented",
    //     },
    //   ];
    
    return(
        <>
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  #ID
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Equipment
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* {equipmentData.map((item) => ( */}
                <tr key={props.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {props.id}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {props.equipment}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {props.client}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {props.location}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {props.phone}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        props.status === "Rented"
                          ? "bg-red-100 text-red-800"
                          : props.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {props.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              {/* ))} */}
            </tbody>
          </table>
        </>
    )
}