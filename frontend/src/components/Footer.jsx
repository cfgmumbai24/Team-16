import React from "react";

const Footer = () => {
  const teamMembers = [
    { name: "facebook", imageSrc: "https://cdn-icons-png.flaticon.com/512/174/174848.png", link: "https://www.facebook.com/jpmmsssociety/" },
    { name: "linkedin", imageSrc: "https://cdn-icons-png.flaticon.com/512/3536/3536505.png", link: "https://www.linkedin.com/company/janardan-prasad-memorial-social-service-society/" },
    { name: "email", imageSrc: "https://cdn-icons-png.flaticon.com/512/15465/15465653.png", link: "https://give.do/discover/NOC/janardan-prasad-memorial-multipurpose-social-service-socicety/" },
  ];

  return (
    <footer className="bg-[#74512D] text-[#F8F4E1] py-6 text-center">
      <p className="mb-4 text-[#F8F4E1]">Contact Us</p>

      <ul className="flex flex-wrap justify-center space-x-6">
        {teamMembers.map((member, index) => (
          <li key={index} className="mb-2 sm:mb-0">
            <a
              href={member.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden mx-2"
              style={{ width: '48px', height: '48px' }}
            >
              <img
                src={member.imageSrc}
                alt={member.name}
                className="object-cover w-full h-full"
                style={{ objectFit: 'cover' }}
              />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
