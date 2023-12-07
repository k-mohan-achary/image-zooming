import React from 'react'; 
import ImageZoom from './ImageZoom';

const HomePage: React.FC = () => {
  return (
    <div> 
      {/* <ImageZoom src="https://indisparedev.s3.ap-south-1.amazonaws.com/product/135146/1.jpg" alt="Your Image" /> */}
      <ImageZoom src="https://indisparedev.s3.ap-south-1.amazonaws.com/product/255909/1.jpg" alt="Your Image" />
    </div>
  );
};

export default HomePage;
