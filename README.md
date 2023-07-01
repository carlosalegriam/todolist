# ToDoList
Lista de tareas creado con HTML, CSS, JS, Python y Django
[![Python](https://img.shields.io/badge/Python-3.9-blue)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-3.2-green)](https://www.djangoproject.com/)

Este es el repositorio de la aplicación ToDoList, desarrollada utilizando Python y Django.

## Descripción del proyecto

ToDoList es una aplicación web diseñada para ayudarte a organizar tus tareas diarias. Puedes crear múltiples listas de tareas y agregar elementos a cada lista. Cada tarea puede tener una descripción, fecha de vencimiento y prioridad.

La aplicación cuenta con las siguientes características:

- Crear, editar y eliminar listas de tareas.
- Agregar, editar y eliminar tareas en cada lista.
- Marcar tareas como completadas.
- Filtrar tareas por estado (completadas o pendientes).
- Ordenar tareas por fecha de vencimiento o prioridad.
- Funcionalidad de búsqueda para encontrar tareas específicas.
- Interfaz intuitiva y fácil de usar.

## Capturas de pantalla

![Captura de pantalla 1](screenshots/screenshot1.png)
*Captura de pantalla 1: Página principal mostrando las listas de tareas.*

![Captura de pantalla 2](screenshots/screenshot2.png)
*Captura de pantalla 2: Página de detalle de una lista de tareas con tareas pendientes.*

## Instalación

Para ejecutar la aplicación localmente, sigue los siguientes pasos:

1. Clona este repositorio en tu máquina local:
   git clone https://github.com/carlosalegriam/todolist.git


2. Navega hasta el directorio del proyecto:

cd todolist

3. Crea y activa un entorno virtual (opcional):

python -m venv env
source env/bin/activate

4. Instala las dependencias del proyecto:

pip install -r requirements.txt

5. Realiza las migraciones de la base de datos:

python manage.py migrate

6. Inicia el servidor de desarrollo:

python manage.py runserver

7. Accede a la aplicación en tu navegador web en [http://localhost:8000](http://localhost:8000).

## Uso

Una vez que hayas instalado y ejecutado la aplicación, puedes comenzar a utilizarla de la siguiente manera:

1. Crea una nueva lista de tareas haciendo clic en el botón "Nueva Lista".
2. Agrega tareas a la lista utilizando el formulario de la parte inferior.
3. Marca una tarea como completada haciendo clic en el ícono de verificación.
4. Edita o elimina una tarea utilizando los enlaces correspondientes.
5. Filtra las tareas por estado utilizando los botones "Completadas" o "Pendientes".
6. Ordena las tareas por fecha de vencimiento o prioridad haciendo clic en los encabezados de la tabla.
7. Utiliza la barra de búsqueda para encontrar tareas específicas.

## Contribución

Si deseas contribuir a este proyecto, puedes seguir los siguientes pasos:

1. Realiza un fork de este repositorio.
2. Crea una rama nueva para tu funcionalidad o corrección de errores: `git checkout -b nombre-de-la-rama`.
3. Realiza los cambios necesarios y commitea tus modificaciones: `git commit -m "Descripción de los cambios"`.
4. Envía tus cambios al repositorio remoto: `git push origin nombre-de-la-rama`.
5. Abre una solicitud de extracción en GitHub.
