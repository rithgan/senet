import React, { useState } from 'react';
import { useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

const RadialGauge = ({series})=> {
  const [options,setOptions] = useState({
        series: [0],
        options: {
          chart: {
            height: 250,
            type: 'radialBar',
            offsetY: -20
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 135,
              dataLabels: {
                name: {
                  fontSize: '16px',
                  color: '#fff',
                  offsetY: 50
                },
                value: {
                  offsetY: 10,
                  fontSize: '22px',
                  color: '#fff',
                  formatter: function (val) {
                    return val + "%";
                  }
                }
              },
              track:{
                show:false
              }
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                shadeIntensity: 0.15,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 1,
                stops: [0,50,80,100]
            },
          },
          stroke: {
            dashArray: 4
          },
          labels: ['Leverage'],
        },
      
      
      })

      useEffect(()=>{
        setOptions(prev=>{
          prev.series = [series]
          return {...prev}
        })
      },[series])
    return (
        <ApexCharts
        options={options.options} series={options.series} type="radialBar" height={250} 
        />
    );
  }

export default RadialGauge;
