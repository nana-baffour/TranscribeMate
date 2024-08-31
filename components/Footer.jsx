import React from "react";

const Footer = () => {
  return (
    <footer className=' bg-teal-400 text-blue-950 py-5 mt-12 mb-0'>
      <div className='container mx-auto text-center'>
        <div className='flex justify-around mb-6'>
          <div>
            <h4 className='text-xl font-bold mb-2'>Company</h4>
            <ul>
              <li>
                <a href='#about' className='hover:underline'>
                  About Us
                </a>
              </li>
              <li>
                <a href='#careers' className='hover:underline'>
                  Careers
                </a>
              </li>
              <li>
                <a href='#blog' className='hover:underline'>
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-xl font-bold mb-2'>Support</h4>
            <ul>
              <li>
                <a href='#faq' className='hover:underline'>
                  FAQ
                </a>
              </li>
              <li>
                <a href='#support' className='hover:underline'>
                  Support Center
                </a>
              </li>
              <li>
                <a href='#contact' className='hover:underline'>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-xl font-bold mb-2'>Legal</h4>
            <ul>
              <li>
                <a href='#privacy' className='hover:underline'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#terms' className='hover:underline'>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p>&copy; 2024 TranscribeAI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
