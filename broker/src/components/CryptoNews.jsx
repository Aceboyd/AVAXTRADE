import React, { useEffect, useState } from "react";

function CryptoNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.Data.slice(0, 6)); // Top 6 articles
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 bg-[#0D0D2B] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ fontFamily: "'Bodoni Moda', serif" }} // 👈 custom font
        >
          Latest Crypto News
        </h2>

        {loading && <p className="text-center text-gray-400">Loading news...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1B1B3A] rounded-2xl shadow-md p-5 hover:shadow-lg hover:scale-105 transition transform duration-300"
            >
              <img
                src={item.imageurl}
                alt={item.title}
                className="rounded-xl mb-4 w-full h-44 object-cover"
              />
              <h3
                className="font-semibold text-lg text-white hover:text-[#3671E9] transition"
                style={{ fontFamily: "'Poppins', sans-serif" }} // 👈 custom font
              >
                {item.title}
              </h3>
              <p
                className="text-sm text-gray-300 mt-3 overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {item.body}
              </p>
              <span className="block mt-4 text-[#3671E9] text-sm font-medium">
                Read more →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CryptoNews;
