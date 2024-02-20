import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });
import axios from 'axios';
import Link from "next/link";

export default function Home() {
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  interface breed{
    id:string;
    attributes:{
    name:string;};
  };
  const [breeds, setBreeds] = useState<Array<breed>>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dogapi.dog/api/v2/breeds");
        console.log(response.data.data)
        
        const breedsData:Array<breed>=response.data.data;

        setBreeds(breedsData);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching data:${error}`);
      }
    };

    fetchData();
  }, [loading, breeds, error]);

  console.log(breeds);

  if (loading) {
    return <>Loading...</>;
  } else if (error !== "") {
    return <>{error}</>;
  }

  return (
    <>
      <div>
        <ul>
          {breeds.map((b1)=><li key={b1.id}><Link href={`/details/${b1.id}`}>{b1.attributes.name}</Link></li>)}
        </ul>
      </div>
    </>
  );
}
