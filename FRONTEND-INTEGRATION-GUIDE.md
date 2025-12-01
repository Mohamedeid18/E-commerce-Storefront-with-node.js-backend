# 🔗 دليل ربط Backend API مع React Frontend

## 📋 المحتويات
1. [إعداد Backend](#إعداد-backend)
2. [إعداد Frontend](#إعداد-frontend)
3. [الملفات المطلوبة](#الملفات-المطلوبة)
4. [خطوات التشغيل](#خطوات-التشغيل)
5. [أمثلة الاستخدام](#أمثلة-الاستخدام)

---

## ✅ إعداد Backend

### 1. تم إضافة CORS للسيرفر
تم تحديث `server.js` لدعم الطلبات من Frontend:

```javascript
import cors from 'cors';

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

### 2. السيرفر يعمل على:
- **URL**: `http://localhost:5000`
- **API Base**: `http://localhost:5000/api`

### 3. Endpoints المتاحة:

#### 🔐 Authentication
- `POST /api/auth/register` - تسجيل مستخدم جديد
- `POST /api/auth/login` - تسجيل الدخول

#### 👥 Users
- `GET /api/users/me` - الحصول على بيانات المستخدم الحالي
- `GET /api/users` - الحصول على جميع المستخدمين (Admin)
- `GET /api/users/:id` - الحصول على مستخدم محدد
- `PUT /api/users/:id` - تحديث مستخدم
- `DELETE /api/users/:id` - حذف مستخدم (Admin)

#### 📦 Products
- `GET /api/products` - الحصول على جميع المنتجات
- `GET /api/products/:id` - الحصول على منتج محدد
- `POST /api/products` - إضافة منتج جديد (Admin)
- `PUT /api/products/:id` - تحديث منتج (Admin)
- `DELETE /api/products/:id` - حذف منتج (Admin)

#### 🛒 Orders
- `POST /api/orders` - إنشاء طلب جديد (Client)
- `GET /api/orders` - الحصول على جميع الطلبات
- `GET /api/orders/:id` - الحصول على طلب محدد
- `PUT /api/orders/:id/status` - تحديث حالة الطلب (Admin)
- `POST /api/orders/:id/rate` - تقييم الطلب (Client)

---

## 🎨 إعداد Frontend

### الخطوة 1: نسخ ملف API Service

انسخ ملف `frontend-api-service.js` إلى مشروع React الخاص بك:

```bash
# في مشروع React الخاص بك
mkdir -p src/services
# انسخ الملف إلى:
# src/services/api.js
```

### الخطوة 2: إنشاء ملف .env

في مجلد مشروع React، أنشئ ملف `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### الخطوة 3: تثبيت المكتبات المطلوبة (إذا لزم الأمر)

```bash
npm install react-router-dom  # للتنقل بين الصفحات
```

---

## 📁 الملفات المطلوبة

### في مشروع React الخاص بك:

```
your-react-project/
├── .env                          # متغيرات البيئة
├── src/
│   ├── services/
│   │   └── api.js               # ملف API Service (انسخ من frontend-api-service.js)
│   ├── components/
│   │   ├── Login.jsx            # صفحة تسجيل الدخول
│   │   ├── Register.jsx         # صفحة التسجيل
│   │   ├── Products.jsx         # عرض المنتجات
│   │   ├── ProductDetail.jsx    # تفاصيل المنتج
│   │   ├── Cart.jsx             # سلة التسوق
│   │   ├── Checkout.jsx         # إتمام الطلب
│   │   ├── Orders.jsx           # الطلبات
│   │   └── AdminPanel.jsx       # لوحة الإدارة
│   └── App.jsx
```

---

## 🚀 خطوات التشغيل

### 1. تشغيل Backend

```bash
cd c:\Users\msi\Downloads\DEBI-API-main\DEBI-API-main
npm run dev
```

✅ السيرفر سيعمل على: `http://localhost:5000`

### 2. تشغيل Frontend

```bash
cd C:\Users\msi\Videos\react 2\projects-react\product\shopping
npm run dev
```

✅ التطبيق سيعمل على: `http://localhost:5173` (أو المنفذ المحدد)

---

## 💡 أمثلة الاستخدام

### مثال 1: تسجيل الدخول

```jsx
import { authAPI } from './services/api';

const handleLogin = async (email, password) => {
  try {
    const data = await authAPI.login({ email, password });
    console.log('User logged in:', data.user);
    // التوجه إلى الصفحة الرئيسية
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};
```

### مثال 2: عرض المنتجات

```jsx
import { useEffect, useState } from 'react';
import { productsAPI } from './services/api';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsAPI.getAllProducts();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### مثال 3: إنشاء طلب

```jsx
import { ordersAPI } from './services/api';

const handleCheckout = async (cartItems) => {
  try {
    const orderData = {
      items: cartItems.map(item => ({
        productId: item._id,
        quantity: item.quantity
      }))
    };
    
    const data = await ordersAPI.createOrder(orderData);
    console.log('Order created:', data.order);
    alert('تم إنشاء الطلب بنجاح!');
  } catch (error) {
    console.error('Error creating order:', error);
  }
};
```

---

## 🔒 المصادقة (Authentication)

### حفظ Token

عند تسجيل الدخول، يتم حفظ Token تلقائياً في localStorage:

```javascript
// يتم تلقائياً في authAPI.login()
localStorage.setItem('token', data.token);
localStorage.setItem('user', JSON.stringify(data.user));
```

### استخدام Token في الطلبات

جميع الطلبات التي تحتاج مصادقة ستستخدم Token تلقائياً:

```javascript
// في api.js
const token = localStorage.getItem('token');
headers: {
  'Authorization': `Bearer ${token}`
}
```

### تسجيل الخروج

```javascript
import { authAPI } from './services/api';

const handleLogout = () => {
  authAPI.logout();
  window.location.href = '/login';
};
```

---

## 🛡️ Protected Routes

لحماية الصفحات التي تحتاج تسجيل دخول:

```jsx
import { Navigate } from 'react-router-dom';
import { authAPI } from './services/api';

function ProtectedRoute({ children }) {
  if (!authAPI.isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
}

// الاستخدام في App.jsx
<Route path="/orders" element={
  <ProtectedRoute>
    <Orders />
  </ProtectedRoute>
} />
```

---

## 📊 هيكل البيانات

### User Object
```javascript
{
  _id: "...",
  name: "User Name",
  email: "user@example.com",
  role: "client" | "admin",
  createdAt: "2024-..."
}
```

### Product Object
```javascript
{
  _id: "...",
  name: "Product Name",
  price: 99.99,
  stock: 50,
  image: "https://...",
  description: "Product description",
  createdAt: "2024-..."
}
```

### Order Object
```javascript
{
  _id: "...",
  user: "user_id",
  items: [
    {
      productId: "product_id",
      quantity: 2
    }
  ],
  total: 199.98,
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled",
  rating: 5,
  review: "Great product!",
  createdAt: "2024-..."
}
```

---

## 🐛 استكشاف الأخطاء

### مشكلة CORS
إذا واجهت مشكلة CORS، تأكد من:
1. السيرفر يعمل على `http://localhost:5000`
2. Frontend يعمل على `http://localhost:5173`
3. تم تثبيت `cors` في Backend

### مشكلة Authentication
إذا لم تعمل المصادقة:
1. تأكد من وجود Token في localStorage
2. تحقق من صلاحية Token
3. تأكد من إرسال Header بشكل صحيح

### مشكلة في الطلبات
1. افتح Developer Tools (F12)
2. تحقق من تبويب Network
3. راجع الأخطاء في Console

---

## 📞 الدعم

للمزيد من الأمثلة، راجع ملف:
- `react-components-examples.jsx` - أمثلة كاملة للمكونات

---

## ✨ ملاحظات مهمة

1. **تأكد من تشغيل Backend قبل Frontend**
2. **استخدم نفس المنافذ المحددة** (5000 للـ Backend، 5173 للـ Frontend)
3. **احفظ Token بشكل آمن** في localStorage
4. **تعامل مع الأخطاء** في جميع الطلبات
5. **استخدم Loading States** لتحسين تجربة المستخدم

---

## 🎉 جاهز للاستخدام!

الآن يمكنك البدء في بناء تطبيق E-commerce كامل باستخدام:
- ✅ Backend API جاهز ويعمل
- ✅ CORS مفعّل
- ✅ ملفات API Service جاهزة
- ✅ أمثلة كاملة للمكونات

**Happy Coding! 🚀**
