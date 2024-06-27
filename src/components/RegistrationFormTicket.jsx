 import React, { useState } from 'react';

 

  const RegistrationFormTicket = () => {
    const document = localStorage.getItem('userDocument');
    const [formData, setFormData] = useState({       
        document: document,
        vehicle_type: '',
        placa: '',
        numero_marco:'',
        date: '',
        description: '',
        photo: '',
        status: '1'
    });
    const [errors, setErrors] = useState({});    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('http://127.0.0.1:8000/api/v1/tickets-registration', {
              method: 'post',
              body: JSON.stringify(formData),
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          if (!response.ok) {
              throw new Error('Error en la solicitud');
          }
          const data = await response.json();
          console.log('Respuesta de la API:', data);
          alert('El ticket fue creado exitosamente');
          window.location.replace('http://localhost:3000/TicketsTable');
      } catch (error) {
          console.error('Error:', error);
          console.log(formData);
          alert('Error al registrar el ticket');
      }
    };

    const [vehicle_type, setVehicleType] = useState("");

    const handleVehicleTypeChange = (event) => {
      setVehicleType(event.target.value);
    };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-200 dark:bg-gray-950">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Datos del ticket
        </h1>
        <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md" onSubmit={handleSubmit}>                  

          <div className="max-w-2l mx-auto">
            <label
              className="block text-teal-800 text-sm font-bold mb-2 text-start"
              htmlFor="name"
            >
              Tipo de vehiculo
            </label>
            <select 
              id="vehicle_type"
              name ="vehicle_type"
              //required
              className= "bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-s rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-amber-500 dark:focus:border-amber-50 invalid:border-red-500 invalid:border-2"            
              onChange={handleVehicleTypeChange}
              value={formData.vehicle_type}
              >
              <option Value="Ninguno">Ninguno</option>
              <option value="Motocicleta">Motocicleta</option>
              <option value="Bicicleta">Bicicleta</option>              
            </select>
          </div>

          {vehicle_type === "Motocicleta" && (
            <div className="mb-4">
              <label
                className="block text-teal-800 text-sm font-bold mb-2 text-start"
                htmlFor="name"
              >
                Numero de placa
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-amber-500 invalid:border-pink-600 invalid:border-2"
                type="text"
                id="placa"
                name="placa"
                placeholder="ABC-12A"
                // value={formData.placa}
                //required
              />
            </div>
          )}       
          {vehicle_type === "Bicicleta" && (
            <div className="mb-4">
              <label
                className="block text-teal-800 text-sm font-bold mb-2 text-start"
                htmlFor="numero_marco"
              >
                Numero de marco
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-amber-500 invalid:border-pink-600 invalid:border-2"
                type="text"
                id="numero_marco"
                name="numero_marco"
                placeholder="SN00AA1234BB"
                // value={formData.numero_marco}
                //required
              />
            </div>
          )}
          
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-4 text-start"
              htmlFor="email"
            >
              Fecha
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-amber-500 invalid:border-pink-600 invalid:border-2"
              type="date"
              id="date"
              name="date"
              placeholder="2022-12-31"
             value={formData.date}
             onChange={handleInputChange}
             required
            />
          </div>
         
          <div className="mb-4">
            <label
              className="block text-teal-800 text-sm font-bold mb-2 text-start"
              htmlFor="name"
            >
              Descripción
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-amber-500 invalid:border-pink-600 invalid:border-2"
              type="text"
              id="description"
              name="description"
              placeholder="Descripción..."              
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
          <label
            className="block text-teal-800 text-sm font-bold mb-2 text-start"
            htmlFor="name"
          >
            Imagen
          </label>
          <div className="flex w-full items-center justify-center">
            <label className="w-full flex flex-col items-center px-1 py-1 bg-white text-blue rounded-lg shadow-lg tracking-wide border-2 border-blue cursor-pointer hover:bg-blue hover:text-amber-500">
              <svg
                class="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="text-s leading-normal">Selecciona un archivo</span>
              <input type="file" id="foto_carnet" class="hidden" />
            </label>
          </div>
          </div>
          <button
            className="w-full bg-amber-500 text-white text-s font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}

export { RegistrationFormTicket };
