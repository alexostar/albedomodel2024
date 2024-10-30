'use client';
import Link from 'next/link';

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

// Calculate TDEE according to equation 6 and 13 in the paper Ryan M. Bright et al 2016:
// Carbon-equivalent metrics for albedo changes in land management contexts: relevance of the time dimension

export default function TDEECalc() {
  // Equation 6 for rSW = 1 W/,2 (or whatever we initiate rsw with)

  const rsw = 18.28;
  const tsw = 0.854;
  const earthm2 = 5.1e14;
  const rf = (rsw * tsw) / earthm2; // Equation 6
  console.log('RF: ', rf);

  const [matrix100, setMatrix100] = useState<number[][]>([]);
  const [inverseMatrix100, setInverseMatrix100] = useState<Matrix | null>(null);

  // Getting the inverse of the lower triangular matrix used to solve the system of linear equations,
  useEffect(() => {
    async function loadMatrix() {
      try {
        // Get the lower triangual matrix stored in a json file
        //const response = await fetch('/yco2matrix100x100.json');  Inital matrix
        const response = await fetch('/matrices/New_Joos_100x100_matrix.json');
        const data = await response.json();
        setMatrix100(data);

        // Calculate the inverse of 100x100 matrix
        const mathMatrix100 = matrix(data);
        const inverse100 = inv(mathMatrix100);
        setInverseMatrix100(inverse100);

        // Create the RF-delta-alfa array, with first 25 elements as 0 and remaining 75 as 0.00000000000000167
        const rfAlbedoVector = [
          ...Array(25).fill(0),
          ...Array(75).fill(3.1380313725490196e-14), // This value is the rf calculated above. Now it is hard-coded
        ];

        // Multiply the inverse matrix with the rfAlbedoVector
        const parenthesisResult = multiply(inverse100, rfAlbedoVector);

        // Final step in calucating TDEE - deviding with the constant kCO2
        const tdeekgm2 = divide(parenthesisResult, 1.76e-15);

        console.log('tdeekgm2: ', tdeekgm2);

        const tdeekgm2sum = sum(tdeekgm2);
        console.log('tdee-kg-m2-sum: ', tdeekgm2sum);

        // Changing kg / m2 to tonn / ha
        const tdeetonhasum = (Number(tdeekgm2sum) * 10000) / 1000;

        console.log('tdee-ton-ha-sum: ', tdeetonhasum.toFixed(1));
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
        <Link href='/blog/reiknilikan-3-matrix' className='text-primary my-4'>
          Litterature sources and code
        </Link>

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
      <h1 className='text-2xl font-bold mb-5'>Matrix for TDEE calculations </h1>

      {matrix100.length > 0 && renderMatrix(matrix100, '100x100 Matrix')}
      {inverseMatrix100 &&
        renderMatrix(inverseMatrix100, 'Inverse of the 100x100 Matrix')}
    </div>
  );
}
