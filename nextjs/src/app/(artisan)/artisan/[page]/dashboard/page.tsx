// components/Dashboard.tsx
import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useAllProducts } from '../../../../../../hooks/prodect-hook';
import { useAllOrders } from '../../../../../../hooks/order-hook';

import 'chart.js/auto';

const Dashboard: React.FC = () => {
  const { data: allProducts } = useAllProducts();
  const { data: allOrders } = useAllOrders();


  if (!allOrders || !allProducts) {
    return <div>Loading...</div>; // or any loading indicator or message
  }

  // Filter products by type (Sugar or Salt)
const sugaryProducts = allProducts?.filter((product) => {
    console.log('Product:', product); // Add this line for debugging
    return product.type === 'sugar';
  }) || [];  
  const saltyProducts = allProducts?.filter((product) => product.type === 'salt') || [];

  // Calculate percentages
  const sugaryPercentage = (sugaryProducts.length / allProducts.length) * 100 || 0;
  const saltyPercentage = (saltyProducts.length / allProducts.length) * 100 || 0;

  // Extract sugary and salty percentages for the charts
  const doughnutData = {
 labels: [
      `Sugary (${sugaryPercentage.toFixed(2)}%)`,
      `Salty (${saltyPercentage.toFixed(2)}%)`,
    ],
        datasets: [
      {
        data: [sugaryPercentage, saltyPercentage],
        backgroundColor: ['#FCD34D', '#36A2EB'],
      },
    ],
  };

// Monthly and yearly product sales
const monthlySales = new Array(12).fill(0);
const yearlySales = new Array(new Date().getFullYear() - 2010 + 1).fill(0);

// Revenue per month and year
const monthlyRevenue = new Array(12).fill(0);
const yearlyRevenue = new Array(new Date().getFullYear() - 2010 + 1).fill(0);

// Extracting all "accepted" products from the orders
const acceptedProducts = allOrders
  ? allOrders
      .filter((order) => order.order_status === 'accepted')
      .reduce((products, order) => {
        return products.concat(order.products);
      }, [] as any[])
  : [];

acceptedProducts.forEach((product) => {
  const date = new Date(product.created_at);

  // Product Sales
  monthlySales[date.getMonth()] += 1;
  yearlySales[date.getFullYear() - 2010] += 1;

  // Product Revenue
  const pricePerPiece = product.price_per_piece || 0;
  monthlyRevenue[date.getMonth()] += pricePerPiece;
  yearlyRevenue[date.getFullYear() - 2010] += pricePerPiece;
});

// Bar chart data (number of products sold per month and total yearly products)
const barData = {
  labels: Array.from({ length: 12 }, (_, i) => `${i + 1}`), // Months
  datasets: [
    {
      label: 'Products Sold (Monthly)',
      backgroundColor: '#FCD34D',
      borderWidth: 1,
      hoverBackgroundColor: '#FCD34D',
      data: monthlySales,
    },
    {
      label: 'Products Sold (Yearly)',
      backgroundColor: '#36A2EB',
      borderWidth: 1,
      hoverBackgroundColor: '#36A2EB',
      data: [yearlySales.reduce((a, b) => a + b, 0)], // Total yearly products
    },
  ],
};

// Bar chart data (revenue per month and per year)
const revenueData = {
  labels: Array.from({ length: 12 }, (_, i) => `${i + 1}`), // Months
  datasets: [
    {
      label: 'Revenue (Monthly)',
      backgroundColor: '#FCD34D',
      borderWidth: 1,
      hoverBackgroundColor: '#FCD34D',
      data: monthlyRevenue,
    },
    {
      label: 'Revenue (Yearly)',
      backgroundColor: '#36A2EB',
      borderWidth: 1,
      hoverBackgroundColor: '#36A2EB',
      data: yearlyRevenue,
    },
  ],
};

const optionsWithoutGridLines = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

return (
  <div className="p-6 bg-white shadow-md rounded-md">
    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
      <div className="w-full">
        <div className="bg-white p-4 rounded-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Sold products</h2>
          <div className="w-fit">
            <Bar data={barData} options={optionsWithoutGridLines} />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="bg-white p-4 rounded-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Revenue</h2>
          <div className="w-fit">
            <Bar data={revenueData} options={optionsWithoutGridLines} />
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white p-4 rounded-md shadow-lg mt-[5%]  w-full">
      <h2 className="text-xl font-semibold mb-4">Doughnut Chart</h2>
      <div style={{ height: '300px' }} >
        <Doughnut
          data={doughnutData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            cutout: '50%', // Adjust the size of the inner circle
          }}
        />
      </div>
    </div>
  </div>
);



};

export default Dashboard;


