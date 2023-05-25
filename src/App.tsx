import { useState } from "react";
import { generateMeterReadings } from "./helpers";
import { MeterReading } from "./types";
import "./styles.css";

export default function App() {
  const [readings, setReadings] = useState<MeterReading[]>(
    generateMeterReadings()
  );

  const readingListItems = readings.map((reading) => (
    <li key={reading.value}>
      {reading.value} - {reading.source}
    </li>
  ));

  const handleSubmit = () => {

  }

  return (
    <div className="App">
      <h1>Meter Readings</h1>
      <p>Enter a new meter reading:</p>
      <form onSubmit={handleSubmit}> 
      <input className="input"></input>
      <button>Submit</button>
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
