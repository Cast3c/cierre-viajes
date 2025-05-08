<p align="center">
    <img src="./public/Cierre-viajes.png" alt="App de viajes banner" width="100%">
<p>


# 🚚 App de Viajes para Camión

Aplicación web desarrollada en React para registrar, gestionar y visualizar los viajes realizados en camión, con el objetivo de mantener un control financiero básico de ingresos (fletes) y egresos (gastos).

## 📌 Objetivo

Facilitar el cierre de cuentas por cada viaje, guardando información clave como fecha, origen, destino, cliente, flete y gastos detallados. Actualmente los datos se almacenan en el navegador utilizando `localStorage`, con proyección a integrar backend con Node.js para escalar la solución.

---

## ⚙️ Tecnologías utilizadas

- 🧱 [React](https://reactjs.org/)
- ⚡ [Vite](https://vitejs.dev/)
- 💾 Almacenamiento local (`localStorage`)
- 🧠 Hooks: `useState`, `useEffect`, `useRef`
- 🧩 Componentes organizados y reutilizables

---

## ✨ Funcionalidades actuales

- Registro de viajes
- Guardado automático de datos en `localStorage`
- Visualización en lista de todos los viajes registrados
- Eliminación de viajes incorrectos
- Cálculo automático del total de gastos por viaje

---

## 🛣️ Roadmap (Próximas funciones)

- Filtrado de viajes por cliente, destino o fecha
- Edición de viajes registrados
- Exportar los datos (PDF / Excel)
- Dashboard de estadísticas (totales mensuales, promedio de fletes/gastos, etc.)
- Autenticación de usuario
- Backend con Node.js y base de datos (MongoDB o PostgreSQL)

---

## 🧪 Cómo ejecutar localmente

1. Clona este repositorio

```bash
git clone https://github.com/tu_usuario/app-viajes.git
cd app-viajes

