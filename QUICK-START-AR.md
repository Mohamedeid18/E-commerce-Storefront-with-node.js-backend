# 🚀 خطوات سريعة لربط Frontend مع Backend

## ✅ تم الإعداد بنجاح!

تم إضافة CORS للـ Backend وإنشاء جميع الملفات المطلوبة.

---

## 📋 الخطوات التالية:

### الطريقة الأولى: نسخ تلقائي (مستحسن)

1. **شغل السكريبت التلقائي:**
   ```cmd
   setup-frontend.bat
   ```
   هذا سينسخ جميع الملفات المطلوبة إلى مشروع React تلقائياً.

### الطريقة الثانية: نسخ يدوي

انسخ الملفات التالية إلى مشروع React الخاص بك:

1. **ملف API Service:**
   - من: `frontend-api-service.js`
   - إلى: `C:\Users\msi\Videos\react 2\projects-react\product\shopping\src\services\api.js`

2. **ملف Environment Variables:**
   - من: `frontend.env.example`
   - إلى: `C:\Users\msi\Videos\react 2\projects-react\product\shopping\.env`

3. **ملف الأمثلة (اختياري):**
   - من: `react-components-examples.jsx`
   - إلى: `C:\Users\msi\Videos\react 2\projects-react\product\shopping\src\examples.jsx`

---

## 🎯 كيفية الاستخدام في React:

### 1. استيراد API Service

```javascript
import { authAPI, productsAPI, ordersAPI } from './services/api';
```

### 2. مثال: عرض المنتجات

```javascript
import { useEffect, useState } from 'react';
import { productsAPI } from './services/api';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsAPI.getAllProducts()
      .then(data => setProducts(data.products))
      .catch(error => console.error(error));
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

### 3. مثال: تسجيل الدخول

```javascript
import { authAPI } from './services/api';

const handleLogin = async (email, password) => {
  try {
    const data = await authAPI.login({ email, password });
    console.log('تم تسجيل الدخول:', data.user);
    // التوجه للصفحة الرئيسية
  } catch (error) {
    alert('خطأ في تسجيل الدخول');
  }
};
```

---

## 🔧 التشغيل:

### 1. تشغيل Backend (في terminal منفصل):
```cmd
cd c:\Users\msi\Downloads\DEBI-API-main\DEBI-API-main
npm run dev
```
✅ يعمل على: http://localhost:5000

### 2. تشغيل Frontend (في terminal منفصل):
```cmd
cd C:\Users\msi\Videos\react 2\projects-react\product\shopping
npm run dev
```
✅ يعمل على: http://localhost:5173

---

## 📚 الملفات المتاحة:

1. **FRONTEND-INTEGRATION-GUIDE.md** - دليل شامل بالعربية
2. **frontend-api-service.js** - ملف API Service الكامل
3. **react-components-examples.jsx** - أمثلة كاملة للمكونات
4. **frontend.env.example** - ملف متغيرات البيئة

---

## 🎉 جاهز!

الآن يمكنك:
- ✅ استخدام جميع API endpoints
- ✅ تسجيل دخول/تسجيل مستخدمين
- ✅ عرض وإدارة المنتجات
- ✅ إنشاء وإدارة الطلبات
- ✅ تقييم الطلبات

**للمزيد من التفاصيل، راجع: FRONTEND-INTEGRATION-GUIDE.md**
