import OverdueBooks from "./OverdueBooks";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      
      <div>
        {" "}
        
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-2">
        <OverdueBooks />
      </div>
    </div>
  );
}
