import Image from "next/image";
import { Carousel } from "antd";
import data from "@public/assets/data.json";
import phone from "@public/images/phone.png";

const Contact = () => {
  return (
    <div id="contact" className="bg-zinc-50 w-full">
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-center sm:gap-x-4 px-6 sm:px-10 md:px-14 lg:px-36 py-10 xs:py-20">
        <div className="sm:w-64 p-4">
          <Carousel dots={false} autoplay>
            {data.employees.map((employee, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center p-4 rounded-lg bg-white shadow-xl"
                >
                  <div className="w-16 sm:w-20 h-16 sm:h-20 overflow-hidden">
                    <Image
                      alt={employee.name}
                      src={employee.image}
                      className="object-cover h-full w-full rounded-full"
                      width={100}
                      height={100}
                      priority
                    />
                  </div>

                  <div className="flex flex-col font-poppins">
                    <p className="text-sm font-semibold">{employee.role}</p>
                    <p className="text-sm">{employee.name}</p>
                    <p className="text-sm sm:text-2xl font-semibold text-blue-900">
                      {employee.phone}
                    </p>
                    <p className="text-sm">{employee.email}</p>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="sm:w-1/2">
          <h1 className="sm:text-right text-center text-4xl sm:text-[50px] md-text-[65px] font-bold font-popins py-4 sm:leading-[1.2]">
            Connect with Our Team
          </h1>
          <div className="flex flex-row-reverse">
            <Image
              alt="phone"
              src={phone}
              width={60}
              height={60}
              className="hidden sm:block"
            />
          </div>

          <p className="hidden sm:block text-xs sm:text-sm md:text-lg text-left text-gray-500">
            {data.connectteam}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
