import React from 'react';

const AboutUs = () => {
  return (
    <div className=" p-6 bg-gray-800"> {/* Optional: Set a dark background for contrast */}
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white">About Us</h1>
      </div>
     <div className='flex flex-col'>
      <div className='flex justify-around max-md:flex-col items-center'>
      {/* Introduction Section */}
      <section className="mb-12 lg:w-[30vw] md:w-[40vw] border-2 border-black rounded-lg p-10">
        <div className="mb-4">
          <h2 className="text-3xl font-semibold text-white">Welcome to VirtuMart!</h2>
        </div>
        <p className="text-sm text-white">
          VirtuMart is an ecommerce website which provides various products to customers. We offer a wide range of products, from electronics to fashion, to cater to all your needs. 
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-12 lg:w-[30vw] md:w-[40vw]  border-2 border-black rounded-lg p-10">
        <div className="mb-4">
          <h2 className="text-3xl font-semibold text-white">Our Mission</h2>
        </div>
        <p className="text-sm text-white">
         Our mission is to provide you with the best products and service. We are passionate about delivering high-quality products and exceptional customer service. Whether you’re looking for electronics, fashion, or home goods, we’re here to help you find what you need.
        </p>
      </section>
      </div>

      

      {/* Why Choose Us Section */}
      <section className="mb-12  border-2 border-black rounded-lg p-10 md:mx-10">
        <div className="mb-4">
          <h2 className="text-3xl font-semibold text-white">Why Choose Us?</h2>
        </div>
        <ul className="list-disc list-inside space-y-2  text-sm text-white">
          <li><strong>Quality Products:</strong> We source only the best materials and partner with trusted suppliers to ensure that every product meets our high standards.</li>
          <li><strong>Exceptional Service:</strong> Our dedicated team is committed to providing you with a seamless shopping experience, from browsing to delivery.</li>
          <li><strong>Customer Satisfaction:</strong> Your happiness is our priority. We offer [mention any special services like easy returns, customer support, etc.] to make sure you’re completely satisfied.</li>
        </ul>
      </section>
      </div>

      
       
    </div>
  );
};

export default AboutUs;
