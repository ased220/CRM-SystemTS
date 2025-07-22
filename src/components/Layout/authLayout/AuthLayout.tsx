import { Flex } from "antd";
import skeleton from '../../../assets/illustration.png'
import circle from '../../../assets/Vector.png'
import { Outlet } from "react-router";

export default function AuthLayout (){
  return (
    <div className="container">
      <img src={circle} alt="" className="circle" />
      <Flex>
        <img src={skeleton} alt="skeleton" className="illustration" />
        <Outlet/>
      </Flex>
    </div>
  );
};

