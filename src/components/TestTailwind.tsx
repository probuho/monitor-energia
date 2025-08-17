import React from "react";

const TestTailwind: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
           Test de Tailwind CSS
        </h1>
        
        <div className="space-y-4">
          <div className="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-blue-800 font-medium">
               Si ves este mensaje con estilos, Tailwind está funcionando
            </p>
          </div>
          
          <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-500">
            <p className="text-green-800 font-medium">
               Colores, sombras y bordes redondeados
            </p>
          </div>
          
          <div className="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
            <p className="text-yellow-800 font-medium">
               Gradientes y efectos visuales
            </p>
          </div>
        </div>
        
        <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200">
           Botón con Hover Effects
        </button>
      </div>
    </div>
  );
};

export default TestTailwind;
