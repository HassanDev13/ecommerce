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
  const sugaryProducts = allProducts?.filter((product) => product.type === 'sugar') || [];
  const saltyProducts = allProducts?.filter((product) => product.type === 'salt') || [];

  // Calculate percentages
  const sugaryPercentage = (sugaryProducts.length / allProducts.length) * 100 || 0;
  const saltyPercentage = (saltyProducts.length / allProducts.length) * 100 || 0;

  // Extract sugary and salty percentages for the charts
  const doughnutData = {
    labels: [`Sugary (${sugaryPercentage.toFixed(0)}%)`, `Salty (${saltyPercentage.toFixed(0)}%)`],
    datasets: [
      {
        data: [sugaryPercentage, saltyPercentage],
        backgroundColor: ['#FCD34D', '#36A2EB'],
      },
    ],
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const yearsToShow = Array.from({ length: currentYear - 2010 + 1 }, (_, i) => currentYear - i).reverse(); // Years in reverse order

  

  // Monthly and yearly product sales
  const monthlySales = new Array(12).fill(0);
const yearlySales = new Array(currentYear - 2010 + 1).fill(0);

  // Revenue per month and year
  const monthlyRevenue = new Array(12).fill(0);
  const yearlyRevenue = new Array(new Date().getFullYear() - 2010 + 1).fill(0);

  // Extracting all "accepted" products from the orders
  const acceptedProducts = allOrders
  ? allOrders
      .filter((order) => order.order_status === 'delivered')
      .reduce((products, order) => {
        const orderYear = new Date(order.created_at).getFullYear(); // Get the year from the order
        return products.concat(
          order.products.map((product) => {
            const updatedProduct = { ...product, order_date: order.created_at, order_year: orderYear };
            console.log('Order Year:', updatedProduct.order_year); // Log the order year
            return updatedProduct;
          })
        );
      }, [] as any[])
  : [];

  acceptedProducts.forEach((product) => {
    const orderDate = new Date(product.order_date);

    // Product Sales
    monthlySales[orderDate.getMonth()] += product.pivot.quantity || 1; 
    yearlySales[orderDate.getFullYear() ] += 1; // Update starting year to 2023
    

    // Product Revenue
    const pricePerPiece = product.price_per_piece || 0;
    const quantity = product.pivot.quantity || 1; 
    monthlyRevenue[orderDate.getMonth()] += pricePerPiece * quantity;
    yearlyRevenue[ 2024 -orderDate.getFullYear()] += pricePerPiece * quantity;
    // Additional condition for the current year
if (orderDate.getFullYear() === currentYear) {
  yearlySales[0] += quantity;
}

    
    

    console.log(
      `Order Date: ${orderDate.toLocaleDateString()}, Product: ${product.name}, Price per Piece: ${pricePerPiece}, Quantity: ${quantity}`
    );
});

  // Bar chart data (number of products sold per month)

const monthlyBarData = {
  labels: Array.from({ length: 12 }, (_, i) => new Date(currentYear, i).toLocaleString('default', { month: 'short' })),

  datasets: [
    {
      label: 'Products Sold (Monthly)',
      backgroundColor: '#FCD34D',
      borderWidth: 1,
      hoverBackgroundColor: '#FCD34D',
      data: monthlySales.map((sales, index) => (index <= currentMonth ? sales : null)),
    },
  ],
};

// Bar chart data (total yearly products)

const yearlyBarData = {
  labels: [currentYear.toString()], // Single label for the current year
  datasets: [
    {
      label: 'Products Sold (Yearly)',
      backgroundColor: '#36A2EB',
      borderWidth: 1,
      hoverBackgroundColor: '#36A2EB',
      data: [isNaN(yearlySales[0]) ? 0 : yearlySales[0]], // Display only the current year's data
    },
  ],
};

 // Bar chart data (revenue per month)

const monthlyRevenueData = {
  labels: Array.from({ length: 12 }, (_, i) => new Date(currentYear, i).toLocaleString('default', { month: 'short' })),
  datasets: [
    {
      label: 'Revenue (Monthly) in DZD',
      backgroundColor: '#FCD34D',
      borderWidth: 1,
      hoverBackgroundColor: '#FCD34D',
      data: monthlyRevenue.map((revenue, index) => {
        return index <= currentMonth ? (isNaN(revenue) ? 0 : Number(revenue.toFixed(4))) : null;
      }),
    },
  ],
};


  // Bar chart data (total yearly revenue)

const yearlyRevenueData = {
  labels: yearsToShow.map((year) => year.toString()), 
  datasets: [
    {
      label: 'Revenue (Yearly) in DZD',
      backgroundColor: '#36A2EB',
      borderWidth: 1,
      hoverBackgroundColor: '#36A2EB',
      data: yearsToShow.map((year) => {
        const index = currentYear - year; 
        
        return index >= 0 ? (isNaN(yearlyRevenue[index]) ? 0 : Number(yearlyRevenue[index].toFixed(4))) : null;
        
        
      }),

    },
  ],
};

  const optionsWithoutGridLines = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0, // Rotate labels to be horizontal
          minRotation: 0,
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
            <h2 className="text-xl font-semibold mb-4">Monthly Sold products</h2>
            <div className="w-fit">
              <Bar data={monthlyBarData} options={optionsWithoutGridLines} />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Yearly Sold products</h2>
            <div className="w-fit">
              <Bar data={yearlyBarData} options={optionsWithoutGridLines} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mt-6">
        <div className="w-full">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
            <div className="w-fit">
              <Bar data={monthlyRevenueData} options={optionsWithoutGridLines} />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Yearly Revenue</h2>
            <div className="w-fit">
              <Bar data={yearlyRevenueData} options={optionsWithoutGridLines} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-md shadow-lg mt-6 w-full">
        <h2 className="text-xl font-semibold mb-4">Doughnut Chart</h2>
        <div style={{ height: '300px' }}>
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
