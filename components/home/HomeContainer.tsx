import LeftSidebar from "./leftSidebar";
import Navbar from "./navbar";

const HomeContainer = (props: any) => {
    return (
    <div className="flex">
        <Navbar/>
      <div>{props.children}</div>
    </div>
    )
}

export default HomeContainer;