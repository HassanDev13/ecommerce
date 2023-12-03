"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Ficon1 from '/public/Ficon1.svg';
import { AccountForm } from '../login/_components/accountForm';


type Role = 'Artisan' | 'Consumer' | 'Delivery';

interface RegistrationFormProps {
  role: Role;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ role }) => {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prevData: any) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = () => {
    // Handle form submission using formData
    console.log(formData);
  };

  const commonRows = [
    // Row 1
    <tr key="firstName">
      <td>
        <label className='ml-[11%]'>First Name:</label>
        <input
          type="text"
          className="block ml-[10%] w-[85%] mb-2 border border-gray-300 rounded-md p-2"
          onChange={(e) => handleChange('firstName', e.target.value)}
        />
      </td>
      <td>
        <label className='ml-[2%]'>Last Name:</label>
        <input
          type="text"
          className="block mr-[10%] w-[85%] mb-2 border border-gray-300 rounded-md p-2"
          onChange={(e) => handleChange('lastName', e.target.value)}
        />
      </td>
    </tr>,
    // Row 2
    <tr key="emailPhone">
      <td>
        <label className='ml-[11%]'>Email:</label>
        <input
          type="email"
          className="block ml-[10%] w-[85%] mb-2 border border-gray-300 rounded-md p-2"
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </td>
      <td>
        <label className='ml-[2%]'>Phone Number:</label>
        <input
          type="tel"
          className="block mr-[10%] w-[85%] mb-2 border border-gray-300 rounded-md p-2"
          onChange={(e) => handleChange('phoneNumber', e.target.value)}
        />
      </td>
    </tr>,
    // Row 3
    <tr key="address">
      <td colSpan={2}>
        <label className='ml-[6%]'>Address:</label>
        <input
          type="text"
          className="block ml-[5%] w-[87%] mb-2 border border-gray-300 rounded-md p-2"
          onChange={(e) => handleChange('address', e.target.value)}
        />
      </td>
    </tr>,
  ];

  const roleSpecificRows = {
    Artisan: [
      // Row 4
      <tr key="businessName">
        <td>
          <label className='ml-[11%]'>Business Name:</label>
          <input
            type="text"
            className="block ml-[10%] px-[40%]  mb-2 border border-gray-300 rounded-md p-2"
            onChange={(e) => handleChange('businessName', e.target.value)}
          />
        </td>
      </tr>,
      // Row 5
      <tr key="openedClosed">
        <td>
          <label className='ml-[11%]'>Opened At:</label>
          <input
            type="time"
            className=" block ml-[10%] w-[85%] border border-gray-300 rounded-md p-2"
            onChange={(e) => handleChange('openedAt', e.target.value)}
          />
        </td>
        <td>
          <label className='ml-[3%]'>Closed At:</label>
          <input
            type="time"
            className="block mr-[10%] w-[80%] border border-gray-300 rounded-md p-2"
            onChange={(e) => handleChange('closedAt', e.target.value)}
          />
        </td>
      </tr>,
      // Row 6
      <tr key="description">
        <td colSpan={2} className='pl-5 pr-3'>
          <span className='block ml-[1%]'>Description:</span>
          <textarea
            onChange={(e) => handleChange('description', e.target.value)}
            className="mb-2 border border-gray-300 rounded-md p-5 ml-[1%] w-[91%]"
          ></textarea>
        </td>
      </tr>,
    ],
    Consumer: [], // No specific fields for Consumer
    Delivery: [
      // Row 4
      <tr key="availability">
        <td>
          <label className='ml-[12%]'>Availability:</label>
          <select
            value={formData['availability'] || ''}
            onChange={(e) => handleChange('availability', e.target.value)}
            className="uppercase block ml-[10%] pr-[108%] mb-2 border border-gray-300 rounded-md p-2"
          >
            <option className='' value="1">Available</option>
            <option value="0">Not Available</option>
          </select>
        </td>
      </tr>,
    ],
  };

  const selectedRows = roleSpecificRows[role];

  return (
    <>
      {commonRows.map((row, index) => (
        <React.Fragment key={`commonRow-${index}`}>{row}</React.Fragment>
      ))}
      {selectedRows.map((row, index) => (
        <React.Fragment key={`${role}-specificRow-${index}`}>{row}</React.Fragment>
      ))}
      <tr>
        <th colSpan={2} className='pb-5'>
          <button
            className="bg-yellow-400 px-4 mt-2 mr-[5%] py-2 w-[89%] rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </th>
      </tr>
    </>
  );
};

const RegistrationPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>('Artisan');

  const handleRoleSelection = (role: Role) => {
    setSelectedRole(role);
  };

  const roles: Role[] = ['Artisan', 'Consumer', 'Delivery'];

  return (
    <div className="grid grid-cols-2">
      {/* Left Column */}
      <div className="p-8 ml-[15%]">
        <table className="mt-[10%] bg-red-50 p-4 rounded-xl">
          <tbody className='w-fit'>
            {/* Row 1 */}
            <tr>
              <th colSpan={2} className=''>
                {roles.map((role) => (
                  <button
                    key={role}
                    className={` mt-3 ${
                      selectedRole === role ? 'bg-yellow-500  rounded-lg' : 'bg-yellow-400 rounded-lg'
                    } w-[27%] mx-[2%] py-2 mb-2`}
                    onClick={() => handleRoleSelection(role)}
                    disabled={selectedRole === role}
                  >
                    {role}
                  </button>
                ))}
              </th>
            </tr>
            {/* Render the selected registration form */}
            {selectedRole && <RegistrationForm role={selectedRole} />}
          </tbody>
        </table>
      </div>

      {/* Right Column */}
      <div className="p-8 ">
        <Image src={Ficon1} alt="Yummy!" width={400} height={200} className='mr-[30%]' />
      </div>
    </div>
  );
};

export default RegistrationPage;

