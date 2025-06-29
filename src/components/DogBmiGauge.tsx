import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

interface DogBmiGaugeProps {
  breed: string;
  sex: "male" | "female";
  weight: number; // Original input value
height: number; // Original input value
  weightUnit: 'lbs' | 'kg';
  heightUnit: 'inches' | 'cm';
  breedData?: {
    weightRange: { male: [number, number]; female: [number, number] };
    heightRange: { male: [number, number]; female: [number, number] };
  };
}

interface BreedData {
  male: { minWeight: number; maxWeight: number; avgHeight: number };
  female: { minWeight: number; maxWeight: number; avgHeight: number };
}

// Updated breed data with BMI ranges instead of weight ranges
// Based on veterinary BMI standards for dogs
interface BreedBmiData {
  male: { minBmi: number; maxBmi: number };
  female: { minBmi: number; maxBmi: number };
}

const breedBmiData: Record<string, BreedBmiData> = {
  Labrador: {
    male: { minBmi: 80, maxBmi: 110 },
    female: { minBmi: 75, maxBmi: 105 }
  },
  // Add other breeds with their BMI ranges
  Beagle: {
    male: { minBmi: 85, maxBmi: 115 },
    female: { minBmi: 80, maxBmi: 110 }
  },
  GoldenRetriever: {
    male: { minBmi: 75, maxBmi: 105 },
    female: { minBmi: 70, maxBmi: 100 }
  },
  Poodle: {
    male: { minBmi: 50, maxBmi: 85 },
    female: { minBmi: 45, maxBmi: 80 }
  },
  Chihuahua: {
    male: { minBmi: 120, maxBmi: 160 },
    female: { minBmi: 120, maxBmi: 160 }
  },
  Pug: {
    male: { minBmi: 140, maxBmi: 180 },
    female: { minBmi: 140, maxBmi: 180 }
  },
  Bulldog: {
    male: { minBmi: 200, maxBmi: 250 },
    female: { minBmi: 180, maxBmi: 230 }
  },
  Dachshund: {
    male: { minBmi: 130, maxBmi: 170 },
    female: { minBmi: 120, maxBmi: 160 }
  }
};

// Keep original breed data for reference (not used in BMI calculation)
const breedData: Record<string, BreedData> = {
  Beagle: {
    male: { minWeight: 13, maxWeight: 16, avgHeight: 0.38 }, // 13-15 inches
    female: { minWeight: 12, maxWeight: 15, avgHeight: 0.36 } // 13-15 inches
  },
  Labrador: {
    male: { minWeight: 29, maxWeight: 36, avgHeight: 0.59 }, // 22.5-24.5 inches
    female: { minWeight: 25, maxWeight: 32, avgHeight: 0.57 } // 21.5-23.5 inches
  },
  GoldenRetriever: {
    male: { minWeight: 29, maxWeight: 34, avgHeight: 0.61 }, // 23-24 inches
    female: { minWeight: 25, maxWeight: 29, avgHeight: 0.57 } // 21.5-22.5 inches
  },
  Poodle: {
    male: { minWeight: 20, maxWeight: 32, avgHeight: 0.61 }, // 24+ inches (Standard)
    female: { minWeight: 18, maxWeight: 27, avgHeight: 0.58 } // 22+ inches (Standard)
  },
  Chihuahua: {
    male: { minWeight: 1.5, maxWeight: 3.0, avgHeight: 0.20 }, // 6-9 inches
    female: { minWeight: 1.5, maxWeight: 2.7, avgHeight: 0.19 } // 6-9 inches
  },
  Pug: {
    male: { minWeight: 6.3, maxWeight: 8.1, avgHeight: 0.33 }, // 12-14 inches
    female: { minWeight: 6.3, maxWeight: 8.1, avgHeight: 0.32 } // 12-14 inches
  },
  Bulldog: {
    male: { minWeight: 23, maxWeight: 25, avgHeight: 0.38 }, // 14-16 inches
    female: { minWeight: 18, maxWeight: 23, avgHeight: 0.36 } // 14-16 inches
  },
  Dachshund: {
    male: { minWeight: 7, maxWeight: 14, avgHeight: 0.23 }, // 8-9 inches (Standard)
    female: { minWeight: 6, maxWeight: 13, avgHeight: 0.22 } // 8-9 inches (Standard)
  },
  ShihTzu: {
    male: { minWeight: 4, maxWeight: 7.2, avgHeight: 0.26 }, // 9-10.5 inches
    female: { minWeight: 4, maxWeight: 6.5, avgHeight: 0.25 } // 9-10.5 inches
  },
  GermanShepherd: {
    male: { minWeight: 30, maxWeight: 40, avgHeight: 0.64 }, // 24-26 inches
    female: { minWeight: 22, maxWeight: 32, avgHeight: 0.60 } // 22-24 inches
  },
  BorderCollie: {
    male: { minWeight: 14, maxWeight: 20, avgHeight: 0.53 }, // 19-22 inches
    female: { minWeight: 12, maxWeight: 19, avgHeight: 0.48 } // 18-21 inches
  },
  SiberianHusky: {
    male: { minWeight: 20, maxWeight: 27, avgHeight: 0.58 }, // 21-23.5 inches
    female: { minWeight: 16, maxWeight: 23, avgHeight: 0.53 } // 20-22 inches
  },
  PembrokeWelshCorgi: {
    male: { minWeight: 10, maxWeight: 13.5, avgHeight: 0.28 }, // 10-12 inches
    female: { minWeight: 9, maxWeight: 11.5, avgHeight: 0.27 } // 10-12 inches
  },
  Maltese: {
    male: { minWeight: 3, maxWeight: 4, avgHeight: 0.23 }, // 7-9 inches
    female: { minWeight: 2.5, maxWeight: 3.5, avgHeight: 0.22 } // 7-9 inches
  },
  YorkshireTerrier: {
    male: { minWeight: 2, maxWeight: 3.5, avgHeight: 0.20 }, // 7-8 inches
    female: { minWeight: 2, maxWeight: 3.2, avgHeight: 0.19 } // 7-8 inches
  },
  Rottweiler: {
    male: { minWeight: 45, maxWeight: 60, avgHeight: 0.66 }, // 24-27 inches
    female: { minWeight: 35, maxWeight: 48, avgHeight: 0.61 } // 22-25 inches
  },
  FrenchBulldog: {
    male: { minWeight: 9, maxWeight: 14, avgHeight: 0.30 }, // 11-13 inches
    female: { minWeight: 8, maxWeight: 13, avgHeight: 0.29 } // 11-13 inches
  },
  BichonFrise: {
    male: { minWeight: 5, maxWeight: 10, avgHeight: 0.26 }, // 9.5-11.5 inches
    female: { minWeight: 4.5, maxWeight: 9, avgHeight: 0.25 } // 9.5-11.5 inches
  },
  Samoyed: {
    male: { minWeight: 20, maxWeight: 30, avgHeight: 0.58 }, // 21-23.5 inches
    female: { minWeight: 16, maxWeight: 24, avgHeight: 0.53 } // 19-21 inches
  },
  ShetlandSheepdog: {
    male: { minWeight: 7, maxWeight: 11, avgHeight: 0.40 }, // 13-16 inches
    female: { minWeight: 6, maxWeight: 10, avgHeight: 0.38 } // 13-16 inches
  }
};

const DogBmiGauge: React.FC<DogBmiGaugeProps> = ({ breed, sex, weight, height, weightUnit, heightUnit, breedData }) => {
  // Conversion functions
  const getWeightInKg = () => {
    return weightUnit === 'lbs' ? weight * 0.453592 : weight;
  };

  const getHeightInMeters = () => {
    return heightUnit === 'inches' ? height * 0.0254 : height * 0.01;
  };

  const { bmi, idealBmiMin, idealBmiMax, status, isSupported } = useMemo(() => {
    // Prioritize using passed breedData, otherwise use hardcoded breedBmiData
    let idealBmiMin: number;
    let idealBmiMax: number;
    
    if (breedData) {
      // Calculate ideal BMI range using passed breed data
      const weightRange = breedData.weightRange[sex];
      const heightRange = breedData.heightRange[sex];
      
      // Convert pounds to kg, inches to meters
      const minWeightKg = weightRange[0] * 0.453592;
      const maxWeightKg = weightRange[1] * 0.453592;
      const avgHeightM = ((heightRange[0] + heightRange[1]) / 2) * 0.0254;
      
      // Calculate ideal BMI range
      idealBmiMin = minWeightKg / (avgHeightM * avgHeightM);
      idealBmiMax = maxWeightKg / (avgHeightM * avgHeightM);
    } else if (breedBmiData[breed]) {
      // Use hardcoded BMI data
      const bmiStandards = breedBmiData[breed][sex];
      idealBmiMin = bmiStandards.minBmi;
      idealBmiMax = bmiStandards.maxBmi;
    } else {
      // Breed not supported
      return {
        bmi: 0,
        idealBmiMin: 0,
        idealBmiMax: 0,
        status: 'unsupported' as const,
        isSupported: false
      };
    }

    // Calculate current BMI using standard formula: BMI = weight (kg) / height² (m²)
    const weightInKg = getWeightInKg();
    const heightInM = getHeightInMeters();
    const currentBmi = weightInKg / (heightInM * heightInM);
    
    // Determine status based on BMI comparison with breed standards
    let bmiStatus: 'underweight' | 'normal' | 'overweight' | 'obese';
    
    if (currentBmi < idealBmiMin * 0.9) {
      // Below standard range by 10%
      bmiStatus = 'underweight';
    } else if (currentBmi >= idealBmiMin && currentBmi <= idealBmiMax) {
      // Within standard range
      bmiStatus = 'normal';
    } else if (currentBmi > idealBmiMax && currentBmi <= idealBmiMax * 1.3) {
      // Exceeds by 10-30%
      bmiStatus = 'overweight';
    } else {
      // Exceeds by 30%
      bmiStatus = 'obese';
    }
    
    return {
      bmi: currentBmi,
      idealBmiMin,
      idealBmiMax,
      status: bmiStatus,
      isSupported: true
    };
  }, [breed, sex, weight, height, weightUnit, heightUnit]);

  // Show tip for unsupported breeds
  if (!isSupported) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-4xl mb-4">❓</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Breed Not Supported</h3>
        <p className="text-gray-600">
          We currently support BMI calculation for 20 common dog breeds. The breed you selected is not currently in our supported list.
        </p>
      </div>
    );
  }

  // Calculate gauge ranges
  const gaugeMin = Math.max(0, Math.min(idealBmiMin * 0.5, bmi * 0.5));
  const gaugeMax = Math.max(idealBmiMax * 2, bmi * 1.5, 50);
  
  // Calculate proportions for four intervals
  const underweightEnd = (idealBmiMin * 0.9 - gaugeMin) / (gaugeMax - gaugeMin);
  const normalEnd = (idealBmiMax - gaugeMin) / (gaugeMax - gaugeMin);
  const overweightEnd = (idealBmiMax * 1.3 - gaugeMin) / (gaugeMax - gaugeMin);

  // ECharts configuration
  const option = {
    series: [
      {
        name: 'Dog BMI',
        type: 'gauge',
        min: gaugeMin,
        max: gaugeMax,
        splitNumber: 8,
        radius: '75%',
        center: ['50%', '65%'],
        startAngle: 200,
        endAngle: -20,
        itemStyle: {
          color: status === 'underweight' ? '#3B82F6' : 
                 status === 'normal' ? '#10B981' : 
                 status === 'overweight' ? '#F59E0B' : '#EF4444'
        },
        progress: {
          show: true,
          width: 20
        },
        pointer: {
          show: true,
          length: '60%',
          width: 4,
          itemStyle: {
            color: '#333'
          }
        },
        axisLine: {
          lineStyle: {
            width: 25,
            color: [
              [underweightEnd, '#3B82F6'], // Underweight - Blue
[normalEnd, '#10B981'], // Normal - Green
[overweightEnd, '#F59E0B'], // Overweight - Orange
[1, '#EF4444'] // Obese - Red
            ]
          }
        },
        axisTick: {
          distance: -25,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        splitLine: {
          distance: -35,
          length: 20,
          lineStyle: {
            color: '#fff',
            width: 3
          }
        },
        axisLabel: {
          show: false  // Hide number labels, only show three main ranges
        },
        detail: {
          valueAnimation: true,
          formatter: function(value: number) {
            return `BMI = ${value.toFixed(1)}`;
          },
          color: '#333',
          fontSize: 20,
          fontWeight: 'bold',
          offsetCenter: [0, '20%']
        },
        animationDuration: 1000,
        animationEasing: 'cubicOut',
        data: [
          {
            value: parseFloat(bmi.toFixed(1))
          }
     ],
    graphic: [
      {
        type: 'text',
        left: `${15 + underweightEnd * 35}%`,
        top: '75%',
        style: {
          text: 'Underweight',
          fontSize: 10,
          fontWeight: 'bold',
          fill: '#3B82F6',
          textAlign: 'center'
        }
      },
      {
        type: 'text',
        left: `${15 + (underweightEnd + normalEnd) * 35 / 2}%`,
        top: '75%',
        style: {
          text: 'Normal',
          fontSize: 10,
          fontWeight: 'bold',
          fill: '#10B981',
          textAlign: 'center'
        }
      },
      {
        type: 'text',
        left: `${15 + (normalEnd + overweightEnd) * 35 / 2}%`,
        top: '75%',
        style: {
          text: 'Overweight',
          fontSize: 10,
          fontWeight: 'bold',
          fill: '#F59E0B',
          textAlign: 'center'
        }
      },
      {
        type: 'text',
        left: `${15 + (overweightEnd + 1) * 35 / 2}%`,
        top: '75%',
        style: {
          text: 'Obese',
          fontSize: 10,
          fontWeight: 'bold',
          fill: '#EF4444',
          textAlign: 'center'
        }
      }
    ]
      }
    ]
  };

  const getStatusInfo = () => {
    switch (status) {
      case 'underweight':
        return {
          label: 'Underweight',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50 border-blue-200',
          icon: '📉',
          description: 'Your dog may need increased nutritional intake'
        };
      case 'normal':
        return {
          label: 'Ideal Weight',
          color: 'text-green-600',
          bgColor: 'bg-green-50 border-green-200',
          icon: '✅',
          description: 'Your dog has a very healthy weight'
        };
      case 'overweight':
        return {
          label: 'Overweight',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50 border-orange-200',
          icon: '📈',
          description: 'Recommend controlling diet and increasing exercise'
        };
      case 'obese':
        return {
          label: 'Obese',
          color: 'text-red-600',
          bgColor: 'bg-red-50 border-red-200',
          icon: '🚨',
          description: 'Urgent need for weight management - consult veterinarian'
        };
      default:
        return {
          label: 'Unknown',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50 border-gray-200',
          icon: '❓',
          description: ''
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {breed} BMI Analysis
        </h3>
        <p className="text-gray-600 text-sm">
          {sex === 'male' ? 'Male' : 'Female'} • Weight: {weight}{weightUnit} • Height: {height}{heightUnit}
        </p>
      </div>

      {/* ECharts Gauge */}
      <div className="mb-4">
        <ReactECharts 
          option={option} 
          style={{ height: '250px', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>

      {/* Status Information */}
      <div className={`p-3 rounded-lg border ${statusInfo.bgColor}`}>
        <div className="flex items-center justify-center mb-2">
          <span className="text-xl mr-2">{statusInfo.icon}</span>
          <span className={`text-base font-semibold ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        </div>
        <p className="text-gray-700 text-center text-xs">
          {statusInfo.description}
        </p>
      </div>

      {/* BMI Value and Range Reference */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-center mb-2">
          <div className="text-2xl font-bold text-gray-900">
            BMI = {bmi.toFixed(1)}
          </div>
        </div>
        <h4 className="font-medium text-gray-900 mb-2 text-center text-sm">BMI Reference Range for This Breed</h4>
        <div className="grid grid-cols-4 gap-1 text-xs">
          <div className="text-center">
            <div className="w-3 h-3 bg-blue-500 rounded mx-auto mb-1"></div>
            <div className="font-medium text-blue-600">Underweight</div>
            <div className="text-gray-600">&lt; {(idealBmiMin * 0.9).toFixed(1)}</div>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-green-500 rounded mx-auto mb-1"></div>
            <div className="font-medium text-green-600">Normal</div>
            <div className="text-gray-600">{idealBmiMin.toFixed(1)} - {idealBmiMax.toFixed(1)}</div>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-orange-500 rounded mx-auto mb-1"></div>
            <div className="font-medium text-orange-600">Overweight</div>
            <div className="text-gray-600">{(idealBmiMax * 1.01).toFixed(1)} - {(idealBmiMax * 1.3).toFixed(1)}</div>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-red-500 rounded mx-auto mb-1"></div>
            <div className="font-medium text-red-600">Obese</div>
            <div className="text-gray-600">&gt; {(idealBmiMax * 1.3).toFixed(1)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogBmiGauge;