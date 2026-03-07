import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const myInfo = {
    id: 0,
    firstname: "Jessel",
    lastname: "Zapanta",
    username: "Jezyk",
    email: "jessezapanta9@gmail.com",
    zipcode: "7200",
    lat: "8.1094",
    lng: "123.7909",
  };

  const getData = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");

      // Map API data to the desired structure
      const formatted = res.data.map(user => ({
        id: user.id,
        firstname: user.name.split(" ")[0],
        lastname: user.name.split(" ")[1] || "",
        username: user.username,
        email: user.email,
        zipcode: user.address.zipcode,
        lat: user.address.geo.lat,
        lng: user.address.geo.lng,
      }));

      // Add personal info at the beginning
      setUsers([myInfo, ...formatted]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-10 transition-colors">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-gray-200">
        Users Information
      </h1>
      <p className="text-sm text-center mb-6 italic text-gray-500 dark:text-gray-200">
        Using jsonplaceholder
      </p>

      {loading ? (
        <p className="text-center text-lg text-gray-700 dark:text-gray-300">
          Loading...
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              <tr>
                <th className="py-3 px-4 border dark:border-gray-700">ID</th>
                <th className="py-3 px-4 border dark:border-gray-700">Firstname</th>
                <th className="py-3 px-4 border dark:border-gray-700">Lastname</th>
                <th className="py-3 px-4 border dark:border-gray-700">Username</th>
                <th className="py-3 px-4 border dark:border-gray-700">Email</th>
                <th className="py-3 px-4 border dark:border-gray-700">Zipcode</th>
                <th className="py-3 px-4 border dark:border-gray-700">Latitude</th>
                <th className="py-3 px-4 border dark:border-gray-700">Longitude</th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="py-2 px-4 border dark:border-gray-700">{user.id}</td>
                  <td className="py-2 px-4 border dark:border-gray-700">{user.firstname}</td>
                  <td className="py-2 px-4 border dark:border-gray-700">{user.lastname}</td>
                  <td className="py-2 px-4 border dark:border-gray-700">{user.username}</td>
                  <td className="py-2 px-4 border dark:border-gray-700">{user.email}</td>
                  <td className="py-2 px-4 border dark:border-gray-700">{user.zipcode}</td>
                  <td className="py-2 px-4 border dark:border-gray-700">{user.lat}</td>
                  <td className="py-2 px-4 border dark:border-gray-700">{user.lng}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <footer class="bg-gray-900 text-gray-300 py-4 mt-10">
        <div class="max-w-6xl mx-auto px-4 text-center">

          <p class="text-sm">
            Data provided by
            <span class="text-blue-400 font-semibold">JSONPlaceholder</span>
          </p>

          <p class="text-xs text-gray-500 mt-1">
            © 2026 Your App. All rights reserved.
          </p>

        </div>
      </footer>
    </div>
  );
}

export default App;