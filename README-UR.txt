EHSAAN AI — شروع کرنے کا طریقہ

اس پروجیکٹ میں:
- public/index.html: ویب سائٹ کا ڈیزائن اور فرنٹ اینڈ
- server.js: محفوظ بیک اینڈ، جو تصویر بنانے والی API سے رابطہ کرتا ہے
- package.json: Node.js پیکجز

ضروری چیزیں:
1) کمپیوٹر پر Node.js انسٹال ہو۔
2) ایک مجاز OpenAI API key اور فعال API billing/رسائی ہو۔ API استعمال کرنے پر خرچ ہو سکتا ہے۔
3) API key صرف server environment میں رکھیں؛ اسے HTML، GitHub یا کسی عوامی جگہ پر نہ لکھیں۔
   اگر آپ کم عمر ہیں تو API اکاؤنٹ، ادائیگی اور ہوسٹنگ کی سیٹنگ کسی والدین/سرپرست کی مدد سے کریں۔

چلانے کے مراحل:
1) ZIP فائل extract کریں۔
2) اس فولڈر میں terminal کھولیں۔
3) چلائیں: npm install
4) OPENAI_API_KEY کو اپنے کمپیوٹر کے environment variable میں محفوظ کریں۔
   Windows PowerShell کی موجودہ ونڈو کے لیے مثال:
   $env:OPENAI_API_KEY="اپنی_اصل_key"
   اصل key کسی کے ساتھ شیئر نہ کریں۔
5) چلائیں: npm start
6) براؤزر میں کھولیں: http://localhost:3000

نوٹ:
صرف index.html کو ڈبل کلک کرنے سے حقیقی تصویر generate نہیں ہوگی؛ server.js چلنا ضروری ہے۔
API model یا access بدلنے کی صورت میں server.js کی API configuration اپڈیٹ کرنی پڑ سکتی ہے۔
