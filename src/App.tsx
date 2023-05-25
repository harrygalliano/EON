import { useState } from "react";
import { generateMeterReadings } from "./helpers";
import { MeterReading } from "./types";
import "./styles.css";

export default function App() {
  const [readings, setReadings] = useState<MeterReading[]>(
    generateMeterReadings()
  );

  const [newReading, setNewReading] = useState<number>(0);
  const [isInvalid, setIsInvalid] = useState<boolean>(false)

  const readingListItems = readings.map((reading) => (
    <li key={reading.value}>
      {reading.value} - {reading.source}
    </li>
  ));

  const handleChange = (event: any) => {
    setNewReading(Number(event.target.value));
  };

  const addReading = (newReading : number, customerReadings : any) => {
    setIsInvalid(false)
    let preSubmitCustomer = [...readings]
    preSubmitCustomer.unshift({ value: newReading, source: "customer" });
    // I'm cocnfused by this bit of the task, because there is potential there are only 3 customer readings
    // I'm working on the assumption that I shouldn't use estimated readings
    // So I'm slightly tweaking the requirements to use the last 3 readings
    const allCustomerReadings = preSubmitCustomer.filter((newReading) => newReading.source === "customer");
    console.log(allCustomerReadings)
    const one : number = allCustomerReadings[0].value - allCustomerReadings[1].value
    const two : number = allCustomerReadings[1].value - allCustomerReadings[2].value
    const avDif : number = Math.round((one + two) / 2)
    console.log("this is the average dif", avDif)
    const estimatedReading = preSubmitCustomer[0].value + avDif
    console.log("here is the estimated value", estimatedReading)
    preSubmitCustomer.unshift({ value: estimatedReading, source: "estimated" });
    setReadings(preSubmitCustomer)
  }


  const handleSubmit = (event: any) => {
    event.preventDefault();
    const customerReadings = readings.filter((newReading) => newReading.source === "customer");
    const lastCustomerReading = customerReadings[customerReadings.length - 1]?.value;
    // now we have our latest meter reading
    if (newReading < 10000 && newReading > 99999){
      setIsInvalid(true)
    }
    else if (newReading <= lastCustomerReading) {
      setIsInvalid(true)
    }
    else {
      addReading(newReading, customerReadings)
    }


  }

  return (
    <div className="App">
      <h1>Meter Readings</h1>
      <p>Enter a new meter reading:</p>
      <form onSubmit={(event) => handleSubmit(event)}> 
      <input type="number" data-testid="input" onChange={(event) => handleChange(event)} className="input"></input>
      <button className="button" data-testid="button" >Submit</button>
      </form>
      <div>
        { isInvalid? 
       <p className="error" >
        This is an invalid meter reading.
      </p>
        : <div> </div>}
      </div>
      <h2>Estimated usage next month</h2>
      <p>Coming soon</p>
      <h2>Historical meter readings</h2>
      <ul>{readingListItems}</ul>
    </div>
  );
}

