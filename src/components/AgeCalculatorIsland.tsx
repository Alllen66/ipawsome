import { useState } from 'react';

interface Factors {
  first: number;
  second: number;
  k: number;
}

const map: Record<string, Factors> = {
  small: { first: 15, second: 24, k: 4 },
  medium: { first: 15, second: 24, k: 4 },
  large: { first: 15, second: 24, k: 5 },
  giant: { first: 12, second: 22, k: 7 },
};

function toHuman(age: number, size: string): number {
  if (age <= 1) return map[size].first * age;
  if (age <= 2) return map[size].first + 9 * (age - 1);
  return map[size].second + map[size].k * (age - 2);
}

function getZodiacSign(birthDate: Date): string {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn ♑';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius ♒';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces ♓';
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries ♈';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus ♉';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini ♊';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer ♋';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo ♌';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo ♍';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra ♎';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio ♏';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius ♐';
  
  return 'Unknown';
}

export default function AgeCalculatorIsland() {
  const [birthDate, setBirthDate] = useState('');
  const [size, setSize] = useState('medium');
  const [result, setResult] = useState<{
    dogAge: number;
    humanAge: number;
    zodiac: string;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();
    const ageInYears = (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

    if (ageInYears < 0) {
      alert('Please enter a valid birth date');
      return;
    }

    const humanAge = Math.round(toHuman(ageInYears, size));
    const zodiac = getZodiacSign(birth);

    setResult({
      dogAge: Math.round(ageInYears * 10) / 10,
      humanAge,
      zodiac
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🐕 Dog Age Calculator</h2>
        <p className="text-gray-600">Enter your dog's birth date and size to calculate their age in human years</p>
      </div>

      <div className="space-y-6">
        {/* Birth Date Input */}
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
            Birth Date
          </label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Size Selection */}
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
            Dog Size
          </label>
          <select
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="small">Small (up to 25 lbs)</option>
            <option value="medium">Medium (26-60 lbs)</option>
            <option value="large">Large (61-100 lbs)</option>
            <option value="giant">Giant (over 100 lbs)</option>
          </select>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateAge}
          disabled={!birthDate}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Calculate Age
        </button>

        {/* Results */}
        {result && (
          <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Results</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Dog Age:</span>
                <span className="font-bold text-blue-600">{result.dogAge} years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">≈ Human Age:</span>
                <span className="font-bold text-blue-600">{result.humanAge} years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Zodiac Sign:</span>
                <span className="font-bold text-purple-600">{result.zodiac}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> This calculation is based on common veterinary guidelines. Different breeds may age differently. Always consult your veterinarian for personalized advice.
        </p>
      </div>
    </div>
  );
} 