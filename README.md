# 🍽️ Razi Food Kart  
A complete **Food Ordering Web Application** built using **React.js**, **JSON Server**, and a custom **Node.js File Upload Server**.  
This project replicates a mini food delivery platform with browsing restaurants, menus, placing orders, restaurant-owner dashboard, live status updates, and image upload support.


## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Node.js](https://img.shields.io/badge/Node.js-3C873A?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JSON Server](https://img.shields.io/badge/JSON%20Server-333333?style=for-the-badge&logo=json&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FFCA28?style=for-the-badge&logo=node.js&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-FCDC00?style=for-the-badge&logo=javascript&logoColor=000)
![CSS3](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)



## 🚀 Features  
### ✅ User Side     
- Login/Signup
- Search foods & restaurants  
- Add items to cart  
- Place orders
- Make Payment
- Track live order status  
- Rate restaurants   

### ✅ Restaurant Owner Dashboard  
- Login/Signup
- View live orders  
- Update order status  
- Mark orders as completed  
- Add menu items

### ✅ Technical Features  
- Fully working CRUD operations  
- Fake backend using JSON Server  
- Image upload via Express server  
- Auto-refresh order lists  
- Clean React components  
- Works fully offline (local setup)

---


## 📂 Project Structure  
```
/src → React source code (frontend)
/components → UI components
/contexts → Auth + Cart context
/api → Axios API setup

db.json → Fake backend database (JSON Server)
server.cjs → File upload server (Express)
public/uploads → Uploaded food images

package.json → Dependencies & scripts
vite.config.js → Vite config
```


---

# 🛠️ Installation & Local Setup  
Follow these steps EXACTLY to run the full project locally.

---

## ✅ 1. Clone the Repository  
```bash
git clone https://github.com/your-username/razi-food-kart.git
cd razi-food-kart
```

## ✅ 2. Install Dependencies
```bash
npm install
```
## Start Backend Services
## ✅ 3. Start JSON Server (Port: 4000)
- This is the fake backend API.
```bash
npx json-server --watch db.json --port 4000
```

NOTE: API will run on:
👉 http://localhost:4000

## ✅ 4. Start Image Upload Server (Port: 5000)
- Handles all food image uploads.
```bash
node server.cjs
```
Upload endpoint:
👉 POST http://localhost:5000/save-image

Uploaded images appear in:
📁 /public/uploads

## Start Frontend
## ✅ 5. Start React Frontend (Vite)
```bash
npm run dev
```
Frontend link:
👉 http://localhost:5173

## ✅ Summary of All Servers
| Service            | Port | URL                                            |
| ------------------ | ---- | ---------------------------------------------- |
| React App          | 5173 | [http://localhost:5173](http://localhost:5173) |
| JSON Server        | 4000 | [http://localhost:4000](http://localhost:4000) |
| File Upload Server | 5000 | [http://localhost:5000](http://localhost:5000) |


## 👨‍💻 Author
### Md Razi Azam
##### Full-stack developer & content creator

⭐ Support
If you like this project, please ⭐ star the repo.
