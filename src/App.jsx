import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import fetchDataFormApi from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/404/pageNotFound";
import Details from "./pages/details/Details";

import Explore from "./pages/explore/Explore";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SearchResult from "./pages/searchResult/SearchResult";

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.home.url);
  console.log("url", url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFormApi("/configuration").then((res) => {
      console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch({
        type: "getApiConfiguration",
        payload: url,
      });
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFormApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log("data", data);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch({
      type: "getGenres",
      payload: allGenres,
    });
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
