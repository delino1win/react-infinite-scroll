import "./App.css";
import { useEffect, useState } from "react";

const Loading = () => {
  return (
    <div className="loading">
      Loading...
    </div>
  )
} 

function App() {
  const [coinsData, setCoinsData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)

  async function fetchData() {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": process.env.development.local.GECKO_APIKEY,
          },
        }
      );

      if (!res.ok) {
        console.log(res.statusText);
      }

      const data = await res.json();

      // setCoinsData((currVal) => [...currVal, ...data]);

      if(page === 1) {
        setCoinsData(data);
        
        setLoading(false)
      } else {
        setCoinsData((currVal) => [...currVal, ...data]);
        
        setLoading(false)
      }


      // console.log(coinsData)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // fetchData()
    setTimeout(async () => {
      await fetchData();
      
    }, [2000]);
  }, [page]);

  function handleScroll() {
    // console.log("================");
    // console.log("Doc Height: ", document.documentElement.scrollHeight); // to obtain total height of the document ( element <doc>... ) scroll, the height depends on the size of the h element. Resizing can change the value of the height 
    // console.log("Vertical Value: ", document.documentElement.scrollTop); // to obtain y axis's the scroll value that acts like coordinate
    // console.log("Window's height: : ", window.innerHeight); //to obtain the original value of the window, cant be change.

    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true)
      setPage((currVal) => currVal + 1);
      // setTimeout(() => {
      //   document.documentElement.scrollTop = document.documentElement.scrollTop / 2
      // }, [2000]);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      <div className="container">
        {coinsData.map((item) => (
          <div key={item.id}>
            <div className="card">
              <div className="img">
                <img src={`${item.image}`} />
              </div>
              <div className="coin_name">{item.name}</div>
              <div className="price">{item.current_price} $</div>
            </div>
          </div>
        ))}
      </div>
      {loading && <Loading />}
    </div>
  );
}

export default App;
