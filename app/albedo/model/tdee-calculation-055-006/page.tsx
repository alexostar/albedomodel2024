'use client';

import {
  Matrix,
  matrix,
  multiply,
  MathNumericType,
  inv,
  sum,
  divide,
} from 'mathjs';
import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function TDEECalc() {
  // Equation 6 in Bright et al 2016 for "averageAlbedoTimesRsw" = 1 W/m2

  const averageAlbedoTimesRsw = 1;
  const tsw = 0.854;
  const earthm2 = 5.1e14;
  const rf = (averageAlbedoTimesRsw * tsw) / earthm2; // Equation 6
  console.log('RF: ', rf);
  // The outcome is RF = 1.6745098039215687e-15

  const [matrix100, setMatrix100] = useState<number[][]>([]);
  const [inverseMatrix100, setInverseMatrix100] = useState<Matrix | null>(null);

  useEffect(() => {
    async function loadMatrix() {
      try {
        // Get the lower triangual matrix stored in a json file
        const response = await fetch(
          'https://hlkyrtglhpmrhzudaqzu.supabase.co/storage/v1/object/public/vin2024/New_Joos_100x100_matrix.json?t=2024-10-23T14%3A15%3A06.866Z'
        );
        const data = await response.json();
        setMatrix100(data);

        // Calculate the inverse of 100x100 matrix
        const mathMatrix100 = matrix(data);
        const inverse100 = inv(mathMatrix100);
        setInverseMatrix100(inverse100);

        // Create the RF-delta-alfa array, with first 25 elements as 0 and remaining 75 as 0.00000000000000167
        const rfVector = [
          ...Array(25).fill(0),
          ...Array(75).fill(1.6745098039215687e-15), // The RF value for averageAlbedoTimesRsw = 1 W/m2
        ];

        // Multiply the inverse matrix with the rfAlbedoVector
        const parenthesisResult = multiply(inverse100, rfVector);

        // Final step in calucating TDEE - deviding with the constant kCO2
        const kCO2 = 1.76e-15;
        const tdeekgm2 = divide(parenthesisResult, kCO2);

        const tdeekgm2sum = sum(tdeekgm2);
        console.log('tdee-kg-m2-sum: ', tdeekgm2sum);

        // Changing kg / m2 to tonn / ha
        const tdeetonhasum = (Number(tdeekgm2sum) * 10000) / 1000;

        console.log('tdee-ton-ha-sum: ', tdeetonhasum.toFixed(1));
        /* The outcome for tdde-ton-ha-sum is 19,9 when averageAlbedoTimesRsw is 1 W/m2 
        Hence the TDEE for each station can be can be calcuated (for the 0.55/0.06 scenario):
        19.9 times Average of monthly albedo changes times Rsw
        See the /stations-rf-tdee file: "const tdee = averageAlbedoTimesRsw * 19.9";
        */
      } catch (error) {
        console.error('Error loading or processing matrix:', error);
      }
    }
    loadMatrix();
  }, []);

  const renderMatrix = (
    matrix: number[][] | Matrix | MathNumericType[],
    title: string
  ) => {
    let matrixArray: MathNumericType[][];

    if (Array.isArray(matrix)) {
      matrixArray =
        matrix[0] && Array.isArray(matrix[0])
          ? (matrix as MathNumericType[][])
          : [matrix as MathNumericType[]];
    } else {
      matrixArray = matrix.toArray() as MathNumericType[][];
      if (!Array.isArray(matrixArray[0])) {
        matrixArray = [matrixArray as unknown as MathNumericType[]];
      }
    }

    return (
      <>
        <h2 className='text-xl font-bold mb-3'>{title}</h2>
        <Table className='mb-8'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Row / Column</TableHead>
              {matrixArray[0].map((_, colIndex) => (
                <TableHead key={colIndex} className='text-center'>
                  Column {colIndex + 1}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {matrixArray.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell className='font-medium'>
                  Row {rowIndex + 1}
                </TableCell>
                {row.map((value, colIndex) => (
                  <TableCell key={colIndex} className='text-center'>
                    {typeof value === 'number'
                      ? value.toFixed(6)
                      : Number(value).toFixed(6)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  };

  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-2xl font-bold mb-5'>Matrix Operations</h1>

      {matrix100.length > 0 && renderMatrix(matrix100, '100x100 Matrix')}
      {inverseMatrix100 &&
        renderMatrix(inverseMatrix100, 'Inverse of 100x100 Matrix')}
    </div>
  );
}
