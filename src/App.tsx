import { useState } from "react";
import { generateMeterReadings } from "./helpers";
import { MeterReading } from "./types";
import "./styles.css";

export default function App() {
  const [readings, setReadings] = useState<MeterReading[]>(
    generateMeterReadings()
  );

  const [newReading, setNewReading] = useState<number>(0);
  const [estimatedReading, setEstimatedReading] = useState<number>(0);

  const readingListItems = readings.map((reading) => (
    <li key={reading.value}>
      {reading.value} - {reading.source}
    </li>
  ));

  const invalidEntry :boolean = false

  const handleChange = (event: any) => {
    setNewReading(Number(event.target.value));
  };

  const handleSubmit = (event: any) => {

  }

  return (
    <div className="App">
      <h1>Meter Readings</h1>
      <p>Enter a new meter reading:</p>
      <form onSubmit={(event) => handleSubmit(event)}> 
      <input data-testid="input" onChange={(event) => handleChange(event)} className="input"></input>
      <button data-testid="button" >Submit</button>
      </form>
      <p className="error" style={{ display: "none" }}>
        This is an invalid meter reading.
      </p>
      <h2>Estimated usage next month</h2>
      <p>Coming soon</p>
      <h2>Historical meter readings</h2>
      <ul>{readingListItems}</ul>
    </div>
  );
}

