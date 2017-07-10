Prueba de uso de la Api de FourSquare con javascript
======
Programa que muestra los locales comerciales especificos que se encuentran en un radio preestablecido (locales de pizza, estudios de grabacion etc..).

Para que funcione hay que agregar las key de **GoogleMap** en el **index.html** y el **client_id** y el **client_secret** de **FourSquare** en el **main.js**.

* Alguna de las funciones son :
  * Obtiene la ubicacion del dispositivo desde el cual se está consultando esta página.
  * Si no obtiene la ubicacion tiene una preestablecida que es Sabana Grande, en Caracas, Venezuela.
  * Por defecto está diseñada para buscar locales de Pizzas y en un radio de 2Km (2000mts).
  * Dibuja el radio de acción, marca los locales y el punto central de las coordenadas.


* Es un proyecto en desarrollo aunque por ahora está estable, aunque limitado, si se desea modificar la búsqueda, en el url de la API se puede especificar los datos.

Queda pendiente agregarle un formulario de busqueda de un lugar y si se desea o no buscar en los alrededores del dispositivo, tambien el poder ajustar el radio de busqueda.

Elaborado con HTML, CSS y javascript.
