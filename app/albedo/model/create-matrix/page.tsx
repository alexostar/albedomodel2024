'use client';

import React, { useEffect, useState } from 'react';
import { matrix, multiply, inv } from 'mathjs';

export default function CreateMatrix() {
  // Initate an empty matrix
  const [largeMatrix, setLargeMatrix] = useState<number[][]>([]);

  // Setting the parameters for the Impulse Response Function (IRF CO2) as defined by Joos et al. (2013):
  // Carbondioxideandclimateimpulseresponsefunctionsforthe computationofgreenhousegasmetrics:amulti-modelanalysis
  // https://acp.copernicus.org/articles/13/2793/2013/acp-13-2793-2013.pdf

  const a0 = 0.2173;
  const a1 = 0.224;
  const a2 = 0.2824;
  const a3 = 0.2763;
  const tau1 = 394.4;
  const tau2 = 36.54;
  const tau3 = 4.304;

  // The IRF CO2 function to calculate the CO2 remaining in a given year after an initial pulse
  // The function takes in the number of years
  function calculateCO2Remaining(years: number) {
    const co2RemainingData = [];
    for (let t = 0; t <= years; t++) {
      const y_CO2 =
        a0 +
        a1 * Math.exp(-t / tau1) +
        a2 * Math.exp(-t / tau2) +
        a3 * Math.exp(-t / tau3);
      co2RemainingData.push({
        year: t,
        fractionCO2Remaining: y_CO2,
      });
    }
    return co2RemainingData;
  }

  // Initiate co2Data as an empty array
  const [co2Data, setCo2Data] = useState<
    Array<{ year: number; fractionCO2Remaining: number }>
  >([]);

  // Calculate fraction of CO2 remaining for 100 years (the co2Data array)
  useEffect(() => {
    const calculatedCO2Data = calculateCO2Remaining(100);
    setCo2Data(calculatedCO2Data);

    // Create 100x100 matrix using the fractionCO2Remaining data
    const largeMatrixSize = 100;
    const newLargeMatrix = [];

    for (let i = 0; i < largeMatrixSize; i++) {
      const row = [];
      for (let j = 0; j < largeMatrixSize; j++) {
        if (j > i) {
          row.push(0);
        } else if (j === i) {
          row.push(1);
        } else {
          const value = calculatedCO2Data[i - j].fractionCO2Remaining;
          row.push(value);
        }
      }
      newLargeMatrix.push(row);
    }
    setLargeMatrix(newLargeMatrix);
    // Create and check the inverse matrix
    // Uncheck to check the outcome of multiplying the matrix and the inverse matrix
    //const mathMatrix = matrix(newLargeMatrix);
    //const invMatrix = inv(mathMatrix);
    //const result = multiply(mathMatrix, invMatrix);
    //console.log(
    //  'Checking the results of multiplying the matrix with the inverse matrix'
    //);
    //console.log(result);
  }, []);

  const downloadMatrix = () => {
    const jsonString = JSON.stringify(largeMatrix);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = '100x100_matrix.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='container max-w-2xl mx-auto py-6 lg:py-10'>
      <h1 className='font-bold text-2xl mb-4'>
        Impulse Response Function for CO2 (IRF CO2)
      </h1>

      <button
        onClick={downloadMatrix}
        className='bg-primary hover:bg-gray-800 text-white font-bold py-2 px-4 rounded'>
        Download 100x100 Matrix
      </button>
      <h2 className='text-lg mt-8'>
        Fraction of CO2 remaining in a given year after an initial pulse
      </h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              <th className='px-4 py-2 text-right'>Year</th>
              <th className='px-4 py-2 text-right'>Fraction CO2 Remaining</th>
            </tr>
          </thead>
          <tbody>
            {co2Data.map((data) => (
              <tr key={data.year}>
                <td className='border px-4 py-2 text-right'>{data.year}</td>
                <td className='border px-4 py-2 text-right'>
                  {data.fractionCO2Remaining.toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
