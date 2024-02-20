import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailsPage() {
  const [breedData, setBreedData] = useState<breed>();
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  type breed={
    id:string;
    attributes:{
    description:string;
    life: {
      max:number;
      min: number;
    };
    male_weight: {
      max: number;
      min: number;
    };
    female_weight: {
      max: number;
      min: number;
    };
  };

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dogapi.dog/api/v2/breeds/${id}`
        );

        setBreedData(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching data:${error}`);
      }
    };

    fetchData();
  }, []);
  console.log(breedData);

  if (loading)
  return <p>Loading...</p>

  else if(error !=='')
  {
    <>{error}</>
  }
  
  return (
      <div>
        <h3> DetailsPage :- </h3>
        <br />
        <br />
        <span>
          <h5>
            Description:- {breedData?.attributes.description}
            <br />
            <br />
            Max life :- {breedData?.attributes.life.max}
            <br />
            <br />
            Min life:- {breedData?.attributes.life.max}
            <br />
            <br />
            Male weight:-
            <br />
            Max:- {breedData?.attributes.male_weight.max}
            <br />
            Min:- {breedData?.attributes.male_weight.min}
            <br />
            <br />
            Female weight:-
            <br />
            Max:- {breedData?.attributes.female_weight.max}
            <br />
            Min:- {breedData?.attributes.female_weight.min}
          </h5>
        </span>
      </div>
    );

    
}
