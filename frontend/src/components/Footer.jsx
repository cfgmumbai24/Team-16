import React from "react";

const Footer = () => {
  const teamMembers = [
    { name: "facebook", imageSrc: "https://cdn-icons-png.flaticon.com/512/2175/2175193.png", link: "https://www.facebook.com/jpmmsssociety/" },
    { name: "linkedin", imageSrc: "https://cdn-icons-png.flaticon.com/512/3536/3536569.png", link: "https://www.linkedin.com/company/janardan-prasad-memorial-social-service-society/" },
    { name: "email", imageSrc: "https://cdn-icons-png.flaticon.com/512/542/542689.png", link: "https://give.do/discover/NOC/janardan-prasad-memorial-multipurpose-social-service-socicety/" },
  ];

  return (
    <footer className="bg-[#74512D] text-[#F8F4E1] py-6 text-center">
      <p className="mb-4 text-[#F8F4E1]">Contact Us</p>

      <ul className="flex flex-wrap justify-center space-x-4">
        {teamMembers.map((member, index) => (
          <li key={index} className="mb-2 sm:mb-0">
            <a
              href={member.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-12 h-12 rounded-full overflow-hidden"
            >
              <img
                src={member.imageSrc}
                alt={member.name}
                className="object-cover w-full h-full transform hover:scale-110 transition duration-300"
              />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;